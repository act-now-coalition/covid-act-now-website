import React from 'react';
import * as Style from './Charts.style';

const Tooltip = ({
  title,
  left,
  top,
  children,
}: {
  left: number;
  top: number;
  title?: string;
  children?: React.ReactNode;
}) => (
  <Style.Tooltip style={{ top, left }}>
    {title && <Style.TooltipTitle>{title}</Style.TooltipTitle>}
    {children && <Style.TooltipBody>{children}</Style.TooltipBody>}
  </Style.Tooltip>
);

export default Tooltip;
