import React, { FunctionComponent } from 'react';
import isDate from 'lodash/isDate';
import { min as d3min, max as d3max } from 'd3-array';
import { GridRows } from '@vx/grid';
import { scaleLinear } from '@vx/scale';
import { ParentSize } from '@vx/responsive';
import { Column } from 'common/models/Projection';
import { WEEKLY_NEW_CASES_PER_100K_LEVEL_INFO_MAP } from 'common/metrics/weekly_new_cases_per_100k';
import { LevelInfoMap, Level } from 'common/level';
import { formatDecimal } from 'common/utils';
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
} from './utils';
import { AxisBottom } from 'components/Charts/Axis';
import { getColumnDate, formatTooltipColumnDate } from './utils';
import FrameworkOverlay, { CDC_FRAMEWORK_START_DATE } from './FrameworkOverlay';

// TODO(8.2) - confirm thresholds/chart/tooltip content

type Point = {
  x: number;
  y: any;
};

const getWeeklyNewCasesPer100k = (d: Point) => d?.y;

const hasData = (d: any) =>
  isDate(getColumnDate(d)) && Number.isFinite(getWeeklyNewCasesPer100k(d));

const ChartWeeklyNewCasesPer100k: FunctionComponent<{
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
  capY = 3500,
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
  const activeZone = getZoneByValue(getWeeklyNewCasesPer100k(lastPoint), zones);

  const dates = data.map(getColumnDate);
  const minDate = d3min(dates) || new Date('2020-01-01');
  const currDate = new Date();
  const xScale = getUtcScale(minDate, currDate, 0, chartWidth);
  const [startDate, endDate] = xScale.domain();
  const dateTicks = getTimeAxisTicks(startDate, endDate);

  const yDataMax = d3max(data, getWeeklyNewCasesPer100k) || 100;

  // Adjusts the min y-axis to make the Low label fit only if
  // the current level is Low
  const isLow = activeZone.level === Level.LOW;
  const yAxisMin = isLow ? -6 : 0;
  const yAxisMax = Math.min(Math.max(yDataMax, 30), capY);

  const yScale = scaleLinear({
    domain: [yAxisMin, yAxisMax],
    range: [chartHeight, 0],
  });

  const getXCoord = (p: Point) => xScale(getColumnDate(p));
  const getYCoord = (p: Point) =>
    yScale(Math.min(getWeeklyNewCasesPer100k(p), capY));

  const regions = getChartRegions(yAxisMin, yAxisMax, zones);
  const yTicks = computeTickPositions(
    yAxisMin,
    yAxisMax,
    zones,
  ).filter(tickVal => Number.isFinite(tickVal));

  // Hide the Low label if the current level is Medium or higher
  const regionLabels = isLow ? regions : regions.slice(Level.MEDIUM);

  const renderTooltip = (p: Point) => (
    <Tooltip
      left={marginLeft + getXCoord(p)}
      top={marginTop + getYCoord(p)}
      title={formatTooltipColumnDate(p)}
      subtitle="WEEKLY NEW CASES"
      width={'145px'}
    >
      <TooltipStyle.Body>
        {`${formatDecimal(getWeeklyNewCasesPer100k(p), 1)} per 100k`}
      </TooltipStyle.Body>
    </Tooltip>
  );

  const getMarkerColor = (p: Point) => {
    return getColumnDate(p) <= CDC_FRAMEWORK_START_DATE
      ? '#000'
      : getZoneByValue(getWeeklyNewCasesPer100k(p), zones).color;
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
          yScale={yScale}
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
            text={formatDecimal(getWeeklyNewCasesPer100k(lastPoint), 1)}
          />
        </Style.TextAnnotation>
      </RectClipGroup>
      {regionLabels.map((region, i) => (
        <ZoneAnnotation
          key={`zone-annotation-${i}`}
          color={region.color}
          name={region.name}
          isActive={activeZone.name === region.name}
          x={chartWidth - 10}
          y={yScale(0.5 * (region.valueFrom + region.valueTo))}
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

const ChartWeeklyNewCasesPer100kAutosize: FunctionComponent<{
  columnData: Column[];
  height: number;
}> = ({ columnData, height }) => {
  return (
    <Style.ChartContainer>
      <ParentSize>
        {({ width }) => (
          <ChartWeeklyNewCasesPer100k
            width={width}
            height={height}
            columnData={columnData}
            zones={WEEKLY_NEW_CASES_PER_100K_LEVEL_INFO_MAP}
          />
        )}
      </ParentSize>
    </Style.ChartContainer>
  );
};

export { ChartWeeklyNewCasesPer100k };
export default ChartWeeklyNewCasesPer100kAutosize;
