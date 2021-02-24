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
import { useEscToClose } from 'common/hooks';

const SignupsModal = (props: { handleCloseModal: () => void }) => {
  useEscToClose(props.handleCloseModal);

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
            We currently have vaccine eligibility information for all 50 states.
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
