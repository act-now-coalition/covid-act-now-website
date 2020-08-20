import React from 'react';
import * as StyleTooltip from './Tooltip.style';

const Tooltip = ({
  title,
  left,
  top,
  children,
  subtext,
  width,
}: {
  left: number;
  top: number;
  title?: string;
  children?: React.ReactNode;
  subtext?: string;
  width?: string;
}) => (
  <StyleTooltip.TooltipArrowDown style={{ top, left, width: width }}>
    {title && <StyleTooltip.Title>{title}</StyleTooltip.Title>}
    {children}
    {subtext && <StyleTooltip.SubText>{subtext}</StyleTooltip.SubText>}
  </StyleTooltip.TooltipArrowDown>
);

export default Tooltip;
