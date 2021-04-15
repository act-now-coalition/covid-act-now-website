import React from 'react';
import Fade from '@material-ui/core/Fade';
import { StyledMegaMenu } from './MegaMenu.style';
import MenuContent from 'components/MenuContent';
import { trackEvent, EventCategory, EventAction } from 'components/Analytics';
import { LockBodyScroll } from 'components/Dialog';
import { useBreakpoint } from 'common/hooks';

const MegaMenu: React.FC<{
  open: boolean;
  closeMenu: () => void;
}> = ({ open, closeMenu }) => {
  const isMobile = useBreakpoint(800);

  const onClick = (label: string) => {
    closeMenu();
    trackEvent(EventCategory.TOP_NAVBAR, EventAction.NAVIGATE, label);
  };

  return (
    <>
      {isMobile && open && <LockBodyScroll />}
      <Fade in={open}>
        <StyledMegaMenu role="navigation">
          <MenuContent onClick={onClick} />
        </StyledMegaMenu>
      </Fade>
    </>
  );
};

export default MegaMenu;
