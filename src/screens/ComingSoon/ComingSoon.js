import React from 'react';
import Typography from '@material-ui/core/Typography';

import covid from 'assets/images/covid-19.jpg';
import { Wrapper, BackgroundImage, Layer } from './ComingSoon.style';

const ComingSoon = () => {
  return (
    <Wrapper>
      <BackgroundImage src={covid} alt="covid virus" />
      <Layer />
      <Typography align="center" variant="h2" component="p">
        Coming Soon
      </Typography>
    </Wrapper>
  );
};

export default ComingSoon;
