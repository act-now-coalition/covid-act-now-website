
import React from 'react';
import Typography from '@material-ui/core/Typography';
import { TEAM } from './../../enums';

import { Wrapper, Content, TextContent, Header } from './About.style';

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
          the U.S. Interventions Model.
        </Typography>
        <Typography variant="body1" component="p">
          The U.S. Interventions Model is a data platform that projects COVID
          infections, hospitalizations, and deaths across the United States, as
          well as model how public health interventions contain the spread of
          COVID. We help decision makers understand when and how COVID will
          affect their communities in order to make better decisions that save
          lives.
        </Typography>
        <Typography variant="body1" component="p">
          Our U.S. Interventions Model is being used at every level of
          government across the U.S., the military, private sector, and more.
          The model has also been adapted for use by several countries around
          the world, including India.
        </Typography>

        <Typography variant="h5" component="h5">
          Who made Covid Act Now?
        </Typography>
        <Logo src="/images/ghss.png" />
        <Typography variant="body1" component="p">
          Covid Act Now is a distributed team of volunteers working with some of
          the nation’s preeminent epidemiologists and public health experts{' '}
          <a
            href="https://blog.covidactnow.org/covid-modeling-values/"
            target="_blank"
            rel="noopener noreferrer"
          >
            guided by common values
          </a>
          . Covid Act Now was founded by{' '}
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

        <Typography variant="h5" component="h5">
          Who supports, endorses or validates your work?
        </Typography>
        <Typography variant="body1" component="p">
          A by a number of experts in epidemiology, public health, and medicine{' '}
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
      </Content>
    </Wrapper>
  );
};

export default About;
