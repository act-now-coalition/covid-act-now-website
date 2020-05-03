import React from 'react';
import { extent as d3extent } from 'd3-array';
import { scaleLinear, scaleTime } from '@vx/scale';
import { Group } from '@vx/group';
import { AxisBottom, AxisLeft } from '@vx/axis';
import LineChart from './LineChart';
import { RegionChartWrapper } from './RegionChart.style';

const RegionChart = ({
  width = 600,
  height = 400,
  marginLeft = 40,
  marginTop = 10,
  marginRight = 10,
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

  const [minX, maxX] = d3extent(data, x);
  const xScale = scaleTime({
    domain: [minX, maxX],
    range: [0, innerWidth],
  });

  const [minY, maxY] = d3extent(data, y);
  const yScale = scaleLinear({
    domain: [minY, maxY],
    range: [innerHeight, 0],
  });

  return (
    <RegionChartWrapper>
      <svg className="chart chart--region" width={width} height={height}>
        <Group left={marginLeft} top={marginTop}>
          <LineChart data={data} x={d => xScale(x(d))} y={d => yScale(y(d))} />
          <AxisBottom
            axisClassName="chart__axis"
            top={innerHeight}
            scale={xScale}
            numTicks={7}
          />
          <AxisLeft axisClassName="chart__axis" scale={yScale} />
        </Group>
      </svg>
    </RegionChartWrapper>
  );
};

export default RegionChart;
