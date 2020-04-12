import React from 'react';
import Typography from '@material-ui/core/Typography';
import HomePageHeader from 'components/Header/HomePageHeader';
import { COLORS } from 'enums';
import Map from 'components/Map/Map';
import Endorsements from 'screens/Endorsements/Endorsements';
import AppMetaTags from 'components/AppMetaTags/AppMetaTags';
import PublicCallToAction from 'components/PublicCallToAction/PublicCallToAction';

import { Wrapper, Content, MapTitle, MapTitleDivider } from './HomePage.style';

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
            <MapTitle>
              <MapTitleDivider>
                <div></div>
                <span>Or</span>
                <div></div>
              </MapTitleDivider>
              <p>Select your state below to see detailed projections</p>
            </MapTitle>
            <Map />
            <div
              style={{
                padding: '1.5rem',
              }}
            >
              <PublicCallToAction />
            </div>
          </Content>
        </div>
      </main>
      <Wrapper style={{ backgroundColor: COLORS.LIGHTGRAY }}>
        <Content>
          <Typography variant="h3" component="h3" style={{ marginBottom: 20 }}>
            Endorsements
          </Typography>
          <Endorsements />
        </Content>
      </Wrapper>
    </>
  );
}
