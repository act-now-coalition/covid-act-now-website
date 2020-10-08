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
import { trackRecommendationsEvent } from 'common/utils/recommend';
import { EventAction } from 'components/Analytics';

//TODO (Chelsi): Add in final share quote
const SmallShareButtons = (props: {
  shareUrl: string;
  shareQuote: string;
  trackLabel: string;
}) => {
  const { shareUrl, shareQuote, trackLabel } = props;

  const socialProps = {
    url: shareUrl,
    quote: shareQuote,
    socialIconSize: 30,
  };

  const trackRecommendationsShare = () => {
    trackRecommendationsEvent(EventAction.SHARE, trackLabel);
  };

  const shareButtonProps = {
    color: COLOR_MAP.BLUE,
    onClick: trackRecommendationsShare,
  };

  const onCopyLink = () => {
    trackRecommendationsEvent(EventAction.COPY_LINK, trackLabel);
  };

  return (
    <ButtonsWrapper>
      <ShareButtonContainer {...shareButtonProps}>
        <FacebookShareButtonInner {...socialProps} />
      </ShareButtonContainer>
      <ShareButtonContainer {...shareButtonProps}>
        <TwitterShareButtonInner {...socialProps} />
      </ShareButtonContainer>
      <CopyToClipboard
        text={shareUrl}
        onCopy={() => {
          onCopyLink();
        }}
      >
        <ShareButtonContainer color={COLOR_MAP.BLUE}>
          <LinkIcon />
        </ShareButtonContainer>
      </CopyToClipboard>
    </ButtonsWrapper>
  );
};

export default SmallShareButtons;
