import React from 'react';
import Typography from '@material-ui/core/Typography';
import HomePageHeader from 'components/Header/HomePageHeader';
import { COLORS } from 'enums';
import Map from 'components/Map/Map';
import Endorsements from 'screens/Endorsements/Endorsements';
import AppMetaTags from 'components/AppMetaTags/AppMetaTags';
import ShareBlock from 'components/ShareBlock/ShareBlock';

import { Wrapper, Content } from './HomePage.style';

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
      <Wrapper style={{ backgroundColor: COLORS.LIGHTGRAY }}>
        <Content>
          <Typography variant="h3" component="h3" style={{ marginBottom: 20 }}>
            Our Advisors
          </Typography>
          <Endorsements hideSocial={true} />
        </Content>
      </Wrapper>
    </>
  );
}
