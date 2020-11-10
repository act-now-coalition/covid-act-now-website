import React from 'react';
import { timeDay, timeMonth } from 'd3-time';
import { AxisBottom as VxAxisBottom, AxisLeft as VxAxisLeft } from '@vx/axis';
import { SharedAxisProps } from '@vx/axis/lib/types';
import { formatUtcDate } from 'common/utils';
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
  const dateFormat = isSmallDevice ? 'MMM' : 'MMM DD';

  const tickValues = isSmallDevice
    ? timeMonth.range(dateStart, dateStop, 2)
    : timeDay.range(dateStart, dateStop, 21);

  return (
    <Style.Axis>
      <VxAxisBottom
        {...props}
        tickValues={tickValues}
        tickFormat={date => formatUtcDate(date, dateFormat)}
      />
    </Style.Axis>
  );
};
