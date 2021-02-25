import React from 'react';
import { Link, useLocation } from 'react-router-dom';
import Logo from 'assets/images/footerlogoDarkWithURL';
import { useIsEmbed } from 'common/utils/hooks';
import FooterSocialLinks from './FooterSocialLinks';
import {
  StyledFooter,
  StyledFooterContent,
  StyledFooterBodyLinks,
  StyledFooterInner,
  StyledFooterBodyNav,
  StyledFooterDivider,
} from './Footer.style';

const Footer = () => {
  const { pathname } = useLocation();
  const isMapPage = pathname.startsWith('/us') || pathname.startsWith('/state');
  const isEmbed = useIsEmbed();

  if (isEmbed) {
    return null;
  }

  return (
    <StyledFooter>
      <StyledFooterInner isMapPage={isMapPage}>
        <StyledFooterContent>
          <Logo />
          <StyledFooterBodyNav>
            <Link to="/">Map</Link>
            <Link to="/learn">Learn</Link>
            <Link to="/data-api">Data API</Link>
            <Link to="/about">About</Link>
          </StyledFooterBodyNav>
          <StyledFooterDivider />
          <StyledFooterBodyLinks>
            <FooterSocialLinks />
          </StyledFooterBodyLinks>
          <StyledFooterDivider />
          <StyledFooterBodyLinks>
            <Link to="/about#contact-us">Contact</Link>
            {' ∙ '}
            <Link to="/terms">Terms</Link>
            {' ∙ '}
            <a href="mailto:press@covidactnow.org">Press</a>
          </StyledFooterBodyLinks>
        </StyledFooterContent>
      </StyledFooterInner>
    </StyledFooter>
  );
};

export default Footer;
