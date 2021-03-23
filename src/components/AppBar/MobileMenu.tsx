import React from 'react';
import { Link } from 'react-router-dom';
import MapIcon from 'assets/images/mapIconTwoTone';
import FAQIcon from 'assets/images/faqIconTwoTone';
import palette from 'assets/theme/palette';
import { StyledMenu } from './NavBar.style';
import { trackNavigation } from './utils';

const MobileMenu: React.FC<{ open: boolean; closeMenu: () => void }> = ({
  open,
  closeMenu,
}) => {
  const onClick = (label: string) => {
    const isMobile = true;
    closeMenu();
    trackNavigation(label, isMobile);
  };

  const onMouseLeave = (e: React.MouseEvent<{}>) => {
    // Do not close when the user hovers on the top bar (including the button
    // to close the menu.
    if (e.clientY > 64) {
      closeMenu();
    }
  };

  return (
    <StyledMenu open={open} onMouseLeave={onMouseLeave}>
      <Link to="/" onClick={() => onClick('Map')}>
        <MapIcon color={palette.secondary.main} />
        <span>Map</span>
      </Link>
      <Link to="/learn" onClick={() => onClick('Learn')}>
        <FAQIcon color={palette.secondary.main} />
        <span>Learn</span>
      </Link>
      <Link to="/data-api" onClick={() => onClick('Data API')}>
        <FAQIcon color={palette.secondary.main} />
        <span>Data API</span>
      </Link>
      <Link to="/about" onClick={() => onClick('About')}>
        <FAQIcon color={palette.secondary.main} />
        <span>About</span>
      </Link>
    </StyledMenu>
  );
};

export default MobileMenu;
