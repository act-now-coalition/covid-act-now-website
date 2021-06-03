import React, { useCallback, Fragment } from 'react';
import isNumber from 'lodash/isNumber';
import last from 'lodash/last';
import min from 'lodash/min';
import sortBy from 'lodash/sortBy';
import isFinite from 'lodash/isFinite';
import { Group } from '@vx/group';
import { scaleUtc, scaleLinear } from '@vx/scale';
import { useTooltip } from '@vx/tooltip';
import { Column } from 'common/models/Projection';
import { Tooltip, RectClipGroup } from 'components/Charts';
import { Series } from './interfaces';
import ChartSeries, { SeriesMarker } from './SeriesChart';
import { getSeriesLabel, getMaxY } from './utils';
import * as Styles from './Explore.style';
import { ScreenshotReady } from 'components/Screenshot';
import SeriesTooltipOverlay, { HoverPointInfo } from './SeriesTooltipOverlay';
import { Line } from '@vx/shape';
import DateMarker from './DateMarker';
import GridLines from './GridLines';
import Axes from './Axes';
import {
  getColumnDate,
  formatTooltipColumnDate,
} from 'components/Charts/utils';
import { TimeUnit } from 'common/utils/time-utils';

interface LabelInfo {
  x: number;
  y: number;
  label: string;
  stroke: string;
}

const getY = (d: Column) => d.y;

function getSeriesOpacity(
  currentSeriesIndex: number,
  tooltipOpen: boolean,
  tooltipData?: HoverPointInfo,
) {
  return tooltipOpen &&
    tooltipData &&
    tooltipData.seriesIndex !== currentSeriesIndex
    ? 0.3
    : 1;
}

export const MultipleLocationsTooltip: React.FC<{
  top: number;
  left: number;
  seriesList: Series[];
  pointInfo: HoverPointInfo;
  yTooltipFormat: (val: number) => string;
}> = ({ top, left, seriesList: series, pointInfo, yTooltipFormat }) => {
  const { seriesIndex } = pointInfo;
  const currentSeries = isNumber(seriesIndex) ? series[seriesIndex] : null;
  return (
    <Tooltip
      width={'210px'}
      top={top}
      left={left}
      title={formatTooltipColumnDate(pointInfo)}
    >
      <Styles.TooltipSubtitle>
        {currentSeries && currentSeries.tooltipLabel}
      </Styles.TooltipSubtitle>
      <Styles.TooltipMetric>
        {isNumber(pointInfo.y) ? yTooltipFormat(pointInfo.y) : '-'}
      </Styles.TooltipMetric>
      <Styles.TooltipLocation>
        {currentSeries && `in ${currentSeries.label}`}
      </Styles.TooltipLocation>
    </Tooltip>
  );
};

const HoverDataMarker: React.FC<{
  seriesList: Series[];
  pointInfo: HoverPointInfo;
  x: (p: Column) => number;
  y: (p: Column) => number;
  height: number;
}> = ({ seriesList, pointInfo, height, x, y }) => {
  const { seriesIndex, pointIndex } = pointInfo;
  const currentSeries = isNumber(seriesIndex) ? seriesList[seriesIndex] : null;
  const currentPoint =
    isNumber(pointIndex) && currentSeries
      ? currentSeries.data[pointIndex]
      : null;
  const x0 = x(pointInfo);
  return (
    <Fragment>
      <Styles.HoverTrackerLine>
        <Line x1={x0} x2={x0} y1={0} y2={height} />
      </Styles.HoverTrackerLine>
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

const MultipleLocationsChart: React.FC<{
  width: number;
  height: number;
  seriesList: Series[];
  isMobile: boolean;
  marginTop?: number;
  marginBottom?: number;
  marginLeft?: number;
  marginRight?: number;
  barOpacity?: number;
  isMobileXs?: boolean;
  dateRange: Date[];
  yTickFormat: (val: number) => string;
  yTooltipFormat: (val: number) => string;
  xTickTimeUnit: TimeUnit;
  maxYFromDefinition: number | null;
}> = ({
  width,
  height,
  seriesList: unsortedSeriesList,
  isMobile,
  marginTop = 10,
  marginBottom = 30,
  marginLeft = 60,
  marginRight = 100,
  barOpacity,
  isMobileXs = false,
  dateRange,
  yTickFormat,
  yTooltipFormat,
  xTickTimeUnit,
  maxYFromDefinition,
}) => {
  const seriesList = sortSeriesByLast(unsortedSeriesList).filter(
    series => series.data.length > 0,
  );

  const [dateFrom, dateTo] = dateRange;

  const maxY = isFinite(maxYFromDefinition)
    ? maxYFromDefinition
    : getMaxY(seriesList, dateFrom, dateTo);

  const innerWidth = width - marginLeft - marginRight;
  const innerHeight = height - marginTop - marginBottom;

  const dateScale = scaleUtc({
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

  const getXPosition = (d: Column) => dateScale(getColumnDate(d)) || 0;
  const getYPosition = (d: Column) => yScale(getY(d));

  const minTooltipDate = dateScale.invert(0);

  const onMouseOver = useCallback(
    (pointInfo: HoverPointInfo) => {
      /* Makes sure we only render a tooltip for dates that fall within the selected time range: */
      if (minTooltipDate > new Date(pointInfo.x)) {
        return;
      }
      showTooltip({ tooltipData: pointInfo });
    },
    [showTooltip, minTooltipDate],
  );

  const seriesLabels = formatCurrentValueLabels(
    seriesList,
    (p: Column) => innerWidth + 5,
    getYPosition,
    height,
  );

  return (
    <Styles.PositionRelative style={{ height }}>
      <svg width={width} height={height}>
        <Group key="chart-container" top={marginTop} left={marginLeft}>
          <GridLines
            width={innerWidth}
            height={innerHeight}
            dateScale={dateScale}
            yScale={yScale}
            numTicksRows={5}
          />
          <Axes
            height={innerHeight}
            dateScale={dateScale}
            yScale={yScale}
            isMobile={isMobile}
            yNumTicks={5}
            yTickFormat={yTickFormat}
            xTickTimeUnit={xTickTimeUnit}
          />
          {seriesLabels.map((label, i) => (
            <Styles.LineLabel
              key={`label-${label.label}`}
              x={label.x}
              y={label.y}
              fill={label.stroke}
              fillOpacity={getSeriesOpacity(i, tooltipOpen, tooltipData)}
            >
              {getSeriesLabel(seriesList[i], isMobileXs)}
            </Styles.LineLabel>
          ))}

          <RectClipGroup width={innerWidth} height={innerHeight}>
            {seriesList.map(({ label, data, type, params }, i) => (
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
              seriesList={seriesList}
              pointInfo={tooltipData}
              x={getXPosition}
              y={getYPosition}
              height={innerHeight}
            />
          )}
          <SeriesTooltipOverlay
            seriesList={seriesList}
            width={innerWidth}
            height={innerHeight}
            x={getXPosition}
            y={getYPosition}
            onMouseOver={onMouseOver}
            onMouseOut={hideTooltip}
          />
        </Group>
      </svg>
      {width > 0 && seriesList.length > 0 && <ScreenshotReady />}
      {tooltipOpen && tooltipData && (
        <Fragment>
          <MultipleLocationsTooltip
            seriesList={seriesList}
            pointInfo={tooltipData}
            left={getXPosition(tooltipData) + marginLeft}
            top={getYPosition(tooltipData) + marginTop}
            yTooltipFormat={yTooltipFormat}
          />
          <DateMarker
            left={getXPosition(tooltipData) + marginLeft}
            seriesList={seriesList}
            date={new Date(tooltipData.x)}
          />
        </Fragment>
      )}
    </Styles.PositionRelative>
  );
};

function formatCurrentValueLabels(
  seriesList: Series[],
  getXPosition: (p: Column) => number,
  getYPosition: (p: Column) => number,
  height: number,
): LabelInfo[] {
  return seriesList.reduce((labelInfoList: LabelInfo[], currSeries: Series) => {
    const lastPoint = last(currSeries.data);
    const currMinY = min(labelInfoList.map(info => info.y)) || height;
    return [
      ...labelInfoList,
      {
        x: lastPoint?.x != null ? getXPosition(lastPoint) : 0,
        y:
          lastPoint?.y != null
            ? Math.min(getYPosition(lastPoint), currMinY - 14)
            : 0,
        label: currSeries.shortLabel,
        stroke: currSeries.params?.stroke || '#000',
      },
    ];
  }, []);
}

function sortSeriesByLast(seriesList: Series[]) {
  return sortBy(seriesList, series => {
    const lastPoint = last(series.data);
    return lastPoint?.y || 0;
  });
}
export default MultipleLocationsChart;
