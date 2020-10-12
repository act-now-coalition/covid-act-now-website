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
        <Header>Native American majority populations</Header>
        <BodyCopy>
          We aggregated case and death figures among counties whose populations
          are over 50% Native American according to the{' '}
          <ExternalLink href="/donate">2010 US Census</ExternalLink>.
          <ul>
            <li>
              <ExternalLink href="/donate">View our observations</ExternalLink>
            </li>
            <li onClick={onClose}>Return to chart</li>
          </ul>
        </BodyCopy>
      </Wrapper>
    </Fragment>
  );
};

export default LearnMoreModal;
