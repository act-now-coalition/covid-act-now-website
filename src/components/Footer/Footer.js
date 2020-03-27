import React from 'react';
import Logo from 'assets/images/logo';

import { useHistory } from 'react-router-dom';

import {
  StyledFooter,
  StyledFooterHeader,
  StyledFooterBody,
  StyledFooterBodyLinks,
  StyledFooterBodyCallout,
} from './Footer.style';

const Footer = ({ children }) => {
  const history = useHistory();

  const goTo = route => {
    history.push(route);

    window.scrollTo(0, 0);
  };

  return (
    <div>
      <StyledFooter>
        <StyledFooterHeader>
          <div></div>
          <Logo />
          <div></div>
        </StyledFooterHeader>
        <StyledFooterBody>
          <StyledFooterBodyLinks>
            <div>
              <span onClick={() => goTo('/')}>MAP</span>
              <span onClick={() => goTo('/about')}>ABOUT</span>
              <span onClick={() => goTo('/model')}>MODEL</span>
              <span onClick={() => goTo('/endorsements')}>ENDORSEMENTS</span>
              <span onClick={() => goTo('/contact')}>CONTACT</span>
            </div>
          </StyledFooterBodyLinks>
          <StyledFooterBodyCallout>
            Press contact:{' '}
            <a href="mailto:press@covidactnow.org">press@covidactnow.org</a>
            <br />
            <a href="https://forms.gle/JTCcqrGb5yzoD6hg6">Contribute</a> to this
            tool
          </StyledFooterBodyCallout>
        </StyledFooterBody>
      </StyledFooter>
    </div>
  );
};

export default Footer;
