import React, { useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
import Logo from 'assets/images/logo';
import ArrowBack from '@material-ui/icons/ArrowBack';
import * as Style from './NavBar.style';
import MobileMenu from './MobileMenu';
import { DonateButton } from './DonateButton';
import { useIsEmbed } from 'common/utils/hooks';

const isLocationPage = (pathname: string) => pathname.includes('/us');

const isHomePage = (pathname: string) =>
  ['/', '/alert_signup', '/compare'].includes(pathname);

const isLearnPage = (pathname: string) =>
  ['/glossary', '/faq', '/explained', '/learn'].includes(pathname) ||
  pathname.startsWith('/case-studies') ||
  pathname.startsWith('/covid-explained') ||
  pathname.startsWith('/updates');

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

  return (
    <Style.AppBar position="sticky" color="transparent" elevation={0}>
      <Style.Toolbar>
        {isLocationPage(pathname) && (
          <Style.BackLink to="/">
            <ArrowBack />
          </Style.BackLink>
        )}
        <Link to="/" style={{ display: 'inline-flex' }}>
          <Logo />
        </Link>
        <Style.Spacer />
        <Style.DesktopOnly>
          <Style.NavLink
            to="/"
            key="map"
            isActive={(match, { pathname }) => isHomePage(pathname)}
          >
            Map
          </Style.NavLink>
          <Style.NavLink
            to="/learn"
            key="learn"
            isActive={(match, { pathname }) => isLearnPage(pathname)}
          >
            Learn
          </Style.NavLink>
          <Style.NavLink to="/data-api" key="data-api">
            Data API
          </Style.NavLink>
          <Style.NavLink to="/about" key="about">
            About
          </Style.NavLink>
          <DonateButton />
        </Style.DesktopOnly>
        <Style.MobileOnly>
          <Style.StyledMobileMenu>
            <DonateButton />
            <Style.IconButton
              onClick={() => setMenuOpen(!isMenuOpen)}
              edge="end"
            >
              {isMenuOpen ? <Style.CloseIcon /> : <Style.MenuIcon />}
            </Style.IconButton>
          </Style.StyledMobileMenu>
          <MobileMenu open={isMenuOpen} closeMenu={closeMenu} />
        </Style.MobileOnly>
      </Style.Toolbar>
    </Style.AppBar>
  );
};

export default NavBar;
