import React from 'react';
import Grid from '@material-ui/core/Grid';
import ShareBlock from 'components/ShareBlock/ShareBlock';

import EndorsementCard from 'components/EndorsementCard/EndorsementCard';
import { ENDORSERS } from 'enums';
import { Content, EndorsersWrapper, Wrapper } from './Endorsements.style';

const Endorsements = ({ hideSocial }) => {
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
            <Grid item key={index} xs={12} md={e.size}>
              <EndorsementCard {...e} />
            </Grid>
          ))}
        </EndorsersWrapper>
        {!hideSocial && <ShareBlock />}
      </Content>
    </Wrapper>
  );
};

export default Endorsements;
