import React, { useCallback, Fragment } from 'react';
import isNumber from 'lodash/isNumber';
import isFinite from 'lodash/isFinite';
import { Group } from '@vx/group';
import { scaleUtc, scaleLinear } from '@vx/scale';
import { useTooltip } from '@vx/tooltip';
import { formatDecimal } from 'common/utils';
import { formatInteger } from '@actnowcoalition/number-format';
import { Column } from 'common/models/Projection';
import { Tooltip, RectClipGroup } from 'components/Charts';
import { Series } from './interfaces';
import ChartSeries, { SeriesMarker } from './SeriesChart';
import ChartOverlay from './ChartOverlay';
import { findPointByDate, getMaxY } from './utils';
import * as Styles from './Explore.style';
import { ScreenshotReady } from 'components/Screenshot';
import DateMarker from './DateMarker';
import GridLines from './GridLines';
import Axes from './Axes';
import {
  getColumnDate,
  formatTooltipColumnDate,
} from 'components/Charts/utils';
import { TimeUnit, getTimeDiff } from '@actnowcoalition/time-utils';

const getY = (d: Column) => d.y;
const daysBetween = (dateFrom: Date, dateTo: Date) =>
  getTimeDiff(dateTo, dateFrom, TimeUnit.DAYS);

const SingleSeriesTooltip: React.FC<{
  date: Date;
  series: Series;
  left: (d: Column) => number;
  top: (d: Column) => number;
  subtext: string;
  yTooltipFormat: (val: number) => string;
}> = ({ series, left, top, date, subtext, yTooltipFormat }) => {
  const point = findPointByDate(series.data, date);

  return point ? (
    <Tooltip
      width={'210px'}
      top={top(point)}
      left={left(point)}
      title={formatTooltipColumnDate(point)}
    >
      <Styles.TooltipSubtitle>{series.tooltipLabel}</Styles.TooltipSubtitle>
      <Styles.TooltipMetric>
        {isNumber(point.y) ? yTooltipFormat(point.y) : '-'}
      </Styles.TooltipMetric>
      <Styles.TooltipLocation>{subtext}</Styles.TooltipLocation>
    </Tooltip>
  ) : null;
};

const SingleLocationTooltip: React.FC<{
  date: Date;
  seriesList: Series[];
  left: (d: Column) => number;
  top: (d: Column) => number;
  subtext: string;
  yTooltipFormat: (val: number) => string;
}> = ({ seriesList, left, top, date, subtext, yTooltipFormat }) => {
  if (seriesList.length === 1) {
    return (
      <SingleSeriesTooltip
        series={seriesList[0]}
        date={date}
        left={left}
        top={top}
        subtext={subtext}
        yTooltipFormat={yTooltipFormat}
      />
    );
  }

  const [seriesRaw, seriesSmooth] = seriesList;
  const pointSmooth = findPointByDate(seriesSmooth.data, date);
  const pointRaw = findPointByDate(seriesRaw.data, date);

  return pointSmooth && pointRaw ? (
    <Tooltip
      width={'210px'}
      top={top(pointSmooth)}
      left={left(pointSmooth)}
      title={formatTooltipColumnDate(pointSmooth)}
    >
      <Styles.TooltipSubtitle>
        {`${seriesRaw.tooltipLabel}: ${
          isNumber(pointRaw.y) ? formatInteger(pointRaw.y) : '-'
        }`}
      </Styles.TooltipSubtitle>
      <Styles.TooltipMetric>
        {isNumber(pointSmooth.y) ? formatDecimal(pointSmooth.y, 1) : '-'}
      </Styles.TooltipMetric>
      <Styles.TooltipSubtitle>7-day avg.</Styles.TooltipSubtitle>
      <Styles.TooltipLocation>{subtext}</Styles.TooltipLocation>
    </Tooltip>
  ) : null;
};

/**
 * This component renders the highlighted data on mouse over. Note that we don't
 * actually highlight existing elements in the SVG, we render the markers on top
 * of them, which is more performant and flexible, as just highlighting is not
 * always enough.
 */
const DataHoverMarkers: React.FC<{
  seriesList: Series[];
  date: Date;
  x: (d: Column) => number;
  y: (d: Column) => number;
  yMax: number;
  barWidth: number;
  barOpacityHover?: number;
}> = ({ seriesList, x, y, date, yMax, barWidth, barOpacityHover }) => (
  <Fragment>
    {seriesList.map(({ label, type, data }) => (
      <SeriesMarker
        key={`series-marker-${label}`}
        type={type}
        data={data}
        x={x}
        y={y}
        date={date}
        yMax={yMax}
        barWidth={barWidth}
        barOpacityHover={barOpacityHover}
      />
    ))}
  </Fragment>
);

const SingleLocationChart: React.FC<{
  width: number;
  height: number;
  seriesList: Series[];
  isMobile: boolean;
  tooltipSubtext?: string;
  marginTop?: number;
  marginBottom?: number;
  marginLeft?: number;
  marginRight?: number;
  barOpacity?: number;
  barOpacityHover?: number;
  dateRange: Date[];
  yTickFormat: (val: number) => string;
  yTooltipFormat: (val: number) => string;
  xTickTimeUnit: TimeUnit;
  maxYFromDefinition: number | null;
}> = ({
  width,
  height,
  seriesList,
  isMobile,
  tooltipSubtext = '',
  marginTop = 10,
  marginBottom = 30,
  marginLeft = 70,
  marginRight = 20,
  barOpacity,
  barOpacityHover,
  dateRange,
  yTickFormat,
  yTooltipFormat,
  xTickTimeUnit,
  maxYFromDefinition,
}) => {
  const [dateFrom, dateTo] = dateRange;

  const maxY = isFinite(maxYFromDefinition)
    ? maxYFromDefinition
    : getMaxY(seriesList, dateFrom, dateTo);

  const numDays = daysBetween(dateFrom, dateTo);

  const innerWidth = width - marginLeft - marginRight;
  const innerHeight = height - marginTop - marginBottom;

  const dateScale = scaleUtc({
    domain: [dateFrom, dateTo],
    range: [0, innerWidth],
  });

  const barWidth = 0.8 * (innerWidth / numDays);

  const yScale = scaleLinear({
    domain: [0, maxY],
    range: [innerHeight, 0],
  });

  const { tooltipOpen, tooltipData, hideTooltip, showTooltip } = useTooltip<{
    date: Date;
  }>();

  const onMouseOver = useCallback(
    ({ x }: { x: number }) => {
      const date = dateScale.invert(x - marginLeft);
      showTooltip({
        tooltipData: { date },
      });
    },
    [showTooltip, dateScale, marginLeft],
  );

  const getXPosition = (d: Column) => dateScale(getColumnDate(d)) || 0;
  const getYPosition = (d: Column) => yScale(getY(d));

  return (
    <Styles.PositionRelative style={{ height }}>
      <svg width={width} height={height}>
        <Group key="chart-container" top={marginTop} left={marginLeft}>
          <GridLines width={innerWidth} yScale={yScale} numTicksRows={5} />
          <Axes
            height={innerHeight}
            dateScale={dateScale}
            yScale={yScale}
            isMobile={isMobile}
            yNumTicks={5}
            yTickFormat={yTickFormat}
            xTickTimeUnit={xTickTimeUnit}
          />
          <RectClipGroup width={innerWidth} height={innerHeight}>
            {seriesList.map(({ label, data, type, params }) => (
              <ChartSeries
                key={`series-chart-${label}`}
                data={data}
                x={getXPosition}
                y={getYPosition}
                type={type}
                yMax={innerHeight}
                barWidth={barWidth}
                barOpacity={barOpacity}
                params={params}
              />
            ))}
          </RectClipGroup>
          {tooltipOpen && tooltipData && (
            <DataHoverMarkers
              x={getXPosition}
              y={getYPosition}
              yMax={innerHeight}
              barWidth={barWidth}
              seriesList={seriesList}
              date={tooltipData.date}
              barOpacityHover={barOpacityHover}
            />
          )}
          <ChartOverlay
            width={innerWidth}
            height={innerHeight}
            xScale={dateScale}
            onMouseOver={onMouseOver}
            onMouseOut={hideTooltip}
          />
        </Group>
      </svg>
      {tooltipOpen && tooltipData && (
        <Fragment>
          <SingleLocationTooltip
            left={p => getXPosition(p) + marginLeft}
            top={p => getYPosition(p) + marginTop}
            date={tooltipData.date}
            seriesList={seriesList}
            subtext={tooltipSubtext}
            yTooltipFormat={yTooltipFormat}
          />
          <DateMarker
            left={dateScale(tooltipData.date) + marginLeft}
            seriesList={seriesList}
            date={tooltipData.date}
          />
        </Fragment>
      )}
      {width > 0 && seriesList.length > 0 && <ScreenshotReady />}
    </Styles.PositionRelative>
  );
};

export default SingleLocationChart;
