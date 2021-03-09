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
            Higher vulnerability areas are more likely to experience severe
            physical and economic suffering from COVID, and to face a harder,
            longer recovery.
            <br />
            <br />
            As of March 8 2021, people in the <i>most</i> vulnerable third of
            U.S. counties are 44 percent more likely to have died from COVID
            than people in the <i>least</i> vulnerable third of U.S. counties.
            <br />
            <br />
            To calculate vulnerability, we use Surgo Ventures’{' '}
            <a
              target="_blank"
              rel="noopener noreferrer"
              href="https://surgoventures.org/resource-library/report-vulnerable-communities-and-covid-19"
            >
              COVID-19 Community Vulnerability Index (CCVI)
            </a>
            .{' '}
            <Link to="/covid-explained/covid-vulnerability-data">
              Learn more
            </Link>
            .
          </Answer>
        </Content>
      </Wrapper>
    </Fragment>
  );
};

export default ModalFaq;
