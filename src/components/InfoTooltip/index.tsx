import React from 'react';
import InfoTooltip from './InfoTooltip';
import { TooltipProps } from '@material-ui/core/Tooltip';
import { StyledMarkdown, MobileOnly, DesktopOnly } from './Tooltip.style';

export { InfoTooltip };

export type StyledTooltipProps = Omit<TooltipProps, 'children'> & {
  description: string;
};

/**
 * Mobile tooltip has a line break before the hyperlinked CTA. Desktop does not.
 */
export const renderTooltipContent = (body: string, cta?: string) => (
  <>
    <MobileOnly>
      <StyledMarkdown source={body} />
      {cta && (
        <>
          <br />
          <StyledMarkdown source={cta} />
        </>
      )}
    </MobileOnly>

    <DesktopOnly>
      <StyledMarkdown source={cta ? `${body} ${cta}` : body} />
    </DesktopOnly>
  </>
);
