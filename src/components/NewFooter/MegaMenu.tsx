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

const MegaMenu: React.FC<{ open: boolean; closeMenu: () => void }> = ({
  open,
  closeMenu,
}) => {
  const isMobile = useBreakpoint(800);

  const onMouseLeave = (e: React.MouseEvent<{}>) => {
    // Do not close when the user hovers on the top bar (including the button to close the menu)
    if (e.clientY > 64) {
      closeMenu();
    }
  };

  return (
    <>
      {isMobile && <LockBodyScroll />}
      <Fade in={open}>
        <StyledMegaMenu
          role="contentinfo"
          open={open}
          onMouseLeave={onMouseLeave}
        >
          <MenuContent trackMenuEvent={trackFooterEvent} />
        </StyledMegaMenu>
      </Fade>
    </>
  );
};

export default MegaMenu;
