import React from 'react';
import IconButton from '@material-ui/core/IconButton';
import Typography from '@material-ui/core/Typography';
import Link from '@material-ui/core/Link';
import { Email } from '@material-ui/icons';
import QuoteIcon from '@material-ui/icons/FormatQuoteRounded';

import { Wrapper, Content, Quote } from './Endorsements.style';

const Endorsements = ({ children }) => {
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
        <p>
          Nirav Shah, MD, MPH, Senior Scholar, Stanford University Clinical
          Excellence Research Center; Former Commissioner, New York State
          Department of Health
        </p>
        <p>
          “This model offers a great tool for state policy staff who's job it is
          to advise the Governor and the Director of Health regarding what kinds
          of policies should be instituted to encourage social distancing to
          minimize contagion with corona virus. Staff need to be prepared to
          defend with comparative data their recommendations regarding whether
          to close schools, close bars, restrict gatherings to a select number
          or encourage non-essential workers to telecommute. This web site
          offers state specific estimates that demonstrate the impact of such
          policies on the curve of infections, hospitalizations and deaths in a
          very sophisticated manner. “
        </p>
        <p>
          Vincent Mor, Florence Pirce Grant University Professor, Professor of
          Health Services, Policy and Practice, Brown University
        </p>
        <p>
          Valerie Nurr'araaluk Davidson, former Alaska Commissioner of Health
          and Social Services, Founder's Council member, United States of Care
        </p>

        <Typography variant="body2" component="p">
          While no projection is perfect, we endorse this tool and model as a
          valid and important way to frame the decisions political leaders must
          make NOW.
          <br />
          <br />
          <ul>
            <li>
              Nirav Shah, MD, MPH, Senior Scholar, Stanford University Clinical
              Excellence Research Center; Former Commissioner, New York State
              Department of Health
            </li>
          </ul>
          More are forthcoming. Please email us if you wish to add your name to
          this list as a credentialed scientist in public health or infectious
          disease.
        </Typography>
      </Content>
    </Wrapper>
  );
};

export default Endorsements;
