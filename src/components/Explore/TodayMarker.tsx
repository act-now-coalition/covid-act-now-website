import React, { Fragment } from 'react';
import { Line } from '@vx/shape';
import { ScaleTime } from 'd3-scale';
import * as ChartStyle from 'components/Charts/Charts.style';
import * as Styles from './Explore.style';

const TodayMarker: React.FC<{
  dateScale: ScaleTime<number, number>;
  height: number;
  strokeColor: string;
}> = ({ dateScale, height, strokeColor }) => {
  const today = new Date();
  return (
    <Fragment>
      <ChartStyle.LineGrid exploreStroke={strokeColor}>
        <Line x1={dateScale(today)} x2={dateScale(today)} y1={0} y2={height} />
      </ChartStyle.LineGrid>
      <Styles.TodayLabel>
        <text x={dateScale(today)} y={height} dy={21}>
          Today
        </text>
      </Styles.TodayLabel>
    </Fragment>
  );
};

export default TodayMarker;
