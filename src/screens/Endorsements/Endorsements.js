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
            <GridListTile key={e.name} cols={1}>
              <EndorsementCard {...e} />
            </GridListTile>
          ))}
          <GridListTile key="quote" cols={2}>
            <MorsEndorsement variant="body2" component="p">
              “This model offers a great tool for state policy staff who's job
              it is to advise the Governor and the Director of Health regarding
              what kinds of policies should be instituted to encourage social
              distancing to minimize contagion with corona virus. Staff need to
              be prepared to defend with comparative data their recommendations
              regarding whether to close schools, close bars, restrict
              gatherings to a select number or encourage non-essential workers
              to telecommute. This web site offers state specific estimates that
              demonstrate the impact of such policies on the curve of
              infections, hospitalizations and deaths in a very sophisticated
              manner.“
              <br />
              <Typography variant="body2" component="span">
                - Dr. Vincent Mor
              </Typography>
            </MorsEndorsement>
          </GridListTile>
        </EndorsersWrapper>
      </Content>
    </Wrapper>
  );
};

export default Endorsements;
