import React from 'react';
import { StyledFooter } from './Menu.style';
import MenuContent from './MenuContent';
import { trackEvent, EventCategory, EventAction } from 'components/Analytics';
import { useIsEmbed } from 'common/utils/hooks';

const trackFooterEvent = (label: string) => {
  trackEvent(EventCategory.FOOTER, EventAction.NAVIGATE, label);
};

const Footer: React.FC = () => {
  const isEmbed = useIsEmbed();

  if (isEmbed) {
    return null;
  }

  return (
    <StyledFooter role="contentinfo">
      <MenuContent trackMenuEvent={trackFooterEvent} />
    </StyledFooter>
  );
};

export default Footer;
