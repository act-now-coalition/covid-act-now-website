import React, { Fragment, useState } from 'react';
import {
  ButtonsWrapper,
  ShareButtonContainer,
} from './SmallShareButtons.style';
import {
  FacebookShareButtonInner,
  TwitterShareButtonInner,
} from 'components/ShareButtons';
import Snackbar from '@material-ui/core/Snackbar';
import { COLOR_MAP } from 'common/colors';
import LinkIcon from '@material-ui/icons/Link';
import { CopyToClipboard } from 'react-copy-to-clipboard';
import { COLOR_FACEBOOK } from 'components/ShareButtons/FacebookShareButton';
import { COLOR_TWITTER } from 'components/ShareButtons/TwitterShareButton';

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

  const [showLinkCopied, setShowLinkCopied] = useState(false);
  const handleCopyLink = () => {
    onCopyLink();
    setShowLinkCopied(true);
  };

  return (
    <Fragment>
      <ButtonsWrapper>
        <ShareButtonContainer
          color={COLOR_FACEBOOK}
          onClick={onShareOnFacebook}
        >
          <FacebookShareButtonInner {...socialProps} />
        </ShareButtonContainer>
        <ShareButtonContainer color={COLOR_TWITTER} onClick={onShareOnTwitter}>
          <TwitterShareButtonInner {...socialProps} />
        </ShareButtonContainer>
        <CopyToClipboard text={shareUrl} onCopy={handleCopyLink}>
          <ShareButtonContainer color={COLOR_MAP.GRAY_BODY_COPY}>
            <LinkIcon />
          </ShareButtonContainer>
        </CopyToClipboard>
      </ButtonsWrapper>
      <Snackbar
        anchorOrigin={{ vertical: 'bottom', horizontal: 'left' }}
        open={showLinkCopied}
        autoHideDuration={2000}
        onClose={() => setShowLinkCopied(false)}
        message="Link copied"
      />
    </Fragment>
  );
};

export default SmallShareButtons;
