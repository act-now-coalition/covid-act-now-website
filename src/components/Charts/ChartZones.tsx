import React from 'react';
import moment from 'moment';
import { isDate } from 'lodash';
import { min as d3min, max as d3max } from 'd3-array';
import { AxisBottom, AxisLeft } from '@vx/axis';
import { curveLinear } from '@vx/curve';
import { GridRows } from '@vx/grid';
import { Group } from '@vx/group';
import { ParentSize } from '@vx/responsive';
import { scaleLinear, scaleTime } from '@vx/scale';
import { Column } from 'common/models/Projection';
import { LevelInfoMap } from 'common/level';
import RectClipGroup from './RectClipGroup';
import BoxedAnnotation from './BoxedAnnotation';
import ZoneAnnotation from './ZoneAnnotation';
import ZoneLinePath from './ZoneLinePath';
import ChartContainer from './ChartContainer';
import Tooltip from './Tooltip';
import * as Style from './Charts.style';
import {
  getChartRegions,
  computeTickPositions,
  last,
  formatPercent,
  getZoneByValue,
  getAxisLimits,
  formatDate,
} from './utils';

type Point = Omit<Column, 'y'> & {
  y: number;
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
  getTooltipBody,
  getPointText,
}: {
  width: number;
  height: number;
  columnData: Point[];
  zones: LevelInfoMap;
  capY: number;
  getTooltipBody: (valueY: number) => string;
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

  const minDate = d3min(dates) || new Date('2020-01-01');
  const maxDate = moment().add(2, 'weeks').toDate();

  const xScale = scaleTime({
    domain: [minDate, maxDate],
    range: [0, chartWidth],
  });

  const yDataMin = 0;
  const yDataMax = d3max(data, getY) || 1;
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
      title={formatDate(getDate(d))}
    >
      {getTooltipBody(getY(d))}
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
              isActive={lastPointZone.name === region.name}
              x={xScale(maxDate) - 10}
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
          x={getXCoord(lastPoint) + 30}
          y={getYCoord(lastPoint)}
          text={getPointText(lastPointY)}
        />
      </Style.TextAnnotation>
      <Style.Axis>
        <AxisBottom
          top={chartHeight}
          scale={xScale}
          numTicks={Math.round(chartWidth / 100)}
        />
      </Style.Axis>
      <Style.Axis>
        <AxisLeft
          top={marginTop}
          scale={yScale}
          tickValues={yTicks}
          hideAxisLine
          hideTicks
          hideZero
          tickFormat={(num: number) => formatPercent(num, 0)}
        />
      </Style.Axis>
    </ChartContainer>
  );
};

const ChartZoneAutosize = ({
  columnData,
  zones,
  capY,
  getTooltipBody,
  getPointText,
  height = 400,
}: {
  columnData: Point[];
  zones: LevelInfoMap;
  capY: number;
  getTooltipBody: (valueY: number) => string;
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
          getTooltipBody={getTooltipBody}
          getPointText={getPointText}
        />
      )}
    </ParentSize>
  </Style.ChartContainer>
);

export default ChartZoneAutosize;
