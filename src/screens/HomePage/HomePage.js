import React from 'react';
import HomePageHeader from 'components/Header/HomePageHeader';
import Map from 'components/Map/Map';
import AppMetaTags from 'components/AppMetaTags/AppMetaTags';
import ShareBlock from 'components/ShareBlock/ShareBlock';
import CriteriaExplanation from './CriteriaExplanation/CriteriaExplanation';
import PartnerLogoGrid from 'components/PartnerLogoGrid/PartnerLogoGrid';

import { Content, PartnerSection, PartnerHeader } from './HomePage.style';

export default function HomePage() {
  return (
    <>
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
            </Content>
          </PartnerSection>
          <ShareBlock />
        </div>
      </main>
    </>
  );
}
