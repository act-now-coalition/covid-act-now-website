import React, { useState } from 'react';
import {
  Footer,
  ButtonContainer,
  FooterText,
  AboutText,
  ModalButton,
} from './ChartFooter.style';
import { useBreakpoint } from 'common/hooks';
import NewDialog from 'components/NewDialog/NewDialog';
import { Link } from 'cms-content/modals';

export interface AboutModalProps {
  header: string;
  body: string;
  links: Link[];
}

const MetricChartFooter: React.FC<{
  footerText: string | null;
  shareButton: any;
  aboutModal?: AboutModalProps;
}> = ({ footerText, shareButton, aboutModal }) => {
  const isMobile = useBreakpoint(600);
  const [openModal, setOpenModal] = useState(false);
  return (
    <>
      <Footer>
        <FooterText>
          {footerText}&nbsp;
          {!isMobile && aboutModal && (
            <>
              <ModalButton onClick={() => setOpenModal(true)}>
                <AboutText>About this data</AboutText>
              </ModalButton>
              <NewDialog
                open={openModal}
                closeDialog={() => setOpenModal(false)}
                header={aboutModal.header}
                body={aboutModal.body}
                links={aboutModal.links}
              />
            </>
          )}
        </FooterText>
        {!isMobile && <ButtonContainer>{shareButton}</ButtonContainer>}
      </Footer>
      {isMobile && aboutModal && (
        <Footer>
          <ModalButton onClick={() => setOpenModal(true)}>
            <AboutText>About this data</AboutText>
          </ModalButton>
          <NewDialog
            open={openModal}
            closeDialog={() => setOpenModal(false)}
            header={aboutModal.header}
            body={aboutModal.body}
            links={aboutModal.links}
          />
          <ButtonContainer>{shareButton}</ButtonContainer>
        </Footer>
      )}
    </>
  );
};

export default MetricChartFooter;
