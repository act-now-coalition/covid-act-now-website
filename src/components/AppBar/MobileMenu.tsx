import React from 'react';
import { StyledMenu } from './AppBar.style';
import MapIcon from 'assets/images/mapIconTwoTone';
import FAQIcon from 'assets/images/faqIconTwoTone';
import EndorsementsIcon from 'assets/images/endorsementsIconTwoTone';
import BlogIcon from 'assets/images/blogIconTwoTone';
import palette from 'assets/theme/palette';

const MobileMenu = ({
  open,
  goTo,
  forwardTo,
}: {
  open: boolean;
  goTo: (route: string) => (e: React.MouseEvent) => void;
  forwardTo: (route: string) => (e: React.MouseEvent) => void;
}) => {
  return (
    <StyledMenu open={open}>
      <a onClick={goTo('/')} href="/">
        <MapIcon color={palette.secondary.main} />
        <span>Map</span>
      </a>
      <a onClick={goTo('/faq')} href="/faq">
        <FAQIcon color={palette.secondary.main} />
        <span>FAQ</span>
      </a>
      <a onClick={goTo('/endorsements')} href="/endorsements">
        <EndorsementsIcon color={palette.secondary.main} />
        <span>Endorsements</span>
      </a>
      <a
        onClick={forwardTo('https://blog.covidactnow.org')}
        href="https://blog.covidactnow.org"
      >
        <BlogIcon color={palette.secondary.main} />
        <span>Blog</span>
      </a>
    </StyledMenu>
  );
};

export default MobileMenu;
