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

interface ModalFaqProps {
  handleCloseModal: () => void;
}

const ModalFaq = ({ handleCloseModal }: ModalFaqProps) => {
  useEscToClose(handleCloseModal);

  return (
    <Fragment>
      <LockBodyScroll />
      <Wrapper>
        <CloseIcon onClick={handleCloseModal} />
        <Content>
          <Header>Compare table</Header>
          <Subheader>Frequently asked questions</Subheader>
          <Question>How do you define “vulnerability”?</Question>
          <Answer>
            Our vulnerability metric is calculated using government and health
            data sources. It is a static metric.
            <br />
            <br />
            As of May 4, 2021, people in the <i>most</i> vulnerable third of
            U.S. counties are 47 percent more likely to have died from COVID
            than people in the <i>least</i> vulnerable third of U.S. counties.
            <br />
            <br />
            Read more about Surgo Ventures’&nbsp;
            <a
              target="_blank"
              rel="noopener noreferrer"
              href="https://precisionforcovid.org/ccvi"
            >
              COVID-19 Community Vulnerability Index (CCVI)
            </a>
            .
          </Answer>
        </Content>
      </Wrapper>
    </Fragment>
  );
};

// Swallow the ref, because we don't need it, to silence a warning
const ModalFaqWrapper = React.forwardRef((props: ModalFaqProps, ref) => {
  return <ModalFaq {...props} />;
});

export default ModalFaqWrapper;
