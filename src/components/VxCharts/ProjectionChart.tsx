import React from 'react';
import moment from 'moment';
import { extent as d3extent } from 'd3-array';
import { scaleLinear, scaleTime } from '@vx/scale';
import { Group } from '@vx/group';
import { curveNatural } from '@vx/curve';
import { LinePath } from '@vx/shape';
import { RectClipPath } from '@vx/clip-path';
import { AxisBottom } from '@vx/axis';
import { useTooltip } from '@vx/tooltip';
import { localPoint } from '@vx/event';
import { formatInteger, randomizeId, last } from './utils';
import VoroniChart from './VoroniChart';
import * as Style from './Charts.style';

// https://momentjs.com/docs/#/parsing/string-format/
const TOOLTIP_DATE_FORMAT = 'dddd, MMM D, YYYY';

const ProjectionChart = ({
  width = 600,
  height = 400,
  marginLeft = 40,
  marginTop = 10,
  marginRight = 100,
  marginBottom = 40,
  data,
  x = d => d.x,
  y = d => d.y,
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
}) => {
  const innerWidth = width - marginLeft - marginRight;
  const innerHeight = height - marginTop - marginBottom;

  const dataLimitedAction = data[0].data;
  const dataCurrentTrends = data[2].data;
  const dataAvailableBeds = data[4].data;

  const [minX, maxX] = d3extent(dataLimitedAction, x);
  const xScale = scaleTime({
    domain: [minX!, maxX!],
    range: [0, innerWidth],
  });

  const allPoints = [
    ...dataLimitedAction,
    ...dataCurrentTrends,
    ...dataAvailableBeds,
  ];
  const [minY, maxY] = d3extent(allPoints, y);

  const yScale = scaleLinear({
    domain: [minY!, maxY!],
    range: [innerHeight, 0],
  });

  const xCoord = (d: any) => xScale(x(d));
  const yCoord = (d: any) => yScale(y(d));

  const isPast = (d: any) => x(d) < new Date();
  const currentPoint = last(dataCurrentTrends.filter(isPast));
  const currentBeds = last(dataAvailableBeds);
  const clipPathId = randomizeId('chart-clip-path');

  const { tooltipData, tooltipOpen, showTooltip, hideTooltip } = useTooltip();

  const handleMouseOver = (
    event: React.MouseEvent<SVGPathElement, MouseEvent>,
    datum: any,
  ) => {
    // @ts-ignore - typing bug
    const coords = localPoint(event.target.ownerSVGElement, event);
    showTooltip({
      tooltipLeft: coords?.x || 0,
      tooltipTop: coords?.y || 0,
      tooltipData: datum,
    });
  };

  return (
    <Style.ChartContainer>
      <svg width={width} height={height}>
        <RectClipPath id={clipPathId} width={innerWidth} height={innerHeight} />
        <Group left={marginLeft} top={marginTop}>
          <Group clipPath={`url(#${clipPathId})`}>
            <Style.LineMainDashed stroke="#fc374d">
              <LinePath
                data={dataLimitedAction}
                x={xCoord}
                y={yCoord}
                curve={curveNatural}
              />
            </Style.LineMainDashed>
            <Style.LineMainDashed stroke="#3bbce6">
              <LinePath
                data={dataCurrentTrends}
                x={xCoord}
                y={yCoord}
                curve={curveNatural}
              />
            </Style.LineMainDashed>
            <Style.LineMain>
              <LinePath
                data={dataCurrentTrends.filter(isPast)}
                x={xCoord}
                y={yCoord}
                curve={curveNatural}
              />
            </Style.LineMain>
            <Style.LineGrid>
              <LinePath
                data={dataAvailableBeds}
                x={xCoord}
                y={yCoord}
                curve={curveNatural}
              />
            </Style.LineGrid>
            <Style.TextAnnotation x={0} y={yCoord(currentBeds)} dy={-10}>
              {`${formatInteger(y(currentBeds))} available beds`}
            </Style.TextAnnotation>
            <Style.CircleMarker
              cx={xCoord(currentPoint)}
              cy={yCoord(currentPoint)}
              r={6}
            />
            {tooltipOpen && (
              <Style.CircleMarker
                cx={xCoord(tooltipData)}
                cy={yCoord(tooltipData)}
                r={6}
              />
            )}
            <VoroniChart
              data={allPoints}
              x={xCoord}
              y={yCoord}
              width={innerWidth}
              height={innerHeight}
              onMouseOver={handleMouseOver}
              onMouseOut={hideTooltip}
            />
          </Group>
          <Style.Axis>
            <AxisBottom top={innerHeight} scale={xScale} numTicks={7} />
          </Style.Axis>
        </Group>
      </svg>
      {/* Tooltip */}
      {tooltipOpen && (
        <Style.Tooltip
          left={marginLeft + xCoord(tooltipData)}
          top={marginTop + yCoord(tooltipData)}
        >
          <Style.TooltipTitle>
            {moment(x(tooltipData)).format(TOOLTIP_DATE_FORMAT)}
          </Style.TooltipTitle>
          <Style.TooltipBody>{formatInteger(y(tooltipData))}</Style.TooltipBody>
        </Style.Tooltip>
      )}
    </Style.ChartContainer>
  );
};

export default ProjectionChart;
