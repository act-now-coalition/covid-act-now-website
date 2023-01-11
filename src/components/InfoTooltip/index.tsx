import React from 'react';
import InfoTooltip from './InfoTooltip';
import TextTooltip from './TextTooltip';
import { TooltipProps } from '@material-ui/core/Tooltip';
import { EventAction, EventCategory, trackEvent } from 'components/Analytics';
import { StyledMarkdown, InfoIcon } from './Tooltip.style';
import { DateFormat, formatDateTime } from '@actnowcoalition/time-utils';

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
  const updatedTimeStr = formatDateTime(updatedDate, DateFormat.H_A_ZZZZ);
  const tooltipCopy = `We aim to update our data by ${updatedTimeStr} daily. Occasionally, when additional review is required, an update can be delayed by several hours. Note that certain data sources that we use (e.g., ICU hospitalizations) are only updated once per week.`;
  return tooltipCopy;
}
