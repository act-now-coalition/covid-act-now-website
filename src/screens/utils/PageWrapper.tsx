import React from 'react';

import dynamic from 'next/dynamic';

//import NavBar from 'components/AppBar';
/*
const Footer = dynamic(() => import('components/NewFooter'), {
  ssr: false,
});
*/
/**
 * This is a wrapper component for pages which should have the navbar and the footer,
 * so we can avoid including them in the bundle for pages like embed which don't use them.
 */
const PageWrapper = ({ children }: { children?: React.ReactNode }) => {
  return (
    <>
      {/*<NavBar />*/}
      {children}
      {/*<Footer />*/}
    </>
  );
};

export default PageWrapper;
