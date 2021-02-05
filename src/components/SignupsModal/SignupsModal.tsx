import React, { Fragment } from 'react';
import {
  Wrapper,
  Question,
  Answer,
  Content,
  Header,
  Subheader,
  CloseIcon,
} from 'components/Compare/ModalFaq.style';
import { LockBodyScroll } from 'components/Dialog';
import { useEscCloseModal } from 'common/hooks';

const metrosWithVaccinationAlerts = [
  'New York-Newark-Jersey City, NY-NJ-PA',
  'Los Angeles-Long Beach-Anaheim, CA',
  'Chicago-Naperville-Elgin, IL-IN-WI',
  'Dallas-Fort Worth-Arlington TX',
  'Houston-The Woodlands-Sugar Land, TX',
  'Miami-Fort Lauderdale-Pompano Beach, FL',
  'Philadelphia-Camden-Wilmington, PA-NJ-DE-MD',
  'Atlanta-Sandy Springs-Alpharetta, GA',
  'Washington-Arlington-Alexandria, DC--VA-MD-WV',
  'Phoenix-Mesa-Chandler, AZ',
  'Boston-Cambridge-Newton, MA-NH',
  'San Francisco-Oakland-Berkeley, CADetroit-Warren-Ann Arbor, MI',
  'Riverside-San Bernardino-Ontario, CA',
  'Detroit-Warren-Dearborn, MI',
  'Seattle-Tacoma-Bellevue, WA',
  'Minneapolis-St. Paul-Bloomington, MN-WI',
  'San Diego-Chula Vista-Carlsbad, CA',
  'Tampa-St. Petersburg-Clearwater, FL',
  'Denver-Aurora-Lakewood, CO',
  'St. Louis, MO-IL',
];

const SignupsModal = (props: { handleCloseModal: () => void }) => {
  useEscCloseModal(props.handleCloseModal);

  return (
    <Fragment>
      <LockBodyScroll />
      <Wrapper>
        <CloseIcon onClick={props.handleCloseModal} />
        <Content>
          <Header>Vaccine Alerts</Header>
          <Subheader>Frequently asked questions</Subheader>
          <Question>
            Which locations do you have vaccine eligibility information for?
          </Question>
          <Answer>
            We currently have vaccine eligibility information for all 50 states
            and the top 20 metros by population:
            <ol>
              {metrosWithVaccinationAlerts.map((metro: string, i: number) => (
                <li key={`${i}: ${metro}`}>{metro}</li>
              ))}
            </ol>
          </Answer>
          <Question>
            How do you get your vaccine eligibility information?
          </Question>
          <Answer>
            Our team of staff and volunteers review official government sites of
            states, metros and counties several times a week.
          </Answer>
          <Question>
            Why do you have vaccine eligibility information for some locations
            and not others?
          </Question>
          <Answer>
            Identifying vaccine eligibility information takes time, since the
            information is not standardized and cannot be processed
            automatically by a computer. It thus needs to be collected manually.
            What’s more, eligibility varies not only from state to state, but
            also sometimes by county, and even by city. Finally, vaccine
            eligibility information may change as states, counties, or cities
            adjust their roll-out plans, and making sure this information is up
            to date is a manual process of regularly checking government
            websites. For all those reasons, we currently have a limited number
            of locations that we are able to support with vaccine eligibility
            alerts.
          </Answer>
        </Content>
      </Wrapper>
    </Fragment>
  );
};

export default SignupsModal;
