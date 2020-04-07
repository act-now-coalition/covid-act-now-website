import React from 'react';
import Typography from '@material-ui/core/Typography';
import HomePageHeader from 'components/Header/HomePageHeader';
import { COLORS } from 'enums';
import Map from 'components/Map/Map';
import Endorsements from 'screens/Endorsements/Endorsements';
import Newsletter from 'components/Newsletter/Newsletter';

import { Wrapper, Content, MapTitle, MapTitleDivider } from './HomePage.style';

export default function HomePage() {
  return (
    <>
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
                marginTop: '3rem',
                padding: '1.5rem',
              }}
            >
              <Newsletter />
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
