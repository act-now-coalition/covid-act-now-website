import React from 'react';
import Typography from '@material-ui/core/Typography';
import { Wrapper, BackgroundImage, Layer } from './ComingSoon.style';

const covid = '../../../public/assets/images/covid-19.jpg';

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
