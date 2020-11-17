import React from 'react';
import { Link, useLocation } from 'react-router-dom';
import Logo from 'assets/images/footerlogoDarkWithURL';
import { useEmbed } from 'common/utils/hooks';
import ExternalLink from 'components/ExternalLink';
import FooterSocialLinks from './FooterSocialLinks';
import {
  StyledFooter,
  StyledFooterContent,
  StyledFooterBodyLinks,
  StyledFooterInner,
  StyledFooterBodyNav,
  StyledFooterDivider,
} from './Footer.style';

const Footer = ({ children }: { children: React.ReactNode }) => {
  const { pathname } = useLocation();
  const isMapPage = pathname.startsWith('/us') || pathname.startsWith('/state');
  const { isEmbed } = useEmbed();

  if (isEmbed) {
    return null;
  }

  return (
    <div>
      <StyledFooter>
        <StyledFooterInner isMapPage={isMapPage}>
          <StyledFooterContent>
            <Logo />
            <StyledFooterBodyNav>
              <Link to="/">Map</Link>
              <Link to="/learn">Learn</Link>
              <Link to="/tools">Tools</Link>
              <ExternalLink href="https://blog.covidactnow.org">
                Blog
              </ExternalLink>
              <Link to="/about">About</Link>
              <Link to="/contact">Contact Us</Link>
            </StyledFooterBodyNav>
            <StyledFooterDivider />
            <StyledFooterBodyLinks>
              <FooterSocialLinks />
            </StyledFooterBodyLinks>
            <StyledFooterDivider />
            <StyledFooterBodyLinks>
              <Link to="/contact">Contact</Link>
              {' ∙ '}
              <Link to="/terms">Terms</Link>
              {' ∙ '}
              <a href="mailto:press@covidactnow.org">Press</a>
            </StyledFooterBodyLinks>
          </StyledFooterContent>
        </StyledFooterInner>
      </StyledFooter>
    </div>
  );
};

export default Footer;
