import React, { useCallback, Fragment } from 'react';
import last from 'lodash/last';
import isNumber from 'lodash/isNumber';
import max from 'lodash/max';
import { AxisLeft } from '@vx/axis';
import { Group } from '@vx/group';
import { ParentSize } from '@vx/responsive';
import { scaleLinear } from '@vx/scale';
import { useTooltip } from '@vx/tooltip';
import { formatPercent } from 'common/utils';
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
import { AxisBottom } from 'components/Charts/Axis';
import {
  getColumnDate,
  formatTooltipColumnDate,
  getUtcScale,
  getTimeAxisTicks,
} from './utils';
import BoxedAnnotation from './BoxedAnnotation';
import { getStartOf, addTime, TimeUnit } from '@actnowcoalition/time-utils';

const getY = (d: Column) => d.y;

/* Vaccination data from the backend is capped at 95% for data quality reasons.  
We update the tooltip and use a dashed line for all capped data. */
const VACCINATION_PERCENTAGE_CAP = 0.95;

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
        formattedValue: formatPercent(lastPoint?.y, 1),
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
  const [seriesInitiated, seriesCompleted, seriesAdditionalDose] = seriesList;
  const pointCompleted =
    seriesCompleted && findPointByDate(seriesCompleted.data, date);
  const pointInitiated = findPointByDate(seriesInitiated.data, date);
  const pointAdditionalDose = seriesAdditionalDose
    ? findPointByDate(seriesAdditionalDose.data, date)
    : null;
  const isCapped = (pointInitiated?.y ?? 0) >= VACCINATION_PERCENTAGE_CAP;

  return pointInitiated ? (
    <Tooltip
      width={'170px'}
      top={top(pointInitiated)}
      left={left(pointCompleted ? pointCompleted : pointInitiated)}
      subtext={isCapped ? 'Data capped at 95%' : undefined}
      title={formatTooltipColumnDate(pointInitiated)}
    >
      <Styles.TooltipLine>
        <Styles.TooltipLabel>
          {seriesInitiated.tooltipLabel}
        </Styles.TooltipLabel>
        <Styles.TooltipValue>
          {isNumber(pointInitiated.y)
            ? formatPercent(pointInitiated.y, 1)
            : '-'}
        </Styles.TooltipValue>
      </Styles.TooltipLine>
      {seriesCompleted && pointCompleted && (
        <Styles.TooltipLine>
          <Styles.TooltipLabel>
            {seriesCompleted.tooltipLabel}
          </Styles.TooltipLabel>{' '}
          <Styles.TooltipValue>
            {isNumber(pointCompleted.y)
              ? formatPercent(pointCompleted.y, 1)
              : '-'}
          </Styles.TooltipValue>
        </Styles.TooltipLine>
      )}
      {seriesAdditionalDose && pointAdditionalDose && (
        <Styles.TooltipLine>
          <Styles.TooltipLabel>
            {seriesAdditionalDose.tooltipLabel}
          </Styles.TooltipLabel>{' '}
          <Styles.TooltipValue>
            {isNumber(pointAdditionalDose.y)
              ? formatPercent(pointAdditionalDose.y, 1)
              : '-'}
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
  marginLeft = 38,
  marginRight = 20,
}) => {
  const innerHeight = height - marginTop - marginBottom;
  const innerWidth = width - marginLeft - marginRight;

  const dateFrom = new Date('2021-01-01');
  const currDate = new Date();
  const dateTo = addTime(
    getStartOf(currDate, TimeUnit.MONTHS),
    1,
    TimeUnit.MONTHS,
  );
  const dateScale = getUtcScale(dateFrom, dateTo, 0, innerWidth);

  const dataMaxY = max(seriesList.map(series => last(series.data)?.y ?? 0));
  // Add 5% buffer then round to the next highest 10% to align with a grid line.
  const dataMaxWithBuffer = Math.ceil((100 * dataMaxY + 5) / 10) / 10;
  const maxY = Math.min(1, Math.max(0.35, dataMaxWithBuffer));
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
          <GridLines width={innerWidth} yScale={yScale} numTicksRows={5} />
          {/* Axes */}
          <Styles.Axis>
            <AxisLeft
              scale={yScale}
              numTicks={5}
              tickFormat={(value: number) => formatPercent(value, 0)}
            />
            <AxisBottom
              innerHeight={innerHeight}
              scale={dateScale}
              tickValues={dateTicks}
            />
          </Styles.Axis>
          <RectClipGroup width={innerWidth} height={innerHeight + 2}>
            {seriesList.map(({ label, data, type, params }) => (
              /* Create separate lines for capped and un-capped data points.
              Capped data will have a dashed line */
              <Group key={`series-chart-${label}`}>
                <ChartSeries
                  key={`series-chart-${label}-uncapped`}
                  data={data.filter(d => d.y < VACCINATION_PERCENTAGE_CAP)}
                  x={getXPosition}
                  y={getYPosition}
                  type={type}
                  yMax={innerHeight}
                  barWidth={0}
                  barOpacity={1}
                  params={params}
                />
                <ChartSeries
                  key={`series-chart-${label}-capped`}
                  data={data.filter(d => d.y >= VACCINATION_PERCENTAGE_CAP)}
                  x={getXPosition}
                  y={getYPosition}
                  type={type}
                  yMax={innerHeight}
                  barWidth={0}
                  barOpacity={1}
                  params={{ ...params, strokeDasharray: '1, 6' }}
                />
              </Group>
            ))}
          </RectClipGroup>
          {/* Current Value Labels */}
          {currentValueLabels.map(labelInfo => {
            return (
              <Group key={`label-info-${labelInfo.label}`}>
                <ChartStyle.VaccinationLabel>
                  <BoxedAnnotation
                    y={labelInfo.y}
                    x={labelInfo.x + 5}
                    text={labelInfo.formattedValue}
                  />
                </ChartStyle.VaccinationLabel>
              </Group>
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
  height: number;
}> = ({ seriesList, height }) => (
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
