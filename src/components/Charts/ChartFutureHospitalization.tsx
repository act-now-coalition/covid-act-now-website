import React, { useContext } from 'react';
import { ThemeContext } from 'styled-components';
import { last, isDate } from 'lodash';
import { extent as d3extent, max as d3max } from 'd3-array';
import { LinePath } from '@vx/shape';
import { ParentSize } from '@vx/responsive';
import { scaleLinear, scaleTime } from '@vx/scale';
import { COLORS } from 'common';
import { Projections } from 'common/models/Projections';
import { assert, formatUtcDate, formatInteger } from 'common/utils';
import { AxisBottom } from './Axis';
import BoxedAnnotation from './BoxedAnnotation';
import ChartContainer from './ChartContainer';
import RectClipGroup from './RectClipGroup';
import Tooltip from './Tooltip';
import * as TooltipStyle from './Tooltip.style';
import { LegendMarker, LegendLine } from './Legend';
import * as Style from './Charts.style';

type Point = {
  x: number;
  y: number;
};

type PointProjections = Point & {
  color: string;
  isBeds: boolean;
};

const MAX_LINE_WIDTH = 3;

const getDate = (p: Point) => new Date(p.x);
const getY = (p: Point) => p.y;
const hasData = (d: any) => isDate(getDate(d)) && Number.isFinite(getY(d));
const getLastPoint = (points: Point[]): Point => last(points) || { x: 0, y: 0 };
const isFuture = (p: Point) => getDate(p) > new Date();

const getProjectionsPoints = (
  points: Point[],
  color: string,
  isBeds: boolean,
): PointProjections[] => points.map(p => ({ ...p, color, isBeds }));

const ChartFutureHospitalization = ({
  projections,
  width,
  height,
  marginTop = 25,
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
  const theme = useContext(ThemeContext);

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

  const allData: PointProjections[] = [
    ...getProjectionsPoints(dataProjectedFuture, COLORS.PROJECTED, false),
    ...getProjectionsPoints(dataNoActionFuture, COLORS.LIMITED_ACTION, false),
    ...getProjectionsPoints(
      dataProjectedPast,
      theme.palette.chart.foreground,
      false,
    ),
    ...getProjectionsPoints(dataBeds, theme.palette.chart.axis, true),
  ];

  const [minDate, maxDate] = d3extent(allData, getDate);
  assert(minDate && maxDate, 'Data must not be empty');
  const xScale = scaleTime({
    domain: [minDate, maxDate],
    range: [0, chartWidth],
  });

  const minY = 0;
  const maxY = d3max(allData, getY);
  assert(maxY !== undefined, 'Data must not be empty');

  const yScale = scaleLinear({
    domain: [minY, maxY],
    range: [chartHeight - MAX_LINE_WIDTH, 0],
  });

  const getXCoord = (p: Point): number => xScale(getDate(p));
  const getYCoord = (p: Point): number => yScale(getY(p));

  const firstPointBeds = dataBeds[0];
  const lastPastPoint = getLastPoint(dataProjectedPast);

  const renderTooltip = (p: PointProjections) => (
    <Tooltip left={marginLeft + getXCoord(p)} top={marginTop + getYCoord(p)}>
      <TooltipStyle.Body style={{ fontWeight: 'normal' }}>
        <b style={{ color: 'white' }}>{formatInteger(getY(p))}</b>{' '}
        {p.isBeds ? 'beds available on' : 'hospitalizations expected on'}{' '}
        <b style={{ color: 'white' }}>{formatUtcDate(getDate(p), 'MMMM D')}</b>
      </TooltipStyle.Body>
    </Tooltip>
  );
  const renderMarker = (p: PointProjections) => (
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
          <Style.SeriesLine stroke={theme.palette.chart.foreground}>
            <LinePath data={dataProjectedPast} x={getXCoord} y={getYCoord} />
          </Style.SeriesLine>
          <Style.LineGrid>
            <LinePath data={dataBeds} x={getXCoord} y={getYCoord} />
          </Style.LineGrid>
          <Style.CircleMarker
            cx={getXCoord(lastPastPoint)}
            cy={getYCoord(lastPastPoint)}
            r={6}
          />
        </RectClipGroup>
        <Style.TextAnnotation
          textAnchor={'start'}
          dominantBaseline={'baseline'}
        >
          <BoxedAnnotation
            x={getXCoord(firstPointBeds)}
            y={getYCoord(firstPointBeds) - 10}
            text={`${formatInteger(getY(firstPointBeds))} beds`}
          />
        </Style.TextAnnotation>
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
