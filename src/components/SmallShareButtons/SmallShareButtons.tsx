import React from 'react';
import {
  ButtonsWrapper,
  ShareButtonContainer,
} from './SmallShareButtons.style';
import {
  FacebookShareButtonInner,
  TwitterShareButtonInner,
} from 'components/ShareButtons';
import { COLOR_MAP } from 'common/colors';
import LinkIcon from '@material-ui/icons/Link';
import { CopyToClipboard } from 'react-copy-to-clipboard';

const SmallShareButtons: React.FC<{
  shareUrl: string;
  shareQuote: string;
  onCopyLink: () => void;
  onShareOnFacebook: () => void;
  onShareOnTwitter: () => void;
}> = ({
  shareUrl,
  shareQuote,
  onCopyLink,
  onShareOnFacebook,
  onShareOnTwitter,
}) => {
  const socialProps = {
    url: shareUrl,
    quote: shareQuote,
    socialIconSize: 30,
  };

  return (
    <ButtonsWrapper>
      <ShareButtonContainer color={COLOR_MAP.BLUE} onClick={onShareOnFacebook}>
        <FacebookShareButtonInner {...socialProps} />
      </ShareButtonContainer>
      <ShareButtonContainer color={COLOR_MAP.BLUE} onClick={onShareOnTwitter}>
        <TwitterShareButtonInner {...socialProps} />
      </ShareButtonContainer>
      <CopyToClipboard text={shareUrl} onCopy={onCopyLink}>
        <ShareButtonContainer color={COLOR_MAP.BLUE}>
          <LinkIcon />
        </ShareButtonContainer>
      </CopyToClipboard>
    </ButtonsWrapper>
  );
};

export default SmallShareButtons;
