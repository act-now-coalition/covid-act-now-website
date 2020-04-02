import React from 'react';
import Typography from '@material-ui/core/Typography';
import { TEAM } from './../../enums';

import { Wrapper, Content } from './FAQ.style';

const FAQ = ({ children }) => {
  return (
    <Wrapper>
      <Content>
        <Typography variant="h3" component="h1">
          About Covid Act Now
        </Typography>
        <Typography variant="h5" component="h5">
          What is Covid Act Now?
        </Typography>
        <Typography variant="body1" component="p">
          Covid Act Now was created by four volunteers who were looking at the
          spread and speed of COVID around the world and felt they had to do
          something. The Covid Act Now team has partnered with some of our
          nation's best epidemiologists and data scientists to develop the U.S.
          Intervention Model.
        </Typography>
        <Typography variant="body1" component="p">
          We help decision makers understand when and how COVID will affect
          their constituents, which allows for better allocation of fixed
          resources like beds, ventilators, and clinical support staff.
        </Typography>
        <Typography variant="body1" component="p">
          Our U.S. Intervention Model has been shared with every level of
          government across the U.S., and is currently being used by thousands
          of decision makers, from elected officials, public health leaders, the
          U.S. military, and medical equipment manufacturers. The model has also
          been used by several countries around the world, including India.
        </Typography>

        <Typography variant="h5" component="h5">
          Who works at Covid Act Now?
        </Typography>
        <Typography variant="body1" component="p">
          Covid Act Now is a distributed team of volunteers. CoVidActNow was
          founded by{' '}
          <a href="https://www.linkedin.com/in/maxhenderson/">Max Henderson</a>,{' '}
          <a href="https://en.wikipedia.org/wiki/Jonathan_Kreiss-Tomkins">
            Rep Jonathan Kreiss-Tomkins
          </a>
          , <a href="https://twitter.com/igorkofman">Igor Kofman</a>, and{' '}
          <a href="https://www.linkedin.com/in/zacharyrosen/">Zack Rosen</a>,
          with medical and policy guidance from{' '}
          <a href="https://profiles.stanford.edu/nirav-shah">Dr. Nirav Shah</a>{' '}
          (MD, MPH, senior scholar, Stanford University Clinical Excellence
          Research Center).
        </Typography>
        <Typography variant="body1" component="p">
          We have since grown into a large distributed team:
        </Typography>
        <Typography>
          <ul>
            {TEAM.map(teammate => {
              return (
                <li>
                  <a
                    href={teammate.link}
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    {teammate.name}
                  </a>{' '}
                  {teammate.title}
                </li>
              );
            })}
          </ul>
        </Typography>

        <Typography variant="h5" component="h5">
          Who supports, endorses or validates your work?
        </Typography>
        <Typography variant="body1" component="p">
          Our work has been{' '}
          <a
            href="https://covidactnow.org/endorsements"
            target="_blank"
            rel="noopener noreferrer"
          >
            validated and endorsed
          </a>{' '}
          by a number of experts in epidemiology, public health, and medicine.
        </Typography>

        <Typography variant="h5" component="h5">
          Why did we build it?
        </Typography>

        <Typography variant="body1" component="p">
          We built covidactnow.org to{' '}
          <a
            href="https://medium.com/@tomaspueyo/coronavirus-act-today-or-people-will-die-f4d3d9cd99ca"
            target="_blank"
            rel="noopener noreferrer"
          >
            solve an urgent problem:
          </a>{' '}
          If we try to fight COVID in the present we will lose. We can only beat
          COVID by understanding what it will do to us in the near future. Our
          leaders need such a forecasting tool. We are building it.
        </Typography>

        <Typography variant="h5" component="h5">
          Who are you collaborating with?
        </Typography>

        <Typography variant="body1" component="p">
          We endorse{' '}
          <a
            href="https://safepaths.mit.edu"
            target="_blank"
            rel="noopener noreferrer"
          >
            Private Kit: Safe Paths
          </a>
          , a project developed by MIT, the Mayo Clinic, the World Health
          Organization, and others.
        </Typography>

        <Typography variant="body1" component="p">
          Private Kit is a mobile app for contact tracing that protects
          indivdual privacy. Contact tracing is a technology that notifies
          individuals if they have come in contact with someone who then later
          tests positive for COVID.
        </Typography>

        <Typography variant="body1" component="p">
          <ul>
            <li>
              Read the white paper{' '}
              <a href="https://arxiv.org/pdf/2003.08567.pdf">
                Apps Gone Rogue: Maintaining Personal Privacy in an Epidemic
              </a>
            </li>
            <li>
              Download the app on{' '}
              <a
                href="https://play.google.com/store/apps/details?id=edu.mit.privatekit"
                target="_blank"
                rel="noopener noreferrer"
              >
                Google Play
              </a>{' '}
              or{' '}
              <a
                href="https://apps.apple.com/us/app/private-kit/id1501903733"
                target="_blank"
                rel="noopener noreferrer"
              >
                Apple Store
              </a>
            </li>
          </ul>
        </Typography>

        <Typography variant="h5" component="h5">
          Can I contribute or help?
        </Typography>
        <Typography variant="body1" component="p">
          Yes. To improve the capability and accuracy of the tool, we need the
          help of:
        </Typography>
        <Typography>
          <ul>
            <li>JavaScript/React, Python engineers</li>
            <li>
              Sign up to contribute:{' '}
              <a
                target="_blank"
                rel="noopener noreferrer"
                href="https://docs.google.com/forms/d/e/1FAIpQLSfQkdwXsbDbwLHhWwBD6wzNiw54_0P6A60r8hujP3qnaxxFkA/viewform"
              >
                Form
              </a>
            </li>
          </ul>
        </Typography>

        <Typography variant="h5" component="h5">
          How can I contact you?
        </Typography>
        <Typography>
          <ul>
            <li>
              Medical organizations:{' '}
              <a
                target="_blank"
                rel="noopener noreferrer"
                href="mailto:medical@covidactnow.org"
              >
                medical@covidactnow.org
              </a>
            </li>
            <li>
              Government agencies:{' '}
              <a
                target="_blank"
                rel="noopener noreferrer"
                href="mailto:gov@covidactnow.org"
              >
                gov@covidactnow.org
              </a>
            </li>
            <li>
              Press:{' '}
              <a
                target="_blank"
                rel="noopener noreferrer"
                href="mailto:press@covidactnow.org"
              >
                press@covidactnow.org
              </a>
            </li>
            <li>
              General inquiries:{' '}
              <a
                target="_blank"
                rel="noopener noreferrer"
                href="mailto:info@covidactnow.org"
              >
                info@covidactnow.org
              </a>
            </li>
            <li>
              Sign up to contribute:{' '}
              <a
                target="_blank"
                rel="noopener noreferrer"
                href="https://docs.google.com/forms/d/e/1FAIpQLSfQkdwXsbDbwLHhWwBD6wzNiw54_0P6A60r8hujP3qnaxxFkA/viewform"
              >
                Form
              </a>
            </li>
          </ul>
        </Typography>

        <Typography variant="h3" component="h1">
          About the U.S. Intervention Model
        </Typography>

        <Typography variant="h5" component="h5">
          What is the U.S. Intervention Model?
        </Typography>
        <Typography variant="body1" component="p">
          The U.S. Intervention Model by Covid Act Now is a data platform that
          can project COVID infections, hospitalizations, and deaths across the
          United States, as well as model how public health interventions
          contain the spread of COVID and save lives.
        </Typography>

        <Typography variant="h5" component="h5">
          Can I view the model?
        </Typography>
        <Typography variant="body1" component="p">
          Yes, the model is public, and{' '}
          <a
            target="_blank"
            rel="noopener noreferrer"
            href="https://github.com/covid-projections/covid-data-model"
          >
            can be viewed here
          </a>
          .
        </Typography>

        <Typography variant="h5" component="h5">
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

        <Typography variant="h5" component="h5">
          How often does the model update?
        </Typography>
        <Typography variant="body1" component="p">
          The model currently updates every 24 hours.
        </Typography>

        <Typography variant="h5" component="h5">
          When was the last update?
        </Typography>
        <Typography variant="body1" component="p">
          See the last updated date stamp on the state page.
        </Typography>

        <Typography variant="h5" component="h5">
          What are the current limitations of the model?
        </Typography>
        <Typography variant="body1" component="p">
          Here is a non-exhaustive list:
        </Typography>
        <Typography>
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
              Demographics for the U.S. as a whole are used, rather than
              specific to each state.
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
          What are the definitions for "social distancing" and "stay at home"?
        </Typography>
        <Typography variant="body1" component="p">
          Definitions can be found in our{' '}
          <a
            target="_blank"
            rel="noopener noreferrer"
            href="https://data.covidactnow.org/Covid_Act_Now_Model_References_and_Assumptions.pdf"
          >
            Model Reference and Assumptions
          </a>{' '}
          document.
        </Typography>

        <Typography variant="h5" component="h5">
          How are "social distancing" and "stay at home" different?
        </Typography>
        <Typography variant="body1" component="p">
          Definitions can be found in our{' '}
          <a
            target="_blank"
            rel="noopener noreferrer"
            href="https://data.covidactnow.org/Covid_Act_Now_Model_References_and_Assumptions.pdf"
          >
            Model Reference and Assumptions
          </a>{' '}
          document.
        </Typography>

        <Typography variant="h5" component="h5">
          How do you define "Poor Compliance" vs. "Strict Compliance" in your
          "Stay at Home" intervention definitions?
        </Typography>
        <Typography variant="body1" component="p">
          Definitions can be found in our{' '}
          <a
            target="_blank"
            rel="noopener noreferrer"
            href="https://data.covidactnow.org/Covid_Act_Now_Model_References_and_Assumptions.pdf"
          >
            Model Reference and Assumptions
          </a>{' '}
          document.
        </Typography>

        <Typography variant="h5" component="h5">
          What are the specific policies for my state?
        </Typography>
        <Typography variant="body1" component="p">
          <i>The New York Times</i> has a list of{' '}
          <a
            target="_blank"
            rel="noopener noreferrer"
            href="https://www.nytimes.com/interactive/2020/us/coronavirus-stay-at-home-order.html"
          >
            state-by-state policies
          </a>
          .
        </Typography>

        <Typography variant="h3" component="h1">
          About COVID
        </Typography>

        <Typography variant="h5" component="h5">
          What are the symptoms of COVID?
        </Typography>
        <Typography variant="body1" component="p">
          The CDC has a list of{' '}
          <a
            target="_blank"
            rel="noopener noreferrer"
            href="https://www.cdc.gov/coronavirus/2019-ncov/symptoms-testing/symptoms.html"
          >
            COVID symptoms
          </a>
          .
        </Typography>

        <Typography variant="h5" component="h5">
          Where/how should I get tested?
        </Typography>
        <Typography variant="body1" component="p">
          The CDC has additional information on{' '}
          <a
            target="_blank"
            rel="noopener noreferrer"
            href="https://www.cdc.gov/coronavirus/2019-ncov/symptoms-testing/testing.html"
          >
            when and how to get tested
          </a>
          .
        </Typography>

        <Typography variant="h5" component="h5">
          What should I do if I think I am sick?
        </Typography>
        <Typography variant="body1" component="p">
          The CDC provides advice on{' '}
          <a
            target="_blank"
            rel="noopener noreferrer"
            href="https://www.cdc.gov/coronavirus/2019-ncov/if-you-are-sick/steps-when-sick.html"
          >
            what to do if you think you are sick
          </a>
          .
        </Typography>

        <Typography variant="h5" component="h5">
          Where can I get more information about COVID-19?
        </Typography>
        <Typography variant="body1" component="p">
          The CDC has additional information on{' '}
          <a
            target="_blank"
            rel="noopener noreferrer"
            href="https://www.cdc.gov/coronavirus/2019-ncov/index.html"
          >
            COVID-19
          </a>
          .
        </Typography>

        <Typography variant="h5" component="h5">
          Should I wear a mask in public?
        </Typography>
        <Typography variant="body1" component="p">
          The World Health Organization has advice on{' '}
          <a
            target="_blank"
            rel="noopener noreferrer"
            href="https://www.who.int/emergencies/diseases/novel-coronavirus-2019/advice-for-public/when-and-how-to-use-masks"
          >
            when and how to use face masks
          </a>
          .
        </Typography>

        <Typography variant="h3" component="h1">
          Other questions
        </Typography>
        <Typography variant="h5" component="h5">
          Where/when will I get more my stimulus check?
        </Typography>
        <Typography variant="body1" component="p">
          The Internal Revenue Service has additional information on{' '}
          <a
            target="_blank"
            rel="noopener noreferrer"
            href="https://www.irs.gov/coronavirus"
          >
            economic impact payments
          </a>
          .
        </Typography>
      </Content>
    </Wrapper>
  );
};

export default FAQ;
