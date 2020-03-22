import React from 'react';
import Typography   from '@material-ui/core/Typography';

import Header from 'components/Header/Header';
import Map from 'components/Map/Map';
import Endorsements from 'screens/Endorsements/Endorsements';

import {
  Wrapper,
  Content,
} from './HomePage.style';

export default function HomePage() {
  return (
    <>
      <Header />
      <main style={{ textAlign: 'center', paddingBottom: 50 }}>
        <div className="App" style={{ maxWidth: 900, margin: 'auto' }}>
          <p>Click the map to see projections for your state.</p>
          <Map />
        </div>
      </main>
      <Wrapper style={{ backgroundColor: '#F2F2F2' }}>
        <Content>
          <Typography variant="h3" component="h3" style={{ marginBottom: 20 }}>
            How to use this tool
          </Typography>
          <Typography variant="body2" component="p" style={{ color: '#222', marginBottom: '3rem' }}>
            This tool is built to enable political leaders to quickly make
            decisions in their Coronavirus response informed by best available
            data and modeling.
            <br />
            <br />
            Here are the questions we built this tool to answer:
            <ol>
              <li>
                What will the impact be in my region be and when can I expect it?
              </li>
              <li>How long until my hospital system is under severe pressure?</li>
              <li>
                What are my menu of interventions, and how will they address the
                spread of Coronavirus?
              </li>
            </ol>
          </Typography>

          <Typography variant="h3" component="h3" style={{ marginBottom: 20 }}>
            Endorsements
          </Typography>
          <div style={{margin: '-2rem'}}>
            <Endorsements />
          </div>
        </Content>
      </Wrapper>
    </>
  );
}
