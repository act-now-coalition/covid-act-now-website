import React from 'react';
import { AxisBottom as VxAxisBottom, AxisLeft as VxAxisLeft } from '@vx/axis';
import { SharedAxisProps } from '@vx/axis/lib/types';
import * as Style from './Charts.style';
import { getXTickFormat } from './utils';
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
  showYear?: boolean;
}

export const AxisBottom: React.FC<AxisBottomProps> = props => {
  const isMobile = useBreakpoint(600);

  return (
    <Style.Axis>
      <VxAxisBottom
        top={props.innerHeight}
        scale={props.scale}
        tickValues={props.tickValues}
        tickFormat={(d: Date) => getXTickFormat(d, isMobile, props.showYear)}
      />
    </Style.Axis>
  );
};
