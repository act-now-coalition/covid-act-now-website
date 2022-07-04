import React from 'react';
import RectClipGroup from './RectClipGroup';
import { CurveFactory, curveMonotoneX } from 'd3-shape';
import { LinePath } from '@vx/shape';
import { Region } from './utils';

const ZoneLinePath = <T extends unknown>({
  data,
  x,
  y,
  width,
  region,
  yScale,
  curve = curveMonotoneX,
}: {
  data: T[];
  x: (d: T) => number;
  y: (d: T) => number;
  width: number;
  region: Region;
  yScale: (num: number) => number;
  curve?: CurveFactory;
}) => (
  <RectClipGroup
    y={yScale(region.valueTo)}
    width={width}
    height={yScale(region.valueFrom) - yScale(region.valueTo)}
  >
    <LinePath data={data} x={x} y={y} curve={curve} />
  </RectClipGroup>
);

export default ZoneLinePath;
