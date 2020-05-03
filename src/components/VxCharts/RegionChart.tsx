import React from 'react';
import { isUndefined as _isUndefined } from 'lodash';
import { extent as d3extent } from 'd3-array';
import { scaleLinear, scaleTime } from '@vx/scale';
import { Group } from '@vx/group';
import { AxisBottom, AxisLeft } from '@vx/axis';
import AreaRangeChart from './AreaRangeChart';
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
  y0,
  y1,
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

  const areaRangeChart =
    _isUndefined(y0) || _isUndefined(y1) ? null : (
      <AreaRangeChart
        data={data}
        x={d => xScale(x(d))}
        y0={d => yScale(y0(d))}
        y1={d => yScale(y1(d))}
      />
    );

  return (
    <RegionChartWrapper>
      <svg className="chart chart--region" width={width} height={height}>
        <Group left={marginLeft} top={marginTop}>
          {areaRangeChart}
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
