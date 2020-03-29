import React from 'react';
import Typography from '@material-ui/core/Typography';
import { useHistory } from 'react-router-dom';

import Header from 'components/Header/Header';
import Map from 'components/Map/Map';
import Endorsements from 'screens/Endorsements/Endorsements';
import Newsletter from 'components/Newsletter/Newsletter';

import { StateSelector } from 'components/MapSelectors/MapSelectors';

import {
  Wrapper,
  Content,
  StateSelectorInner,
  MapTitle,
  MapTitleDivider,
  StateSelectorWrapper,
} from './HomePage.style';

export default function HomePage() {
  const history = useHistory();

  const handleStateSelectChange = option => {
    const route = `/state/${option.state_code}`;

    history.push(route);

    window.scrollTo(0, 0);
  };

  return (
    <>
      <Header />
      <main>
        <div className="App">
          <StateSelectorWrapper>
            <StateSelectorInner>
              <StateSelector handleChange={handleStateSelectChange} />
            </StateSelectorInner>
          </StateSelectorWrapper>
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
                marginBottom: '-1rem',
                padding: '2rem',
              }}
            >
              <Newsletter />
            </div>
          </Content>
        </div>
      </main>
      <Wrapper style={{ backgroundColor: '#F2F2F2' }}>
        <Content>
          <Typography variant="h3" component="h3" style={{ marginBottom: 20 }}>
            Endorsements
          </Typography>
        </Content>
        <Content wide>
          <Endorsements />
        </Content>
      </Wrapper>
    </>
  );
}
