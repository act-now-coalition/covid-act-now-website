import React, { useCallback, Fragment } from 'react';
import moment from 'moment';
import { isNumber } from 'lodash';
import { AxisLeft, AxisBottom } from '@vx/axis';
import { GridRows, GridColumns } from '@vx/grid';
import { Group } from '@vx/group';
import { scaleTime, scaleLinear } from '@vx/scale';
import { useTooltip } from '@vx/tooltip';
import { formatDecimal } from 'common/utils';
import { Column } from 'common/models/Projection';
import * as ChartStyle from 'components/Charts/Charts.style';
import { Tooltip, RectClipGroup } from 'components/Charts';
import { Series } from './interfaces';
import ChartSeries, { SeriesMarker } from './SeriesChart';
import { getMaxBy, getTimeAxisTicks, weeksAgo } from './utils';
import * as Styles from './Explore.style';
import { COLOR_MAP } from 'common/colors';
import { ScreenshotReady } from 'components/Screenshot';
import TodayMarker from './TodayMarker';
import SeriesTooltipOverlay, { HoverPointInfo } from './SeriesTooltipOverlay';
import { Line } from '@vx/shape';

const getDate = (d: Column) => new Date(d.x);
const getY = (d: Column) => d.y;
const daysBetween = (dateFrom: Date, dateTo: Date) =>
  moment(dateTo).diff(dateFrom, 'days');

// TODO: Move to its own component
const DateMarker: React.FC<{ left: number; date: Date }> = ({ left, date }) => {
  // Do not show the date marker for dates in the future
  return new Date() < date ? null : (
    <Styles.DateMarker style={{ left }}>
      {weeksAgo(date, new Date())}
    </Styles.DateMarker>
  );
};

function getSeriesOpacity(
  currentSeriesIndex: number,
  tooltipOpen: boolean,
  tooltipData?: HoverPointInfo,
) {
  if (tooltipOpen && tooltipData) {
    return tooltipData.seriesIndex === currentSeriesIndex ? 1 : 0.3;
  } else {
    return 1;
  }
}

const PointTooltip: React.FC<{
  top: number;
  left: number;
  series: Series[];
  pointInfo: HoverPointInfo;
}> = ({ top, left, series, pointInfo }) => {
  const { seriesIndex } = pointInfo;
  const currentSeries = isNumber(seriesIndex) ? series[seriesIndex] : null;
  return (
    <Tooltip
      width={'180px'}
      top={top}
      left={left}
      title={moment(pointInfo.x).format('MMM D, YYYY')}
    >
      <Styles.TooltipSubtitle>
        {currentSeries && currentSeries.tooltipLabel}
      </Styles.TooltipSubtitle>
      <Styles.TooltipMetric>
        {isNumber(pointInfo.y) ? formatDecimal(pointInfo.y, 1) : '-'}
      </Styles.TooltipMetric>
      <Styles.TooltipLocation>
        {currentSeries && `in ${currentSeries.label}`}
      </Styles.TooltipLocation>
    </Tooltip>
  );
};

const HoverDataMarker: React.FC<{
  series: Series[];
  pointInfo: HoverPointInfo;
  x: (p: Column) => number;
  y: (p: Column) => number;
  height: number;
}> = ({ series, pointInfo, height, x, y }) => {
  const { seriesIndex, pointIndex } = pointInfo;
  const currentSeries = isNumber(seriesIndex) ? series[seriesIndex] : null;
  const currentPoint =
    isNumber(pointIndex) && currentSeries
      ? currentSeries.data[pointIndex]
      : null;
  const x0 = x(pointInfo);
  return (
    <Fragment>
      <Styles.TrackerLine>
        <Line x1={x0} x2={x0} y1={0} y2={height} />
      </Styles.TrackerLine>
      {currentSeries && currentPoint && (
        <SeriesMarker
          key="series-marker"
          type={currentSeries.type}
          data={[currentPoint]}
          x={x}
          y={y}
          date={new Date(currentPoint.x)}
          yMax={height}
          barWidth={0}
          barOpacityHover={0}
          params={{ fill: currentSeries?.params?.fill }}
        />
      )}
    </Fragment>
  );
};

const ExploreChart: React.FC<{
  width: number;
  height: number;
  series: Series[];
  isMobile: boolean;
  tooltipSubtext?: string;
  marginTop?: number;
  marginBottom?: number;
  marginLeft?: number;
  marginRight?: number;
  barOpacity?: number;
  barOpacityHover?: number;
}> = ({
  width,
  height,
  series,
  isMobile,
  tooltipSubtext = '',
  marginTop = 10,
  marginBottom = 30,
  marginLeft = 60,
  marginRight = 100,
  barOpacity,
  barOpacityHover,
}) => {
  const dateFrom = new Date('2020-03-01');
  const today = new Date();
  const dateTo = today;
  const numDays = daysBetween(dateFrom, dateTo);
  const maxY = getMaxBy<number>(series, getY, 1);

  const innerWidth = width - marginLeft - marginRight;
  const innerHeight = height - marginTop - marginBottom;

  const dateScale = scaleTime({
    domain: [dateFrom, dateTo],
    range: [0, innerWidth],
  });
  const timeTicks = getTimeAxisTicks(dateFrom, dateTo);
  // We remove the last tick to make room for the Today marker
  const xTicks = timeTicks.slice(0, timeTicks.length - 1);
  const timeTickFormat = isMobile ? 'MMM' : 'MMMM D';
  const xTickFormat = (date: Date) => moment(date).format(timeTickFormat);
  const barWidth = 0.8 * (innerWidth / numDays);

  const yScale = scaleLinear({
    domain: [0, maxY],
    range: [innerHeight, 0],
  });

  const { tooltipOpen, tooltipData, hideTooltip, showTooltip } = useTooltip<
    HoverPointInfo
  >();

  const onMouseOver = useCallback(
    (pointInfo: HoverPointInfo) => {
      showTooltip({ tooltipData: pointInfo });
    },
    [showTooltip],
  );

  const getXPosition = (d: Column) => dateScale(getDate(d)) || 0;
  const getYPosition = (d: Column) => yScale(getY(d));

  // Note(Chelsi): !barOpacity makes sure change isn't applied to share image chart:
  const axisGridColor = !barOpacity ? `${COLOR_MAP.GRAY_EXPLORE_CHART}` : '';

  return (
    <Styles.PositionRelative style={{ height }}>
      <svg width={width} height={height}>
        <Group key="chart-container" top={marginTop} left={marginLeft}>
          <ChartStyle.LineGrid exploreStroke={axisGridColor}>
            <GridColumns<Date> scale={dateScale} height={innerHeight} />
            <GridRows<number> scale={yScale} width={innerWidth} />
          </ChartStyle.LineGrid>
          <RectClipGroup width={innerWidth} height={innerHeight}>
            {series.map(({ label, data, type, params }, i) => {
              const seriesParams = {
                ...params,
                strokeOpacity: getSeriesOpacity(i, tooltipOpen, tooltipData),
              };
              return (
                <ChartSeries
                  key={`series-chart-${label}`}
                  data={data}
                  x={getXPosition}
                  y={getYPosition}
                  type={type}
                  yMax={innerHeight}
                  barWidth={barWidth}
                  barOpacity={barOpacity}
                  params={seriesParams}
                />
              );
            })}
          </RectClipGroup>
          <TodayMarker
            height={innerHeight}
            dateScale={dateScale}
            strokeColor={axisGridColor}
          />
          {tooltipOpen && tooltipData && (
            <HoverDataMarker
              series={series}
              pointInfo={tooltipData}
              x={getXPosition}
              y={getYPosition}
              height={innerHeight}
            />
          )}
          <SeriesTooltipOverlay
            series={series}
            width={innerWidth}
            height={innerHeight}
            x={getXPosition}
            y={getYPosition}
            onMouseOver={onMouseOver}
            onMouseOut={hideTooltip}
          />
          {series.map(({ label, data, params }, i) => {
            return (
              <Styles.LineLabel
                key={`label-${label}`}
                x={innerWidth}
                y={getYPosition(data[data.length - 1])}
                fill={params?.stroke || '#000'}
                fillOpacity={getSeriesOpacity(i, tooltipOpen, tooltipData)}
              >
                {label}
              </Styles.LineLabel>
            );
          })}
          <ChartStyle.Axis exploreStroke={axisGridColor}>
            <AxisLeft scale={yScale} />
            <AxisBottom
              top={innerHeight}
              scale={dateScale}
              tickValues={xTicks}
              tickFormat={xTickFormat}
            />
          </ChartStyle.Axis>
        </Group>
      </svg>
      {width > 0 && <ScreenshotReady />}
      {tooltipOpen && tooltipData && (
        <Fragment>
          <PointTooltip
            series={series}
            pointInfo={tooltipData}
            left={getXPosition(tooltipData) + marginLeft}
            top={getYPosition(tooltipData) + marginTop}
          />
          <DateMarker
            left={getXPosition(tooltipData) + marginLeft}
            date={new Date(tooltipData.x)}
          />
        </Fragment>
      )}
    </Styles.PositionRelative>
  );
};

export default ExploreChart;
