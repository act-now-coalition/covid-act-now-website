import React, { useState, Fragment } from 'react';
import AppMetaTags from 'components/AppMetaTags/AppMetaTags';
import ShareBlock from 'components/ShareBlock/ShareBlock';
import Typography from '@material-ui/core/Typography';
import { TEAM } from '../../common';
import StapledSidebar, {
  SidebarLink,
  SectionHeader,
} from 'components/StapledSidebar/StapledSidebar';
import TeamTable from './TeamTable/TeamTable';
import HeadshotGrid, { HeadshotGrid2Up } from './HeadshotGrid/HeadshotGrid';
import { LogoGridItem } from 'components/LogoGrid/LogoGrid';
import Grid from '@material-ui/core/Grid';

import {
  Wrapper,
  Content,
  Header,
  ActiveAlumniButtonContainer,
  ActiveAlumniButton,
  BodyCopy,
} from './About.style';
import { PageType, getPageContent } from 'common/utils/netlify';

const sidebar = (
  <React.Fragment>
    <SidebarLink href="#can">Our Mission</SidebarLink>
    <SidebarLink href="#partners">Who We Work With</SidebarLink>
    <SidebarLink href="#founders">Founders</SidebarLink>
    <SidebarLink href="#advisors">Advisors</SidebarLink>
    <SidebarLink href="#team">Team</SidebarLink>
    <SidebarLink href="#model">Our Model</SidebarLink>
    <SidebarLink href="#faq">FAQ</SidebarLink>
  </React.Fragment>
);

export enum TeamList {
  Active,
  Alumni,
}

//TODO (chelsi): consolidate ActiveAlumniButtons into a single tab component and remove duplicate styles

const About = ({ children }: { children: React.ReactNode }) => {
  const [teamList, setTeamList] = useState(TeamList.Active);
  const teamToShow =
    teamList === TeamList.Alumni ? TEAM.teamAlumni : TEAM.teamActive;

  const content = getPageContent(PageType.ABOUT);

  return (
    <Wrapper>
      <AppMetaTags
        canonicalUrl="/about"
        pageTitle="About Covid Act Now"
        pageDescription="Covid Act Now is a multidisciplinary team of technologists, epidemiologists, and health experts working to help Americans understand  COVID risk in their own community."
      />
      <Header>
        <Content>
          <Typography variant="h3" component="h1">
            {content.pageHeader}
          </Typography>
        </Content>
      </Header>
      <Content>
        <StapledSidebar sidebar={sidebar}>
          <SectionHeader variant="h4" component="h4" id="can">
            {content.introHeader}
          </SectionHeader>
          <BodyCopy source={content.introContent} linkTarget="_blank" />
          <SectionHeader variant="h4" component="h4" id="partners">
            {content.partnersHeader}
          </SectionHeader>

          {content.partnersContent.map((section: any, idx: number) => {
            return (
              <Fragment key={idx}>
                <BodyCopy source={section.copy} linkTarget="_blank" />
                <Grid
                  container
                  spacing={1}
                  alignItems="center"
                  justify="center"
                >
                  {section.logos.map((logo: any, i: number) => (
                    <LogoGridItem
                      image={logo.image}
                      url={logo.url}
                      altText={logo.altText}
                      key={logo.altText}
                    />
                  ))}
                </Grid>
              </Fragment>
            );
          })}

          <SectionHeader variant="h4" component="h4" id="founders">
            Founders
          </SectionHeader>
          <HeadshotGrid people={TEAM.founders} />

          <SectionHeader variant="h4" component="h4" id="advisors">
            Advisors
          </SectionHeader>
          <HeadshotGrid2Up>
            <div>
              <Typography variant="h6" component="h6">
                Epidemiological Advisors
              </Typography>
              <HeadshotGrid people={TEAM.epidemiologicalAdvisors} />
            </div>
            <div>
              <Typography variant="h6" component="h6">
                Medical Advisors
              </Typography>
              <HeadshotGrid people={TEAM.medicalAdvisors} />
            </div>
          </HeadshotGrid2Up>

          <div>
            <Typography variant="h6" component="h6">
              Additional Advisors
            </Typography>
            <TeamTable people={TEAM.additionalAdvisors} />
          </div>

          <SectionHeader variant="h4" component="h4" id="team">
            Team
          </SectionHeader>
          <ActiveAlumniButtonContainer>
            <ActiveAlumniButton
              teamList={teamList}
              onClick={() => setTeamList(TeamList.Active)}
            >
              Active
            </ActiveAlumniButton>
            <ActiveAlumniButton
              teamList={teamList}
              onClick={() => setTeamList(TeamList.Alumni)}
            >
              Alumni
            </ActiveAlumniButton>
          </ActiveAlumniButtonContainer>
          <TeamTable people={teamToShow} isTeam={true} />

          <SectionHeader variant="h4" component="h4" id="model">
            Our Model
          </SectionHeader>
          <Typography variant="body1" component="p">
            Our model is open source.{' '}
            <a
              href="https://github.com/covid-projections/covid-projections"
              target="_blank"
              rel="noopener noreferrer"
            >
              It’s available on GitHub
            </a>
            . You can see all of our data, sources, and assumptions{' '}
            <a
              href="https://docs.google.com/document/d/1cd_cEpNiIl1TzUJBvw9sHLbrbUZ2qCxgN32IqVLa3Do/edit?usp=sharing"
              target="_blank"
              rel="noopener noreferrer"
            >
              here
            </a>
            .
          </Typography>

          <Typography variant="h6" component="h6">
            How are you modeling COVID?
          </Typography>
          <Typography variant="body1" component="p">
            Our model is based on a traditional SEIR model by{' '}
            <a
              href="https://alhill.shinyapps.io/COVID19seir/"
              target="_blank"
              rel="noopener noreferrer"
            >
              Dr. Alison Hill at Harvard
            </a>
            . We developed our model with{' '}
            <a
              href="https://ghss.georgetown.edu/people/katz/"
              target="_blank"
              rel="noopener noreferrer"
            >
              Professor Rebecca Katz
            </a>{' '}
            and her team at the Georgetown Center for Global Health Science and
            Security.
          </Typography>

          <Typography variant="h6" component="h6">
            Where do you get your data?
          </Typography>
          <Typography variant="body1" component="p">
            Our data comes from a number of sources, including{' '}
            <em>The New York Times</em>, and is updated daily. You can see our
            data sources{' '}
            <a
              href="https://docs.google.com/presentation/d/1XmKCBWYZr9VQKFAdWh_D7pkpGGM_oR9cPjj-UrNdMJQ/edit"
              target="_blank"
              rel="noopener noreferrer"
            >
              here
            </a>
            .
          </Typography>

          <Typography variant="h6" component="h6">
            What R value do you use?
          </Typography>
          <Typography variant="body1" component="p">
            Epidemiology models use a metric called “R,” which effectively
            quantifies the disease’s “virality”: On average, how many other
            people someone with the disease will infect. COVID R values are
            educated guesses derived from disease data around the country and
            the world.
          </Typography>
          <Typography variant="body1" component="p">
            The R value is then incorporated into an epidemiology model as a
            single, all-encompassing R value that is universally applied to the
            model’s projections for different regions. (This is the methodology
            our model started with, and is the methodology most common in COVID
            projection models.)
          </Typography>
          <Typography variant="body1" component="p">
            Our model is a bit different. It <em>infers</em> the R value from
            each state’s or county’s own COVID data and uses that custom,
            localized R value to make state- or county-specific projections (
            <a
              href="https://blog.covidactnow.org/inference-projections-for-states/"
              target="_blank"
              rel="noopener noreferrer"
            >
              a methodology that we call “inference projections”
            </a>
            ).
          </Typography>
          <Typography variant="body1" component="p">
            In other words, we look at the COVID data for Alaska or San Mateo
            County and infer the actual rate at which COVID is spreading in
            Alaska and San Mateo County, respectively. This results in a R value
            specific to Alaska (and inferred from the Alaska data) and an R
            value specific to San Mateo County (and inferred from the San Mateo
            County data).
          </Typography>
          <Typography variant="body1" component="p">
            As a shorthand, we call these regionally-inferred, region-specific R
            values “R(t),” because they are the actual R value for a given
            place, be it Alaska or San Mateo County or anywhere else, at any
            given time.
          </Typography>
          <Typography variant="body1" component="p">
            A helpful framework for thinking about R(t) values: In order to
            eliminate COVID, the R(t) must be driven below 1.0. This means that,
            on average, each person with COVID will transmit to 0.9 other
            people, which means the disease is shrinking. An R(t) of 1.0 means
            COVID is in perfect equilibrium, neither growing nor shrinking. An
            R(t) greater than 1.0 means that COVID is growing exponentially. The
            greater the value above 1.0, the faster the doubling speed.
          </Typography>

          <Typography variant="h6" component="h6">
            How up to date is your model?
          </Typography>
          <Typography variant="body1" component="p">
            The model updates every three days. The “last updated” date stamp on
            specifically the state page will tell you when it was last updated.
          </Typography>

          <Typography variant="h6" component="h6">
            How do I know your model is right?
          </Typography>
          <Typography variant="body1" component="p">
            There are two major disclaimers for our model:
          </Typography>
          <ol>
            <li>
              <Typography variant="body1" component="p">
                Our model is only as good as the available data; and
              </Typography>
            </li>
            <li>
              <Typography variant="body1" component="p">
                there is no historical precedent for what is happening — this is
                a novel virus and disease — and our understanding of COVID
                continues to evolve.
              </Typography>
            </li>
          </ol>

          <Typography variant="body1" component="p">
            Our model’s limitations include but are not limited to:
          </Typography>
          <ul>
            <li>
              <Typography variant="body1" component="p">
                Variables will change as our knowledge of COVID evolves.
              </Typography>
            </li>
            <li>
              <Typography variant="body1" component="p">
                Our model is not a node-based analysis. In other words, the
                model assumes everyone spreads the disease at the same rate.
                Reality is, of course, messier. Evidence suggests there may be
                some people who are “super-spreaders” and others who are not.
              </Typography>
            </li>
            <li>
              <Typography variant="body1" component="p">
                Only hospital beds in aggregate are considered. ICU beds, which
                are likely to be the constraining factor for healthcare systems
                capacity, are not considered.
              </Typography>
            </li>
            <li>
              <Typography variant="body1" component="p">
                Demographic, population, and hospital bed count data are
                outdated. Demographics for the U.S. as a whole are used, rather
                than demographics specific to each state. In other words, we
                assume each state’s population exactly reflects the country’s.
                In reality, a state might have a slightly younger population
                than the nation’s, for instance, or a population with a higher
                rate of comorbidities. These state-specific demographic nuances
                would consequently affect morbidity and mortality projections.
              </Typography>
            </li>
          </ul>

          <SectionHeader variant="h4" component="h4" id="faq">
            FAQ
          </SectionHeader>

          <Typography variant="h6" component="h6">
            What’s an SEIR model?
          </Typography>

          <Typography variant="body1" component="p">
            An SEIR model tracks the flow of people between four states:
            susceptible (S), exposed (E), infected (I), and recovered (R):
          </Typography>

          <Typography variant="body1" component="p">
            Susceptible (S) → 𝛃 → Exposed (E) → 𝝨 → Infectious (I) → 𝚪 →
            Recovered (R)
          </Typography>

          <Typography variant="body1" component="p">
            Each variable represents the number of people in that category. The
            parameters beta (𝛃), sigma (𝝨), and gamma (𝚪) control how fast
            people move from one state to another. Our model is significantly
            more complicated than this — and even this might sound complicated!
            — but this is the basic modeling approach we use.
          </Typography>

          <Typography variant="h6" component="h6">
            What does the dotted line on the “infection growth” graph mean?
          </Typography>

          <Typography variant="body1" component="p">
            Because of how we weight our data (Gaussian smoothing), and because
            of potential reporting delays and errors in the incoming case data,
            we need 7 preceding days of data before we can calculate a final R
            <sub>t</sub> value. Therefore, we notate preliminary R<sub>t</sub>{' '}
            values &mdash; values for which we don’t yet have 7 preceding days
            of data &mdash; with the dotted line.
          </Typography>

          <Typography variant="h6" component="h6">
            How does the Covid Act Now model differ from the IHME model?
          </Typography>
          <Typography variant="body1" component="p">
            Until May 4, Covid Act Now and IHME used fundamentally different
            modeling approaches. (
            <a
              href="https://blog.covidactnow.org/covid-act-now-ihme-why-two-models-are-better-than-one/"
              target="_blank"
              rel="noopener noreferrer"
            >
              We explained those differences here
            </a>
            , and{' '}
            <a
              href="https://grandrounds.com/blog/covid-19-forecasting-fit-to-a-curve-or-model-the-disease-in-real-time/"
              target="_blank"
              rel="noopener noreferrer"
            >
              Grand Rounds did a similar analysis
            </a>
            .) On May 4, IHME started using an SEIR model for their projections.
            While the specific assumptions and parameters of IHME’s SEIR model
            are not publicly available, since May 4 the fundamental modeling
            approach has been the same.
          </Typography>

          <Typography variant="h6" component="h6">
            How can I learn more about COVID vaccines and therapeutics being
            developed?
          </Typography>
          <Typography variant="body1" component="p">
            Artis Ventures has created{' '}
            <a
              href="https://www.av.co/covid"
              target="_blank"
              rel="noopener noreferrer"
            >
              an excellent dashboard
            </a>{' '}
            that illustrates what treatments and vaccines are where in the
            R&amp;D pipeline.
          </Typography>

          <Typography variant="h6" component="h6">
            Should I wear a mask in public?
          </Typography>
          <Typography variant="body1" component="p">
            <a
              href="https://www.cdc.gov/coronavirus/2019-ncov/prevent-getting-sick/diy-cloth-face-coverings.html"
              target="_blank"
              rel="noopener noreferrer"
            >
              An emerging body of thought and evidence
            </a>{' '}
            suggests that everyone should wear masks.
          </Typography>

          <Typography variant="h6" component="h6">
            What are the specific policies for my state?
          </Typography>
          <Typography variant="body1" component="p">
            <em>The New York Times</em> lists{' '}
            <a
              href="https://www.nytimes.com/interactive/2020/us/states-reopen-map-coronavirus.html"
              target="_blank"
              rel="noopener noreferrer"
            >
              every state's policies
            </a>
            .
          </Typography>
        </StapledSidebar>
      </Content>
      <ShareBlock />
    </Wrapper>
  );
};

export default About;
