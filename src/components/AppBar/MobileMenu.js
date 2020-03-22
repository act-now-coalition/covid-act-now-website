import React from 'react';
import { 
  StyledMenu,
} from './AppBar.style';

const MobileMenu = ({ open, goTo }) => {
  return (
    <StyledMenu open={open}>
      <a onClick={() => goTo('/')}>
        Map
      </a>
      <a onClick={() => goTo('/about')}>
        About
      </a>
      <a onClick={() => goTo('/model')}>
        Model
      </a>
      <a onClick={() => goTo('/endorsements')}>
        Endorsements
      </a>
    </StyledMenu>
  )
}

export default MobileMenu;
