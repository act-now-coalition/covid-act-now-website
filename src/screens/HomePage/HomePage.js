import React, { useRef, useEffect } from 'react';
import HomePageHeader from 'components/Header/HomePageHeader';
import Map from 'components/Map/Map';
import AppMetaTags from 'components/AppMetaTags/AppMetaTags';
import EnsureSharingIdInUrl from 'components/EnsureSharingIdInUrl';
import ShareModelBlock from 'components/ShareBlock/ShareModelBlock';
import CriteriaExplanation from './CriteriaExplanation/CriteriaExplanation';
import { PartnerLogoGrid, PressLogoGrid } from 'components/LogoGrid/LogoGrid';
import { useLocation } from 'react-router-dom';

import {
  Content,
  FeaturedHeader,
  PartnerSection,
  PartnerHeader,
} from './HomePage.style';

// TODO: 180 is rough accounting for the navbar and searchbar;
// could make these constants so we don't have to manually update
const scrollTo = (div, offset = 80) =>
  div &&
  window.scrollTo({
    left: 0,
    top: div.offsetTop + offset,
    behavior: 'smooth',
  });

export default function HomePage() {
  const shareBlockRef = useRef(null);
  const location = useLocation();

  useEffect(() => {
    if (location.pathname.includes('alert_signup') && shareBlockRef.current) {
      scrollTo(shareBlockRef.current);
    }
  }, [location.pathname, shareBlockRef]);

  return (
    <>
      <EnsureSharingIdInUrl />
      <AppMetaTags
        canonicalUrl="/"
        pageTitle={undefined}
        pageDescription="Real-time modeling and metrics to understand where we stand against COVID. 50 states. 2,100+ counties. Click the map to dive in"
      />
      <HomePageHeader />
      <main>
        <div className="App">
          <Content>
            <CriteriaExplanation />
            <Map />
          </Content>
          <PartnerSection>
            <Content>
              <PartnerHeader>Our Partners</PartnerHeader>
              <PartnerLogoGrid />
              <FeaturedHeader>Featured In</FeaturedHeader>
              <PressLogoGrid />
            </Content>
          </PartnerSection>
          <div ref={shareBlockRef}>
            <ShareModelBlock />
          </div>
        </div>
      </main>
    </>
  );
}
