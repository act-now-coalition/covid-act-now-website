import React from 'react';
import { extent as d3extent } from 'd3-array';
import { scaleLinear, scaleTime } from '@vx/scale';
import { Group } from '@vx/group';
import { RectClipPath } from '@vx/clip-path';
import { AxisBottom } from '@vx/axis';
import AreaRangeChart from './AreaRangeChart';
import AnnotationLastValue from './AnnotationLastValue';
import ZoneAnnotations from './ZoneAnnotations';
import ZoneLineChart from './ZoneLineChart';
import GridZones from './GridZones';
import { RegionChartWrapper } from './RegionChart.style';
import { formatDecimal, randomizeId } from './utils';
import { Zones } from '../../enums/zones';

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

  // TODO(@pnavarrc) - Fix the TS warning here (min, max could be undefined)
  const [minX, maxX] = d3extent(data, x);
  const xScale = scaleTime({
    domain: [minX, maxX],
    range: [0, innerWidth],
  });

  const [minY, maxY] = d3extent(data, y);
  const yScale = scaleLinear({
    domain: [minY, maxY],
    range: [innerHeight, 0],
    tickFormat: formatDecimal,
  });

  // Element IDs should be unique in the DOM
  const clipPathId = randomizeId('chart-clip-path');

  return (
    <RegionChartWrapper>
      <svg className="chart chart--region" width={width} height={height}>
        <RectClipPath id={clipPathId} width={innerWidth} height={innerHeight} />
        <Group left={marginLeft} top={marginTop}>
          <Group clipPath={`url(#${clipPathId})`}>
            <AreaRangeChart
              data={data}
              x={d => xScale(x(d))}
              y0={d => (y0 ? yScale(y0(d)) : y0)}
              y1={d => (y1 ? yScale(y1(d)) : y1)}
            />
            <ZoneLineChart
              minY={minY}
              maxY={maxY}
              data={data}
              x={d => xScale(x(d))}
              y={d => yScale(y(d))}
              zones={zones}
              width={innerWidth}
              yScale={yScale}
            />
          </Group>
          <GridZones
            minY={minY}
            maxY={maxY}
            zones={zones}
            yScale={yScale}
            width={innerWidth}
          />
          <AxisBottom
            axisClassName="chart__axis"
            top={innerHeight}
            scale={xScale}
            numTicks={7}
          />
          <AnnotationLastValue
            data={data}
            x={x}
            y={y}
            xScale={xScale}
            yScale={yScale}
          />
          <Group left={innerWidth + marginRight}>
            <ZoneAnnotations
              minY={minY}
              maxY={maxY}
              zones={zones}
              yScale={yScale}
            />
          </Group>
        </Group>
      </svg>
    </RegionChartWrapper>
  );
};

export default RegionChart;
