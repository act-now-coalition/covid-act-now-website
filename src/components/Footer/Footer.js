import React from 'react';
import Typography from '@material-ui/core/Typography';

import { Wrapper, Content } from './Footer.style';

const Footer = ({ children }) => {
  return (
    <Wrapper>
      <Content>
        <Typography variant="h5" component="h5">
          FAQ
        </Typography>
        <Typography variant="subtitle1" component="h6">
          What are are the current limitations of the model?
        </Typography>
        <Typography variant="body2" component="p">
          No adjustment for population density.
          <br />
          No adjustment for inbound infection cases from outside of region.
          <br />
          Not node based analysis.
        </Typography>
        <Typography variant="subtitle1" component="h6">
          How could the data change?
        </Typography>
        <Typography variant="body2" component="p">
          Only a small fraction of the world has been infected. It’s a new
          disease. Variables will change.
        </Typography>
      </Content>
    </Wrapper>
  );
};

export default Footer;
