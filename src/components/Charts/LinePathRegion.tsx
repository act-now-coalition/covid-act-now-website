import React from 'react';
import { curveNatural } from '@vx/curve';
import { CurveFactory } from 'd3-shape';
import { LinePath } from '@vx/shape';
import { Region } from './utils';
import RectClipGroup from './RectClipGroup';
import * as Style from './Charts.style';
import { Group } from '@vx/group';

const LinePathRegion = <T extends unknown>({
  data,
  width,
  regions,
  yScale,
  x,
  y,
  curve = curveNatural,
}: {
  data: T[];
  width: number;
  regions: Region[];
  yScale: (num: number) => number;
  x: (d: T) => number;
  y: (d: T) => number;
  curve?: CurveFactory;
}) => (
  <>
    {regions.map((region, i) => (
      <Group key={`chart-region-${i}`}>
        <Style.SeriesLine stroke={region.color}>
          <RectClipGroup
            y={yScale(region.valueTo)}
            width={width}
            height={yScale(region.valueFrom) - yScale(region.valueTo)}
          >
            <LinePath data={data} x={x} y={y} curve={curve} />
          </RectClipGroup>
        </Style.SeriesLine>
      </Group>
    ))}
  </>
);

export default LinePathRegion;
