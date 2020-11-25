import React, { useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
import Logo from 'assets/images/logo';
import ArrowBack from '@material-ui/icons/ArrowBack';
import * as Style from './NavBar.style';
import MobileMenu from './MobileMenu';
import { DonateButtonWithoutFade } from './DonateButton';
import { useEmbed } from 'common/utils/hooks';

const isLocationPage = (pathname: string) => pathname.includes('/us');

const isHomePage = (pathname: string) =>
  ['/', '/alert_signup', '/compare'].includes(pathname);

const isLearnPage = (pathname: string) =>
  ['/glossary', '/faq', '/explained'].includes(pathname) ||
  pathname.startsWith('/case-studies') ||
  pathname.startsWith('/deep-dives');

const NavBar: React.FC = () => {
  const [isMenuOpen, setMenuOpen] = useState(false);
  const closeMenu = () => setMenuOpen(false);

  const { isEmbed } = useEmbed();

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
            to="/explained"
            key="explained"
            isActive={(match, { pathname }) => isLearnPage(pathname)}
          >
            Explained
          </Style.NavLink>
          <Style.NavLink to="/tools" key="tools">
            Tools
          </Style.NavLink>
          <Style.TabLink href="https://blog.covidactnow.org" key="blog">
            Blog
          </Style.TabLink>
          <Style.NavLink to="/about" key="about">
            About
          </Style.NavLink>
          <Style.NavLink to="/contact" key="contact">
            Contact Us
          </Style.NavLink>
          <DonateButtonWithoutFade />
        </Style.DesktopOnly>
        <Style.MobileOnly>
          <Style.StyledMobileMenu>
            <DonateButtonWithoutFade />
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
