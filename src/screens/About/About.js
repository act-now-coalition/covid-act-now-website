import React from 'react';
import IconButton from '@material-ui/core/IconButton';
import Typography from '@material-ui/core/Typography';
import Link from '@material-ui/core/Link';
import { Email } from '@material-ui/icons';

import { Wrapper, Content } from './About.style';

const About = ({ children }) => {
  return (
    <Wrapper style={{ backgroundColor: '#F2F2F2' }}>
      <Content>
        <Typography variant="h3" component="h1">
          Comments, questions, or want to get involved?
        </Typography>
        <Typography variant="body1" component="p">
          To improve the capabilities and accuracy of our tool, we are
          requesting the help of:
          <ul>
            <li>
              Epidemiologists with expertise in modeling virus propagation{' '}
            </li>
            <li>UI/UX Designers</li>
            <li>
              Engineers:{' '}
              <Link
                underline="hover"
                color="textPrimary"
                href="https://github.com/covid-projections/covid-projections"
              >
                JavaScript (React),
              </Link>{' '}
              <Link
                underline="hover"
                color="textPrimary"
                href="https://github.com/covid-projections/covid-data-model"
              >
                Python
              </Link>
            </li>
            <li>Data scientists</li>
          </ul>
          <br />
          If you have time to give us feedback or access to this expertise, have
          questions, or otherwise want to get involved, please get in touch -{' '}
          <Link
            underline="hover"
            color="textPrimary"
            href="mailto:jonathan@covidactnow.org"
          >
            jonathan@covidactnow.org
          </Link>
        </Typography>
      </Content>
    </Wrapper>
  );
};

export default About;
