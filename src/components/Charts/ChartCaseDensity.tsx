import React, { FunctionComponent } from 'react';
import { isDate } from 'lodash';
import { min as d3min, max as d3max } from 'd3-array';
import { curveNatural } from '@vx/curve';
import { GridRows } from '@vx/grid';
import { scaleLinear, scaleTime } from '@vx/scale';
import { Area } from '@vx/shape';
import { ParentSize } from '@vx/responsive';
import { Column } from 'common/models/Projection';
import { CASE_DENSITY_LEVEL_INFO_MAP } from 'common/metrics/case_density';
import { LevelInfoMap } from 'common/level';
import { formatUtcDate, formatDecimal } from 'common/utils';
import { AxisBottom, AxisLeft } from './Axis';
import ChartContainer from './ChartContainer';
import RectClipGroup from './RectClipGroup';
import ZoneAnnotation from './ZoneAnnotation';
import Tooltip from './Tooltip';
import LinePathRegion from './LinePathRegion';
import * as TooltipStyle from './Tooltip.style';
import {
  computeTickPositions,
  getChartRegions,
  getZoneByValue,
  last,
  getAxisLimits,
} from './utils';
import * as Style from './Charts.style';

type Point = {
  x: number;
  y: number;
};

const getDate = (d: Point) => new Date(d.x);
const getY = (d: Point) => d?.y;

/**
 * Since the case density is already calculated with 1%, we need to scale
 * accordingly to calculate the case density with a different mortality
 * rate m%.
 *
 * case density (1%) = (7 day moving avg of deaths / 1%) / (population / 100k)
 *
 * case density (m%) = (7 day moving avg of deaths / m%) / (population / 100k)
 *       = (m% / 1%) * (7 day moving avg of deaths / m%) / (population / 100k)
 *       = (m% / 1%) * case density (1%)
 *
 * Note that the mortality ratio is inversely proportional to the estimated case
 * density.
 */
const CPR = 1.0 / 100;
const CPR_LOWER = 0.5 / 100;
const CPR_UPPER = 1.5 / 100;

const getAreaLow = (p: Point) => getY(p) * (CPR / CPR_UPPER);
const getAreaHigh = (p: Point) => getY(p) * (CPR / CPR_LOWER);

const hasData = (d: any) => isDate(getDate(d)) && Number.isFinite(getY(d));

const ChartCaseDensity: FunctionComponent<{
  columnData: Column[];
  zones: LevelInfoMap;
  width: number;
  height: number;
  marginTop?: number;
  marginBottom?: number;
  marginLeft?: number;
  marginRight?: number;
}> = ({
  columnData,
  zones,
  width,
  height,
  marginTop = 5,
  marginBottom = 40,
  marginLeft = 40,
  marginRight = 90,
}) => {
  const chartWidth = width - marginLeft - marginRight;
  const chartHeight = height - marginTop - marginBottom;

  const data: Point[] = columnData.filter(hasData);

  const dates = data.map(getDate);
  const minDate = d3min(dates) || new Date('2020-01-01');
  const maxDate = d3max(dates) || new Date();

  const xScale = scaleTime({
    domain: [minDate, maxDate],
    range: [0, chartWidth],
  });

  const yDataMax = d3max(data, getY) || 100;
  const yAxisLimits = getAxisLimits(0, yDataMax, zones);
  const [yAxisMin, yAxisMax] = [-9, yAxisLimits[1]];

  const yScale = scaleLinear({
    domain: [yAxisMin, yAxisMax],
    range: [chartHeight, 0],
  });

  const getXCoord = (p: Point) => xScale(getDate(p));
  const getYCoord = (p: Point) => yScale(getY(p));

  const regions = getChartRegions(yAxisMin, yAxisMax, zones);
  const lastPoint = last(data);
  const activeZone = getZoneByValue(getY(lastPoint), zones);

  const yTicks = computeTickPositions(yAxisMin, yAxisMax, zones);

  const renderTooltip = (p: Point) => {
    const yLow = formatDecimal(getAreaLow(p), 2);
    const yHigh = formatDecimal(getAreaHigh(p), 2);
    const y = formatDecimal(getY(p), 1);
    return (
      <Tooltip
        left={marginLeft + getXCoord(p)}
        top={marginTop + getYCoord(p)}
        title={formatUtcDate(getDate(p), 'MMM D, YYYY')}
      >
        <TooltipStyle.Body>{`Case density ${y}/100k`}</TooltipStyle.Body>
        <TooltipStyle.BodyMuted>{`[1.5%, 0.5%] = [${yLow}, ${yHigh}]`}</TooltipStyle.BodyMuted>
      </Tooltip>
    );
  };
  const renderMarker = (p: Point) => (
    <Style.CircleMarker
      cx={getXCoord(p)}
      cy={getYCoord(p)}
      r={6}
      fill={getZoneByValue(getY(p), zones).color}
    />
  );

  return (
    <ChartContainer<Point>
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
      <RectClipGroup width={chartWidth} height={chartHeight} topPadding={0}>
        <Style.SeriesArea>
          <Area
            data={data}
            x={getXCoord}
            y0={(p: Point) => yScale(getAreaLow(p))}
            y1={(p: Point) => yScale(getAreaHigh(p))}
            curve={curveNatural}
          />
        </Style.SeriesArea>
        <LinePathRegion
          data={data}
          x={getXCoord}
          y={getYCoord}
          regions={regions}
          width={chartWidth}
          yScale={yScale}
        />
        <Style.LineGrid>
          <GridRows width={chartWidth} scale={yScale} tickValues={yTicks} />
        </Style.LineGrid>
      </RectClipGroup>
      {regions.map((region, i) => (
        <ZoneAnnotation
          color={region.color}
          name={region.name}
          isActive={activeZone.name === region.name}
          x={chartWidth + 70}
          y={yScale(0.5 * (region.valueFrom + region.valueTo))}
        />
      ))}
      <AxisBottom top={chartHeight} scale={xScale} />
      <AxisLeft scale={yScale} tickValues={yTicks.slice(1)} />
    </ChartContainer>
  );
};

const ChartCaseDensityAutosize: FunctionComponent<{
  columnData: Column[];
  height?: number;
}> = ({ columnData, height = 400 }) => (
  <Style.ChartContainer>
    <ParentSize>
      {({ width }) => (
        <ChartCaseDensity
          width={width}
          height={height}
          columnData={columnData}
          zones={CASE_DENSITY_LEVEL_INFO_MAP}
        />
      )}
    </ParentSize>
  </Style.ChartContainer>
);

export { ChartCaseDensity };
export default ChartCaseDensityAutosize;
