import React from 'react';

import NavBar from 'components/AppBar';
import Footer from 'components/NewFooter';
/**
 * This is a wrapper component for pages which should have the navbar and the footer,
 * so we can avoid including them in the bundle for pages like embed which don't use them.
 */
const PageWrapper = ({ children }: { children?: React.ReactNode }) => {
  return (
    <>
      <NavBar />
      {children}
      <Footer />
    </>
  );
};

export default PageWrapper;
