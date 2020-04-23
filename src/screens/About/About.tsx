import React from 'react';
import Typography from '@material-ui/core/Typography';
import { TEAM } from './../../enums';
import StapledSidebar, {
  SidebarLink,
  SectionHeader,
} from 'components/StapledSidebar/StapledSidebar';
import Endorsements from 'screens/Endorsements/Endorsements';

import { Wrapper, Content, Header, Logo } from './About.style';

const sidebar = (
  <React.Fragment>
    <SidebarLink href="#can">What is Covid Act Now</SidebarLink>
    <SidebarLink href="#team">The Team</SidebarLink>
    <SidebarLink href="#partners-advisors">Partners &amp; Advisors</SidebarLink>
    <SidebarLink href="#faq">FAQ</SidebarLink>
    <SidebarLink href="#about-covid">About COVID</SidebarLink>
  </React.Fragment>
);

const About = ({ children }: { children: React.ReactNode }) => {
  return (
    <Wrapper>
      <Header>
        <Content>
          <Typography variant="h3" component="h1">
            About Covid Act Now
          </Typography>
        </Content>
      </Header>
      <Content>
        <StapledSidebar sidebar={sidebar}>
          <SectionHeader variant="h4" component="h4" id="can">
            What is Covid Act Now?
          </SectionHeader>
          <Typography variant="body1" component="p">
            Covid Act Now was started by four volunteers who saw the explosive
            and deadly growth of COVID infections around the world and felt they
            had to do something. The Covid Act Now team has partnered with some
            of America’s preeminent epidemiologists and data scientists to
            develop the U.S. Interventions Model.
          </Typography>
          <Typography variant="body1" component="p">
            The U.S. Interventions Model is a data platform that projects COVID
            infections, hospitalizations, and deaths across the United States,
            as well as model how public health interventions contain the spread
            of COVID. We help decision makers understand when and how COVID will
            affect their communities in order to make better decisions that save
            lives.
          </Typography>
          <Typography variant="body1" component="p">
            Our U.S. Interventions Model is being used at every level of
            government across the U.S., the military, private sector, and more.
            The model has also been adapted for use by several countries around
            the world, including India.
          </Typography>
          <SectionHeader variant="h4" component="h4" id="team">
            The Team
          </SectionHeader>
          <Logo src="/images/ghss.png" />
          <Typography variant="body1" component="p">
            Covid Act Now is a distributed team of volunteers working with some
            of the nation’s preeminent epidemiologists and public health experts{' '}
            <a
              href="https://blog.covidactnow.org/covid-modeling-values/"
              target="_blank"
              rel="noopener noreferrer"
            >
              guided by common values
            </a>
            . Covid Act Now was founded by{' '}
            <a href="https://www.linkedin.com/in/maxhenderson/">
              Max Henderson
            </a>
            ,{' '}
            <a href="https://en.wikipedia.org/wiki/Jonathan_Kreiss-Tomkins">
              Rep Jonathan Kreiss-Tomkins
            </a>
            , <a href="https://twitter.com/igorkofman">Igor Kofman</a>, and{' '}
            <a href="https://www.linkedin.com/in/zacharyrosen/">Zack Rosen</a>,
            with medical and policy guidance from{' '}
            <a href="https://profiles.stanford.edu/nirav-shah">
              Dr. Nirav Shah
            </a>
            .
          </Typography>
          <Typography variant="body1" component="p">
            We have since grown into a large distributed team working in
            partnership with Georgetown University Center for Global Health
            Science and Security.
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
                    {teammate.title ? ', ' + teammate.title : ''}
                  </li>
                );
              })}
            </ul>
          </Typography>

          <SectionHeader variant="h4" component="h4" id="partners-advisors">
            Partners &amp; Advisors
          </SectionHeader>
          <Endorsements compact={true} />

          <SectionHeader variant="h4" component="h4" id="faq">
            FAQ
          </SectionHeader>
          <Typography variant="h6" component="h6">
            Who supports, endorses or validates your work?
          </Typography>
          <Typography variant="body1" component="p">
            A by a number of experts in epidemiology, public health, and
            medicine{' '}
            <a
              href="https://covidactnow.org/endorsements"
              target="_blank"
              rel="noopener noreferrer"
            >
              have validated our work
            </a>{' '}
            . We publish our COVID Modeling Values{' '}
            <a
              href="https://blog.covidactnow.org/covid-modeling-values/"
              target="_blank"
              rel="noopener noreferrer"
            >
              here
            </a>
            .
          </Typography>
          <Typography variant="h6" component="h6">
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
            If we try to fight COVID in the present we will lose. We can only
            beat COVID by understanding what it will do in the future. Our
            leaders need a forecasting tool to better understand the future
            spread of COVID. We are building that tool.
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

          <Typography variant="h6" component="h6">
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

          <Typography variant="h6" component="h6">
            Are you on social media?
          </Typography>
          <Typography>
            Follow us on <a href="https://twitter.com/CovidActNow">Twitter</a>,{' '}
            <a href="https://www.facebook.com/covidactnow">Facebook</a> or{' '}
            <a href="https://www.instagram.com/covidactnow">Instagram</a>.
          </Typography>

          <SectionHeader variant="h4" component="h4" id="about-covid">
            About COVID
          </SectionHeader>

          <Typography variant="h6" component="h6">
            What’s the status of COVID vaccine and therapeutic development?
          </Typography>
          <Typography variant="body1" component="p">
            Artis Ventures has created{' '}
            <a
              target="_blank"
              rel="noopener noreferrer"
              href="https://www.cdc.gov/coronavirus/2019-ncov/symptoms-testing/symptoms.html"
            >
              an excellent dashboard
            </a>{' '}
            that gives a sense of what treatments and vaccines are being
            researched and clinically trialed.
          </Typography>

          <Typography variant="h6" component="h6">
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

          <Typography variant="h6" component="h6">
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

          <Typography variant="h6" component="h6">
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

          <Typography variant="h6" component="h6">
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
          <SectionHeader variant="h4" component="h4">
            Other questions
          </SectionHeader>
          <Typography variant="h6" component="h6">
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
            folks: “The distribution of economic impact payments will begin in
            the next three weeks and will be distributed automatically, with no
            action required for most people.”
          </Typography>
        </StapledSidebar>
      </Content>
    </Wrapper>
  );
};

export default About;
