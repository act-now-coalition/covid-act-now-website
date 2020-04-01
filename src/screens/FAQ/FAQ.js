import React from 'react';
import Typography from '@material-ui/core/Typography';
import Link from '@material-ui/core/Link';
import { TEAM } from './../../enums';

import { Wrapper, Content } from './FAQ.style';

const FAQ = ({ children }) => {
  return (
    <Wrapper>
      <Content>
        <Typography variant="h3" component="h1">
          About
        </Typography>
        <Typography variant="body1" component="p">
          <a href="CovidActNow.org" target="_blank">
            CovidActNow.org
          </a>{' '}
          was created by a team of data scientists, engineers, and designers in
          partnership with epidemiologists, public health officials, and
          political leaders to help understand how the COVID-19 pandemic will
          affect their region.
        </Typography>
        <Typography variant="body1" component="p">
          This tool is built to enable political leaders to quickly make
          decisions in their Coronavirus response informed by best available
          data and modeling.
        </Typography>
        <Typography variant="body1" component="p">
          We built this tool to answer critically important questions such as:
        </Typography>
        <Typography>
          <ul>
            <li>
              What will the impact be in my region be and when can I expect it?
            </li>
            <li>How long until my hospital system is under severe pressure?</li>
            <li>
              What is my menu of interventions, and how will they address the
              spread of Coronavirus?
            </li>
          </ul>
        </Typography>
        <Typography variant="h5" component="h5">
          Who built this tool?
        </Typography>
        <Typography variant="body1" component="p">
          CoVidActNow was founded by{' '}
          <a href="https://www.linkedin.com/in/maxhenderson/">Max Henderson</a>,{' '}
          <a href="https://en.wikipedia.org/wiki/Jonathan_Kreiss-Tomkins">
            Rep Jonathan Kreiss-Tomkins
          </a>
          , <a href="https://twitter.com/igorkofman">Igor Kofman</a>, and{' '}
          <a href="https://www.linkedin.com/in/zacharyrosen/">Zack Rosen</a>,
          with medical and policy guidance from{' '}
          <a href="https://profiles.stanford.edu/nirav-shah">Nirav R. Shah</a>{' '}
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
        <Typography variant="body1" component="p">
          <a
            href="https://docs.google.com/spreadsheets/u/3/d/1YEj4Vr6lG1jQ1R3LG6frijJYNynKcgTjzo2n0FsBwZA/htmlview#gid=1579455912"
            target="_blank"
            rel="noopener noreferrer"
          >
            Our model is public.
          </a>
        </Typography>
        <Typography variant="body1" component="p">
          <a
            href="https://docs.google.com/document/u/3/d/1ETeXAfYOvArfLvlxExE0_xrO5M4ITC0_Am38CRusCko/preview?sle=true"
            target="_blank"
            rel="noopener noreferrer"
          >
            So are our assumptions and definitions.
          </a>
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
          If we try to fight COVID in the present we will lose (e.g., Italy). We
          can only beat COVID by understanding what it will do to us in the near
          future.
        </Typography>

        <Typography variant="body1" component="p">
          Coronavirus response leaders need the tools to do this — we are
          building them the tools.
        </Typography>

        <Typography variant="h5" component="h5">
          Collaborator Projects
        </Typography>

        <Typography variant="body1" component="p">
          CoVidActNow endorses Private Kit: Safe Paths, a project developed by
          MIT, the Mayo Clinic, the World Health Organization, and others.
        </Typography>

        <Typography variant="body1" component="p">
          Private Kit is a mobile app for contact tracing that protects
          indivdual privacy. Contact tracing is a technology that notifies
          individuals if they have come in contact with someone who then later
          tests positive for CoVid-19. Learn more at{' '}
          <a
            href="https://safepaths.mit.edu"
            target="_blank"
            rel="noopener noreferrer"
          >
            https://safepaths.mit.edu
          </a>{' '}
          Read the white paper
          <li>
            <a href="https://arxiv.org/pdf/2003.08567.pdf">
              Apps Gone Rogue: Maintaining Personal Privacy in an Epidemic
            </a>
          </li>
        </Typography>

        <Typography variant="body1" component="p">
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
        </Typography>

        <Typography variant="h5" component="h5">
          Can I contribute?
        </Typography>
        <Typography variant="body1" component="p">
          Yes. To improve the capability and accuracy of the tool, we need the
          help of:
        </Typography>
        <Typography>
          <ul>
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
            <li>Communications Leaders</li>
            <ul>
              <li>
                <a href="https://docs.google.com/document/d/1do_XQ0twIpjiNzmD2-TydO8h9CnorE1TiNEHe1suH0Q/edit">
                  Growth Lead
                </a>
              </li>
              <li>
                <a href="https://docs.google.com/document/d/1SHSx8C8j11UNpxyLVYGgnv106ho2cHg41f5AStgVPkU/edit?ts=5e792bd0">
                  Community Manager / Social Media Lead
                </a>
              </li>
            </ul>
          </ul>
        </Typography>
        <Typography variant="body1" component="p">
          <a
            href="mailto:info@covidactnow.org"
            target="_blank"
            rel="noopener noreferrer"
          >
            Email us
          </a>{' '}
          to share feedback or access to expertise, questions, or if you
          otherwise want to help.
        </Typography>

        <Typography variant="h3" component="h1">
          General
        </Typography>

        <Typography variant="h5" component="h5">
          What are the definitions for "social distancing" and "stay at home"?
        </Typography>
        <Typography variant="body1" component="p">
          Definitions <a href="https://bit.ly/394SJ9I">are available here</a>.
        </Typography>

        <Typography variant="h5" component="h5">
          How are "social distancing" and "stay at home" different?
        </Typography>
        <Typography variant="body1" component="p">
          Definitions and a comparison{' '}
          <a href="https://bit.ly/394SJ9I">are available here</a>.
        </Typography>

        <Typography variant="h5" component="h5">
          What are the specific policies for my state?
        </Typography>
        <Typography variant="body1" component="p">
          The New York Times has a list of{' '}
          <a href="https://www.nytimes.com/interactive/2020/us/coronavirus-stay-at-home-order.html">
            specific state-by-state policies
          </a>
          .
        </Typography>

        <Typography variant="h5" component="h5">
          What are the symptoms of COVID-19?
        </Typography>
        <Typography variant="body1" component="p">
          The Centers for Disease Control and Prevention has a list of{' '}
          <a href="https://www.cdc.gov/coronavirus/2019-ncov/symptoms-testing/symptoms.html">
            COVID-19 symptoms
          </a>
          .
        </Typography>

        <Typography variant="h5" component="h5">
          Where/how should I get tested?
        </Typography>
        <Typography variant="body1" component="p">
          The Centers for Disease Control and Prevention has additional
          information on{' '}
          <a href="https://www.cdc.gov/coronavirus/2019-ncov/symptoms-testing/testing.html">
            when and how to get tested
          </a>
          .
        </Typography>

        <Typography variant="h5" component="h5">
          What should I do if I think I am sick?
        </Typography>
        <Typography variant="body1" component="p">
          The Centers for Disease Control and Prevention provides advice on{' '}
          <a href="https://www.cdc.gov/coronavirus/2019-ncov/if-you-are-sick/steps-when-sick.html">
            what to do if you think you are sick
          </a>
          .
        </Typography>

        <Typography variant="h5" component="h5">
          Where can I get more information about COVID-19?
        </Typography>
        <Typography variant="body1" component="p">
          The Centers for Disease Control and Prevention has additional
          information on{' '}
          <a href="https://www.cdc.gov/coronavirus/2019-ncov/index.html">
            COVID-19
          </a>
          .
        </Typography>

        <Typography variant="h5" component="h5">
          Should I wear a mask in public?
        </Typography>
        <Typography variant="body1" component="p">
          The World Health Organization has advice on{' '}
          <a href="https://www.who.int/emergencies/diseases/novel-coronavirus-2019/advice-for-public/when-and-how-to-use-masks">
            when and how to use face masks
          </a>
          .
        </Typography>

        <Typography variant="h5" component="h5">
          Where/when will I get more my stimulus check?
        </Typography>
        <Typography variant="body1" component="p">
          The Internal Revenue Service has additional information on{' '}
          <a href="https://www.irs.gov/coronavirus">economic impact payments</a>
          .
        </Typography>

        <Typography variant="h3" component="h1">
          Model
        </Typography>

        <Typography variant="h5" component="h5">
          Can I view the model?
        </Typography>
        <Typography variant="body1" component="p">
          Yes, the model is public, and{' '}
          <a href="https://bit.ly/391uB80">can be viewed here</a>. Reference
          materials, including assumptions, logic, and definitions{' '}
          <a href="https://bit.ly/394SJ9I">are available here</a>.
        </Typography>

        <Typography variant="h5" component="h5">
          How often does the model update?
        </Typography>
        <Typography variant="body1" component="p">
          At a minimum, the model is updated every four days.
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
      </Content>
    </Wrapper>
  );
};

export default FAQ;
