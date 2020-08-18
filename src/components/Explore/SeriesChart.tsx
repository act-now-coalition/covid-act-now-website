import React, { FunctionComponent } from 'react';
import { curveCardinalOpen } from '@vx/curve';
import { LinePath } from '@vx/shape';
import * as Style from './Explore.style';
import { ChartType } from './interfaces';
import { Column } from 'common/models/Projection';
import BarChart from 'components/Charts/BarChart';

const SeriesChart: FunctionComponent<{
  type: ChartType;
  data: Column[];
  x: (d: Column) => number;
  y: (d: Column) => number;
  yMax: number;
  barWidth: number;
}> = ({ type, data, x, y, yMax, barWidth }) => {
  switch (type) {
    case ChartType.LINE:
      return (
        <Style.MainSeriesLine>
          <LinePath data={data} x={x} y={y} curve={curveCardinalOpen} />
        </Style.MainSeriesLine>
      );
    case ChartType.BAR:
      return (
        <Style.BarsSeries>
          <BarChart data={data} x={x} y={y} yMax={yMax} barWidth={barWidth} />
        </Style.BarsSeries>
      );
  }
};

export const LegendMarker: React.FC<{ type: ChartType }> = ({ type }) => {
  // TODO(pablo): Transform into optional parameters
  const width = 12;
  const height = 12;
  const barWidth = 4;
  switch (type) {
    case ChartType.LINE:
      return (
        <svg width={width} height={height}>
          <Style.MainSeriesLine>
            <line x1={0} y1={height / 2} x2={width} y2={height / 2} />
          </Style.MainSeriesLine>
        </svg>
      );
    case ChartType.BAR:
      return (
        <svg width={width} height={height}>
          <Style.BarsSeries>
            <rect
              x={(width - barWidth) / 2}
              y={0}
              width={barWidth}
              height={height}
            />
          </Style.BarsSeries>
        </svg>
      );
  }
};

export default SeriesChart;
