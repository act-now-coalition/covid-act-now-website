import React, { FunctionComponent } from 'react';
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
          <LinePath data={data} x={x} y={y} />
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

export default SeriesChart;
