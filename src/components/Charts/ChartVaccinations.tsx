import React, { useCallback, Fragment } from 'react';
import { isNumber } from 'lodash';
import { AxisLeft, AxisBottom } from '@vx/axis';
import { Group } from '@vx/group';
import { ParentSize } from '@vx/responsive';
import { scaleUtc, scaleLinear } from '@vx/scale';
import { useTooltip } from '@vx/tooltip';
import { formatPercent, formatUtcDate } from 'common/utils';
import { Column } from 'common/models/Projection';
import { Tooltip, RectClipGroup } from 'components/Charts';
import { ScreenshotReady } from 'components/Screenshot';
import GridLines from 'components/Explore/GridLines';
import * as Styles from 'components/Explore/Explore.style';
import { Series } from 'components/Explore/interfaces';
import ChartSeries, { SeriesMarker } from 'components/Explore/SeriesChart';
import ChartOverlay from 'components/Explore/ChartOverlay';
import { findPointByDate } from 'components/Explore/utils';
import * as ChartStyle from './Charts.style';

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
      top={top(pointInitiated)}
      left={left(pointCompleted)}
      title={formatUtcDate(new Date(pointCompleted.x), 'MMM D, YYYY')}
    >
      <Styles.TooltipLine>
        Vaccination <Styles.TooltipTextBold>started</Styles.TooltipTextBold>{' '}
        {isNumber(pointInitiated.y) ? formatPercent(pointInitiated.y, 1) : '-'}
      </Styles.TooltipLine>
      <Styles.TooltipLine>
        Vaccination <Styles.TooltipTextBold>completed</Styles.TooltipTextBold>{' '}
        {isNumber(pointCompleted.y) ? formatPercent(pointCompleted.y, 1) : '-'}
      </Styles.TooltipLine>
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

  // Note: The end date and 35% bounds are set to approximately match the goal of 100M
  // vaccines in the first 100 days of the Biden administration
  const dateFrom = new Date('2020-12-14');
  const dateTo = new Date('2021-04-30');

  const dateScale = scaleUtc({
    domain: [dateFrom, dateTo],
    range: [0, innerWidth],
  });

  const maxY = 0.35; // 35%
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
          <Styles.Axis>
            <AxisLeft
              scale={yScale}
              numTicks={5}
              tickFormat={(value: number) => formatPercent(value, 0)}
            />
            <AxisBottom top={innerHeight} scale={dateScale} />
          </Styles.Axis>
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
