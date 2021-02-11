import React from 'react';
import InfoTooltip from './InfoTooltip';
import DisclaimerTooltip from './DisclaimerTooltip';
import { TooltipProps } from '@material-ui/core/Tooltip';
import { StyledMarkdown } from './Tooltip.style';

export { InfoTooltip, DisclaimerTooltip };

export type StyledTooltipProps = Omit<TooltipProps, 'children'> & {
  mainCopy?: string;
};

export const renderTooltipContent = (body: string) => (
  <>
    <StyledMarkdown source={body} />
  </>
);
