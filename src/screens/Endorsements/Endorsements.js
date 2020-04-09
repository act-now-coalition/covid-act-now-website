import React from 'react';
import Typography from '@material-ui/core/Typography';
import QuoteIcon from '@material-ui/icons/FormatQuoteRounded';
import CheckCircleOutline from '@material-ui/icons/CheckCircleOutline';
import Grid from '@material-ui/core/Grid';
import ShareBlock from 'components/ShareBlock/ShareBlock';

import EndorsementCard from 'components/EndorsementCard/EndorsementCard';
import { ENDORSERS } from 'enums';
import {
  Content,
  EndorseLink,
  EndorsersWrapper,
  Quote,
  QuoteContainer,
  Wrapper,
} from './Endorsements.style';

const Endorsements = () => {
  return (
    <Wrapper>
      <Content>
        <QuoteContainer>
          <Quote>
            <QuoteIcon />
            <Typography variant="h4" component="p">
              While no projection is perfect, we endorse this tool and model as
              a valid and important way to frame the decisions political leaders
              must make now.
            </Typography>
          </Quote>
          <EndorseLink href="https://docs.google.com/forms/d/e/1FAIpQLSfS0iYUy7eEHx-v8Jiyjwfkm6OiPSa2Iw8o4IK_2aklNl9qkQ/viewform">
            <div>Sign up to endorse</div>
            <CheckCircleOutline />
          </EndorseLink>
        </QuoteContainer>
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
        <ShareBlock />
      </Content>
    </Wrapper>
  );
};

export default Endorsements;
