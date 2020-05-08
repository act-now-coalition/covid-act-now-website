import React from 'react';
import { extent as d3extent } from 'd3-array';
import { scaleLinear, scaleTime } from '@vx/scale';
import { Group } from '@vx/group';
import { RectClipPath } from '@vx/clip-path';
import { AxisBottom, AxisLeft } from '@vx/axis';
import { GridRows } from '@vx/grid';
import { LinePath, Area } from '@vx/shape';
import { curveNatural } from '@vx/curve';
import { useTooltip } from '@vx/tooltip';
import { localPoint } from '@vx/event';
import { Zones } from '../../enums/zones';
import VoroniChart from './VoroniChart';
import {
  calculateYTicks,
  computeZoneRegions,
  formatDecimal,
  isDefined,
  last,
  randomizeId,
} from './utils';
import Tooltip from './Tooltip';
import { TooltipTitle, TooltipBody } from './Tooltip.style';
import {
  AreaRange,
  AxisWrapper,
  DashedLine,
  PointCircle,
  TextCurrentValue,
  TextZone,
  LineChart,
  RegionChartWrapper,
} from './ZoneChart.style';

const RegionChart = ({
  width = 600,
  height = 400,
  marginLeft = 40,
  marginTop = 10,
  marginRight = 100,
  marginBottom = 40,
  data,
  x = d => d.x,
  y = d => d.y,
  y0,
  y1,
  zones,
}: {
  width: number;
  height: number;
  marginLeft: number;
  marginTop: number;
  marginRight: number;
  marginBottom: number;
  data: any[];
  x: (d: any) => Date;
  y: (d: any) => number;
  y0?: (d: any) => number;
  y1?: (d: any) => number;
  zones: Zones;
}) => {
  const innerWidth = width - marginLeft - marginRight;
  const innerHeight = height - marginTop - marginBottom;

  const [minX, maxX] = d3extent(data, x);
  const xScale = scaleTime({
    domain: [minX!, maxX!],
    range: [0, innerWidth],
  });

  const [minY, maxY] = d3extent(data, y);
  const yScale = scaleLinear({
    domain: [minY!, maxY!],
    range: [innerHeight, 0],
  });

  const xCoord = (d: any) => xScale(x(d));
  const yCoord = (d: any) => yScale(y(d));

  const currentPoint = last(
    data.filter(d => isDefined(x(d)) && isDefined(y(d))),
  );

  const { tooltipData, tooltipOpen, showTooltip, hideTooltip } = useTooltip();

  const handleMouseOver = (
    event: React.MouseEvent<SVGPathElement, MouseEvent>,
    datum: any,
  ) => {
    // @ts-ignore - typing bug
    const coords = localPoint(event.target.ownerSVGElement, event); // tslint:ignore
    showTooltip({
      tooltipLeft: coords?.x || 0,
      tooltipTop: coords?.y || 0,
      tooltipData: datum,
    });
  };

  const zoneRegions = computeZoneRegions(minY!, maxY!, zones);
  const ticks = calculateYTicks(minY!, maxY!, zones);

  const getZoneByValue = (value: number) => {
    if (value < zones.LOW.upperLimit) {
      return zones.LOW;
    }
    return value > zones.MEDIUM.upperLimit ? zones.HIGH : zones.MEDIUM;
  };

  const lineChart = zoneRegions.map((zone, i) => {
    const clipPathZoneId = randomizeId(`clip-path-zone-${zone.name}`);
    return (
      <LineChart key={`chart-zone-line-group-${i}`} color={zone.color}>
        <RectClipPath
          id={clipPathZoneId}
          width={innerWidth}
          y={yScale(zone.valueTo)}
          height={yScale(zone.valueFrom) - yScale(zone.valueTo)}
        />
        <LinePath
          data={data}
          x={xCoord}
          y={yCoord}
          curve={curveNatural}
          clipPath={`url(#${clipPathZoneId})`}
        />
      </LineChart>
    );
  });

  const areaRangeChart =
    isDefined(y0) && isDefined(y1) ? (
      <AreaRange>
        <Area
          data={data}
          x={xCoord}
          y0={d => (y0 ? yScale(y0(d)) : 0)}
          y1={d => (y1 ? yScale(y1(d)) : 0)}
          curve={curveNatural}
        />
      </AreaRange>
    ) : null;

  const clipPathId = randomizeId('chart-clip-path');

  return (
    <RegionChartWrapper>
      <svg width={width} height={height}>
        <RectClipPath id={clipPathId} width={innerWidth} height={innerHeight} />
        <Group left={marginLeft} top={marginTop}>
          <Group clipPath={`url(#${clipPathId})`}>
            {areaRangeChart}
            {lineChart}
            {tooltipOpen && (
              <PointCircle
                cx={xCoord(tooltipData)}
                cy={yCoord(tooltipData)}
                r={6}
                fill={getZoneByValue(y(tooltipData))?.color}
              />
            )}
            <VoroniChart
              data={data}
              x={xCoord}
              y={yCoord}
              width={innerWidth}
              height={innerHeight}
              onMouseOver={handleMouseOver}
              onMouseOut={hideTooltip}
            />
          </Group>
          <AxisWrapper>
            <AxisLeft
              scale={yScale}
              tickValues={ticks}
              hideAxisLine
              hideTicks
            />
          </AxisWrapper>
          <DashedLine>
            <GridRows scale={yScale} width={innerWidth} tickValues={ticks} />
          </DashedLine>
          <AxisWrapper>
            <AxisBottom top={innerHeight} scale={xScale} numTicks={7} />
          </AxisWrapper>
          <TextCurrentValue
            x={xCoord(currentPoint)}
            y={yCoord(currentPoint)}
            dx={5}
          >
            {formatDecimal(y(currentPoint))}
          </TextCurrentValue>
          <Group left={innerWidth + marginRight}>
            {zoneRegions.map((zone, i) => (
              <TextZone
                key={`text-zone-${i}`}
                dx={-5}
                y={yScale(0.5 * (zone.valueFrom + zone.valueTo))}
                fill={zone.color}
              >
                {zone.name}
              </TextZone>
            ))}
          </Group>
        </Group>
      </svg>
      {tooltipOpen && (
        <Tooltip
          left={marginLeft + xCoord(tooltipData)}
          top={marginTop + yCoord(tooltipData)}
        >
          <TooltipTitle>{x(tooltipData).toLocaleDateString()}</TooltipTitle>
          <TooltipBody>{`Rt ${formatDecimal(y(tooltipData))}`}</TooltipBody>
        </Tooltip>
      )}
    </RegionChartWrapper>
  );
};

export default RegionChart;
