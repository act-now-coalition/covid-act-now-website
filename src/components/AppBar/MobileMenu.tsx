import React from 'react';
import { Link } from 'react-router-dom';
import Fade from '@material-ui/core/Fade';
import MapIcon from 'assets/images/mapIconTwoTone';
import FAQIcon from 'assets/images/faqIconTwoTone';
import palette from 'assets/theme/palette';
import { StyledMenu } from './NavBar.style';
import { trackNavigation } from './utils';

const MobileMenu: React.FC<{
  open: boolean;
  closeMenu: () => void;
  onMouseLeave: (e: React.MouseEvent<{}>) => void;
}> = ({ open, closeMenu, onMouseLeave }) => {
  const onClick = (label: string) => {
    const isMobile = true;
    closeMenu();
    trackNavigation(label, isMobile);
  };

  return (
    <Fade in={open}>
      <StyledMenu onMouseLeave={onMouseLeave}>
        <Link to="/" onClick={() => onClick('Map')}>
          <MapIcon color={palette.secondary.main} />
          <span>Map</span>
        </Link>
        <Link to="/learn" onClick={() => onClick('Learn')}>
          <FAQIcon color={palette.secondary.main} />
          <span>FAQ</span>
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
    </Fade>
  );
};

export default MobileMenu;
