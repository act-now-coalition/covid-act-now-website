import React from 'react';
import { isDate } from 'lodash';
import { min as d3min, max as d3max } from 'd3-array';
import { curveLinear } from '@vx/curve';
import { GridRows } from '@vx/grid';
import { Group } from '@vx/group';
import { ParentSize } from '@vx/responsive';
import { scaleLinear } from '@vx/scale';
import { Column } from 'common/models/Projection';
import { assert, formatUtcDate, formatPercent } from 'common/utils';
import { LevelInfoMap } from 'common/level';
import RectClipGroup from './RectClipGroup';
import { AxisLeft } from './Axis';
import BoxedAnnotation from './BoxedAnnotation';
import ChartContainer from './ChartContainer';
import ZoneAnnotation from './ZoneAnnotation';
import ZoneLinePath from './ZoneLinePath';
import Tooltip from './Tooltip';
import * as TooltipStyle from './Tooltip.style';
import * as Style from './Charts.style';
import {
  getChartRegions,
  computeTickPositions,
  last,
  getAxisLimits,
  getZoneByValue,
  getUtcScale,
} from './utils';
import { AxisBottom } from 'components/Charts/Axis';
import { getTimeAxisTicks } from 'components/Explore/utils';

type Point = Omit<Column, 'y'> & {
  y: number;
};

type ToolTipContent = {
  subtitle: string;
  body: string;
};

const getDate = (d: Point) => new Date(d.x);
const getY = (d: Point) => d.y;
const hasData = (d: any) => isDate(getDate(d)) && Number.isFinite(getY(d));

const ChartZones = ({
  width,
  height,
  columnData,
  zones,
  marginTop = 5,
  marginBottom = 40,
  marginLeft = 40,
  marginRight = 5,
  capY,
  getTooltipContent,
  getPointText,
}: {
  width: number;
  height: number;
  columnData: Point[];
  zones: LevelInfoMap;
  capY: number;
  getTooltipContent: (
    valueY: number,
  ) => { body: string; subtitle: string; width: string };
  getPointText: (valueY: number) => string;
  marginTop?: number;
  marginBottom?: number;
  marginLeft?: number;
  marginRight?: number;
}) => {
  const chartWidth = width - marginLeft - marginRight;
  const chartHeight = height - marginTop - marginBottom;

  const data: Point[] = columnData.filter(hasData);
  const dates: Date[] = columnData.map(getDate).filter(isDate);

  const minDate = d3min(dates);
  const maxDate = new Date();
  assert(minDate !== undefined, 'Data must not be empty');

  const xScale = getUtcScale(minDate, maxDate, 0, chartWidth);
  const [startDate, endDate] = xScale.domain();
  const dateTicks = getTimeAxisTicks(startDate, endDate);

  const yDataMin = 0;
  const yDataMax = d3max(data, getY);
  assert(yDataMax !== undefined, 'Data must not be empty');
  const [yAxisMin, yAxisMax] = getAxisLimits(yDataMin, yDataMax, zones);
  const yMax = Math.min(capY, yAxisMax);

  const yScale = scaleLinear({
    domain: [yAxisMin, yMax],
    range: [chartHeight, 0],
  });

  const getXCoord = (d: Point) => xScale(getDate(d));
  const getYCoord = (d: Point) => yScale(Math.min(getY(d), capY));

  const regions = getChartRegions(yAxisMin, yMax, zones);
  const yTicks = computeTickPositions(yAxisMin, yMax, zones);

  const lastPoint = last(data);
  const lastPointY = getY(lastPoint);
  const lastPointZone = getZoneByValue(lastPointY, zones);

  const renderMarker = (d: Point) => (
    <Style.CircleMarker
      cx={getXCoord(d)}
      cy={getYCoord(d)}
      r={6}
      fill={getZoneByValue(getY(d), zones).color}
    />
  );

  const renderTooltip = (d: Point) => (
    <Tooltip
      top={marginTop + getYCoord(d)}
      left={marginLeft + getXCoord(d)}
      title={formatUtcDate(getDate(d), 'MMM D, YYYY')}
      subtitle={getTooltipContent(getY(d)).subtitle}
      width={getTooltipContent(getY(d)).width}
    >
      <TooltipStyle.Body>{getTooltipContent(getY(d)).body}</TooltipStyle.Body>
    </Tooltip>
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
      <RectClipGroup width={chartWidth} height={chartHeight}>
        {regions.map((region, i) => (
          <Group key={`chart-region-${i}`}>
            <Style.SeriesLine stroke={region.color}>
              <ZoneLinePath<Point>
                data={data}
                x={getXCoord}
                y={getYCoord}
                region={region}
                width={chartWidth}
                yScale={yScale}
                curve={curveLinear}
              />
            </Style.SeriesLine>
            <ZoneAnnotation
              color={region.color}
              name={region.name}
              isActive={
                lastPointZone.name === region.name && region.name !== ''
              }
              x={chartWidth - 10}
              y={yScale(0.5 * (region.valueFrom + region.valueTo))}
            />
          </Group>
        ))}
      </RectClipGroup>
      <Style.LineGrid>
        <GridRows width={chartWidth} scale={yScale} tickValues={yTicks} />
      </Style.LineGrid>
      <Style.TextAnnotation>
        <BoxedAnnotation
          x={getXCoord(lastPoint)}
          y={getYCoord(lastPoint) - 15}
          text={getPointText(lastPointY)}
        />
      </Style.TextAnnotation>
      <AxisBottom
        innerHeight={chartHeight}
        scale={xScale}
        tickValues={dateTicks}
      />
      {/* <AxisBottom top={chartHeight} scale={xScale} /> */}
      <AxisLeft
        scale={yScale}
        tickValues={yTicks}
        hideAxisLine
        hideTicks
        hideZero
        tickFormat={(num: number) => formatPercent(num, 0)}
      />
    </ChartContainer>
  );
};

const ChartZoneAutosize = ({
  columnData,
  zones,
  capY,
  getTooltipContent,
  getPointText,
  height = 400,
}: {
  columnData: Point[];
  zones: LevelInfoMap;
  capY: number;
  getTooltipContent: (
    valueY: number,
  ) => { body: string; subtitle: string; width: string };
  getPointText: (valueY: number) => string;
  height?: number;
}) => (
  <Style.ChartContainer>
    <ParentSize>
      {({ width }) => (
        <ChartZones
          width={width}
          height={height}
          columnData={columnData}
          zones={zones}
          capY={capY}
          getTooltipContent={getTooltipContent}
          getPointText={getPointText}
        />
      )}
    </ParentSize>
  </Style.ChartContainer>
);

export default ChartZoneAutosize;
