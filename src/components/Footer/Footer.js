import React from 'react';
import Typography from '@material-ui/core/Typography';

import { Wrapper, Content } from './Footer.style';

const Footer = ({ children }) => {
  return (
    <Wrapper style={{ backgroundColor: '#F2F2F2' }}>
      <Content>
        <Typography variant="h3" component="h3" style={{ marginBottom: 20 }}>
          How to use this tool
        </Typography>
        <Typography variant="body2" component="p" style={{ color: '#222' }}>
          This tool is built to enable political leaders to quickly make
          decisions in their Coronavirus response informed by best available
          data and modeling.
          <br />
          <br />
          Here are the questions we built this tool to answer:
          <ol>
            <li>
              What will the impact be in my region be and when can I expect it?
            </li>
            <li>How long until my hospital system is under severe pressure?</li>
            <li>
              What are my menu of interventions, and how will they address the
              spread of Coronavirus?
            </li>
          </ol>
        </Typography>

        <Typography variant="h3" component="h3" style={{ marginBottom: 20 }}>
          Endorsements
        </Typography>

        <Typography variant="body2" component="p" style={{ color: '#222' }}>
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
            <li>
              “This model offers a great tool for state policy staff whose job it
              is to advise the Governor and the Director of Health regarding what kinds of
              policies should be instituted to encourage social distancing to minimize contagion
              with corona virus. Staff need to be prepared to defend with comparative data their
              recommendations regarding whether to close schools, close bars, restrict gatherings
              to a select number or encourage non-essential workers to telecommute.  This web site
              offers state specific estimates that demonstrate the impact of such policies on the
              curve of infections, hospitalizations and deaths in a very sophisticated manner. “ <br />
              Vincent Mor <br />
              Florence Pirce Grant University Professor, Professor of Health Services, Policy and Practice  <br />
              Brown University
            </li>
            <li>
              Valerie Nurr&#39;araaluk Davidson <br />
              former Alaska Commissioner of Health and Social Services, Founder's Council member, United States of Care
            </li>
            <li>
              Tomas Pueyo, author of
              <a href="https://medium.com/@tomaspueyo/coronavirus-act-today-or-people-will-die-f4d3d9cd99ca">Coronavirus: Why You Must Act Now</a>
            </li>
          </ul>
          More are forthcoming. Please email us if you wish to add your name to
          this list as a credentialed scientist in public health or infectious
          disease.

        </Typography>

        <Typography variant="h3" component="h3" style={{ marginBottom: 20 }}>
          FAQ
        </Typography>
        <Typography variant="h5" component="h5">
          What are the assumptions of the model?
        </Typography>
        <Typography variant="body2" component="p" style={{ color: '#222' }}>
          The model is public, and{' '}
          <a href="https://bit.ly/391uB80">can be viewed here</a>. Reference
          materials, including assumptions, logic, and definitions{' '}
          <a href="https://bit.ly/394SJ9I">are available here</a>.
        </Typography>

        <Typography variant="h5" component="h5">
          What are the current limitations of the model?
        </Typography>
        <Typography variant="body2" component="p" style={{ color: '#222' }}>
          Here is a non-exhaustive list:
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
        </Typography>

        <Typography variant="h5" component="h5">
          Comments, Questions, Or Want to Get Involved?
        </Typography>
        <Typography variant="body2" component="p" style={{ color: '#222' }}>
          To improve the capabilities and accuracy of our tool, we are
          requesting the help of:
          <ul>
            <li>
              Epidemiologists with expertise in modeling virus propagation{' '}
            </li>
            <li>Interface designers</li>
            <li>Engineers:Javascript, Python </li>
            <li>Data scientists</li>
          </ul>
          <br />
          If you have time to give us feedback or access to this expertise, have
          questions, or otherwise want ot get involved, please get in touch with
          us via email:
          <a href="mailto:jonathan@covidactnow.org">
            jonathan(at)covidactnow.org
          </a>{' '}
          .
        </Typography>
      </Content>
    </Wrapper>
  );
};

export default Footer;
