import React from 'react';
import Fade from '@material-ui/core/Fade';
import { StyledMegaMenu } from './Menu.style';
import MenuContent from './MenuContent';
import { trackEvent, EventCategory, EventAction } from 'components/Analytics';
import { LockBodyScroll } from 'components/Dialog';
import { useBreakpoint } from 'common/hooks';

const MegaMenu: React.FC<{
  open: boolean;
  closeMenu: () => void;
  onMouseLeave: (e: React.MouseEvent<{}>) => void;
}> = ({ open, closeMenu, onMouseLeave }) => {
  const isMobile = useBreakpoint(800);

  const onClick = (label: string) => {
    closeMenu();
    trackEvent(EventCategory.TOP_NAVBAR, EventAction.NAVIGATE, label);
  };

  return (
    <>
      {isMobile && <LockBodyScroll />}
      <Fade in={open}>
        <StyledMegaMenu role="contentinfo" onMouseLeave={onMouseLeave}>
          <MenuContent onClick={onClick} />
        </StyledMegaMenu>
      </Fade>
    </>
  );
};

export default MegaMenu;
