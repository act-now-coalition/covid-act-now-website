/**
 * Navbar for the location page.
 * Renders search+other items differently than on other pages.
 */
import React, { Fragment } from 'react';
import { Link } from 'react-router-dom';
import ArrowBack from '@material-ui/icons/ArrowBack';
import Logo from 'assets/images/logo';
import MegaMenu from 'components/NavBar/MegaMenu/MegaMenu';
import * as Style from 'components/NavBar/NavBar.style';
import { NavBarSearch } from 'components/NavBar';
import { trackNavigation, trackMobileMenuOpen } from 'components/NavBar/utils';
import { useIsEmbed } from 'common/utils/hooks';
import { useBreakpoint } from 'common/hooks';
import { Region } from 'common/regions';

const NavLocationPage: React.FC<{
  renderSecondaryElement: () => React.ReactElement;
  menuOpen: boolean;
  setMenuOpen: React.Dispatch<React.SetStateAction<boolean>>;
  hasScrolled: boolean;
  region: Region;
}> = ({
  renderSecondaryElement,
  menuOpen,
  setMenuOpen,
  hasScrolled,
  region,
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
              style={{ display: 'flex' }}
              to="/"
              onClick={() => onClickTopNavItem('Home (Logo)')}
              aria-label="Covid Act Now"
            >
              <Logo />
            </Link>
          </Style.GridItemLogo>
          <Style.GridItemSearch hasScrolled={hasScrolled}>
            <NavBarSearch
              menuOpen={menuOpen}
              WrappingDiv={Fragment}
              placeholder={
                hasScrolled ? region.shortName : 'City, county, state, or zip'
              }
              setMenuOpen={setMenuOpen}
            />
          </Style.GridItemSearch>
          <Style.GridItemSecondaryEl>
            {renderSecondaryElement()}
          </Style.GridItemSecondaryEl>
          <Style.GridItemMenuIcon>
            <Style.IconButton
              onClick={onClickHamburger}
              edge="end"
              onMouseEnter={onHoverHamburger}
            >
              <Style.MenuLabel>Menu</Style.MenuLabel>
              {menuOpen ? <Style.CloseIcon /> : <Style.MenuIcon />}
            </Style.IconButton>
          </Style.GridItemMenuIcon>
        </Style.GridContainer>
        <MegaMenu {...menuProps} />
      </Style.Toolbar>
    </Style.AppBar>
  );
};

export default NavLocationPage;
