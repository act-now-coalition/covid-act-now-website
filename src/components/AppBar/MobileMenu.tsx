import React from 'react';
import { StyledMenu } from './AppBar.style';
import MapIcon from 'assets/images/mapIconTwoTone';
import FAQIcon from 'assets/images/faqIconTwoTone';
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
      <a onClick={goTo('/about')} href="/about">
        <FAQIcon color={palette.secondary.main} />
        <span>About</span>
      </a>
      <a onClick={goTo('/products')} href="/products">
        <FAQIcon color={palette.secondary.main} />
        <span>Products</span>
      </a>
      <a
        onClick={forwardTo('https://blog.covidactnow.org')}
        href="https://blog.covidactnow.org"
      >
        <BlogIcon color={palette.secondary.main} />
        <span>Blog</span>
      </a>
      <a onClick={goTo('/contact')} href="/contact">
        <FAQIcon color={palette.secondary.main} />
        <span>Contact Us</span>
      </a>
    </StyledMenu>
  );
};

export default MobileMenu;
