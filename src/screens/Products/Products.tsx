import React from 'react';
import Typography from '@material-ui/core/Typography';
import AppMetaTags from 'components/AppMetaTags/AppMetaTags';
import ShareBlock from 'components/ShareBlock/ShareBlock';
import StapledSidebar, {
  SidebarLink,
  SectionHeader,
} from 'components/StapledSidebar/StapledSidebar';

import { Wrapper, Content, Header } from './Products.style';

const sidebar = (
  <React.Fragment>
    <SidebarLink href="#model">U.S. Interventions Model</SidebarLink>
    <SidebarLink href="#embed">Embed</SidebarLink>
    <SidebarLink href="#api">API</SidebarLink>
    <SidebarLink href="#raw-data">Raw Data</SidebarLink>
  </React.Fragment>
);

const Products = ({ children }: { children: React.ReactNode }) => {
  return (
    <Wrapper>
      <AppMetaTags
        canonicalUrl="/products"
        pageTitle="Products"
        pageDescription="Covid Act Now was started by four volunteers who saw the explosive and
        deadly growth of COVID infections around the world and felt they had
        to do something."
      />
      <Header>
        <Content>
          <Typography variant="h3" component="h1">
            Products
          </Typography>
        </Content>
      </Header>
      <Content>
        <StapledSidebar sidebar={sidebar}>
          <SectionHeader variant="h4" component="h4" id="model">
            U.S. Interventions Model
          </SectionHeader>
          <Typography variant="h6" component="h6">
            What is the U.S. Interventions Model?
          </Typography>
          <Typography variant="body1" component="p">
            The U.S. Interventions Model is a data platform that projects COVID
            infections, hospitalizations, and deaths across the United States,
            as well as models how public health interventions contain the spread
            of COVID and save lives. The U.S. Interventions Model is an SEIR
            model (a type of epidemiological model).
          </Typography>

          <Typography variant="h6" component="h6">
            Wait, what’s an SEIR model?
          </Typography>

          <Typography variant="body1" component="p">
            SEIR is a way of modeling infection diseases. Simply put, it
            specifically models the flows of people between four states:
            susceptible (S), exposed (E), infected (I), and resistant (R):
          </Typography>

          <Typography variant="body1" component="p">
            Susceptible (S) → 𝛃 → Exposed (E) → 𝝨 → Infectious (I) → 𝚪 →
            Recovered (R)
          </Typography>

          <Typography variant="body1" component="p">
            Each of those variables represents the number of people in those
            groups. The parameters beta (𝛃), sigma (𝝨), and gamma (𝚪) control
            how fast people move from one state to another. Our model is
            significantly more complicated than this, and even this might sound
            complicated, but in a nutshell this is the modeling approach we use.
            Why did we choose an SEIR approach? SEIR models are widely used by
            epidemiologists to model disease outbreaks in both research and
            practical settings. Our model is adapted from a model{' '}
            <a href="https://alhill.shinyapps.io/COVID19seir/">
              originally developed and built
            </a>{' '}
            by Dr. Alison Hill, a research fellow at Harvard’s Program for
            Evolutionary Dynamics.
          </Typography>

          <Typography variant="h6" component="h6">
            Can I view the model?
          </Typography>
          <Typography variant="body1" component="p">
            <a
              target="_blank"
              rel="noopener noreferrer"
              href="https://github.com/covid-projections/covid-data-model"
            >
              Yes! The model is public
            </a>
            .
          </Typography>

          <Typography variant="h6" component="h6">
            What are your sources of data?
          </Typography>
          <Typography variant="body1" component="p">
            Reference materials, including assumptions, logic, and definitions{' '}
            <a
              target="_blank"
              rel="noopener noreferrer"
              href="https://data.covidactnow.org/Covid_Act_Now_Model_References_and_Assumptions.pdf"
            >
              are available here
            </a>
            .
          </Typography>

          <Typography variant="h6" component="h6">
            How often does the model update?
          </Typography>
          <Typography variant="body1" component="p">
            The model updates every 3 days, and the “last updated” date stamp on
            the state page will tell you specifically.
          </Typography>

          <Typography variant="h6" component="h6">
            What are the current limitations of the model?
          </Typography>
          <Typography variant="body1" component="p">
            A non-exhaustive list:
          </Typography>
          <Typography>
            <ul>
              <li>
                Only a small fraction of the world has been infected. It’s a new
                disease. Variables will change.
              </li>
              <li>
                R0s (
                <a href="https://en.wikipedia.org/wiki/Basic_reproduction_number">
                  R0 is a fundamental epidemiological metric
                </a>
                ) for interventions are guesses, in some cases informed by data.
                There is no historical precedent for what is going on right now
                to draw from.
              </li>
              <li>
                The default R0 used in this model is an average. The model does
                not adjust for the population density, culturally-determined
                interaction frequency and closeness, humidity, etc. in
                calculating R0.
              </li>
              <li>
                This is not a node-based analysis and thus assumes everyone
                spreads the disease at the same rate. In practice, there are
                some folks who are “super-spreaders,” and others who are almost
                isolated. Interventions should be targeted primarily at those
                most likely to spread the disease.
              </li>
              <li>
                Only hospital beds in aggregate are considered. ICU beds and
                ventilators, which are likely to run low before beds, are not
                considered.
              </li>
              <li>
                Demographics, populations, and hospital bed count data are
                outdated. Demographics for the U.S. as a whole are used, rather
                than specific to each state.
              </li>

              <li>
                In containment cases, we do not consider the longer-term impacts
                of maintaining containment; primarily, the reintroduction of
                COVID through travel. 14-day mandatory border quarantines, such
                as those currently in place in China, would likely need to be
                implemented until a vaccine or therapeutic is developed.
              </li>
            </ul>
          </Typography>

          <Typography variant="h6" component="h6">
            What definition does Covid Act Now use for “social distancing” and
            “stay at home”? How about “lax/strict” compliance (re. “stay at
            home”)?{' '}
          </Typography>
          <Typography variant="body1" component="p">
            All these definitions — and many more — can be found in our{' '}
            <a
              target="_blank"
              rel="noopener noreferrer"
              href="https://data.covidactnow.org/Covid_Act_Now_Model_References_and_Assumptions.pdf"
            >
              Model Reference and Assumptions
            </a>{' '}
            document. The epidemiological assumptions how these various
            interventions curb the curve of COVID infections is informed by
            recent research from Europe, and most notably from{' '}
            <a
              target="_blank"
              rel="noopener noreferrer"
              href="https://www.imperial.ac.uk/media/imperial-college/medicine/sph/ide/gida-fellowships/Imperial-College-COVID19-Europe-estimates-and-NPI-impact-30-03-2020.pdf"
            >
              Imperial College London
            </a>
            , as well as the emerging corpus of COVID data in the U.S.
          </Typography>

          <Typography variant="h6" component="h6">
            What are the specific policies for my state?
          </Typography>
          <Typography variant="body1" component="p">
            <i>The New York Times</i> lists{' '}
            <a
              target="_blank"
              rel="noopener noreferrer"
              href="https://www.nytimes.com/interactive/2020/us/coronavirus-stay-at-home-order.html"
            >
              every state's policies
            </a>
            .
          </Typography>

          <Typography variant="h6" component="h6">
            How does the Covid Act Now model differ from IHME model?
          </Typography>
          <Typography variant="body1" component="p">
            <a
              target="_blank"
              rel="noopener noreferrer"
              href="https://blog.covidactnow.org/covid-act-now-ihme-why-two-models-are-better-than-one/"
            >
              See our explanation of differences here
            </a>
            .
          </Typography>

          <SectionHeader variant="h4" component="h4" id="embed">
            Embed
          </SectionHeader>

          <Typography variant="body1" component="p">
            Mike TODO
          </Typography>

          <SectionHeader variant="h4" component="h4" id="api">
            API
          </SectionHeader>

          <Typography variant="body1" component="p">
            Mike TODO
          </Typography>

          <SectionHeader variant="h4" component="h4" id="raw-data">
            Raw Data
          </SectionHeader>

          <Typography variant="body1" component="p">
            Mike TODO
          </Typography>

          <ShareBlock />
        </StapledSidebar>
      </Content>
    </Wrapper>
  );
};

export default Products;
