import React, { Fragment } from 'react';
import { Line } from '@vx/shape';
import { ScaleTime } from 'd3-scale';
// import * as ChartStyle from 'components/Charts/Charts.style';
import { Grid as GridStyle, TodayLabel } from './Explore.style';

const TodayMarker: React.FC<{
  dateScale: ScaleTime<number, number>;
  height: number;
}> = ({ dateScale, height }) => {
  const today = new Date();
  return (
    <Fragment>
      <GridStyle>
        <Line x1={dateScale(today)} x2={dateScale(today)} y1={0} y2={height} />
      </GridStyle>
      <TodayLabel>
        <text x={dateScale(today)} y={height} dy={21}>
          Today
        </text>
      </TodayLabel>
    </Fragment>
  );
};

export default TodayMarker;
