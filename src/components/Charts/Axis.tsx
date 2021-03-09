import React from 'react';
import { AxisBottom as VxAxisBottom, AxisLeft as VxAxisLeft } from '@vx/axis';
import { SharedAxisProps } from '@vx/axis/lib/types';
import * as Style from './Charts.style';
import { getXTickFormat, getFinalTicks } from './utils';
import { useBreakpoint } from 'common/hooks';
import { ScaleTime } from 'd3-scale';

export const AxisLeft = (props: SharedAxisProps<number>) => (
  <Style.Axis>
    <VxAxisLeft {...props} hideAxisLine hideTicks hideZero />
  </Style.Axis>
);

interface AxisBottomProps {
  scale: ScaleTime<number, number>;
  innerHeight: number;
  tickValues: Date[];
}

export const AxisBottom: React.FC<AxisBottomProps> = ({
  scale,
  innerHeight,
  tickValues,
}) => {
  const isMobile = useBreakpoint(960);
  const finalTickValues = getFinalTicks(isMobile, tickValues);

  return (
    <Style.Axis>
      <VxAxisBottom
        top={innerHeight}
        scale={scale}
        tickValues={finalTickValues}
        tickFormat={(d: Date) => getXTickFormat(d)}
      />
    </Style.Axis>
  );
};
