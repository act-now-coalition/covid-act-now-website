import React, { useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
import ArrowBack from '@material-ui/icons/ArrowBack';
import Logo from 'assets/images/logo';
import MegaMenu from 'components/NewFooter/MegaMenu';
import MobileMenu from './MobileMenu';
import * as Style from './NavBar.style';
import { DonateButtonHeart } from './DonateButton';
import { useIsEmbed } from 'common/utils/hooks';
import { trackNavigation, trackMobileMenuOpen } from './utils';
import {
  Experiment,
  ExperimentID,
  Variant,
  VariantID,
} from 'components/Experiment';

const isLocationPage = (pathname: string) => pathname.includes('/us');

const MenuVariant: React.FC<{ isMenuOpen: boolean; closeMenu: () => void }> = ({
  isMenuOpen,
  closeMenu,
}) => {
  const onMouseLeave = (e: React.MouseEvent<{}>) => {
    // Do not close when the user hovers on the top bar (including the button to close the menu)
    if (e.clientY > 64) {
      closeMenu();
    }
  };

  const menuProps = {
    open: isMenuOpen,
    closeMenu,
    onMouseLeave,
  };

  return (
    <Experiment id={ExperimentID.HAMBURGER_MENU_VARIATIONS}>
      <Variant id={VariantID.A}>
        <MegaMenu {...menuProps} />
      </Variant>
      <Variant id={VariantID.B}>
        <MobileMenu {...menuProps} />
      </Variant>
    </Experiment>
  );
};

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

  const onHoverHamburger = () => {
    if (!isMenuOpen) {
      setMenuOpen(true);
      trackMobileMenuOpen();
    }
  };

  const closeMenu = () => setMenuOpen(false);

  return (
    <Style.AppBar position="sticky" color="transparent" elevation={0}>
      <Style.Toolbar>
        {isLocationPage(pathname) && (
          <Style.BackLink
            to="/"
            onClick={() => trackNavigation('Back Home')}
            aria-label="Back to Covid Act Now"
          >
            <ArrowBack />
          </Style.BackLink>
        )}
        <Link
          to="/"
          style={{ display: 'inline-flex' }}
          onClick={() => trackNavigation('Home (Logo)')}
          aria-label="Covid Act Now"
        >
          <Logo />
        </Link>
        <Style.Spacer />
        <>
          <DonateButtonHeart />
          <Style.IconButton
            onMouseEnter={onHoverHamburger}
            onClick={onClickHamburger}
            edge="end"
          >
            Menu
            {isMenuOpen ? <Style.CloseIcon /> : <Style.MenuIcon />}
          </Style.IconButton>
        </>
        <MenuVariant isMenuOpen={isMenuOpen} closeMenu={closeMenu} />
      </Style.Toolbar>
    </Style.AppBar>
  );
};

export default NavBar;
