import React from 'react';
import { TooltipWrapper, TooltipContent } from './Tooltip.style';

const Tooltip = ({
  left,
  top,
  children,
}: {
  left: number;
  top: number;
  children: React.ReactChild[];
}) => {
  return (
    <TooltipWrapper style={{ top, left }}>
      <TooltipContent>{children}</TooltipContent>
    </TooltipWrapper>
  );
};

export default Tooltip;
