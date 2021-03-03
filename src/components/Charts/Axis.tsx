import React from 'react';
import {
  AxisBottom as VxAxisBottom,
  AxisLeft as VxAxisLeft,
  AxisRight as VxAxisRight,
} from '@vx/axis';
import { SharedAxisProps } from '@vx/axis/lib/types';
import * as Style from './Charts.style';
import { getXTickFormat, getMobileDateTicks } from './utils';
import { useBreakpoint } from 'common/hooks';
import { ScaleTime } from 'd3-scale';

export const AxisLeft = (props: SharedAxisProps<number>) => (
  <Style.Axis>
    <VxAxisLeft {...props} hideAxisLine hideTicks hideZero />
  </Style.Axis>
);

export const AxisRight = (props: SharedAxisProps<number>) => (
  <Style.Axis>
    <VxAxisRight {...props} hideAxisLine hideTicks hideZero />
  </Style.Axis>
);

interface AxisBottomProps {
  scale: ScaleTime<number, number>;
  innerHeight: number;
  tickValues: Date[];
  showYear?: boolean;
}

export const AxisBottom: React.FC<AxisBottomProps> = ({
  scale,
  innerHeight,
  tickValues,
  showYear,
}) => {
  const isMobile = useBreakpoint(600);

  const finalTickValues = isMobile
    ? getMobileDateTicks(tickValues)
    : tickValues;

  return (
    <Style.Axis>
      <VxAxisBottom
        top={innerHeight}
        scale={scale}
        tickValues={finalTickValues}
        tickFormat={(d: Date) => getXTickFormat(d, isMobile, showYear)}
      />
    </Style.Axis>
  );
};
