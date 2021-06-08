import React, { useState } from 'react';
import {
  Row,
  ButtonContainer,
  FooterText,
  AboutText,
  ModalButton,
  DisclaimerWrapper,
} from './ChartFooter.style';
import { DialogMain } from 'components/Dialogs';
import { Link } from 'cms-content/modals';
import { MobileOnly, DesktopOnly } from '../Shared/Shared.style';
import ShareButtons from 'components/LocationPage/ShareButtons';
import { Region } from 'common/regions';
import type { MetricValues } from 'common/models/Projections';
import { MarkdownBody } from 'components/Markdown';

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
    links: aboutModal.links,
  };
  return (
    <>
      <DesktopOnly>
        <Row>
          <FooterText>
            {footerText}&nbsp;
            <ModalButton onClick={() => setOpenModal(true)}>
              <AboutText>About this data</AboutText>
            </ModalButton>
            {disclaimer && <DisclaimerWrapper>{disclaimer}</DisclaimerWrapper>}
            <DialogMain {...dialogProps}>
              <MarkdownBody source={aboutModal.body} />
            </DialogMain>
          </FooterText>
          <ButtonContainer>
            <ShareButtons {...shareButtonProps} />
          </ButtonContainer>
        </Row>
      </DesktopOnly>
      <MobileOnly>
        <FooterText>
          {footerText}
          {disclaimer && <DisclaimerWrapper>{disclaimer}</DisclaimerWrapper>}
        </FooterText>
        <Row>
          <ModalButton onClick={() => setOpenModal(true)}>
            <AboutText>About this data</AboutText>
          </ModalButton>
          <DialogMain {...dialogProps}>
            <MarkdownBody source={aboutModal.body} />
          </DialogMain>
          <ButtonContainer>
            <ShareButtons {...shareButtonProps} />
          </ButtonContainer>
        </Row>
      </MobileOnly>
    </>
  );
};

export default MetricChartFooter;
