import React from 'react';
import Logo  from 'assets/images/logo';

import { useHistory } from 'react-router-dom';

import { 
  Wrapper,
  Content,
  StyledFooter,
  StyledFooterHeader,
  StyledFooterBody,
  StyledFooterBodyLinks,
  StyledFooterBodyCallout,
  StyledFooterCaption,
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
              <span onClick={() => goTo('/faq')}>FAQ</span>
              <span onClick={() => goTo('/endorsements')}>ENDORSEMENTS</span>
              <span onClick={() => goTo('/about')}>ABOUT</span>
            </div>
          </StyledFooterBodyLinks>
          <StyledFooterBodyCallout>
            If you have time to give us feedback or access to this expertise, have questions, or otherwise want to get involved, <a href="mailto:jonathan@covidactnow.org">please email us</a>
          </StyledFooterBodyCallout>
        </StyledFooterBody>
      </StyledFooter>
    </div>
  );
};

export default Footer;
