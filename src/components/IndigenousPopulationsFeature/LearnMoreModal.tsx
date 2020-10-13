import React, { Fragment, useEffect } from 'react';
import { createGlobalStyle } from 'styled-components';
import { Wrapper } from 'components/Compare/ModalFaq.style';
import { Header, BodyCopy } from './LearnMoreModal.style';
import CloseIcon from '@material-ui/icons/Close';
import ExternalLink from 'components/ExternalLink';

/*
  TODO (Chelsi): create a modal template out
  of ModalFaq.tsx instead of recreating it, as I
  am doing here :)
*/

const LearnMoreModal = (props: { onClose: any }) => {
  const { onClose } = props;

  /*
   TODO (Chelsi): put this somewhere central
   (It's used in a few places at this point)
 */
  const BodyScrollLock = createGlobalStyle`
  body {
    height: 100vh;
    overflow: hidden;
  }
`;

  useEffect(() => {
    const handleEsc = (e: any) => {
      if (e.keyCode === 27) {
        onClose();
      }
    };

    window.addEventListener('keydown', handleEsc);

    return () => {
      window.removeEventListener('keydown', handleEsc);
    };
  }, [onClose]);

  // TODO (Chelsi): add link to blog post
  return (
    <Fragment>
      <BodyScrollLock />
      <Wrapper>
        <CloseIcon onClick={onClose} />
        <Header>Native American majority counties</Header>
        <BodyCopy>
          We aggregated case and death figures among counties whose populations
          are over 50% Native American according to the{' '}
          <ExternalLink href="https://www.census.gov/history/pdf/c2010br-10.pdf">
            2010 US Census
          </ExternalLink>
          . This represents approximately 10% of the total Native American
          population. This is due to a{' '}
          <ExternalLink href="/">large reporting gap in race</ExternalLink>.
          <ul>
            <li>
              <ExternalLink href="/">View our observations</ExternalLink>
            </li>
            <li onClick={onClose}>Return to chart</li>
          </ul>
        </BodyCopy>
      </Wrapper>
    </Fragment>
  );
};

export default LearnMoreModal;
