import React from 'react';
import Typography from '@material-ui/core/Typography';

import Header from 'components/Header/Header';
import Map from 'components/Map/Map';
import Endorsements from 'screens/Endorsements/Endorsements';
import Newsletter from 'components/Newsletter/Newsletter';

import { Wrapper, Content } from './HomePage.style';

export default function HomePage() {
  return (
    <>
      <Header />
      <main style={{ textAlign: 'center', paddingTop: 20, paddingBottom: 50 }}>
        <div className="App" style={{ maxWidth: 900, margin: 'auto' }}>
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
        </div>
      </main>
      <Wrapper style={{ backgroundColor: '#F2F2F2' }}>
        <Content>
          <Typography variant="h3" component="h3" style={{ marginBottom: 20 }}>
            Endorsements
          </Typography>
          <div style={{ margin: '-2rem' }}>
            <Endorsements />
          </div>
        </Content>
      </Wrapper>
    </>
  );
}
