import React from 'react';
import { StyledFooter } from './Menu.style';
import MenuContent from './MenuContent';
import { trackEvent, EventCategory, EventAction } from 'components/Analytics';

const trackFooterEvent = (label: string) => {
  trackEvent(EventCategory.FOOTER, EventAction.NAVIGATE, label);
};

const Footer: React.FC = () => {
  return (
    <StyledFooter role="contentinfo">
      <MenuContent trackMenuEvent={trackFooterEvent} />
    </StyledFooter>
  );
};

export default Footer;
