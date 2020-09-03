import React, { useCallback, Fragment } from 'react';
import moment from 'moment';
import { isNumber } from 'lodash';
import { Group } from '@vx/group';
import { scaleTime, scaleLinear } from '@vx/scale';
import { useTooltip } from '@vx/tooltip';
import { formatInteger, formatDecimal } from 'common/utils';
import { Column } from 'common/models/Projection';
import { Tooltip, RectClipGroup } from 'components/Charts';
import { Series } from './interfaces';
import ChartSeries, { SeriesMarker } from './SeriesChart';
import ChartOverlay from './ChartOverlay';
import { getMaxBy, findPointByDate } from './utils';
import * as Styles from './Explore.style';
import { COLOR_MAP } from 'common/colors';
import { ScreenshotReady } from 'components/Screenshot';
import TodayMarker from './TodayMarker';
import DateMarker from './DateMarker';
import GridLines from './GridLines';
import Axes from './Axes';

const getDate = (d: Column) => new Date(d.x);
const getY = (d: Column) => d.y;
const daysBetween = (dateFrom: Date, dateTo: Date) =>
  moment(dateTo).diff(dateFrom, 'days');

const SingleLocationTooltip: React.FC<{
  date: Date;
  series: Series[];
  left: (d: Column) => number;
  top: (d: Column) => number;
  subtext: string;
}> = ({ series, left, top, date, subtext }) => {
  const [seriesRaw, seriesSmooth] = series;
  const pointSmooth = findPointByDate(seriesSmooth.data, date);
  const pointRaw = findPointByDate(seriesRaw.data, date);

  return pointSmooth && pointRaw ? (
    <Tooltip
      width={'180px'}
      top={top(pointSmooth)}
      left={left(pointSmooth)}
      title={moment(date).format('MMM D, YYYY')}
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
  series: Series[];
  date: Date;
  x: (d: Column) => number;
  y: (d: Column) => number;
  yMax: number;
  barWidth: number;
  barOpacityHover?: number;
}> = ({ series, x, y, date, yMax, barWidth, barOpacityHover }) => (
  <Fragment>
    {series.map(({ label, type, data }) => (
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
  marginRight = 20,
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
          <RectClipGroup width={innerWidth} height={innerHeight}>
            {series.map(({ label, data, type, params }) => (
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
              series={series}
              date={tooltipData.date}
              barOpacityHover={barOpacityHover}
            />
          )}
          <ChartOverlay
            width={innerWidth}
            height={innerHeight}
            xScale={dateScale}
            onMouseOver={onMouseOver}
            onMouseLeave={hideTooltip}
          />
        </Group>
      </svg>
      {tooltipOpen && tooltipData && (
        <Fragment>
          <SingleLocationTooltip
            left={p => getXPosition(p) + marginLeft}
            top={p => getYPosition(p) + marginTop}
            date={tooltipData.date}
            series={series}
            subtext={tooltipSubtext}
          />
          <DateMarker
            left={dateScale(tooltipData.date) + marginLeft}
            date={tooltipData.date}
          />
        </Fragment>
      )}
      {width > 0 && <ScreenshotReady />}
    </Styles.PositionRelative>
  );
};

export default ExploreChart;
