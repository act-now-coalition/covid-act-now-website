import React from 'react';
import * as ReactShare from 'react-share';
import { SocialShareButton } from './ShareButtons.style';

const COLOR_TWITTER = '#00acee';

export const TwitterShareButton: React.FC<{
  url: string;
  quote: string;
  hashtags?: string[];
  socialIconSize: number;
}> = ({ url, quote, hashtags, socialIconSize }) => (
  <SocialShareButton variant="contained" color={COLOR_TWITTER} disableElevation>
    <ReactShare.TwitterShareButton url={url} hashtags={hashtags} title={quote}>
      <ReactShare.TwitterIcon size={socialIconSize} round={false} fill="auto" />
    </ReactShare.TwitterShareButton>
  </SocialShareButton>
);

export default TwitterShareButton;
