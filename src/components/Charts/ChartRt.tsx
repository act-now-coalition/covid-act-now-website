import React from 'react';
import isDate from 'lodash/isDate';
import { min as d3min, max as d3max } from 'd3-array';
import { curveMonotoneX } from '@vx/curve';
import { Group } from '@vx/group';
import { ParentSize } from '@vx/responsive';
import { scaleLinear } from '@vx/scale';
import { Area } from '@vx/shape';
import { Column, RtRange, RT_TRUNCATION_DAYS } from 'common/models/Projection';
import { CASE_GROWTH_RATE_LEVEL_INFO_MAP as zones } from 'common/metrics/case_growth';
import { formatDecimal } from 'common/utils';
import BoxedAnnotation from './BoxedAnnotation';
import ChartContainer from './ChartContainer';
import RectClipGroup from './RectClipGroup';
import ZoneLinePath from './ZoneLinePath';
import Tooltip from './Tooltip';
import * as TooltipStyle from './Tooltip.style';
import * as Style from './Charts.style';
import {
  getChartRegions,
  getTruncationDate,
  last,
  getAxisLimits,
  getUtcScale,
} from './utils';
import { formatTooltipColumnDate, getColumnDate } from './utils';
import GridLines from 'components/Explore/GridLines';
import Axes from 'components/Explore/Axes';
import { scaleUtc } from '@vx/scale';
import { getYFormat } from 'components/Explore/utils';
import { DataMeasure } from 'components/Explore/interfaces';
import { TimeUnit } from '@actnowcoalition/time-utils';
import useMediaQuery from '@material-ui/core/useMediaQuery';
import { useTheme } from '@material-ui/core/styles';

type PointRt = Omit<Column, 'y'> & {
  y: RtRange;
};

const getRt = (d: PointRt) => d?.y?.rt;
const getYAreaHigh = (d: PointRt) => d?.y?.high;
const getYAreaLow = (d: PointRt) => d?.y?.low;

const hasData = (d: any) =>
  isDate(getColumnDate(d)) &&
  Number.isFinite(getRt(d)) &&
  Number.isFinite(getYAreaLow(d)) &&
  Number.isFinite(getYAreaHigh(d));

const ChartRt = ({
  columnData,
  width,
  height,
  marginTop = 6,
  marginBottom = 40,
  marginLeft = 40,
  marginRight = 5,
}: {
  columnData: Column[];
  width: number;
  height: number;
  marginTop?: number;
  marginBottom?: number;
  marginLeft?: number;
  marginRight?: number;
}) => {
  const chartWidth = width - marginLeft - marginRight;
  const chartHeight = height - marginTop - marginBottom;

  const data: PointRt[] = columnData.filter(hasData);
  const dates: Date[] = columnData.map(getColumnDate).filter(isDate);

  const minDate = d3min(dates) || new Date('2020-01-01');
  const currDate = new Date();

  const yDataMin = 0;
  const yDataMax = d3max(data, getRt) || 1;
  const [yAxisMin, yAxisMax] = getAxisLimits(yDataMin, yDataMax, zones);

  const xScale = getUtcScale(minDate, currDate, 0, chartWidth);

  const yScale = scaleLinear({
    domain: [yAxisMin, yAxisMax],
    range: [chartHeight, 0],
  });

  const getXCoord = (d: PointRt) => xScale(getColumnDate(d));
  const getYCoord = (d: PointRt) => yScale(getRt(d));

  const regions = getChartRegions(yAxisMin, yAxisMax, zones);

  const lastValidDate = getColumnDate(last(data));

  const truncationDate = getTruncationDate(lastValidDate, RT_TRUNCATION_DAYS);
  const prevData = data.filter(
    (d: PointRt) => getColumnDate(d) <= truncationDate,
  );
  const restData = data.filter(
    (d: PointRt) => getColumnDate(d) >= truncationDate,
  );
  const truncationPoint = last(prevData);
  const truncationRt = getRt(truncationPoint);
  const yTruncationRt = yScale(truncationRt);
  const xTruncationRt = xScale(getColumnDate(truncationPoint));

  const yTickFormat = getYFormat(DataMeasure.INTEGER, 1);
  const dateScale = scaleUtc({
    domain: [minDate, currDate],
    range: [0, chartWidth],
  });
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down('sm'));

  const renderTooltip = (d: PointRt) => {
    const isConfirmed = getColumnDate(d) < truncationDate;
    const rtLow = formatDecimal(getYAreaLow(d), 2);
    const rtHigh = formatDecimal(getYAreaHigh(d), 2);
    const rt = formatDecimal(getRt(d), 2);
    return (
      <Tooltip
        left={marginLeft + getXCoord(d)}
        top={marginTop + getYCoord(d)}
        title={formatTooltipColumnDate(d)}
        subtitle="Infection rate"
        subtext={isConfirmed ? undefined : 'Data might change'}
        width="150px"
      >
        <TooltipStyle.Body>
          {`${isConfirmed ? '' : '~'}${rt}`}
        </TooltipStyle.Body>
        <TooltipStyle.BodyMuted>{`90% CI  [${rtLow}, ${rtHigh}]`}</TooltipStyle.BodyMuted>
      </Tooltip>
    );
  };
  const renderMarker = (d: PointRt) => (
    <Style.CircleMarker
      cx={getXCoord(d)}
      cy={getYCoord(d)}
      r={6}
      fill="black"
    />
  );

  return (
    <ChartContainer<PointRt>
      data={data}
      x={getXCoord}
      y={getYCoord}
      renderMarker={renderMarker}
      renderTooltip={renderTooltip}
      width={width}
      height={height}
      marginTop={marginTop}
      marginBottom={marginBottom}
      marginLeft={marginLeft}
      marginRight={marginRight}
    >
      <GridLines width={chartWidth} yScale={yScale} numTicksRows={5} />
      <Axes
        height={chartHeight}
        dateScale={dateScale}
        yScale={yScale}
        isMobile={isMobile}
        yNumTicks={5}
        yTickFormat={yTickFormat}
        xTickTimeUnit={TimeUnit.MONTHS}
      />
      <RectClipGroup width={chartWidth} height={chartHeight}>
        <RectClipGroup width={chartWidth} height={chartHeight} topPadding={0}>
          <Style.SeriesArea>
            <Area
              data={data}
              x={getXCoord}
              y0={(d: PointRt) => yScale(getYAreaLow(d))}
              y1={(d: PointRt) => yScale(getYAreaHigh(d))}
              curve={curveMonotoneX}
            />
          </Style.SeriesArea>
        </RectClipGroup>
        {regions &&
          regions.map((region, i) => (
            <Group key={`chart-region-${i}`}>
              <Style.SeriesLine stroke="black">
                <ZoneLinePath<PointRt>
                  data={prevData}
                  x={getXCoord}
                  y={getYCoord}
                  region={region}
                  width={chartWidth}
                  yScale={yScale}
                />
              </Style.SeriesLine>
              <Style.SeriesDotted stroke="black">
                <ZoneLinePath<PointRt>
                  data={restData}
                  x={getXCoord}
                  y={getYCoord}
                  region={region}
                  width={chartWidth}
                  yScale={yScale}
                />
              </Style.SeriesDotted>
            </Group>
          ))}
      </RectClipGroup>
      {/* <Style.LineGrid>
        <GridRows width={chartWidth} scale={yScale} tickValues={yTicks} />
      </Style.LineGrid> */}
      <Style.TextAnnotation>
        <BoxedAnnotation
          x={xTruncationRt}
          y={yTruncationRt < 60 ? yTruncationRt + 30 : yTruncationRt - 30}
          text={formatDecimal(truncationRt)}
        />
      </Style.TextAnnotation>
      <Style.CircleMarker cx={xTruncationRt} cy={yTruncationRt} r={6} />
      {/* <AxisBottom
        innerHeight={chartHeight}
        scale={xScale}
        tickValues={dateTicks}
      /> */}
      {/* <AxisLeft scale={yScale} tickValues={yTicks} /> */}
    </ChartContainer>
  );
};

const ChartRtAutosize = ({
  columnData,
  height,
}: {
  columnData: Column[];
  height: number;
}) => (
  <Style.ChartContainer>
    <ParentSize>
      {({ width }) => (
        <ChartRt
          width={width}
          height={height}
          marginLeft={32}
          columnData={columnData}
        />
      )}
    </ParentSize>
  </Style.ChartContainer>
);

export default ChartRtAutosize;
