import React from 'react';
import InfoTooltip from './InfoTooltip';
import TextTooltip from './TextTooltip';
import { TooltipProps } from '@material-ui/core/Tooltip';
import { EventAction, EventCategory, trackEvent } from 'components/Analytics';
import { StyledMarkdown, InfoIcon } from './Tooltip.style';

export { InfoTooltip, TextTooltip, InfoIcon };

export type StyledTooltipProps = Omit<TooltipProps, 'children'> & {
  trackOpenTooltip: () => void;
  mainCopy?: string;
};

export function renderTooltipContent(body: string): React.ReactElement {
  return <StyledMarkdown source={body} />;
}

export function tooltipAnchorOnClick(isMobile: boolean, onClick: () => void) {
  if (!isMobile) {
    return null;
  } else {
    onClick();
  }
}

export function trackOpenTooltip(label: string) {
  trackEvent(EventCategory.TOOLTIPS, EventAction.OPEN_TOOLTIP, label);
}

export function getLastUpdatedTooltipCopy(updatedDate: Date) {
  updatedDate.setUTCHours(17, 0, 0, 0);
  const tooltipCopy = `We've paused our weekly updates due to limited data. For now, please check your local health district's website for the latest wastewater surveillance data in your area.`;
  return tooltipCopy;
}
