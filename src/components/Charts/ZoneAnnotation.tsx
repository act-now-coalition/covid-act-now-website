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
    {/* An x of 4 accounts for the annotation box's 2px of padding, and then some */}
    <BoxedAnnotation x={4} y={y} text={name} />
  </Style.RegionAnnotation>
);

export default ZoneAnnotation;
