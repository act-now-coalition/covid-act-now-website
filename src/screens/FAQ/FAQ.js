import React from 'react';
import Typography from '@material-ui/core/Typography';
import { TEAM } from './../../enums';
import AppMetaTags from 'components/AppMetaTags/AppMetaTags';
import ShareBlock from 'components/ShareBlock/ShareBlock';

import { Wrapper, Content } from './FAQ.style';

const FAQ = ({ children }) => {
  return (
    <Wrapper>
      <AppMetaTags
        canonicalUrl="/faq"
        pageTitle="FAQ"
        pageDescription="Covid Act Now was started by four volunteers who saw the explosive and
          deadly growth of COVID infections around the world and felt they had
          to do something."
      />
      <Content>
        <Typography variant="h3" component="h1">
          About Covid Act Now
        </Typography>
        <Typography variant="h5" component="h5">
          What is Covid Act Now?
        </Typography>
        <Typography variant="body1" component="p">
          Covid Act Now was started by four volunteers who saw the explosive and
          deadly growth of COVID infections around the world and felt they had
          to do something. The Covid Act Now team has partnered with some of
          America’s preeminent epidemiologists and data scientists to develop
          the U.S. Intervention Model.
        </Typography>
        <Typography variant="body1" component="p">
          The U.S. Intervention Model is a data platform that projects COVID
          infections, hospitalizations, and deaths across the United States, as
          well as model how public health interventions contain the spread of
          COVID. We help decision makers understand when and how COVID will
          affect their communities in order to make better decisions that save
          lives.
        </Typography>
        <Typography variant="body1" component="p">
          Our U.S. Intervention Model is being used at every level of government
          across the U.S., the military, private sector, and more. The model has
          also been used by several countries around the world, including India.
        </Typography>

        <Typography variant="h5" component="h5">
          Who made Covid Act Now?
        </Typography>
        <Typography variant="body1" component="p">
          Covid Act Now is a distributed team of volunteers working with some of
          the nation’s preeminent epidemiologists and public health experts.
          CoVidActNow was founded by{' '}
          <a href="https://www.linkedin.com/in/maxhenderson/">Max Henderson</a>,{' '}
          <a href="https://en.wikipedia.org/wiki/Jonathan_Kreiss-Tomkins">
            Rep Jonathan Kreiss-Tomkins
          </a>
          , <a href="https://twitter.com/igorkofman">Igor Kofman</a>, and{' '}
          <a href="https://www.linkedin.com/in/zacharyrosen/">Zack Rosen</a>,
          with medical and policy guidance from{' '}
          <a href="https://profiles.stanford.edu/nirav-shah">Dr. Nirav Shah</a>.
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
                  </a>
                  {', '}
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
          COVID by understanding what it will do in the future. Our leaders need
          a forecasting tool to better understand the future spread of COVID. We
          are building that tool.
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
          , a project developed by MIT, Mayo Clinic, WHO, and others. Private
          Kit is a contact tracing app that notifies someone if they have come
          in contact with someone who later tests positive for COVID while
          protecting individual privacy.
        </Typography>

        <Typography variant="body1" component="p">
          <ul>
            <li>
              Read{' '}
              <a href="https://arxiv.org/pdf/2003.08567.pdf">
                "Apps Gone Rogue: Maintaining Personal Privacy in an Epidemic"
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
          Yes. To improve the tool, we need the help of:
        </Typography>
        <Typography>
          <ul>
            <li>JavaScript/React, Python engineers</li>
            <li>Data Visualization Experts</li>
            <li>UX Designer (Bonus if you write code!)</li>
            <li>Epidimiologist / Modeler</li>
            <li>Engineering Manager</li>
          </ul>
          Is this you?{' '}
          <a
            target="_blank"
            rel="noopener noreferrer"
            href="https://docs.google.com/forms/d/e/1FAIpQLSfQkdwXsbDbwLHhWwBD6wzNiw54_0P6A60r8hujP3qnaxxFkA/viewform"
          >
            Let us know
          </a>
        </Typography>

        <Typography variant="h5" component="h5">
          How do I contact you?
        </Typography>
        <Typography>
          <ul>
            <li>
              Are you in healthcare?{' '}
              <a
                target="_blank"
                rel="noopener noreferrer"
                href="mailto:medical@covidactnow.org"
              >
                medical@covidactnow.org
              </a>
            </li>
            <li>
              Are you in government?{' '}
              <a
                target="_blank"
                rel="noopener noreferrer"
                href="mailto:gov@covidactnow.org"
              >
                gov@covidactnow.org
              </a>
            </li>
            <li>
              Are you a journalist?{' '}
              <a
                target="_blank"
                rel="noopener noreferrer"
                href="mailto:press@covidactnow.org"
              >
                press@covidactnow.org
              </a>
            </li>
            <li>
              Anyone and everything else:{' '}
              <a
                target="_blank"
                rel="noopener noreferrer"
                href="mailto:info@covidactnow.org"
              >
                info@covidactnow.org
              </a>
            </li>
            <li>
              Do you want to contribute to Covid Act Now in other ways?{' '}
              <a
                target="_blank"
                rel="noopener noreferrer"
                href="https://docs.google.com/forms/d/e/1FAIpQLSfQkdwXsbDbwLHhWwBD6wzNiw54_0P6A60r8hujP3qnaxxFkA/viewform"
              >
                Let us know
              </a>
            </li>
          </ul>
        </Typography>
        <Typography variant="h5" component="h5">
          Are you on social media?
        </Typography>
        <Typography>
          Follow us on <a href="https://twitter.com/CovidActNow">Twitter</a>,{' '}
          <a href="https://www.facebook.com/covidactnow">Facebook</a> or{' '}
          <a href="https://www.instagram.com/covidactnow">Instagram</a>.
        </Typography>

        <Typography variant="h3" component="h1">
          About the U.S. Intervention Model
        </Typography>

        <Typography variant="h5" component="h5">
          What is the U.S. Intervention Model?
        </Typography>
        <Typography variant="body1" component="p">
          The U.S. Intervention Model is a data platform that projects COVID
          infections, hospitalizations, and deaths across the United States, as
          well as model how public health interventions contain the spread of
          COVID and save lives.
        </Typography>

        <Typography variant="h5" component="h5">
          Can I view the model?
        </Typography>
        <Typography variant="body1" component="p">
          <a
            target="_blank"
            rel="noopener noreferrer"
            href="https://github.com/covid-projections/covid-data-model"
          >
            Yes, the model is public
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
          The model updates every 24 hours.
        </Typography>

        <Typography variant="h5" component="h5">
          When was the last update?
        </Typography>
        <Typography variant="body1" component="p">
          See the "last updated" date stamp on the state page.
        </Typography>

        <Typography variant="h5" component="h5">
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
              There is no historical precedent for what is going on right now to
              draw from.
            </li>
            <li>
              The default R0 used in this model is an average. The model does
              not adjust for the population density, culturally-determined
              interaction frequency and closeness, humidity, etc. in calculating
              R0.
            </li>
            <li>
              This is not a node-based analysis and thus assumes everyone
              spreads the disease at the same rate. In practice, there are some
              folks who are “super-spreaders,” and others who are almost
              isolated. Interventions should be targeted primarily at those most
              likely to spread the disease.
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
              of maintaining containment; primarily, the reintroduction of COVID
              through travel. 14-day mandatory border quarantines, such as those
              currently in place in China, would likely need to be implemented
              until a vaccine or therapeutic is developed.
            </li>
          </ul>
        </Typography>

        <Typography variant="h5" component="h5">
          What definition does Covid Act Now use for “social distancing” and
          “stay at home”? How about “lax/strict” compliance (re. “stay at
          home”)?{' '}
        </Typography>
        <Typography variant="body1" component="p">
          All these definitions — and much more — can be found in our{' '}
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
          Where can I get more information about COVID?
        </Typography>
        <Typography variant="body1" component="p">
          The CDC has additional information on{' '}
          <a
            target="_blank"
            rel="noopener noreferrer"
            href="https://www.cdc.gov/coronavirus/2019-ncov/index.html"
          >
            COVID
          </a>
          .
        </Typography>

        <Typography variant="h5" component="h5">
          Should I wear a mask in public?
        </Typography>
        <Typography variant="body1" component="p">
          The WHO offers{' '}
          <a
            target="_blank"
            rel="noopener noreferrer"
            href="https://www.who.int/emergencies/diseases/novel-coronavirus-2019/advice-for-public/when-and-how-to-use-masks"
          >
            advice
          </a>{' '}
          on the use of face masks, though there seems to be{' '}
          <a
            target="_blank"
            rel="noopener noreferrer"
            href="https://www.washingtonpost.com/outlook/2020/03/28/masks-all-coronavirus/"
          >
            an emerging body of thought and evidence
          </a>{' '}
          that masks should be worn by everyone.
        </Typography>

        <Typography variant="h3" component="h1">
          Other questions
        </Typography>
        <Typography variant="h5" component="h5">
          When will I get my stimulus check?
        </Typography>
        <Typography variant="body1" component="p">
          Please visit the{' '}
          <a
            target="_blank"
            rel="noopener noreferrer"
            href="https://www.irs.gov/coronavirus"
          >
            IRS’s page on stimulus checks
          </a>{' '}
          for more info, though this (from the IRS) is the takeaway for many
          folks: “The distribution of economic impact payments will begin in the
          next three weeks and will be distributed automatically, with no action
          required for most people.” .
        </Typography>
        <ShareBlock />
      </Content>
    </Wrapper>
  );
};

export default FAQ;
