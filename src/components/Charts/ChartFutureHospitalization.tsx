import React, { ReactNode } from 'react';
import moment from 'moment';
import { last, isDate } from 'lodash';
import { min as d3min, max as d3max } from 'd3-array';
import { AxisBottom, AxisLeft } from '@vx/axis';
import { LinePath } from '@vx/shape';
import { ParentSize } from '@vx/responsive';
import { scaleLinear, scaleTime } from '@vx/scale';
import { Projections } from 'common/models/Projections';
import { COLORS } from 'common';
import BoxedAnnotation from './BoxedAnnotation';
import ChartContainer from './ChartContainer';
import RectClipGroup from './RectClipGroup';
import Tooltip from './Tooltip';
import { LegendMarker, LegendLine } from './Legend';
import * as Style from './Charts.style';
import { formatDate, formatInteger } from './utils';
import palette from 'assets/theme/palette';

type Point = {
  x: number;
  y: number;
};

type PointTooltip = Point & {
  color: string;
  name: string;
};

const getDate = (p: Point) => new Date(p.x);
const getY = (p: Point) => p.y;
const hasData = (d: any) => isDate(getDate(d)) && Number.isFinite(getY(d));
const getLastPoint = (points: Point[]): Point => last(points) || { x: 0, y: 0 };
const isFuture = (p: Point) => getDate(p) > new Date();

const getTooltipPoint = (
  points: Point[],
  color: string,
  name: string,
): PointTooltip[] => points.map(p => ({ ...p, color, name }));

const getTooltipBody = (p: PointTooltip): ReactNode => (
  <span>
    <b>{formatInteger(getY(p))}</b>{' '}
    {p.name === 'beds' ? 'beds available on' : 'hospitalizations expected by'}{' '}
    <b>{formatDate(getDate(p), 'MMMM D')}</b>
  </span>
);

const ChartFutureHospitalization = ({
  projections,
  width,
  height,
  marginTop = 5,
  marginBottom = 40,
  marginLeft = 48,
  marginRight = 5,
}: {
  projections: Projections;
  width: number;
  height: number;
  marginTop?: number;
  marginBottom?: number;
  marginLeft?: number;
  marginRight?: number;
}) => {
  const chartWidth = width - marginLeft - marginRight;
  const chartHeight = height - marginTop - marginBottom;

  const dataNoAction = projections.baseline.getDataset('hospitalizations');
  const dataNoActionFuture: Point[] = dataNoAction
    .filter(hasData)
    .filter(isFuture);

  const dataProjected = projections.projected.getDataset('hospitalizations');
  const dataProjectedFuture: Point[] = dataProjected
    .filter(hasData)
    .filter(isFuture);
  const dataProjectedPast: Point[] = dataProjected
    .filter(hasData)
    .filter((p: Point) => !isFuture(p));

  const dataBeds = projections.primary.getDataset('beds');

  const allData: PointTooltip[] = [
    ...getTooltipPoint(dataProjectedFuture, COLORS.PROJECTED, 'projected'),
    ...getTooltipPoint(dataNoActionFuture, COLORS.LIMITED_ACTION, 'no-action'),
    ...getTooltipPoint(dataProjectedPast, palette.black, 'past'),
    ...getTooltipPoint(dataBeds, palette.chart.axis, 'beds'),
  ];

  const dateTwoWeeks = moment().add(2, 'weeks').toDate();
  const minDate = d3min(allData, getDate) || new Date('2020-01-01');
  const maxDate = d3max(allData, getDate) || dateTwoWeeks;
  const xScale = scaleTime({
    domain: [minDate, maxDate],
    range: [0, chartWidth],
  });

  const minY = d3min(allData, getY) || 0;
  const maxY = d3max(allData, getY) || 1;

  const yScale = scaleLinear({
    domain: [minY, maxY],
    range: [chartHeight, 0],
  });

  const getXCoord = (p: Point): number => xScale(getDate(p));
  const getYCoord = (p: Point): number => yScale(getY(p));

  const firstPointBeds = dataBeds[0];
  const lastPastPoint = getLastPoint(dataProjectedPast);

  const renderTooltip = (p: PointTooltip) => (
    <Tooltip left={marginLeft + getXCoord(p)} top={marginTop + getYCoord(p)}>
      {getTooltipBody(p)}
    </Tooltip>
  );
  const renderMarker = (p: PointTooltip) => (
    <Style.CircleMarker
      cx={getXCoord(p)}
      cy={getYCoord(p)}
      r={6}
      fill={p.color}
    />
  );

  return (
    <>
      <ChartContainer
        data={allData}
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
        <RectClipGroup width={chartWidth} height={chartHeight}>
          <Style.SeriesDashed stroke={COLORS.LIMITED_ACTION}>
            <LinePath data={dataNoActionFuture} x={getXCoord} y={getYCoord} />
          </Style.SeriesDashed>
          <Style.SeriesDashed stroke={COLORS.PROJECTED}>
            <LinePath data={dataProjectedFuture} x={getXCoord} y={getYCoord} />
          </Style.SeriesDashed>
          <Style.SeriesLine stroke={palette.black}>
            <LinePath data={dataProjectedPast} x={getXCoord} y={getYCoord} />
          </Style.SeriesLine>
          <Style.TextAnnotation
            textAnchor={'start'}
            dominantBaseline={'baseline'}
          >
            <BoxedAnnotation
              x={getXCoord(firstPointBeds)}
              y={getYCoord(firstPointBeds) - 5}
              text={`${formatInteger(getY(firstPointBeds))} beds`}
            />
          </Style.TextAnnotation>
          <Style.LineGrid>
            <LinePath data={dataBeds} x={getXCoord} y={getYCoord} />
          </Style.LineGrid>
          <Style.CircleMarker
            cx={getXCoord(lastPastPoint)}
            cy={getYCoord(lastPastPoint)}
            r={6}
          />
          <AxisLeft
            top={marginTop}
            scale={yScale}
            hideAxisLine
            hideTicks
            hideZero
          />
        </RectClipGroup>
        <Style.Axis>
          <AxisBottom
            top={chartHeight}
            scale={xScale}
            numTicks={Math.round(chartWidth / 100)}
          />
        </Style.Axis>
      </ChartContainer>
      <Style.LegendContainer>
        <Style.LegendItem>
          <LegendMarker>
            <Style.SeriesLine>
              <LegendLine />
            </Style.SeriesLine>
          </LegendMarker>
          <Style.LegendLabel>Hospitalizations</Style.LegendLabel>
        </Style.LegendItem>
        <Style.LegendItem>
          <LegendMarker>
            <Style.SeriesDashed stroke={COLORS.LIMITED_ACTION}>
              <LegendLine />
            </Style.SeriesDashed>
          </LegendMarker>
          <Style.LegendLabel>If all restrictions are lifted</Style.LegendLabel>
        </Style.LegendItem>
        <Style.LegendItem>
          <LegendMarker>
            <Style.SeriesDashed stroke={COLORS.PROJECTED}>
              <LegendLine />
            </Style.SeriesDashed>
          </LegendMarker>
          <Style.LegendLabel>
            Projected based on current trends
          </Style.LegendLabel>
        </Style.LegendItem>
      </Style.LegendContainer>
    </>
  );
};

const ChartAutosize = ({
  projections,
  height = 400,
}: {
  projections: Projections;
  height?: number;
}) => (
  <Style.ChartContainer>
    <ParentSize>
      {({ width }) => (
        <ChartFutureHospitalization
          width={width}
          height={height}
          projections={projections}
        />
      )}
    </ParentSize>
  </Style.ChartContainer>
);

export default ChartAutosize;
