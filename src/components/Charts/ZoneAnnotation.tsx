import React from 'react';
import BoxedAnnotation from './BoxedAnnotation';
import * as Style from './Charts.style';

const ZoneAnnotation = ({
  color,
  name,
  isActive,
  x,
  y,
}: {
  color: string;
  name: string;
  isActive: boolean;
  x: number;
  y: number;
}) => (
  <Style.RegionAnnotation color={color} isActive={isActive}>
    <BoxedAnnotation x={x} y={y} text={name} />
  </Style.RegionAnnotation>
);

export default ZoneAnnotation;
