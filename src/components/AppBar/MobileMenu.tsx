import React, { useContext } from 'react';
import { Link } from 'common/utils/router';
import Fade from '@material-ui/core/Fade';
import MapIcon from 'assets/images/mapIconTwoTone';
import FAQIcon from 'assets/images/faqIconTwoTone';
import { StyledMenu } from './NavBar.style';
import { trackNavigation } from './utils';
import { ThemeContext } from 'styled-components';

const MobileMenu: React.FC<{
  open: boolean;
  closeMenu: () => void;
  onMouseLeave: (e: React.MouseEvent<{}>) => void;
}> = ({ open, closeMenu, onMouseLeave }) => {
  const { palette } = useContext(ThemeContext);

  const onClick = (label: string) => {
    const isMobile = true;
    closeMenu();
    trackNavigation(label, isMobile);
  };

  return (
    <Fade in={open}>
      <StyledMenu onMouseLeave={onMouseLeave} role="navigation">
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
