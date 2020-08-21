import React, { FunctionComponent } from 'react';
import { curveCardinalOpen } from '@vx/curve';
import { LinePath } from '@vx/shape';
import * as Styles from './Explore.style';
import { ChartType } from './interfaces';
import { Column } from 'common/models/Projection';
import BarChart from 'components/Charts/BarChart';
import { findPointByDate } from './utils';

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
        <Styles.MainSeriesLine>
          <LinePath data={data} x={x} y={y} curve={curveCardinalOpen} />
        </Styles.MainSeriesLine>
      );
    case ChartType.BAR:
      return (
        <Styles.BarsSeries>
          <BarChart data={data} x={x} y={y} yMax={yMax} barWidth={barWidth} />
        </Styles.BarsSeries>
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
          <Styles.MainSeriesLine>
            <line x1={0} y1={height / 2} x2={width} y2={height / 2} />
          </Styles.MainSeriesLine>
        </svg>
      );
    case ChartType.BAR:
      return (
        <svg width={width} height={height}>
          <Styles.BarsSeries>
            <rect
              x={(width - barWidth) / 2}
              y={0}
              width={barWidth}
              height={height}
            />
          </Styles.BarsSeries>
        </svg>
      );
  }
};

export const SeriesMarker: React.FC<{
  type: ChartType;
  data: Column[];
  date: Date;
  x: (d: Column) => number;
  y: (d: Column) => number;
  yMax: number;
  barWidth: number;
}> = ({ type, data, date, x, y, yMax, barWidth }) => {
  const point = findPointByDate(data, date);
  if (!point) {
    return null;
  }
  switch (type) {
    case ChartType.LINE:
      return <Styles.DotMarker cx={x(point)} cy={y(point)} r={6} />;
    case ChartType.BAR:
      return (
        <Styles.BarsSeries>
          <BarChart
            data={[point]}
            x={x}
            y={y}
            yMax={yMax}
            barWidth={barWidth}
          />
        </Styles.BarsSeries>
      );
  }
};

export default SeriesChart;
