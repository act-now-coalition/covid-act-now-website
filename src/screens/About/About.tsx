import React from 'react';
import Typography from '@material-ui/core/Typography';
import { TEAM } from './../../enums';
import StapledSidebar, {
  SidebarLink,
  SectionHeader,
} from 'components/StapledSidebar/StapledSidebar';
import TeamTable from './TeamTable/TeamTable';

import { Wrapper, Content, Header, Logo } from './About.style';

const sidebar = (
  <React.Fragment>
    <SidebarLink href="#can">Covid Act Now</SidebarLink>
    <SidebarLink href="#team">The Team</SidebarLink>
    <SidebarLink href="#model">The Model</SidebarLink>
    <SidebarLink href="#faq">FAQ</SidebarLink>
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
            Covid Act Now
          </SectionHeader>

          <a
            href="https://ghss.georgetown.edu/"
            target="_blank"
            rel="noopener noreferrer"
          >
            <Logo src="/images/ghss.png" />
          </a>
          <Typography variant="body1" component="p">
            Covid Act Now (CAN) is a multidisciplinary team of technologists,
            epidemiologists, health experts, and public policy leaders working
            to model how COVID-19 will spread in the U.S. We work in partnership
            with the Georgetown University for Global Health Science and
            Security.
          </Typography>
          <Typography variant="body1" component="p">
            We published the first version of our model on March 20. Over 10
            million Americans have used the model since. We’ve engaged with
            dozens of federal, state, and local government officials, including
            the U.S. military and White House, to assist with response planning.
          </Typography>

          <SectionHeader variant="h4" component="h4" id="team">
            The Team
          </SectionHeader>

          <Typography variant="h6" component="h6">
            Our Founders
          </Typography>
          <TeamTable people={TEAM.founders} />
          <Typography variant="h6" component="h6">
            Our Epidemiological Advisors
          </Typography>
          <TeamTable people={TEAM.epidemiologicalAdvisors} />
          <Typography variant="h6" component="h6">
            Our Medical Advisors
          </Typography>
          <TeamTable people={TEAM.medicalAdvisors} />
          <Typography variant="h6" component="h6">
            Our Team
          </Typography>
          <TeamTable people={TEAM.team} />

          <SectionHeader variant="h4" component="h4" id="model">
            The Model
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
              href="https://data.covidactnow.org/Covid_Act_Now_Model_References_and_Assumptions.pdf"
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
            Our data comes from a number of sources, including Johns Hopkins
            University, and is updated daily. You can see our data sources{' '}
            <a
              href="https://data.covidactnow.org/Covid_Act_Now_Model_References_and_Assumptions.pdf"
              target="_blank"
              rel="noopener noreferrer"
            >
              here
            </a>
            .
          </Typography>

          <Typography variant="h6" component="h6">
            What R<sub>0</sub> value do you use?
          </Typography>
          <Typography variant="body1" component="p">
            Epidemiology models use a metric called R<sub>0</sub> (pronounced “R
            naught”), which effectively quantifies the disease’s “virality” — on
            average, how many other people someone with the disease will infect.
            COVID R<sub>0</sub> values are educated guesses derived from disease
            data around the country and the world.
          </Typography>
          <Typography variant="body1" component="p">
            The R<sub>0</sub> value is then incorporated into an epidemiology
            model as a single, omnipotent R<sub>0</sub> value that is
            universally applied to the model’s projections for different
            regions. (This is the methodology our model started with, and is the
            methodology most common in COVID projection models.)
          </Typography>
          <Typography variant="body1" component="p">
            Our model is a bit different. It <em>infers</em> the R<sub>0</sub>{' '}
            value from each state’s or county’s own COVID data and uses that
            bespoke R<sub>0</sub> value to make state- or county-specific
            projections (
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
            Alaska and San Mateo County, respectively. This results in a R
            <sub>0</sub> value specific to Alaska (and inferred from the Alaska
            data) and an R<sub>0</sub> value specific to San Mateo County (and
            inferred from the San Mateo County data).
          </Typography>
          <Typography variant="body1" component="p">
            As shorthand, we call these regionally-inferred, region-specific R
            <sub>0</sub> values “R-effective,” because they are the actual — or{' '}
            <em>effective</em> — R<sub>0</sub> value for any given place, be it
            Alaska or San Mateo County or anywhere else.
          </Typography>
          <Typography variant="body1" component="p">
            A helpful framework for thinking about R<sub>0</sub> values: In
            order to eliminate COVID, the R<sub>0</sub> must be driven below
            1.0. This means that, on average, each person with COVID will
            transmit to 0.9 other people, which means the disease is shrinking.
            An R<sub>0</sub> of 1.0 means COVID is in perfect equilibrium,
            neither growing nor shrinking. And an R<sub>0</sub> greater than 1.0
            means that COVID is growing exponentially — and the greater the
            value above 1.0, the faster the doubling speed.
          </Typography>

          <Typography variant="h6" component="h6">
            How up to date is your model?
          </Typography>
          <Typography variant="body1" component="p">
            The model updates every three days. The “last updated” date stamp on
            specifically the state page will tell you when it was last updated.
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
                Interventions should be targeted primarily at those most likely
                to spread the disease.
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
                than demographics specific to each state.
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
            SEIR model. Simply put, it specifically models the flows of people
            between four states: susceptible (S), exposed (E), infected (I), and
            resistant (R):
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
            How does the Covid Act Now model differ from the IHME model?
          </Typography>
          <Typography variant="body1" component="p">
            <a
              href="https://blog.covidactnow.org/covid-act-now-ihme-why-two-models-are-better-than-one/"
              target="_blank"
              rel="noopener noreferrer"
            >
              We wrote a blog post explaining the differences
            </a>
            .
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
              href="https://www.washingtonpost.com/outlook/2020/03/28/masks-all-coronavirus/"
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
              href="https://www.nytimes.com/interactive/2020/us/coronavirus-stay-at-home-order.html"
              target="_blank"
              rel="noopener noreferrer"
            >
              every state's policies
            </a>
            .
          </Typography>
        </StapledSidebar>
      </Content>
    </Wrapper>
  );
};

export default About;
