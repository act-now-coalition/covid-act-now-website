/**
 * Navbar for the location page.
 * Renders search+other items differently than on other pages.
 */
import React from 'react';
import { Link } from 'react-router-dom';
import { ClickAwayListener } from '@material-ui/core';
import ArrowBack from '@material-ui/icons/ArrowBack';
import Logo from 'assets/images/logo';
import MegaMenu from 'components/NavBar/MegaMenu/MegaMenu';
import * as Style from 'components/NavBar/NavBar.style';
import { useIsEmbed } from 'common/utils/hooks';
import { trackNavigation, trackMobileMenuOpen } from 'components/NavBar/utils';
import { useBreakpoint } from 'common/hooks';

const NavLocationPage: React.FC<{
  renderSearch: (menuOpen: boolean) => React.ReactElement;
  renderSecondaryElement: () => React.ReactElement;
  menuOpen: boolean;
  setMenuOpen: React.Dispatch<React.SetStateAction<boolean>>;
  hasScrolled: boolean;
}> = ({
  renderSearch,
  renderSecondaryElement,
  menuOpen,
  setMenuOpen,
  hasScrolled,
}) => {
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
        <Style.GridContainer>
          <Style.GridItemBackLink>
            <Style.BackLink
              to="/"
              onClick={() => onClickTopNavItem('Back Home')}
              aria-label="Back to Covid Act Now"
            >
              <ArrowBack />
            </Style.BackLink>
          </Style.GridItemBackLink>
          <Style.GridItemLogo hasScrolled={hasScrolled}>
            <Link
              to="/"
              onClick={() => onClickTopNavItem('Home (Logo)')}
              aria-label="Covid Act Now"
            >
              <Logo />
            </Link>
          </Style.GridItemLogo>
          <Style.GridItemSearch hasScrolled={hasScrolled}>
            {renderSearch(menuOpen)}
          </Style.GridItemSearch>
          <Style.GridItemSecondaryEl>
            {renderSecondaryElement()}
          </Style.GridItemSecondaryEl>
          <Style.GridItemMenuIcon>
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
          </Style.GridItemMenuIcon>
        </Style.GridContainer>
        <MegaMenu {...menuProps} />
      </Style.Toolbar>
    </Style.AppBar>
  );
};

export default NavLocationPage;
