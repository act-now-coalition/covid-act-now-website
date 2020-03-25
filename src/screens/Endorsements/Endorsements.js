import React from 'react';
import Typography from '@material-ui/core/Typography';
import QuoteIcon from '@material-ui/icons/FormatQuoteRounded';
import Grid from '@material-ui/core/Grid';

import EndorsementCard from 'components/EndorsementCard/EndorsementCard';
import { ENDORSERS } from 'enums';
import {
  Wrapper,
  Content,
  Quote,
  EndorsersWrapper,
} from './Endorsements.style';

const Endorsements = () => {
  return (
    <Wrapper>
      <Content>
        <Quote>
          <QuoteIcon />
          <Typography variant="h4" component="p">
            While no projection is perfect, we endorse this tool and model as a
            valid and important way to frame the decisions political leaders
            must make now.
          </Typography>
        </Quote>
        <EndorsersWrapper
          container
          alignItems={'stretch'}
          spacing={0}
          wrap={'wrap'}
        >
          {ENDORSERS.map((e, index) => (
            <Grid item key={index} xs={12} sm={6} md={e.size}>
              <EndorsementCard {...e} />
            </Grid>
          ))}
        </EndorsersWrapper>
      </Content>
    </Wrapper>
  );
};

export default Endorsements;
