import React, { useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
import ArrowBack from '@material-ui/icons/ArrowBack';
import Logo from 'assets/images/logo';
import MegaMenu from 'components/NewFooter/MegaMenu';
import * as Style from './NavBar.style';
import { DonateButtonHeart } from './DonateButton';
import { useIsEmbed } from 'common/utils/hooks';
import { trackNavigation, trackMobileMenuOpen } from './utils';
// import {
//   Experiment,
//   ExperimentID,
//   Variant,
//   VariantID,
// } from 'components/Experiment';

const isLocationPage = (pathname: string) => pathname.includes('/us');

// const isHomePage = (pathname: string) =>
//   ['/', '/alert_signup', '/compare'].includes(pathname);

// const isLearnPage = (pathname: string) =>
//   ['/glossary', '/faq', '/explained', '/learn'].includes(pathname) ||
//   pathname.startsWith('/case-studies') ||
//   pathname.startsWith('/covid-explained') ||
//   pathname.startsWith('/updates');

const NavBar: React.FC = () => {
  const [isMenuOpen, setMenuOpen] = useState(false);

  const isEmbed = useIsEmbed();

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
        <>
          <DonateButtonHeart />
          <Style.IconButton onClick={onClickHamburger} edge="end">
            {isMenuOpen ? <Style.CloseIcon /> : <Style.MenuIcon />}
          </Style.IconButton>
        </>
        <MegaMenu open={isMenuOpen} />
      </Style.Toolbar>
    </Style.AppBar>
  );
};

export default NavBar;
