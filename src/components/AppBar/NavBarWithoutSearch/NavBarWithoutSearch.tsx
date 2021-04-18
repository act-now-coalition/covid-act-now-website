/**
 * Navbar for the location page
 *
 * Unlike all other pages, the location page does not render search in the navbar
 */
import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { ClickAwayListener } from '@material-ui/core';
import ArrowBack from '@material-ui/icons/ArrowBack';
import Logo from 'assets/images/logo';
import MegaMenu from 'components/AppBar/MegaMenu/MegaMenu';
import * as Style from 'components/AppBar/NavBar.style';
import { useIsEmbed } from 'common/utils/hooks';
import { trackNavigation, trackMobileMenuOpen } from 'components/AppBar/utils';
import { useBreakpoint } from 'common/hooks';

const NavBarWithoutSearch: React.FC<{
  renderSecondaryElement: () => React.ReactElement;
}> = ({ renderSecondaryElement }) => {
  const [menuOpen, setMenuOpen] = useState(false);

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
    if (e.clientY > 64) {
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
        <Style.BackLink
          to="/"
          onClick={() => onClickTopNavItem('Back Home')}
          aria-label="Back to Covid Act Now"
        >
          <ArrowBack />
        </Style.BackLink>
        <Link
          to="/"
          style={{ display: 'inline-flex', zIndex: 10000 }}
          onClick={() => onClickTopNavItem('Home (Logo)')}
          aria-label="Covid Act Now"
        >
          <Logo />
        </Link>
        <Style.Spacer />
        <>
          {renderSecondaryElement()}
          <ClickAwayListener onClickAway={closeMenu}>
            <Style.IconButton
              onClick={onClickHamburger}
              edge="end"
              onMouseEnter={onHoverHamburger}
            >
              <Style.MenuLabel>Menu</Style.MenuLabel>
              {menuOpen ? <Style.CloseIcon /> : <Style.MenuIcon />}
            </Style.IconButton>
          </ClickAwayListener>
        </>
        <MegaMenu {...menuProps} />
      </Style.Toolbar>
    </Style.AppBar>
  );
};

export default NavBarWithoutSearch;
