import React from 'react';
import { isDate } from 'lodash';
import { min as d3min, max as d3max } from 'd3-array';
import { curveNatural } from '@vx/curve';
import { GridRows } from '@vx/grid';
import { Group } from '@vx/group';
import { ParentSize } from '@vx/responsive';
import { scaleLinear } from '@vx/scale';
import { Area } from '@vx/shape';
import { Column, RtRange, RT_TRUNCATION_DAYS } from 'common/models/Projection';
import { CASE_GROWTH_RATE_LEVEL_INFO_MAP as zones } from 'common/metrics/case_growth';
import { formatUtcDate, formatDecimal } from 'common/utils';
import { AxisBottom, AxisLeft } from './Axis';
import BoxedAnnotation from './BoxedAnnotation';
import ChartContainer from './ChartContainer';
import RectClipGroup from './RectClipGroup';
import ZoneAnnotation from './ZoneAnnotation';
import ZoneLinePath from './ZoneLinePath';
import Tooltip from './Tooltip';
import * as TooltipStyle from './Tooltip.style';
import * as Style from './Charts.style';
import {
  computeTickPositions,
  getChartRegions,
  getTruncationDate,
  getZoneByValue,
  last,
  getAxisLimits,
  getZonesTimeScale,
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
  const currDate = new Date();

  const yDataMin = 0;
  const yDataMax = d3max(data, getRt) || 1;
  const [yAxisMin, yAxisMax] = getAxisLimits(yDataMin, yDataMax, zones);

  const xScale = getZonesTimeScale(minDate, currDate, 0, chartWidth);

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

  const renderTooltip = (d: PointRt) => {
    const isConfirmed = getDate(d) < truncationDate;
    const rtLow = formatDecimal(getYAreaLow(d), 2);
    const rtHigh = formatDecimal(getYAreaHigh(d), 2);
    const rt = formatDecimal(getRt(d), 2);
    return (
      <Tooltip
        left={marginLeft + getXCoord(d)}
        top={marginTop + getYCoord(d)}
        title={formatUtcDate(getDate(d), 'MMM D, YYYY')}
        subtitle="Infection rate"
        subtext={isConfirmed ? undefined : 'Data might change'}
        width="150px"
      >
        <TooltipStyle.Body>
          {`${isConfirmed ? '' : '~'}${rt}`}
        </TooltipStyle.Body>
        <TooltipStyle.BodyMuted>{`90% CI  [${rtLow}, ${rtHigh}]`}</TooltipStyle.BodyMuted>
      </Tooltip>
    );
  };
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
      <AxisBottom top={chartHeight} scale={xScale} />
      <AxisLeft scale={yScale} tickValues={yTicks} />
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
