import React from 'react';
import {
  StyledMenu,
} from './AppBar.style';

const MobileMenu = ({ open, goTo }) => {
  return (
    <StyledMenu open={open}>
      <a onClick={goTo('/')} href="/">
        Map
      </a>
      <a onClick={goTo('/about')} href="/about">
        About
      </a>
      <a onClick={goTo('/model')} href="/model">
        Model
      </a>
      <a onClick={goTo('/endorsements')} href="/endorsements">
        Endorsements
      </a>
    </StyledMenu>
  )
}

export default MobileMenu;
