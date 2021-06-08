import React from 'react';
import {
  Row,
  ButtonContainer,
  FooterText,
  AboutText,
  ModalButton,
  Wrapper,
  OverrideDisclaimer,
} from './ChartFooter.style';
import { DialogMain, MetricInfoDialogInner } from 'components/Dialogs';
// import { Link } from 'cms-content/modals';
import { MobileOnly, DesktopOnly } from '../Shared/Shared.style';
import ShareButtons from 'components/LocationPage/ShareButtons';
import { Region } from 'common/regions';
import type { MetricValues } from 'common/models/Projections';
import { useDialog } from 'common/hooks';
import { MetricModalContent } from 'components/Dialogs/utils';

export interface ShareButtonProps {
  region: Region;
  stats: MetricValues;
  chartIdentifier: number;
  showEmbedButton?: boolean;
}

interface DialogProps {
  open: boolean;
  closeDialog: any;
  openDialog: any;
  modalContent: MetricModalContent;
  modalHeader: string;
  modalLinks: any;
}

const ShareButtonBlock: React.FC<ShareButtonProps> = ({
  ...shareButtonProps
}) => {
  return (
    <ButtonContainer>
      <ShareButtons {...shareButtonProps} />
    </ButtonContainer>
  );
};

const MetricModal: React.FC<DialogProps> = ({
  open,
  closeDialog,
  openDialog,
  modalContent,
  modalLinks,
  modalHeader,
}) => {
  const dialogProps = {
    open,
    closeDialog,
    header: modalHeader,
    links: modalLinks,
  };

  return (
    <>
      <ModalButton onClick={openDialog}>
        <AboutText>About this data</AboutText>
      </ModalButton>
      <DialogMain {...dialogProps}>
        <MetricInfoDialogInner modalContent={modalContent} />
      </DialogMain>
    </>
  );
};

const MetricChartFooter: React.FC<{
  footerText: React.ReactElement;
  overrideDisclaimer?: string;
  shareButtonProps: ShareButtonProps;
  modalContent: MetricModalContent;
  modalHeader: string;
  modalLinks?: any;
}> = ({
  footerText,
  overrideDisclaimer,
  shareButtonProps,
  modalContent,
  modalHeader,
  modalLinks,
}) => {
  const [isOpen, openDialog, closeDialog] = useDialog(false);

  const dialogProps = {
    open: isOpen,
    closeDialog,
    openDialog,
    modalContent,
    modalLinks,
    modalHeader,
  };

  return (
    <Wrapper>
      <DesktopOnly>
        <Row>
          <FooterText>
            {footerText}&nbsp;
            <MetricModal {...dialogProps} />
            {overrideDisclaimer && (
              <OverrideDisclaimer>{overrideDisclaimer}</OverrideDisclaimer>
            )}
          </FooterText>
          <ShareButtonBlock {...shareButtonProps} />
        </Row>
      </DesktopOnly>
      <MobileOnly>
        <FooterText>
          {footerText}
          {overrideDisclaimer && (
            <OverrideDisclaimer>{overrideDisclaimer}</OverrideDisclaimer>
          )}
        </FooterText>
        <Row>
          <MetricModal {...dialogProps} />
          <ShareButtonBlock {...shareButtonProps} />
        </Row>
      </MobileOnly>
    </Wrapper>
  );
};

export default MetricChartFooter;
