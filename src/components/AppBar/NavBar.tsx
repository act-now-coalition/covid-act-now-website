import React, { useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
import Fade from '@material-ui/core/Fade';
import ArrowBack from '@material-ui/icons/ArrowBack';
import CloseIcon from '@material-ui/icons/Close';
import MenuIcon from '@material-ui/icons/Menu';
import Logo from 'assets/images/logo';
import * as Style from './NavBar.style';
import MobileMenu from './MobileMenu';
import { DonateButton, DonateButtonHeart } from './DonateButton';
import MenuButton from './MenuButton';
import { useIsEmbed } from 'common/utils/hooks';
import { trackNavigation, trackMobileMenuOpen } from './utils';
import {
  Experiment,
  ExperimentID,
  Variant,
  VariantID,
} from 'components/Experiment';

const isLocationPage = (pathname: string) => pathname.includes('/us');

const isHomePage = (pathname: string) =>
  ['/', '/alert_signup', '/compare'].includes(pathname);

const isLearnPage = (pathname: string) =>
  ['/glossary', '/faq', '/explained', '/learn'].includes(pathname) ||
  pathname.startsWith('/case-studies') ||
  pathname.startsWith('/covid-explained') ||
  pathname.startsWith('/updates');

const DesktopMenuItems: React.FC = () => (
  <>
    <Style.NavLink
      to="/"
      key="map"
      isActive={(match, { pathname }) => isHomePage(pathname)}
      onClick={() => trackNavigation('Map')}
    >
      Map
    </Style.NavLink>
    <Style.NavLink
      to="/learn"
      key="learn"
      isActive={(match, { pathname }) => isLearnPage(pathname)}
      onClick={() => trackNavigation('Learn')}
    >
      Learn
    </Style.NavLink>
    <Style.NavLink
      to="/data-api"
      key="data-api"
      onClick={() => trackNavigation('Data API')}
    >
      Data API
    </Style.NavLink>
    <Style.NavLink
      to="/about"
      key="about"
      onClick={() => trackNavigation('About')}
    >
      About
    </Style.NavLink>
  </>
);

const NavBar: React.FC = () => {
  const [isMenuOpen, setMenuOpen] = useState(false);
  const closeMenu = () => setMenuOpen(false);

  const isEmbed = useIsEmbed();

  // We only fade the donate button on the home page on mobile, where the donate
  // button doesn't appear until the banner is scrolled away.
  const { pathname } = useLocation();

  if (isEmbed) {
    return null;
  }

  const onClickHamburger = () => {
    const updatedIsOpen = !isMenuOpen;
    setMenuOpen(!isMenuOpen);
    if (updatedIsOpen) {
      trackMobileMenuOpen();
    }
  };

  const onHoverHamburger = () => {
    if (!isMenuOpen) {
      setMenuOpen(true);
      trackMobileMenuOpen();
    }
  };

  return (
    <Style.AppBar position="sticky" color="transparent" elevation={0}>
      <Style.Toolbar>
        {isLocationPage(pathname) && (
          <Style.BackLink to="/" onClick={() => trackNavigation('Back Home')}>
            <ArrowBack />
          </Style.BackLink>
        )}
        <Link
          to="/"
          style={{ display: 'inline-flex' }}
          onClick={() => trackNavigation('Home (Logo)')}
        >
          <Logo />
        </Link>
        <Style.Spacer />

        <Experiment id={ExperimentID.HAMBURGER_MENU_DESKTOP}>
          <Variant id={VariantID.A}>
            <Style.DesktopOnly breakPoint={800}>
              <DesktopMenuItems />
              <DonateButton />
            </Style.DesktopOnly>
            <Style.MobileOnly breakPoint={800}>
              <Style.StyledMobileMenu>
                <DonateButton />
                <Style.IconButton
                  onClick={onClickHamburger}
                  onMouseEnter={onHoverHamburger}
                  edge="end"
                >
                  {isMenuOpen ? <Style.CloseIcon /> : <Style.MenuIcon />}
                </Style.IconButton>
              </Style.StyledMobileMenu>
              <Fade in={isMenuOpen}>
                <MobileMenu open={isMenuOpen} closeMenu={closeMenu} />
              </Fade>
            </Style.MobileOnly>
          </Variant>
          <Variant id={VariantID.B}>
            <Style.DesktopOnly breakPoint={1350}>
              <DesktopMenuItems />
            </Style.DesktopOnly>
            <Style.MobileOnly breakPoint={1350}>
              <Style.StyledMobileMenu>
                <Style.ExperimentButtonsContainer>
                  <DonateButtonHeart />
                  <MenuButton
                    onClick={onClickHamburger}
                    onMouseEnter={onHoverHamburger}
                    edge="end"
                    endIcon={isMenuOpen ? <CloseIcon /> : <MenuIcon />}
                  >
                    Menu
                  </MenuButton>
                </Style.ExperimentButtonsContainer>
              </Style.StyledMobileMenu>
              <Fade in={isMenuOpen}>
                <MobileMenu open={isMenuOpen} closeMenu={closeMenu} />
              </Fade>
            </Style.MobileOnly>
          </Variant>
        </Experiment>
      </Style.Toolbar>
    </Style.AppBar>
  );
};

export default NavBar;
