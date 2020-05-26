import React from 'react';
import { Group } from '@vx/group';

const DEFAULT_WIDTH = 20;
const DEFAULT_HEIGHT = 6;

export const LegendMarker: React.FunctionComponent<{
  width?: number;
  height?: number;
}> = ({ children, width = DEFAULT_WIDTH, height = DEFAULT_HEIGHT }) => (
  <svg width={width} height={height}>
    <Group top={height / 2}>{children}</Group>
  </svg>
);

export const LegendLine: React.FunctionComponent<{ width?: number }> = ({
  width = DEFAULT_WIDTH,
}) => <line x1={0} x2={width} y1={0} y2={0} />;
