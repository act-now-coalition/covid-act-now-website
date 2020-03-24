import React from 'react';
import Typography from '@material-ui/core/Typography';
import Status from 'components/Status/Status';

import { Wrapper, Content, BlackBar, RedBar } from './Header.style';

const Header = ({ children, locationName, intervention }) => {
  return (
    <Wrapper>
      <BlackBar>
        <Content>
          <Typography align="center" variant="h2" component="h2">
            Why you must act now{locationName ? `: ${locationName}` : ''}
          </Typography>
          {locationName && <Status intervention={intervention} />}
          <Typography align="center" variant="colorInherit" component="p">
            Public leaders &amp; health officials:
          </Typography>
          <Typography align="center" variant="colorInherit" component="p">
            The only thing that matters right now is the speed of your response
          </Typography>
        </Content>
      </BlackBar>
      <RedBar>
        <Content>
          <Typography align="center" variant="colorInherit" component="p">
            This model is intended to help make fast decisions, not predict the
            future
          </Typography>
        </Content>
      </RedBar>
    </Wrapper>
  );
};

export default Header;
