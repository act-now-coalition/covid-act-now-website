import React from 'react';
import moment from 'moment';
import { isUndefined } from 'lodash';
import { min as d3min, max as d3max } from 'd3-array';
import { Group } from '@vx/group';
import { ParentSize } from '@vx/responsive';
import { scaleLinear, scaleTime } from '@vx/scale';
import { GridRows } from '@vx/grid';
import { curveNatural } from '@vx/curve';
import { AxisBottom, AxisLeft } from '@vx/axis';
import { LinePath, Area } from '@vx/shape';
import { useTooltip } from '@vx/tooltip';
import { localPoint } from '@vx/event';
import { LevelInfoMap, Level } from 'common/level';
import { Column, RtRange, RT_TRUNCATION_DAYS } from 'common/models/Projection';
import { CASE_GROWTH_RATE_LEVEL_INFO_MAP } from 'common/metrics/case_growth';
import BoxedAnnotation from './BoxedAnnotation';
import HoverOverlay from './HoverOverlay';
import RectClipGroup from './RectClipGroup';
import {
  formatDecimal,
  getChartRegions,
  getTruncationDate,
  getZoneByValue,
  last,
} from './utils';
import * as Style from './Charts.style';

type PointRt = Omit<Column, 'y'> & {
  y: RtRange;
};

const computeTickPositions = (
  minY: number,
  maxY: number,
  zones: LevelInfoMap,
) => {
  const maxZones = zones[Level.MEDIUM].upperLimit;
  const maxTick = maxY < maxZones ? 1.5 * maxZones : maxY;
  return [
    minY,
    zones[Level.LOW].upperLimit,
    zones[Level.MEDIUM].upperLimit,
    maxTick,
  ];
};

const getDate = (d: PointRt) => new Date(d.x);
const getRt = (d: PointRt) => d?.y?.rt;
const getYAreaHigh = (d: PointRt) => d?.y?.high;
const getYAreaLow = (d: PointRt) => d?.y?.low;

const hasData = (d: any) =>
  !isUndefined(getDate(d)) &&
  !isUndefined(getRt(d)) &&
  !isUndefined(getYAreaLow(d)) &&
  !isUndefined(getYAreaHigh(d));

const getTooltipTitle = (d: PointRt): string =>
  moment(getDate(d)).format('dddd, MMM D, YYYY');

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

  const minDate = d3min(data, getDate) || new Date('2020-01-01');
  const maxDate = moment().add(2, 'weeks').toDate();

  const yDataMin = 0;
  const yDataMax = d3max(data, getRt) || 1;

  const xScale = scaleTime({
    domain: [minDate, maxDate],
    range: [0, chartWidth],
  });

  const yScale = scaleLinear({
    domain: [yDataMin, yDataMax],
    range: [chartHeight, 0],
  });

  const getXCoord = (d: PointRt) => xScale(getDate(d));
  const getYCoord = (d: PointRt) => yScale(getRt(d));

  const yTicks = computeTickPositions(
    yDataMin,
    yDataMax,
    CASE_GROWTH_RATE_LEVEL_INFO_MAP,
  );
  const regions = getChartRegions(
    yDataMin,
    yDataMax,
    CASE_GROWTH_RATE_LEVEL_INFO_MAP,
  );

  const lastValidDate = getDate(last(data));

  const truncationDate = getTruncationDate(lastValidDate, RT_TRUNCATION_DAYS);
  const prevData = data.filter((d: PointRt) => getDate(d) <= truncationDate);
  const restData = data.filter((d: PointRt) => getDate(d) >= truncationDate);
  const truncationPoint = last(prevData);
  const truncationRt = getRt(truncationPoint);
  const yTruncationRt = yScale(truncationRt);
  const truncationZone = getZoneByValue(
    truncationRt,
    CASE_GROWTH_RATE_LEVEL_INFO_MAP,
  );

  const { tooltipData, tooltipOpen, showTooltip, hideTooltip } = useTooltip<
    PointRt
  >();

  const onMouseOver = (
    event: React.MouseEvent<SVGPathElement, MouseEvent>,
    d: PointRt,
  ) => {
    // @ts-ignore - typing bug
    const coords = localPoint(event.target.ownerSVGElement, event);
    if (!coords) return;
    showTooltip({
      tooltipLeft: coords.x,
      tooltipTop: coords.y,
      tooltipData: d,
    });
  };

  const getTooltipBody = (d: PointRt): string => {
    const Rt = formatDecimal(getRt(d));
    return getDate(d) < truncationDate ? `Rt ${Rt}` : `Rt ${Rt} (preliminary)`;
  };

  return (
    <Style.PositionRelative>
      <svg width={width} height={height}>
        <Group left={marginLeft} top={marginTop}>
          <RectClipGroup width={chartWidth} height={chartHeight}>
            <Style.SeriesArea>
              <Area
                data={data}
                x={getXCoord}
                y0={(d: PointRt) => yScale(getYAreaLow(d))}
                y1={(d: PointRt) => yScale(getYAreaHigh(d))}
                curve={curveNatural}
              />
            </Style.SeriesArea>
            {regions.map((region, i) => (
              <Group key={`chart-region-${i}`}>
                <RectClipGroup
                  y={yScale(region.valueTo)}
                  width={chartWidth}
                  height={yScale(region.valueFrom) - yScale(region.valueTo)}
                >
                  <Style.SeriesLine stroke={region.color}>
                    <LinePath
                      data={prevData}
                      x={getXCoord}
                      y={getYCoord}
                      curve={curveNatural}
                    />
                  </Style.SeriesLine>
                  <Style.SeriesDashed stroke={region.color}>
                    <LinePath
                      data={restData}
                      x={getXCoord}
                      y={getYCoord}
                      curve={curveNatural}
                    />
                  </Style.SeriesDashed>
                </RectClipGroup>
                <Style.RegionAnnotation
                  color={region.color}
                  isActive={truncationZone.name === region.name}
                >
                  <BoxedAnnotation
                    x={xScale(maxDate) - 10}
                    y={yScale(0.5 * (region.valueFrom + region.valueTo))}
                    text={region.name}
                  />
                </Style.RegionAnnotation>
              </Group>
            ))}
          </RectClipGroup>
          <Style.LineGrid>
            <GridRows width={chartWidth} scale={yScale} tickValues={yTicks} />
          </Style.LineGrid>
          {/* R(t) value and marker, adjusts the position if the text is too close to the top */}
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
          {tooltipOpen && tooltipData && (
            <Style.CircleMarker
              cx={getXCoord(tooltipData)}
              cy={getYCoord(tooltipData)}
              r={6}
              fill={
                getZoneByValue(
                  getRt(tooltipData),
                  CASE_GROWTH_RATE_LEVEL_INFO_MAP,
                ).color
              }
            />
          )}
          <HoverOverlay
            width={chartWidth}
            height={chartHeight}
            data={data}
            x={getXCoord}
            y={getYCoord}
            onMouseOver={onMouseOver}
            onMouseOut={hideTooltip}
          />
        </Group>
      </svg>
      {tooltipOpen && tooltipData && (
        <Style.Tooltip
          style={{
            top: marginTop + getYCoord(tooltipData),
            left: marginLeft + getXCoord(tooltipData),
          }}
        >
          <Style.TooltipTitle>
            {getTooltipTitle(tooltipData)}
          </Style.TooltipTitle>
          <div>{getTooltipBody(tooltipData)}</div>
        </Style.Tooltip>
      )}
    </Style.PositionRelative>
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
      {({ width }) => {
        return (
          <ChartRt
            width={width}
            height={height}
            marginLeft={48}
            columnData={columnData}
          />
        );
      }}
    </ParentSize>
  </Style.ChartContainer>
);

export default ChartRtAutosize;
