import React from 'react';
import HomePageHeader from 'components/Header/HomePageHeader';
import Map from 'components/Map/Map';
import AppMetaTags from 'components/AppMetaTags/AppMetaTags';
import ShareBlock from 'components/ShareBlock/ShareBlock';

import { Content } from './HomePage.style';

export default function HomePage() {
  return (
    <>
      <AppMetaTags
        canonicalUrl="/"
        pageTitle={undefined}
        pageDescription="Urge your public officials to quickly take action against the COVID-19 pandemic. These charts predict the last day each state can act before the point of no return."
      />
      <HomePageHeader />
      <main>
        <div className="App">
          <Content>
            <Map />
            <div
              style={{
                padding: '0 1.5rem',
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
