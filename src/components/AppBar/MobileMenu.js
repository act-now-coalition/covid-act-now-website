import React from 'react';
import { StyledMenu } from './AppBar.style';

const MobileMenu = ({ open, goTo, forwardTo }) => {
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
      <a onClick={goTo('/contact')} href="/contact">
        Contact
      </a>
      <a
        onClick={forwardTo('https://blog.covidactnow.org')}
        href="https://blog.covidactnow.org"
      >
        Blog
      </a>
    </StyledMenu>
  );
};

export default MobileMenu;
