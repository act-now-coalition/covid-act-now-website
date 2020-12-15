import React, { Fragment, useEffect } from 'react';
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

const ModalFaq = (props: { handleCloseModal: () => void }) => {
  useEffect(() => {
    const handleEsc = (e: any) => {
      if (e.keyCode === 27) {
        props.handleCloseModal();
      }
    };

    window.addEventListener('keydown', handleEsc);

    return () => {
      window.removeEventListener('keydown', handleEsc);
    };
  }, [props, props.handleCloseModal]);

  return (
    <Fragment>
      <LockBodyScroll />
      <Wrapper>
        <CloseIcon onClick={props.handleCloseModal} />
        <Content>
          <Header>Compare table</Header>
          <Subheader>Frequently asked questions</Subheader>
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
