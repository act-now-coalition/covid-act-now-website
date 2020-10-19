import React from 'react';
import * as ReactShare from 'react-share';
import { SocialShareButton } from './ShareButtons.style';

const COLOR_TWITTER = '#00acee';

export const TwitterShareButtonInner: React.FC<{
  url: string;
  quote: string;
  hashtags?: string[];
  socialIconSize: number;
}> = ({ url, quote, hashtags, socialIconSize }) => (
  <ReactShare.TwitterShareButton url={url} hashtags={hashtags} title={quote}>
    <ReactShare.TwitterIcon size={socialIconSize} round={false} fill="auto" />
  </ReactShare.TwitterShareButton>
);

export const TwitterShareButton: React.FC<{
  url: string;
  quote: string;
  hashtags?: string[];
  socialIconSize: number;
}> = ({ url, quote, hashtags, socialIconSize }) => (
  <SocialShareButton variant="contained" color={COLOR_TWITTER} disableElevation>
    <TwitterShareButtonInner
      url={url}
      quote={quote}
      hashtags={hashtags}
      socialIconSize={socialIconSize}
    />
  </SocialShareButton>
);

export default TwitterShareButton;
