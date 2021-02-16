import React from 'react';
import InfoTooltip from './InfoTooltip';
import DisclaimerTooltip from './DisclaimerTooltip';
import { TooltipProps } from '@material-ui/core/Tooltip';
import { StyledMarkdown } from './Tooltip.style';

export { InfoTooltip, DisclaimerTooltip };

export type StyledTooltipProps = Omit<TooltipProps, 'children'> & {
  mainCopy?: string;
};

export function renderTooltipContent(body: string): React.ReactElement {
  return (
    <>
      <StyledMarkdown source={body} />
    </>
  );
}

export function tooltipAnchorOnClick(
  isMobile: boolean,
  setIsOpen: React.Dispatch<React.SetStateAction<boolean>>,
) {
  if (!isMobile) {
    return null;
  } else {
    setIsOpen(true);
  }
}
