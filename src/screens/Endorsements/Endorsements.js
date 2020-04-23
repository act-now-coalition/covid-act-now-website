import React from 'react';
import Grid from '@material-ui/core/Grid';

import EndorsementCard from 'components/EndorsementCard/EndorsementCard';
import { ENDORSERS } from 'enums';
import { Content, EndorsersWrapper, Wrapper } from './Endorsements.style';

const Endorsements = ({ compact }) => {
  return (
    <Wrapper>
      <Content>
        <EndorsersWrapper
          container
          alignItems={'stretch'}
          spacing={0}
          wrap={'wrap'}
        >
          {ENDORSERS.map((e, index) => (
            <Grid item key={index} xs={12} md={compact ? 6 : 4}>
              <EndorsementCard {...e} />
            </Grid>
          ))}
        </EndorsersWrapper>
      </Content>
    </Wrapper>
  );
};

export default Endorsements;
