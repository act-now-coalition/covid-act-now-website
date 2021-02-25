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

const ModalFaq = (props: { handleCloseModal: () => void }) => {
  useEscToClose(props.handleCloseModal);

  return (
    <Fragment>
      <LockBodyScroll />
      <Wrapper>
        <CloseIcon onClick={props.handleCloseModal} />
        <Content>
          <Header>Compare table</Header>
          <Subheader>Frequently asked questions</Subheader>
          <Question>How do you define “vulnerability”?</Question>
          <Answer>
            “Vulnerability” in this context refers to a location’s risk of
            suffering more severely from COVID, including increased cases and
            deaths, and recovering more slowly from the physical and economic
            harm caused by COVID.
            <br />
            <br />
            To calculate vulnerability, we use Surgo Venture’s COVID Community
            Vulnerability Index (CCVI), which uses key social, health, and
            economic factors to score every U.S. state and county.
          </Answer>
          <Question>How are “metro” and “non-metro” counties defined?</Question>
          <Answer>
            You can think of this as urban or rural, but just keep in mind that
            isn’t exact.
            <br />
            <br />
            We follow US Census definitions. A Metro Statistical Area (MSA)
            consists of one or more counties that contain a city of 50,000 or
            more inhabitants. We define “metro counties” as counties belonging
            to MSAs; “non metro counties” as counties not within an MSA.
          </Answer>
        </Content>
      </Wrapper>
    </Fragment>
  );
};

export default ModalFaq;
