import React, { useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { ClickAwayListener } from '@material-ui/core';
import ArrowBack from '@material-ui/icons/ArrowBack';
import Logo from 'assets/images/logo';
import MegaMenu from './MegaMenu/MegaMenu';
import * as Style from './NavBar.style';
import { useIsEmbed } from 'common/utils/hooks';
import { trackNavigation, trackMobileMenuOpen } from './utils';

const isLocationPage = (pathname: string) => pathname.includes('/us');

const NavBar: React.FC<{
  renderSearch?: () => React.ReactElement;
  renderSecondaryElement?: () => React.ReactElement;
}> = ({ renderSearch, renderSecondaryElement }) => {
  const [menuOpen, setMenuOpen] = useState(false);

  const isEmbed = useIsEmbed();

  const { pathname } = useLocation();

  const onClickHamburger = () => {
    const updatedIsOpen = !menuOpen;
    setMenuOpen(!menuOpen);
    if (updatedIsOpen) {
      trackMobileMenuOpen();
    }
  };

  const closeMenu = () => setMenuOpen(false);

  const onClickTopNavItem = (label: string) => {
    trackNavigation(label);
    closeMenu();
  };

  const menuProps = {
    open: menuOpen,
    closeMenu,
  };

  if (isEmbed) {
    return null;
  }

  return (
    <Style.AppBar position="sticky" color="transparent" elevation={0}>
      <Style.Toolbar>
        {isLocationPage(pathname) && (
          <Style.BackLink
            to="/"
            onClick={() => onClickTopNavItem('Back Home')}
            aria-label="Back to Covid Act Now"
          >
            <ArrowBack />
          </Style.BackLink>
        )}
        <Link
          to="/"
          style={{ display: 'inline-flex', zIndex: 10000 }}
          onClick={() => onClickTopNavItem('Home (Logo)')}
          aria-label="Covid Act Now"
        >
          <Logo />
        </Link>
        {renderSearch && renderSearch()}
        <Style.Spacer />
        <>
          {renderSecondaryElement && renderSecondaryElement()}
          <ClickAwayListener onClickAway={closeMenu}>
            <Style.IconButton onClick={onClickHamburger} edge="end">
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

export default NavBar;
