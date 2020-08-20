import React, { useCallback } from 'react';
import moment from 'moment';
import { scaleTime, scaleLinear } from '@vx/scale';
import { GridRows, GridColumns } from '@vx/grid';
import { Group } from '@vx/group';
import { AxisLeft, AxisBottom } from '@vx/axis';
import { Column } from 'common/models/Projection';
import * as ChartStyle from 'components/Charts/Charts.style';
import { Tooltip, RectClipGroup } from 'components/Charts';
import { Series } from './interfaces';
import SeriesChart from './SeriesChart';
import ChartOverlay from './ChartOverlay';
import { getMaxBy, getTimeAxisTicks } from './utils';
import * as Styles from './Explore.style';
import { useTooltip } from '@vx/tooltip';

type TooltipData = {
  date: Date;
  x: number;
};

const getDate = (d: Column) => new Date(d.x);
const getY = (d: Column) => d.y;
const daysBetween = (dateFrom: Date, dateTo: Date) =>
  moment(dateTo).diff(dateFrom, 'days');

const formatDateTooltip = (date: Date) => moment(date).format('MMM D, YYYY');

const DateMarker: React.FC<TooltipData> = ({ x, date }) => (
  <Styles.DateMarker style={{ left: x }}>
    {moment(date).fromNow()}
  </Styles.DateMarker>
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

  const yScale = scaleLinear({
    domain: [0, maxY],
    range: [innerHeight, 0],
  });

  const barWidth = 0.7 * (innerWidth / numDays);

  // TOOLTIP
  const { tooltipOpen, tooltipData, hideTooltip, showTooltip } = useTooltip<
    TooltipData
  >();

  const onMouseOver = useCallback(
    (x: number) => {
      const date = dateScale.invert(x);
      showTooltip({
        tooltipData: { date, x },
      });
    },
    [showTooltip, dateScale],
  );

  const renderTooltip = useCallback(
    ({ date, x }: TooltipData) => {
      return (
        <React.Fragment>
          <Tooltip top={marginTop} left={x} title={formatDateTooltip(date)}>
            <Styles.TooltipSubtitle>confirmed cases</Styles.TooltipSubtitle>
            <Styles.TooltipMetric>308,314</Styles.TooltipMetric>
            <Styles.TooltipLocation>in NY</Styles.TooltipLocation>
          </Tooltip>
        </React.Fragment>
      );
    },
    [marginTop],
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
          <ChartOverlay
            width={innerWidth}
            height={innerHeight}
            xScale={dateScale}
            onMouseOver={onMouseOver}
            onMouseLeave={hideTooltip}
            barWidth={barWidth}
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
      {tooltipOpen && tooltipData && renderTooltip(tooltipData)}
      {tooltipOpen && tooltipData && (
        <DateMarker x={tooltipData.x} date={tooltipData.date} />
      )}
    </Styles.PositionRelative>
  );
};

export default ExploreChart;
