import React from 'react';
import moment from 'moment';
import { isDate } from 'lodash';
import { min as d3min, max as d3max } from 'd3-array';
import { AxisBottom, AxisLeft } from '@vx/axis';
import { curveNatural } from '@vx/curve';
import { GridRows } from '@vx/grid';
import { Group } from '@vx/group';
import { ParentSize } from '@vx/responsive';
import { scaleLinear, scaleTime } from '@vx/scale';
import { Area } from '@vx/shape';
import { Column, RtRange, RT_TRUNCATION_DAYS } from 'common/models/Projection';
import { CASE_GROWTH_RATE_LEVEL_INFO_MAP as zones } from 'common/metrics/case_growth';
import BoxedAnnotation from './BoxedAnnotation';
import RectClipGroup from './RectClipGroup';
import ZoneAnnotation from './ZoneAnnotation';
import ZoneLinePath from './ZoneLinePath';
import ChartContainer from './ChartContainer';
import Tooltip from './Tooltip';
import * as Style from './Charts.style';
import {
  computeTickPositions,
  formatDecimal,
  getChartRegions,
  getTruncationDate,
  getZoneByValue,
  last,
  getAxisLimits,
  formatDate,
} from './utils';

type PointRt = Omit<Column, 'y'> & {
  y: RtRange;
};

const getDate = (d: PointRt) => new Date(d.x);
const getRt = (d: PointRt) => d?.y?.rt;
const getYAreaHigh = (d: PointRt) => d?.y?.high;
const getYAreaLow = (d: PointRt) => d?.y?.low;

const hasData = (d: any) =>
  isDate(getDate(d)) &&
  Number.isFinite(getRt(d)) &&
  Number.isFinite(getYAreaLow(d)) &&
  Number.isFinite(getYAreaHigh(d));

const ChartRt = ({
  columnData,
  width,
  height = 400,
  marginTop = 5,
  marginBottom = 40,
  marginLeft = 40,
  marginRight = 5,
}: {
  columnData: Column[];
  width: number;
  height?: number;
  marginTop?: number;
  marginBottom?: number;
  marginLeft?: number;
  marginRight?: number;
}) => {
  const chartWidth = width - marginLeft - marginRight;
  const chartHeight = height - marginTop - marginBottom;

  const data: PointRt[] = columnData.filter(hasData);
  const dates: Date[] = columnData.map(getDate).filter(isDate);

  const minDate = d3min(dates) || new Date('2020-01-01');
  const maxDate = moment().add(2, 'weeks').toDate();

  const yDataMin = 0;
  const yDataMax = d3max(data, getRt) || 1;
  const [yAxisMin, yAxisMax] = getAxisLimits(yDataMin, yDataMax, zones);

  const xScale = scaleTime({
    domain: [minDate, maxDate],
    range: [0, chartWidth],
  });

  const yScale = scaleLinear({
    domain: [yAxisMin, yAxisMax],
    range: [chartHeight, 0],
  });

  const getXCoord = (d: PointRt) => xScale(getDate(d));
  const getYCoord = (d: PointRt) => yScale(getRt(d));

  const yTicks = computeTickPositions(yAxisMin, yAxisMax, zones);
  const regions = getChartRegions(yAxisMin, yAxisMax, zones);

  const lastValidDate = getDate(last(data));

  const truncationDate = getTruncationDate(lastValidDate, RT_TRUNCATION_DAYS);
  const prevData = data.filter((d: PointRt) => getDate(d) <= truncationDate);
  const restData = data.filter((d: PointRt) => getDate(d) >= truncationDate);
  const truncationPoint = last(prevData);
  const truncationRt = getRt(truncationPoint);
  const yTruncationRt = yScale(truncationRt);
  const truncationZone = getZoneByValue(truncationRt, zones);

  const renderTooltip = (d: PointRt) => (
    <Tooltip
      left={marginLeft + getXCoord(d)}
      top={marginTop + getYCoord(d)}
      title={formatDate(getDate(d))}
    >
      {`Rt ${formatDecimal(getRt(d), 2)}`}{' '}
      {getDate(d) < truncationDate ? '' : '(preliminary)'}
    </Tooltip>
  );

  const renderMarker = (d: PointRt) => (
    <Style.CircleMarker
      cx={getXCoord(d)}
      cy={getYCoord(d)}
      r={6}
      fill={getZoneByValue(getRt(d), zones).color}
    />
  );

  return (
    <ChartContainer<PointRt>
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
        <RectClipGroup width={chartWidth} height={chartHeight} topPadding={0}>
          <Style.SeriesArea>
            <Area
              data={data}
              x={getXCoord}
              y0={(d: PointRt) => yScale(getYAreaLow(d))}
              y1={(d: PointRt) => yScale(getYAreaHigh(d))}
              curve={curveNatural}
            />
          </Style.SeriesArea>
        </RectClipGroup>
        {regions.map((region, i) => (
          <Group key={`chart-region-${i}`}>
            <Style.SeriesLine stroke={region.color}>
              <ZoneLinePath<PointRt>
                data={prevData}
                x={getXCoord}
                y={getYCoord}
                region={region}
                width={chartWidth}
                yScale={yScale}
              />
            </Style.SeriesLine>
            <Style.SeriesDotted stroke={region.color}>
              <ZoneLinePath<PointRt>
                data={restData}
                x={getXCoord}
                y={getYCoord}
                region={region}
                width={chartWidth}
                yScale={yScale}
              />
            </Style.SeriesDotted>
            <ZoneAnnotation
              color={region.color}
              name={region.name}
              isActive={truncationZone.name === region.name}
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
          x={xScale(getDate(truncationPoint))}
          y={yTruncationRt < 60 ? yTruncationRt + 30 : yTruncationRt - 30}
          text={formatDecimal(truncationRt)}
        />
      </Style.TextAnnotation>
      <Style.CircleMarker
        cx={xScale(getDate(truncationPoint))}
        cy={yTruncationRt}
        r={6}
      />
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
        />
      </Style.Axis>
    </ChartContainer>
  );
};

const ChartRtAutosize = ({
  columnData,
  height = 400,
}: {
  columnData: Column[];
  height?: number;
}) => (
  <Style.ChartContainer>
    <ParentSize>
      {({ width }) => (
        <ChartRt
          width={width}
          height={height}
          marginLeft={48}
          columnData={columnData}
        />
      )}
    </ParentSize>
  </Style.ChartContainer>
);

export default ChartRtAutosize;
