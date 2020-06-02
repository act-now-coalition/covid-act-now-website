import React from 'react';
import { timeDay, timeMonth } from 'd3-time';
import { AxisBottom as VxAxisBottom, AxisLeft as VxAxisLeft } from '@vx/axis';
import { SharedAxisProps } from '@vx/axis/lib/types';
import { formatDate } from 'common/utils';
import * as Style from './Charts.style';

export const AxisLeft = (props: SharedAxisProps<number>) => (
  <Style.Axis>
    <VxAxisLeft {...props} hideAxisLine hideTicks hideZero />
  </Style.Axis>
);

export const AxisBottom = (props: SharedAxisProps<Date>) => {
  const [dateStart, dateStop] = props.scale.domain();
  const [minPx, maxPx] = props.scale.range() as number[];
  const isSmallDevice = maxPx - minPx < 600;
  const dateFormat = isSmallDevice ? 'MMMM' : 'MMM DD';

  const tickValues = isSmallDevice
    ? timeMonth.range(dateStart, dateStop, 1)
    : timeDay.range(dateStart, dateStop, 14);

  return (
    <Style.Axis>
      <VxAxisBottom
        {...props}
        tickValues={tickValues}
        tickFormat={date => formatDate(date, dateFormat)}
      />
    </Style.Axis>
  );
};
