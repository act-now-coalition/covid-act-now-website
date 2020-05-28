import React from 'react';
import HomePageHeader from 'components/Header/HomePageHeader';
import Map from 'components/Map/Map';
import AppMetaTags from 'components/AppMetaTags/AppMetaTags';
import EnsureSharingIdInUrl from 'components/EnsureSharingIdInUrl';
import ShareBlock from 'components/ShareBlock/ShareBlock';
import CriteriaExplanation from './CriteriaExplanation/CriteriaExplanation';
import { PartnerLogoGrid, PressLogoGrid } from 'components/LogoGrid/LogoGrid';

import {
  Content,
  FeaturedHeader,
  PartnerSection,
  PartnerHeader,
} from './HomePage.style';

export default function HomePage() {
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
          <ShareBlock />
        </div>
      </main>
    </>
  );
}
