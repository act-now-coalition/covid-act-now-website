import React, { useCallback, Fragment } from 'react';
import moment from 'moment';
import { AxisLeft, AxisBottom } from '@vx/axis';
import { GridRows, GridColumns } from '@vx/grid';
import { Group } from '@vx/group';
import { scaleTime, scaleLinear } from '@vx/scale';
import { useTooltip } from '@vx/tooltip';
import { formatInteger } from 'common/utils';
import { Column } from 'common/models/Projection';
import * as ChartStyle from 'components/Charts/Charts.style';
import { Tooltip, RectClipGroup } from 'components/Charts';
import { Series } from './interfaces';
import SeriesChart, { SeriesMarker } from './SeriesChart';
import ChartOverlay from './ChartOverlay';
import { getMaxBy, getTimeAxisTicks, findPointByDate } from './utils';
import * as Styles from './Explore.style';

const getDate = (d: Column) => new Date(d.x);
const getY = (d: Column) => d.y;
const daysBetween = (dateFrom: Date, dateTo: Date) =>
  moment(dateTo).diff(dateFrom, 'days');

const DateMarker: React.FC<{ left: number; date: Date }> = ({ left, date }) => (
  <Styles.DateMarker style={{ left }}>
    {moment(date).fromNow()}
  </Styles.DateMarker>
);

const ExploreTooltip: React.FC<{
  date: Date;
  series: Series[];
  left: (d: Column) => number;
  top: (d: Column) => number;
}> = ({ series, left, top, date }) => {
  const [serieRaw, serieSmooth] = series;
  const pointSmooth = findPointByDate(serieSmooth.data, date);
  const pointRaw = findPointByDate(serieRaw.data, date);
  return (
    <Tooltip
      top={top(pointSmooth)}
      left={left(pointSmooth)}
      title={moment(date).format('MMM D, YYYY')}
    >
      <Styles.TooltipSubtitle>{serieRaw.tooltipLabel}</Styles.TooltipSubtitle>
      <Styles.TooltipMetric>{formatInteger(pointRaw.y)}</Styles.TooltipMetric>
      <Styles.TooltipLocation>in NY</Styles.TooltipLocation>
    </Tooltip>
  );
};

const DataMarkers: React.FC<{
  series: Series[];
  date: Date;
  x: (d: Column) => number;
  y: (d: Column) => number;
  yMax: number;
  barWidth: number;
}> = ({ series, x, y, date, yMax, barWidth }) => (
  <Fragment>
    {series.map(serie => (
      <SeriesMarker
        key={`serie-marker-${serie.label}`}
        type={serie.type}
        data={serie.data}
        x={x}
        y={y}
        date={date}
        yMax={yMax}
        barWidth={barWidth}
      />
    ))}
  </Fragment>
);

const ExploreChart: React.FC<{
  width: number;
  height: number;
  series: Series[];
  isMobile: boolean;
  marginTop?: number;
  marginBottom?: number;
  marginLeft?: number;
  marginRight?: number;
}> = ({
  width,
  height,
  series,
  isMobile,
  marginTop = 10,
  marginBottom = 30,
  marginLeft = 50,
  marginRight = 10,
}) => {
  const dateFrom = new Date('2020-03-01');
  const dateTo = new Date();
  const numDays = daysBetween(dateFrom, dateTo);
  const maxY = getMaxBy<number>(series, getY, 1);

  const innerWidth = width - marginLeft - marginRight;
  const innerHeight = height - marginTop - marginBottom;

  const dateScale = scaleTime({
    domain: [dateFrom, dateTo],
    range: [0, innerWidth],
  });
  const timeTicks = getTimeAxisTicks(dateFrom, dateTo);
  const timeTickFormat = isMobile ? 'MMM' : 'MMMM D';
  const xTickFormat = (date: Date) => moment(date).format(timeTickFormat);
  const barWidth = 0.7 * (innerWidth / numDays);

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

  return (
    <Styles.PositionRelative>
      <svg width={width} height={height}>
        <Group key="chart-container" top={marginTop} left={marginLeft}>
          <Styles.GridLines>
            <GridColumns<Date> scale={dateScale} height={innerHeight} />
            <GridRows<number> scale={yScale} width={innerWidth} />
          </Styles.GridLines>
          <RectClipGroup width={innerWidth} height={innerHeight}>
            {series.map(serie => (
              <SeriesChart
                key={`series-chart-${serie.label}`}
                data={serie.data}
                x={getXPosition}
                y={getYPosition}
                type={serie.type}
                yMax={innerHeight}
                barWidth={barWidth}
              />
            ))}
          </RectClipGroup>
          {tooltipOpen && tooltipData && (
            <DataMarkers
              x={getXPosition}
              y={getYPosition}
              yMax={innerHeight}
              barWidth={barWidth}
              series={series}
              date={tooltipData.date}
            />
          )}
          <ChartOverlay
            width={innerWidth}
            height={innerHeight}
            xScale={dateScale}
            onMouseOver={onMouseOver}
            onMouseLeave={hideTooltip}
          />
          <ChartStyle.Axis>
            <AxisLeft scale={yScale} />
            <AxisBottom
              top={innerHeight}
              scale={dateScale}
              tickValues={timeTicks}
              tickFormat={xTickFormat}
            />
          </ChartStyle.Axis>
        </Group>
      </svg>
      {tooltipOpen && tooltipData && (
        <ExploreTooltip
          left={p => getXPosition(p) + marginLeft}
          top={p => getYPosition(p) + marginTop}
          date={tooltipData.date}
          series={series}
        />
      )}
      {tooltipOpen && tooltipData && (
        <DateMarker
          left={dateScale(tooltipData.date) + marginLeft}
          date={tooltipData.date}
        />
      )}
    </Styles.PositionRelative>
  );
};

export default ExploreChart;
