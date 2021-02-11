import React from 'react';
import InfoTooltip from './InfoTooltip';
import DisclaimerTooltip from './DisclaimerTooltip';
import { TooltipProps } from '@material-ui/core/Tooltip';
import { StyledMarkdown } from './Tooltip.style';

export { InfoTooltip, DisclaimerTooltip };

export type StyledTooltipProps = Omit<TooltipProps, 'children'> & {
  mainCopy?: string;
};

/**
 * Mobile tooltip has a line break before the hyperlinked CTA. Desktop does not.
 */
export const renderTooltipContent = (body: string, cta?: string) => (
  <>
    <StyledMarkdown source={body} />
    <StyledMarkdown source={cta} />
  </>
);
