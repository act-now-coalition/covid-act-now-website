import React, { useCallback, Fragment } from 'react';
import { last, isNumber, max } from 'lodash';
import { AxisLeft } from '@vx/axis';
import { Group } from '@vx/group';
import { ParentSize } from '@vx/responsive';
import { scaleLinear } from '@vx/scale';
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
import { findPointByDate, getTimeAxisTicks } from 'components/Explore/utils';
import * as ChartStyle from './Charts.style';
import { getUtcScale } from './utils';
import { AxisBottom } from 'components/Charts/Axis';

const getDate = (d: Column) => new Date(d.x);
const getY = (d: Column) => d.y;

interface LabelInfo {
  x: number;
  y: number;
  label: string;
  formattedValue: string;
}
function formatCurrentValueLabels(
  seriesList: Series[],
  getXPosition: (p: Column) => number,
  getYPosition: (p: Column) => number,
): LabelInfo[] {
  return seriesList.reduce((labelInfoList: LabelInfo[], currSeries: Series) => {
    const lastPoint = last(currSeries.data);
    const currMaxY = max(labelInfoList.map(info => info.y)) || 0;
    return [
      ...labelInfoList,
      {
        x: lastPoint?.x ? getXPosition(lastPoint) : 0,
        y: lastPoint?.y ? Math.max(getYPosition(lastPoint), currMaxY + 20) : 0,
        label: currSeries.shortLabel,
        formattedValue: lastPoint?.y,
      },
    ];
  }, []);
}

const VaccinesTooltip: React.FC<{
  date: Date;
  seriesList: Series[];
  left: (d: Column) => number;
  top: (d: Column) => number;
  subtext: string;
}> = ({ seriesList, left, top, date }) => {
  const [seriesInitiated, seriesCompleted] = seriesList;
  const pointCompleted =
    seriesCompleted && findPointByDate(seriesCompleted.data, date);
  const pointInitiated = findPointByDate(seriesInitiated.data, date);

  return pointInitiated ? (
    <Tooltip
      width={'160px'}
      top={top(pointInitiated)}
      left={left(pointCompleted ? pointCompleted : pointInitiated)}
      title={formatUtcDate(new Date(pointInitiated.x), 'MMM D, YYYY')}
    >
      <Styles.TooltipLine>
        <Styles.TooltipLabel>
          {seriesInitiated.tooltipLabel}
        </Styles.TooltipLabel>
        <Styles.TooltipValue>
          {isNumber(pointInitiated.y) ? pointInitiated.y : '-'}
        </Styles.TooltipValue>
      </Styles.TooltipLine>
      {seriesCompleted && pointCompleted && (
        <Styles.TooltipLine>
          <Styles.TooltipLabel>
            {seriesCompleted.tooltipLabel}
          </Styles.TooltipLabel>{' '}
          <Styles.TooltipValue>
            {isNumber(pointCompleted.y) ? pointCompleted.y : '-'}
          </Styles.TooltipValue>
        </Styles.TooltipLine>
      )}
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
        params={{ stroke: '#fff', fill: params?.fill }}
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
  marginLeft = 50,
  marginRight = 20,
}) => {
  const innerHeight = height - marginTop - marginBottom;
  const innerWidth = width - marginLeft - marginRight;

  // Note: The end date and 35% bounds are set to approximately match the goal of 100M
  // vaccines in the first 100 days of the Biden administration
  const dateFrom = new Date('2020-12-01');
  const dateTo = new Date('2021-05-01');

  const dateScale = getUtcScale(dateFrom, dateTo, 0, innerWidth);

  const maxY = 1000; // 35%
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
  const dateTicks = getTimeAxisTicks(dateFrom, dateTo);

  const currentValueLabels = formatCurrentValueLabels(
    seriesList,
    getXPosition,
    getYPosition,
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
            xTickValues={dateTicks.map(date => date.valueOf())}
          />
          {/* Axes */}
          <Styles.Axis>
            <AxisLeft
              scale={yScale}
              numTicks={5}
              tickFormat={(value: number) => value}
            />
            <AxisBottom
              innerHeight={innerHeight}
              scale={dateScale}
              tickValues={dateTicks}
              showYear={true}
            />
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
          {/* Current Value Labels */}
          {currentValueLabels.map(labelInfo => {
            return (
              <ChartStyle.VaccinationLabel
                key={labelInfo.label}
                x={labelInfo.x}
                y={labelInfo.y}
              >
                <ChartStyle.VaccinationLabelBold>
                  {labelInfo.formattedValue}
                </ChartStyle.VaccinationLabelBold>{' '}
                {labelInfo.label}
              </ChartStyle.VaccinationLabel>
            );
          })}
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
            subtext={''}
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
