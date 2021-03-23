import React from 'react';
import Fade from '@material-ui/core/Fade';
import { StyledMegaMenu } from './Menu.style';
import MenuContent from './MenuContent';
import { trackEvent, EventCategory, EventAction } from 'components/Analytics';
import { LockBodyScroll } from 'components/Dialog';
import { useBreakpoint } from 'common/hooks';

const trackFooterEvent = (label: string) => {
  trackEvent(EventCategory.TOP_NAVBAR, EventAction.NAVIGATE, label);
};

const MegaMenu: React.FC<{ open: boolean }> = ({ open }) => {
  const isMobile = useBreakpoint(800);

  return (
    <>
      {isMobile && <LockBodyScroll />}
      <Fade in={open}>
        <StyledMegaMenu role="contentinfo" open={open}>
          <MenuContent trackMenuEvent={trackFooterEvent} />
        </StyledMegaMenu>
      </Fade>
    </>
  );
};

export default MegaMenu;
