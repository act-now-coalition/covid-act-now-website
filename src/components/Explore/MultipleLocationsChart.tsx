import React, { useCallback, Fragment } from 'react';
import moment from 'moment';
import { isNumber } from 'lodash';
import { Group } from '@vx/group';
import { scaleTime, scaleLinear } from '@vx/scale';
import { useTooltip } from '@vx/tooltip';
import { formatDecimal } from 'common/utils';
import { Column } from 'common/models/Projection';
import { Tooltip, RectClipGroup } from 'components/Charts';
import { Series } from './interfaces';
import ChartSeries, { SeriesMarker } from './SeriesChart';
import { getMaxBy } from './utils';
import * as Styles from './Explore.style';
import { COLOR_MAP } from 'common/colors';
import { ScreenshotReady } from 'components/Screenshot';
import TodayMarker from './TodayMarker';
import SeriesTooltipOverlay, { HoverPointInfo } from './SeriesTooltipOverlay';
import { Line } from '@vx/shape';
import DateMarker from './DateMarker';
import GridLines from './GridLines';
import Axes from './Axes';

const getDate = (d: Column) => new Date(d.x);
const getY = (d: Column) => d.y;

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

const MultipleLocationsTooltip: React.FC<{
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
  marginTop?: number;
  marginBottom?: number;
  marginLeft?: number;
  marginRight?: number;
  barOpacity?: number;
}> = ({
  width,
  height,
  series,
  isMobile,
  marginTop = 10,
  marginBottom = 30,
  marginLeft = 60,
  marginRight = 100,
  barOpacity,
}) => {
  const dateFrom = new Date('2020-03-01');
  const dateTo = new Date();
  const maxY = getMaxBy<number>(series, getY, 1);

  const innerWidth = width - marginLeft - marginRight;
  const innerHeight = height - marginTop - marginBottom;

  const dateScale = scaleTime({
    domain: [dateFrom, dateTo],
    range: [0, innerWidth],
  });

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
          <GridLines
            width={innerWidth}
            height={innerHeight}
            strokeColor={axisGridColor}
            dateScale={dateScale}
            yScale={yScale}
          />
          <Axes
            height={innerHeight}
            dateScale={dateScale}
            yScale={yScale}
            isMobile={isMobile}
            strokeColor={axisGridColor}
          />
          <TodayMarker
            height={innerHeight}
            dateScale={dateScale}
            strokeColor={axisGridColor}
          />
          {series.map(({ label, data, params }, i) =>
            data.length > 0 ? (
              <Styles.LineLabel
                key={`label-${label}`}
                x={innerWidth + 5}
                y={getYPosition(data[data.length - 1])}
                fill={params?.stroke || '#000'}
                fillOpacity={getSeriesOpacity(i, tooltipOpen, tooltipData)}
              >
                {label}
              </Styles.LineLabel>
            ) : null,
          )}
          <RectClipGroup width={innerWidth} height={innerHeight}>
            {series.map(({ label, data, type, params }, i) => (
              <ChartSeries
                key={`series-chart-${label}`}
                data={data}
                x={getXPosition}
                y={getYPosition}
                type={type}
                yMax={innerHeight}
                barWidth={0}
                barOpacity={0}
                params={{
                  ...params,
                  strokeOpacity: getSeriesOpacity(i, tooltipOpen, tooltipData),
                }}
              />
            ))}
          </RectClipGroup>
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
        </Group>
      </svg>
      {width > 0 && <ScreenshotReady />}
      {tooltipOpen && tooltipData && (
        <Fragment>
          <MultipleLocationsTooltip
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
