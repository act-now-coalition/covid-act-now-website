import React, { useCallback, Fragment } from 'react';
import { isNumber } from 'lodash';
import { Group } from '@vx/group';
import { scaleTime, scaleLinear } from '@vx/scale';
import { useTooltip } from '@vx/tooltip';
import { ParentSize } from '@vx/responsive';
import { AxisLeft, AxisBottom } from '@vx/axis';
import { Tooltip, RectClipGroup } from 'components/Charts';
import { Column } from 'common/models/Projection';
import { formatPercent, formatUtcDate } from 'common/utils';
import * as ChartStyle from './Charts.style';
import { ScreenshotReady } from 'components/Screenshot';
import GridLines from 'components/Explore/GridLines';
import * as Styles from '../Explore/Explore.style';
import { Series } from '../Explore/interfaces';
import ChartSeries, { SeriesMarker } from 'components/Explore/SeriesChart';
import { Axis as AxisStyle } from 'components/Explore/Explore.style';
import ChartOverlay from 'components/Explore/ChartOverlay';
import DateMarker from 'components/Explore/DateMarker';
import { findPointByDate } from 'components/Explore/utils';

const getDate = (d: Column) => new Date(d.x);
const getY = (d: Column) => d.y;

const VaccinesTooltip: React.FC<{
  date: Date;
  seriesList: Series[];
  left: (d: Column) => number;
  top: (d: Column) => number;
  subtext: string;
}> = ({ seriesList, left, top, date }) => {
  const [seriesInitiated, seriesCompleted] = seriesList;
  const pointCompleted = findPointByDate(seriesCompleted.data, date);
  const pointInitiated = findPointByDate(seriesInitiated.data, date);

  return pointCompleted && pointInitiated ? (
    <Tooltip
      width={'210px'}
      top={top(pointCompleted)}
      left={left(pointCompleted)}
      title={formatUtcDate(new Date(pointCompleted.x), 'MMM D, YYYY')}
    >
      <Styles.TooltipSubtitle>
        {seriesCompleted.tooltipLabel}
      </Styles.TooltipSubtitle>
      <Styles.TooltipMetric>
        {isNumber(pointCompleted.y) ? formatPercent(pointCompleted.y, 1) : '-'}
      </Styles.TooltipMetric>
      <Styles.TooltipSubtitle>
        {seriesInitiated.tooltipLabel}
      </Styles.TooltipSubtitle>
      <Styles.TooltipMetric>
        {isNumber(pointInitiated.y) ? formatPercent(pointInitiated.y, 1) : '-'}
      </Styles.TooltipMetric>
      <Styles.TooltipSubtitle></Styles.TooltipSubtitle>
    </Tooltip>
  ) : null;
};

const DataHoverMarkers: React.FC<{
  seriesList: Series[];
  date: Date;
  x: (d: Column) => number;
  y: (d: Column) => number;
  yMax: number;
}> = ({ seriesList, x, y, date, yMax }) => (
  <Fragment>
    {seriesList.map(({ label, type, data, params }) => (
      <SeriesMarker
        key={`series-marker-${label}`}
        type={type}
        data={data}
        x={x}
        y={y}
        date={date}
        yMax={yMax}
        barWidth={0}
        barOpacityHover={0}
        params={params}
      />
    ))}
  </Fragment>
);

const VaccinationLines: React.FC<{
  seriesList?: Series[];
  width: number;
  height: number;
  marginTop?: number;
  marginBottom?: number;
  marginLeft?: number;
  marginRight?: number;
}> = ({
  seriesList = [],
  width,
  height,
  marginTop = 10,
  marginBottom = 30,
  marginLeft = 60,
  marginRight = 20,
}) => {
  const innerHeight = height - marginTop - marginBottom;
  const innerWidth = width - marginLeft - marginRight;

  const dateFrom = new Date('2021-01-01');
  const dateTo = new Date();

  const dateScale = scaleTime({
    domain: [dateFrom, dateTo],
    range: [0, innerWidth],
  });

  const maxY = 1; // 100%
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
          {/* Axes */}
          <AxisStyle>
            <AxisLeft
              scale={yScale}
              numTicks={5}
              tickFormat={(value: number) => formatPercent(value, 0)}
            />
            <AxisBottom top={innerHeight} scale={dateScale} />
          </AxisStyle>
          <RectClipGroup width={innerWidth} height={innerHeight + 2}>
            {seriesList.map(({ label, data, type, params }) => (
              <ChartSeries
                key={`series-chart-${label}`}
                data={data}
                x={getXPosition}
                y={getYPosition}
                type={type}
                yMax={innerHeight}
                barWidth={0}
                barOpacity={1}
                params={params}
              />
            ))}
          </RectClipGroup>
          {tooltipOpen && tooltipData && (
            <DataHoverMarkers
              x={getXPosition}
              y={getYPosition}
              yMax={innerHeight}
              seriesList={seriesList}
              date={tooltipData.date}
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
          <VaccinesTooltip
            left={p => getXPosition(p) + marginLeft}
            top={p => getYPosition(p) + marginTop}
            date={tooltipData.date}
            seriesList={seriesList}
            subtext={'A'}
          />
          <DateMarker
            left={dateScale(tooltipData.date) + marginLeft}
            date={tooltipData.date}
          />
        </Fragment>
      )}
      {width > 0 && seriesList.length > 0 && <ScreenshotReady />}
    </Styles.PositionRelative>
  );
};

const ChartVaccinationsAutosize: React.FC<{
  seriesList?: Series[];
  height?: number;
}> = ({ seriesList, height = 400 }) => (
  <ChartStyle.ChartContainer>
    <ParentSize>
      {({ width }) => (
        <VaccinationLines
          width={width}
          height={height}
          seriesList={seriesList}
        />
      )}
    </ParentSize>
  </ChartStyle.ChartContainer>
);

export default ChartVaccinationsAutosize;
