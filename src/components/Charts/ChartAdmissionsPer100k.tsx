import React, { FunctionComponent } from 'react';
import isDate from 'lodash/isDate';
import { min as d3min, max as d3max } from 'd3-array';
import { GridRows } from '@vx/grid';
import { scaleLinear } from '@vx/scale';
import { ParentSize } from '@vx/responsive';
import { Column } from 'common/models/Projection';
import { ADMISSIONS_PER_100K_LEVEL_INFO_MAP } from 'common/metrics/admissions_per_100k';
import { LevelInfoMap } from 'common/level';
import { formatDecimal } from 'common/utils';
import { AxisBottom } from 'components/Charts/Axis';
import { AxisLeft } from './Axis';
import BoxedAnnotation from './BoxedAnnotation';
import ChartContainer from './ChartContainer';
import RectClipGroup from './RectClipGroup';
import ZoneAnnotation from './ZoneAnnotation';
import Tooltip from './Tooltip';
import LinePathRegion from './LinePathRegion';
import * as TooltipStyle from './Tooltip.style';
import * as Style from './Charts.style';
import {
  computeTickPositions,
  getChartRegions,
  getZoneByValue,
  last,
  getUtcScale,
  getTimeAxisTicks,
  getColumnDate,
  formatTooltipColumnDate,
} from './utils';
import FrameworkOverlay, { CDC_FRAMEWORK_START_DATE } from './FrameworkOverlay';

type Point = {
  x: number;
  y: any;
};

const getAdmissionsPer100k = (d: Point) => d?.y;

const hasData = (d: any) =>
  isDate(getColumnDate(d)) && Number.isFinite(getAdmissionsPer100k(d));

const ChartAdmissionsPer100k: FunctionComponent<{
  columnData: Column[];
  zones: LevelInfoMap;
  capY?: number;
  width: number;
  height: number;
  marginTop?: number;
  marginBottom?: number;
  marginLeft?: number;
  marginRight?: number;
}> = ({
  columnData,
  zones,
  capY = 500,
  width,
  height,
  marginTop = 6,
  marginBottom = 40,
  marginLeft = 30,
  marginRight = 5,
}) => {
  const chartWidth = width - marginLeft - marginRight;
  const chartHeight = height - marginTop - marginBottom;

  const data: Point[] = columnData.filter(hasData);

  const lastPoint = last(data);
  const activeZone = getZoneByValue(getAdmissionsPer100k(lastPoint), zones);

  const dates = data.map(getColumnDate);
  const minDate = d3min(dates) || new Date('2020-01-01');
  const currDate = new Date();
  const xScale = getUtcScale(minDate, currDate, 0, chartWidth);
  const [startDate, endDate] = xScale.domain();
  const dateTicks = getTimeAxisTicks(startDate, endDate);

  const yDataMax = d3max(data, getAdmissionsPer100k) || 100;
  const yAxisMin = 0;

  //TODO (Chelsi): remove need for hard coded 30
  const yAxisMax = Math.min(Math.max(yDataMax, 30), capY);

  const yScale = scaleLinear({
    domain: [yAxisMin, yAxisMax],
    range: [chartHeight, 0],
  });

  const getXCoord = (p: Point) => xScale(getColumnDate(p)) ?? 0;
  const getYCoord = (p: Point) =>
    yScale(Math.min(getAdmissionsPer100k(p), capY)) ?? 0;

  const regions = getChartRegions(yAxisMin, yAxisMax, zones);
  const yTicks = computeTickPositions(
    yAxisMin,
    yAxisMax,
    zones,
  ).filter(tickVal => Number.isFinite(tickVal));

  const renderTooltip = (p: Point) => (
    <Tooltip
      left={marginLeft + getXCoord(p)}
      top={marginTop + getYCoord(p)}
      title={formatTooltipColumnDate(p)}
      subtitle="WEEKLY COVID ADMISSIONS"
      width={'145px'}
    >
      <TooltipStyle.Body>
        {`${formatDecimal(getAdmissionsPer100k(p), 1)} per 100k`}
      </TooltipStyle.Body>
    </Tooltip>
  );

  const getMarkerColor = (p: Point) => {
    return getColumnDate(p) <= CDC_FRAMEWORK_START_DATE
      ? '#000'
      : getZoneByValue(getAdmissionsPer100k(p), zones).color;
  };

  const renderMarker = (p: Point) => (
    <Style.CircleMarker
      cx={getXCoord(p)}
      cy={getYCoord(p)}
      r={6}
      fill={getMarkerColor(p)}
    />
  );

  return (
    <ChartContainer<Point>
      data={data}
      x={getXCoord}
      y={getYCoord}
      renderMarker={renderMarker}
      renderTooltip={renderTooltip}
      width={width}
      height={height}
      marginTop={marginTop}
      marginBottom={marginBottom}
      marginLeft={marginLeft}
      marginRight={marginRight}
    >
      <RectClipGroup width={chartWidth} height={chartHeight} topPadding={5}>
        <LinePathRegion
          data={data}
          x={getXCoord}
          y={getYCoord}
          regions={regions}
          width={chartWidth}
          yScale={(num: number) => yScale(num) ?? 0}
        />
        <FrameworkOverlay
          width={chartWidth}
          height={chartHeight}
          data={data}
          getXCoord={getXCoord}
          getYCoord={getYCoord}
          xScale={xScale}
        />
        <Style.LineGrid>
          <GridRows width={chartWidth} scale={yScale} tickValues={yTicks} />
        </Style.LineGrid>
        <Style.TextAnnotation>
          <BoxedAnnotation
            x={getXCoord(lastPoint)}
            y={getYCoord(lastPoint) - 20}
            text={formatDecimal(getAdmissionsPer100k(lastPoint), 1)}
          />
        </Style.TextAnnotation>
      </RectClipGroup>
      {regions.map((region, i) => (
        <ZoneAnnotation
          key={`zone-annotation-${i}`}
          color={region.color}
          name={region.name}
          isActive={activeZone.name === region.name}
          x={chartWidth - 10}
          y={yScale(0.5 * (region.valueFrom + region.valueTo)) ?? 0}
        />
      ))}
      <AxisBottom
        innerHeight={chartHeight}
        scale={xScale}
        tickValues={dateTicks}
      />
      <AxisLeft scale={yScale} tickValues={yTicks.slice(1)} />
    </ChartContainer>
  );
};

const ChartAdmissionsPer100kAutosize: FunctionComponent<{
  columnData: Column[];
  height: number;
}> = ({ columnData, height }) => {
  return (
    <Style.ChartContainer>
      <ParentSize>
        {({ width }) => (
          <ChartAdmissionsPer100k
            width={width}
            height={height}
            columnData={columnData}
            zones={ADMISSIONS_PER_100K_LEVEL_INFO_MAP}
          />
        )}
      </ParentSize>
    </Style.ChartContainer>
  );
};

export { ChartAdmissionsPer100k };
export default ChartAdmissionsPer100kAutosize;
