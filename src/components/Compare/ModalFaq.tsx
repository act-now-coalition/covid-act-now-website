import React, { Fragment } from 'react';
import { Link } from 'react-router-dom';
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
            Vulnerable areas are more likely to experience severe physical and
            economic suffering from COVID, and to face a harder, longer
            recovery.
            <br />
            <br />
            As of January 2021, people in the most vulnerable third of U.S.
            counties are:
            <ul>
              <li>23 percent more likely to be diagnosed with COVID</li>
              <li>32 percent more likely to have died from COVID</li>
              <li>
                35 percent more likely to be unemployed due to COVID (
                <a
                  target="_blank"
                  rel="noopener noreferrer"
                  href="https://surgoventures.org/resource-library/report-vulnerable-communities-and-covid-19"
                >
                  see source
                </a>
                ).
              </li>
            </ul>
            To calculate vulnerability, we use Surgo Ventures’ COVID-19
            Community Vulnerability Index (CCVI).{' '}
            <Link to="/covid-explained/covid-vulnerability-data">
              Learn more
            </Link>
            .
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
