import React from 'react';
import InfoTooltip from './InfoTooltip';
import DisclaimerTooltip from './DisclaimerTooltip';
import { TooltipProps } from '@material-ui/core/Tooltip';
import { StyledMarkdown } from './Tooltip.style';
import { EventAction, EventCategory, trackEvent } from 'components/Analytics';

export { InfoTooltip, DisclaimerTooltip };

export type StyledTooltipProps = Omit<TooltipProps, 'children'> & {
  trackOpenTooltip: any;
  trackCloseTooltip: any;
  mainCopy?: string;
};

export function renderTooltipContent(body: string): React.ReactElement {
  return <StyledMarkdown source={body} />;
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

export function trackOpenTooltip(label: string) {
  trackEvent(EventCategory.TOOLTIPS, EventAction.OPEN_TOOLTIP, label);
}

export function trackCloseTooltip(label: string) {
  trackEvent(EventCategory.TOOLTIPS, EventAction.CLOSE_TOOLTIP, label);
}
