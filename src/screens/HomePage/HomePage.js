import React from 'react';
import HomePageHeader from 'components/Header/HomePageHeader';
import Map from 'components/Map/Map';
import AppMetaTags from 'components/AppMetaTags/AppMetaTags';
import ShareBlock from 'components/ShareBlock/ShareBlock';
import CriteriaExplanation from './CriteriaExplanation/CriteriaExplanation';

import { Content } from './HomePage.style';

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
            <Map />
            <CriteriaExplanation />
            <div
              style={{
                padding: '0 1rem',
              }}
            >
              <ShareBlock />
            </div>
          </Content>
        </div>
      </main>
    </>
  );
}
