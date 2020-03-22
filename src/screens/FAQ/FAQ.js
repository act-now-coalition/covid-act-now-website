import React from 'react';
import IconButton from '@material-ui/core/IconButton';
import Typography from '@material-ui/core/Typography';
import Link from '@material-ui/core/Link';
import { Email } from '@material-ui/icons';

import { Wrapper, Content } from './FAQ.style';

const FAQ = ({ children }) => {
  return (
    <Wrapper style={{ backgroundColor: '#F2F2F2' }}>
      <Content>
        <Typography variant="h3" component="h1">
          Model
        </Typography>

        <Typography variant="h5" component="h5">
          What are the assumptions of the model?
        </Typography>
        <Typography variant="body1" component="p">
          The model is public, and{' '}
          <Link
            underline="hover"
            href="https://bit.ly/391uB80"
            color="textPrimary"
          >
            can be viewed here
          </Link>
          . Reference materials, including assumptions, logic, and definitions{' '}
          <Link
            underline="hover"
            color="textPrimary"
            href="https://bit.ly/394SJ9I"
          >
            are available here
          </Link>
          .
        </Typography>

        <Typography variant="h5" component="h5">
          What are the current limitations of the model?
        </Typography>
        <Typography variant="body1" component="p">
          Here is a non-exhaustive list:
        </Typography>
        <ul>
          <li>
            Only a small fraction of the world has been infected. It’s a new
            disease. Variables will change.
          </li>
          <li>
            R0s for interventions are guesses, in some cases informed by data.
            There is no historical precedent for what is going on right now to
            draw from.
          </li>
          <li>
            The default R0 used in this model is an average. The model does
            not adjust for the population density, culturally-determined
            interaction frequency and closeness, humidity, temperature, etc in
            calculating R0.
          </li>
          <li>
            This is not a node-based analysis, and thus assumes everyone
            spreads the disease at the same rate. In practice, there are some
            folks who are “super-spreaders,” and others who are almost
            isolated. Interventions should be targeted primarily at those most
            likely to spread the disease.
          </li>
          <li>
            Only hospital beds at aggregate are considered. ICU beds and
            ventilators, which are likely to run low before beds, are not
            considered.
          </li>
          <li>
            Demographics, populations, and hospital bed counts are outdated.
            Demographics for the USA as a whole are used, rather than specific
            to each state.
          </li>

          <li>
            In containment cases, we do not deal with the longer-term impacts
            of maintaining containment, primarily the concern with avoiding
            reintroduction of the disease due to incoming travelers. 14-day
            mandatory border quarantines, such as those currently in place in
            China, would likely need to continue until a vaccine or
            therapeutic is developed.
          </li>
        </ul>
      </Content>
    </Wrapper>
  );
};

export default FAQ;
