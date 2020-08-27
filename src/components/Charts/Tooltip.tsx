import React from 'react';
import * as StyleTooltip from './Tooltip.style';

const Tooltip = ({
  title,
  subtitle,
  left,
  top,
  children,
  subtext,
  width,
}: {
  left: number;
  top: number;
  title?: string;
  subtitle?: string;
  children?: React.ReactNode;
  subtext?: string;
  width?: string;
}) => (
  <StyleTooltip.TooltipArrowDown style={{ top, left, width: width }}>
    {title && <StyleTooltip.Title>{title}</StyleTooltip.Title>}
    {subtitle && <StyleTooltip.Title>{subtitle}</StyleTooltip.Title>}
    {children}
    {subtext && <StyleTooltip.SubText>{subtext}</StyleTooltip.SubText>}
  </StyleTooltip.TooltipArrowDown>
);

export default Tooltip;
