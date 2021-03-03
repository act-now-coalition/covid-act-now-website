import React, { FunctionComponent } from 'react';
import { isDate } from 'lodash';
import { min as d3min, max as d3max } from 'd3-array';
import { curveMonotoneX } from '@vx/curve';
import { GridRows } from '@vx/grid';
import { scaleLinear } from '@vx/scale';
import { ParentSize } from '@vx/responsive';
import { Column } from 'common/models/Projection';
import { Group } from '@vx/group';
import { CASE_DENSITY_LEVEL_INFO_MAP } from 'common/metrics/case_density';
import { LevelInfoMap, Level } from 'common/level';
import { formatUtcDate, formatDecimal } from 'common/utils';
import { AxisRight } from './Axis';
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
  getAxisLimits,
  getUtcScale,
} from './utils';
import { AxisBottom } from 'components/Charts/Axis';
import { getTimeAxisTicks } from 'components/Explore/utils';

type Point = {
  x: number;
  y: any;
};

const getDate = (d: Point) => new Date(d.x);
const getYCaseDensity = (d: Point) => d?.y?.caseDensity;
const getYNewCases = (d: Point) => d?.y?.newCases;
const hasData = (d: any) =>
  isDate(getDate(d)) && Number.isFinite(getYCaseDensity(d));

const ChartCaseDensity: FunctionComponent<{
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
  marginTop = 15,
  marginBottom = 40,
  marginLeft = 10,
  marginRight = 5,
}) => {
  const chartWidth = width - marginLeft - marginRight;
  const chartHeight = height - marginTop - marginBottom;

  const data: Point[] = columnData.filter(hasData);

  const lastPoint = last(data);
  const activeZone = getZoneByValue(getYCaseDensity(lastPoint), zones);

  const dates = data.map(getDate);
  const minDate = d3min(dates) || new Date('2020-01-01');
  const currDate = new Date();
  const xScale = getUtcScale(minDate, currDate, 0, chartWidth, 10);
  const [startDate, endDate] = xScale.domain();
  const dateTicks = getTimeAxisTicks(startDate, endDate);

  const yDataMax = d3max(data, getYCaseDensity) || 100;
  const yAxisLimits = getAxisLimits(0, yDataMax, zones);

  // Adjusts the min y-axis to make the Low label fit only if
  // the current level is Low
  const isLow = activeZone.level === Level.LOW;
  const yAxisMin = isLow ? -6 : 0;
  const yAxisMax = Math.min(yAxisLimits[1], capY);

  const yScale = scaleLinear({
    domain: [yAxisMin, yAxisMax],
    range: [chartHeight, 0],
  });

  const getXCoord = (p: Point) => xScale(getDate(p));
  const getYCoord = (p: Point) => yScale(Math.min(getYCaseDensity(p), capY));

  const regions = getChartRegions(yAxisMin, yAxisMax, zones);
  const yTicks = computeTickPositions(yAxisMin, yAxisMax, zones);

  // Hide the Low label if the current level is Medium or higher
  const regionLabels = isLow ? regions : regions.slice(Level.MEDIUM);

  const renderTooltip = (p: Point) => (
    <Tooltip
      left={marginLeft + getXCoord(p)}
      top={marginTop + getYCoord(p)}
      title={formatUtcDate(getDate(p), 'MMM D, YYYY')}
      subtitle="DAILY NEW CASES"
      width={'145px'}
    >
      <TooltipStyle.BodySmall>
        <div>{`${formatDecimal(getYNewCases(p), 1)} cases`}</div>
      </TooltipStyle.BodySmall>
      <TooltipStyle.Body>
        {`${formatDecimal(getYCaseDensity(p), 1)} per 100k`}
      </TooltipStyle.Body>
    </Tooltip>
  );
  const renderMarker = (p: Point) => (
    <Style.CircleMarker
      cx={getXCoord(p)}
      cy={getYCoord(p)}
      r={6}
      fill={getZoneByValue(getYCaseDensity(p), zones).color}
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
          curve={curveMonotoneX}
        />
        <Style.LineGrid>
          <GridRows width={chartWidth} scale={yScale} tickValues={yTicks} />
        </Style.LineGrid>
        <Style.TextAnnotation textAnchor="end">
          <BoxedAnnotation
            x={getXCoord(lastPoint)}
            y={getYCoord(lastPoint)}
            text={formatDecimal(getYCaseDensity(lastPoint), 1)}
          />
        </Style.TextAnnotation>
      </RectClipGroup>
      {regionLabels.map((region, i) => (
        <ZoneAnnotation
          key={`zone-annotation-${i}`}
          color={region.color}
          name={region.name}
          isActive={activeZone.name === region.name}
          x={23}
          y={yScale(0.5 * (region.valueFrom + region.valueFrom)) - 7}
        />
      ))}

      <AxisBottom
        innerHeight={chartHeight}
        scale={xScale}
        tickValues={dateTicks}
        showYear
      />
      <Group top={-6} left={-10}>
        <AxisRight scale={yScale} tickValues={yTicks.slice(1)} />
      </Group>
    </ChartContainer>
  );
};

const ChartCaseDensityAutosize: FunctionComponent<{
  columnData: Column[];
  height?: number;
}> = ({ columnData, height = 400 }) => (
  <Style.ChartContainer>
    <ParentSize>
      {({ width }) => (
        <ChartCaseDensity
          width={width}
          height={height}
          columnData={columnData}
          zones={CASE_DENSITY_LEVEL_INFO_MAP}
        />
      )}
    </ParentSize>
  </Style.ChartContainer>
);

export { ChartCaseDensity };
export default ChartCaseDensityAutosize;
