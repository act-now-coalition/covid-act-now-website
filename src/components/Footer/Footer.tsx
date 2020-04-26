import React from 'react';
import Logo from 'assets/images/footerlogoDarkWithURL';
import { useHistory, useLocation } from 'react-router-dom';

import { useEmbed } from 'utils/hooks';

import FooterSocialLinks from './FooterSocialLinks';
import {
  StyledFooter,
  StyledFooterContent,
  StyledFooterBodyLinks,
  StyledFooterInner,
  StyledFooterBodyNav,
  StyledFooterBodyButton,
  StyledFooterDivider,
} from './Footer.style';

const FooterButton = (props: { className: string }) => (
  <StyledFooterBodyButton
    href="https://forms.gle/JTCcqrGb5yzoD6hg6"
    target="_blank"
    {...props}
  >
    Contribute to this tool
  </StyledFooterBodyButton>
);

const Footer = ({ children }: { children: React.ReactNode }) => {
  const history = useHistory();
  const { pathname } = useLocation();

  const isMapPage = pathname.startsWith('/us') || pathname.startsWith('/state');

  const goTo = (route: string) => {
    history.push(route);

    window.scrollTo(0, 0);
  };

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
              <span onClick={() => goTo('/')}>Map</span>
              <span onClick={() => goTo('/about')}>About</span>
              <span onClick={() => goTo('/products')}>Products</span>
              <span
                onClick={() =>
                  window.open('https://blog.covidactnow.org', '_blank')
                }
              >
                Blog
              </span>
              <span onClick={() => goTo('/contact')}>Contact Us</span>
            </StyledFooterBodyNav>
            <FooterButton className="footer__narrow-screen-only" />
            <StyledFooterDivider />
            <StyledFooterBodyLinks>
              <FooterSocialLinks />
            </StyledFooterBodyLinks>
            <StyledFooterDivider />
            <StyledFooterBodyLinks>
              <span onClick={() => goTo('/contact')}>Contact</span>
              {' ∙ '}
              <span onClick={() => goTo('/terms')}>Terms</span>
              {' ∙ '}
              <a href="mailto:press@covidactnow.org">Press</a>
            </StyledFooterBodyLinks>
          </StyledFooterContent>
          <FooterButton className="footer__wide-screen-only" />
        </StyledFooterInner>
      </StyledFooter>
    </div>
  );
};

export default Footer;
