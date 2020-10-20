import React, { useState, useMemo } from 'react';
import { Link, useLocation } from 'react-router-dom';
import Logo from 'assets/images/logo';
import Hidden from '@material-ui/core/Hidden';
import * as Style from './NavBar.style';
import { DonateButtonWithoutFade, DonateButtonWithFade } from './DonateButton';
import MobileMenu from './MobileMenu';
import { StyledMobileMenu } from './AppBar.style';
import MenuIcon from '@material-ui/icons/Menu';
import CloseIcon from '@material-ui/icons/Close';
import IconButton from '@material-ui/core/IconButton';
import ArrowBack from '@material-ui/icons/ArrowBack';

const isLocationPage = (pathname: string) => pathname.includes('/us');

const isHomeOrLocationPage = (pathname: string) =>
  ['/', '/alert_signup', '/compare'].includes(pathname) ||
  isLocationPage(pathname);

const NavBar: React.FC = () => {
  const [isMenuOpen, setMenuOpen] = useState(false);
  const closeMenu = () => setMenuOpen(false);

  // We only fade the donate button on the home page on mobile, where the donate
  // button doesn't appear until the banner is scrolled away.
  const { pathname } = useLocation();
  const MobileDonateButton = useMemo(() => {
    return isHomeOrLocationPage(pathname)
      ? DonateButtonWithFade
      : DonateButtonWithoutFade;
  }, [pathname]);

  return (
    <Style.AppBar position="sticky" color="transparent" elevation={0}>
      <Style.Toolbar>
        <Style.BackLink to="/">
          {isLocationPage(pathname) && <ArrowBack />}
        </Style.BackLink>
        <Link to="/">
          <Logo />
        </Link>
        <Style.Spacer />
        <Hidden smDown>
          <Style.NavLink
            to="/"
            key="map"
            activeClassName="active"
            isActive={(match, { pathname }) => isHomeOrLocationPage(pathname)}
          >
            Map
          </Style.NavLink>
          <Style.NavLink to="/about" key="about" activeClassName="active">
            About
          </Style.NavLink>
          <Style.NavLink
            to="/resources"
            key="resources"
            activeClassName="active"
          >
            Resources
          </Style.NavLink>
          <Style.TabLink href="https://blog.covidactnow.org" key="blog">
            Blog
          </Style.TabLink>
          <Style.NavLink to="/contact" key="contact" activeClassName="active">
            Contact Us
          </Style.NavLink>
          <DonateButtonWithoutFade />
        </Hidden>
        <Hidden mdUp>
          <StyledMobileMenu>
            <MobileDonateButton />
            <IconButton onClick={() => setMenuOpen(!isMenuOpen)}>
              {isMenuOpen ? <CloseIcon /> : <MenuIcon />}
            </IconButton>
          </StyledMobileMenu>
          <MobileMenu open={isMenuOpen} closeMenu={closeMenu} />
        </Hidden>
      </Style.Toolbar>
    </Style.AppBar>
  );
};

export default NavBar;
