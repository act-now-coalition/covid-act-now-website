import React, { useState } from 'react';
import {
  Footer,
  ButtonContainer,
  FooterText,
  AboutText,
  ModalButton,
  DisclaimerWrapper,
} from './ChartFooter.style';
import NewDialog from 'components/NewDialog/NewDialog';
import { Link } from 'cms-content/modals';
import { MobileOnly, DesktopOnly } from '../Shared/Shared.style';
import ShareButtons from 'components/LocationPage/ShareButtons';
import { Region } from 'common/regions';
import type { MetricValues } from 'common/models/Projections';

export interface AboutModalProps {
  header: string;
  body: string;
  links: Link[];
}

export interface ShareButtonProps {
  region: Region;
  stats: MetricValues;
  chartIdentifier: number;
  showEmbedButton?: boolean;
}

const MetricChartFooter: React.FC<{
  footerText: string;
  disclaimer?: string;
  shareButtonProps: ShareButtonProps;
  aboutModal: AboutModalProps;
}> = ({ footerText, disclaimer, shareButtonProps, aboutModal }) => {
  const [openModal, setOpenModal] = useState(false);
  const dialogProps = {
    open: openModal,
    closeDialog: () => setOpenModal(false),
    header: aboutModal.header,
    body: aboutModal.body,
    links: aboutModal.links,
  };
  return (
    <>
      <DesktopOnly>
        <Footer>
          <FooterText>
            {footerText}&nbsp;
            <ModalButton onClick={() => setOpenModal(true)}>
              <AboutText>About this data</AboutText>
            </ModalButton>
            {disclaimer && <DisclaimerWrapper>{disclaimer}</DisclaimerWrapper>}
            <NewDialog {...dialogProps} />
          </FooterText>
          <ButtonContainer>
            <ShareButtons {...shareButtonProps} />
          </ButtonContainer>
        </Footer>
      </DesktopOnly>
      <MobileOnly>
        <FooterText>
          {footerText}
          {disclaimer && <DisclaimerWrapper>{disclaimer}</DisclaimerWrapper>}
        </FooterText>
        <Footer>
          <ModalButton onClick={() => setOpenModal(true)}>
            <AboutText>About this data</AboutText>
          </ModalButton>
          <NewDialog {...dialogProps} />
          <ButtonContainer>
            <ShareButtons {...shareButtonProps} />
          </ButtonContainer>
        </Footer>
      </MobileOnly>
    </>
  );
};

export default MetricChartFooter;
