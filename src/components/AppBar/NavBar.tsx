import React, { useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
import ArrowBack from '@material-ui/icons/ArrowBack';
import Logo from 'assets/images/logo';
import MegaMenu from './MegaMenu/MegaMenu';
import * as Style from './NavBar.style';
import { DonateButtonHeart } from './DonateButton';
import { useIsEmbed } from 'common/utils/hooks';
import { trackNavigation, trackMobileMenuOpen } from './utils';
import { useBreakpoint } from 'common/hooks';

const isLocationPage = (pathname: string) => pathname.includes('/us');

const NavBar: React.FC<{
  renderSearch?: () => React.ReactElement;
  renderSecondaryElement?: () => React.ReactElement;
}> = ({ renderSearch, renderSecondaryElement }) => {
  const [menuOpen, setMenuOpen] = useState(false);

  const isEmbed = useIsEmbed();

  const { pathname } = useLocation();

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
          {renderSecondaryElement ? (
            renderSecondaryElement()
          ) : (
            <DonateButtonHeart onClick={closeMenu} />
          )}
          <Style.IconButton
            onMouseEnter={onHoverHamburger}
            onClick={onClickHamburger}
            edge="end"
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

export default NavBar;
