import React from 'react';
import Typography from '@material-ui/core/Typography';

import { Wrapper, Content } from './Endorsements.style';

const Endorsements = ({ children }) => {
  return (
    <Wrapper>
      <Content>
        <Typography variant="h2" component="h1" style={{ marginBottom: 20 }}>
          Endorsements
        </Typography>

        <Typography variant="body2" component="p" style={{ color: '#222' }}>
          <h2 style={{ border: '1px solid #ccc', padding: 20 }}>
            "While no projection is perfect, we endorse this tool and model as a
            valid and important way to frame the decisions political leaders
            must make now."
          </h2>

          <p style={{ color: '#222' }}>
            <a href="https://www.linkedin.com/in/niravrshah/">Nirav Shah, MD, MPH</a>, Senior Scholar, Stanford University Clinical Excellence Research Center; Former Commissioner, New York State Department of Health
          </p>

          <p style={{ color: '#222' }}>
            <a href="https://www.linkedin.com/in/vincent-mor-762a5b58/">Vincent Mor</a>, Florence Pirce Grant University Professor, Professor of
            Health Services, Policy and Practice, Brown University{' '}
          </p>

          <blockquote style={{ fontStyle: 'italic', marginBottom: '40px' }}>
            This model offers a great tool for state policy staff whose job it
            is to advise the Governor and the Director of Health regarding what
            kinds of policies should be instituted to encourage social
            distancing to minimize contagion with corona virus. Staff need to be
            prepared to defend with comparative data their recommendations
            regarding whether to close schools, close bars, restrict gatherings
            to a select number or encourage non-essential workers to
            telecommute. This web site offers state specific estimates that
            demonstrate the impact of such policies on the curve of infections,
            hospitalizations and deaths in a very sophisticated manner.
          </blockquote>

          <p style={{ color: '#222' }}>
            <a href="https://www.linkedin.com/in/valerie-davidson-06059234/">Valerie Nurr'araaluk Davidson</a>, former Alaska Commissioner of Health
            and Social Services, Founder's Council member, United States of Care{' '}
          </p>

          <p style={{ color: '#222' }}>
            <a href="https://www.linkedin.com/in/tomaspueyo/">Tomas Pueyo</a>, author of <a href="https://medium.com/@tomaspueyo/coronavirus-act-today-or-people-will-die-f4d3d9cd99ca"> Coronavirus: Why You Must Act Now</a>
          </p>

          <p style={{ color: '#222' }}>
            <a href="https://medicine.yale.edu/profile/benjamin_goldman-israelow/">Ben Goldman-Israelow</a>, Infectious Disease Fellow, Yale School of Medicine</p>

          <p style={{ color: '#222' }}>
            More are forthcoming. Please email us if you wish to add your name
            to this list as a credentialed scientist in public health or
            infectious disease.
          </p>
        </Typography>
      </Content>
    </Wrapper>
  );
};

export default Endorsements;
