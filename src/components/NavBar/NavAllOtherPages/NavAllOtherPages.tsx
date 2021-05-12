import React from 'react';
import { Link } from 'react-router-dom';
import Logo from 'assets/images/logo';
import MegaMenu from 'components/NavBar/MegaMenu/MegaMenu';
import * as Style from 'components/NavBar/NavBar.style';
import { useIsEmbed } from 'common/utils/hooks';
import { trackNavigation, trackMobileMenuOpen } from '../utils';
import { useBreakpoint } from 'common/hooks';

const NavAllOtherPages: React.FC<{
  renderSearch: (menuOpen: boolean) => React.ReactElement;
  renderSecondaryElement: () => React.ReactElement;
  menuOpen: boolean;
  setMenuOpen: React.Dispatch<React.SetStateAction<boolean>>;
}> = ({ renderSearch, renderSecondaryElement, menuOpen, setMenuOpen }) => {
  const isEmbed = useIsEmbed();

  const isMobile = useBreakpoint(800);

  const onClickHamburger = () => {
    const updatedIsOpen = !menuOpen;
    setMenuOpen(!menuOpen);
    if (updatedIsOpen) {
      trackMobileMenuOpen();
    }
  };

  const onHoverHamburger = () => {
    if (isMobile) {
      return;
    } else {
      if (!menuOpen) {
        setMenuOpen(true);
        trackMobileMenuOpen();
      }
    }
  };

  const closeMenu = () => setMenuOpen(false);

  const onMouseLeave = (e: React.MouseEvent<{}>) => {
    // Do not close when the user hovers on the top bar (including the button to close the menu)
    if (e.clientY > 84) {
      closeMenu();
    }
  };

  const onClickTopNavItem = (label: string) => {
    trackNavigation(label);
    closeMenu();
  };

  const menuProps = {
    open: menuOpen,
    closeMenu,
    onMouseLeave,
  };

  if (isEmbed) {
    return null;
  }

  return (
    <Style.AppBar position="sticky" color="transparent" elevation={0}>
      <Style.Toolbar>
        <Link
          to="/"
          style={{ display: 'inline-flex', zIndex: 10000 }}
          onClick={() => onClickTopNavItem('Home (Logo)')}
          aria-label="Covid Act Now"
        >
          <Logo />
        </Link>
        {renderSearch(menuOpen)}
        <Style.Spacer />
        <>
          {renderSecondaryElement()}
          <Style.IconButton
            onClick={onClickHamburger}
            edge="end"
            onMouseEnter={onHoverHamburger}
          >
            <Style.MenuLabel>Menu</Style.MenuLabel>
            {menuOpen ? <Style.CloseIcon /> : <Style.MenuIcon />}
          </Style.IconButton>
        </>
        <MegaMenu {...menuProps} />
      </Style.Toolbar>
    </Style.AppBar>
  );
};

export default NavAllOtherPages;
