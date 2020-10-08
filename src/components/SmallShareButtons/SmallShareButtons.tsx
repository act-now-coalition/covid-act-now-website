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

  const trackRecommendationsShare = (shareTrackLabel: string) => {
    trackRecommendationsEvent(EventAction.SHARE, shareTrackLabel);
  };

  const onCopyLink = () => {
    trackRecommendationsEvent(EventAction.COPY_LINK, trackLabel);
  };

  return (
    <ButtonsWrapper>
      <ShareButtonContainer
        color={COLOR_MAP.BLUE}
        onClick={() => trackRecommendationsShare('facebook')}
      >
        <FacebookShareButtonInner {...socialProps} />
      </ShareButtonContainer>
      <ShareButtonContainer
        color={COLOR_MAP.BLUE}
        onClick={() => trackRecommendationsShare('twitter')}
      >
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
