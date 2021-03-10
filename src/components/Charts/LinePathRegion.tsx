import React from 'react';
import { curveNatural } from '@vx/curve';
import { CurveFactory } from 'd3-shape';
import { LinePath } from '@vx/shape';
import { Region } from './utils';
import RectClipGroup from './RectClipGroup';
import * as Style from './Charts.style';
import * as QueryString from 'query-string';
import { Group } from '@vx/group';
import { useHistory } from 'react-router-dom';

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
}) => {
  const history = useHistory();
  const params = QueryString.parse(history.location.search);
  const lineWidth = Number(params['s'] || 4);
  return (
    <>
      {regions.map((region, i) => (
        <Group key={`chart-region-${i}`}>
          <Style.SeriesLine stroke={region.color} strokeWidth={lineWidth}>
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
};

export default LinePathRegion;
