import React from 'react';
import Typography from '@material-ui/core/Typography';
import QuoteIcon from '@material-ui/icons/FormatQuoteRounded';
import GridListTile from '@material-ui/core/GridListTile';

import EndorsementCard from 'components/EndorsementCard/EndorsementCard';
import { ENDORSERS } from 'utils/constants';
import {
  Wrapper,
  Content,
  Quote,
  EndorsersWrapper,
  MorsEndorsement,
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
            must make NOW.
          </Typography>
        </Quote>
        <EndorsersWrapper cellHeight={284} cols={3}>
          {ENDORSERS.map(e => (
            <GridListTile key={e.name} cols={e.cols || 1}>
              <EndorsementCard {...e} />
            </GridListTile>
          ))}
        </EndorsersWrapper>
      </Content>
    </Wrapper>
  );
};

export default Endorsements;
