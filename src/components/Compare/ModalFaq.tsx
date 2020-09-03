import React, { Fragment } from 'react';
import { createGlobalStyle } from 'styled-components';
import {
  Wrapper,
  Question,
  Answer,
  Content,
  Header,
  Subheader,
} from 'components/Compare/ModalFaq.style';
import CloseIcon from '@material-ui/icons/Close';

const BodyScrollLock = createGlobalStyle`
  body {
    height: 100vh;
    overflow: hidden;
  }
`;

const ModalFaq = (props: { handleCloseModal: () => void }) => {
  return (
    <Fragment>
      <BodyScrollLock />
      <Wrapper>
        <CloseIcon onClick={props.handleCloseModal} />
        <Header>Compare table</Header>
        <Subheader>Frequenlty asked questions</Subheader>
        <Content>
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
          <Question>How are counties “with college” defined?</Question>
          <Answer>
            We wanted to highlight counties where college populations
            significantly contribute to the local COVID dynamics. Counties with
            the "college" label are defined as counties in which full-time
            student enrollment accounts for at least 5% of the total county
            population.
          </Answer>
          <Question>Why do some counties have missing data?</Question>
          <Answer>
            Most states report contact tracing at the state-level only, meaning
            we don’t receive county-level data. This is sometimes common for
            other metrics as well. We suggest using state-level pages in those
            situations.
          </Answer>
        </Content>
      </Wrapper>
    </Fragment>
  );
};

export default ModalFaq;
