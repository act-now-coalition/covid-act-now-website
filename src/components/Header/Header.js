import React from 'react';
import Typography from '@material-ui/core/Typography';

import { Wrapper, Content, BlackBar, RedBar } from './Header.style';

const Header = ({ children }) => {
  return (
    <Wrapper>
      <BlackBar>
        <Content>
          <Typography align="center" variant="h2" component="h2">
            Why you must act now
          </Typography>
          <Typography align="center" variant="p" component="p">
            Public leaders & health officials:
          </Typography>
          <Typography align="center" variant="p" component="p">
            The only thing that matters right now is the speed of your response
          </Typography>
        </Content>
      </BlackBar>
      <RedBar>
        <Content>
          <Typography align="center" variant="p" component="p">
            This model is intended to help make fast decisions, not predict the
            future
          </Typography>
        </Content>
      </RedBar>
    </Wrapper>
  );
};

export default Header;
