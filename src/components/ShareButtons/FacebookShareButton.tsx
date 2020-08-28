import React from 'react';
import * as ReactShare from 'react-share';
import { SocialShareButton } from './ShareButtons.style';

const COLOR_FACEBOOK = '#3b5998';

export const FacebookShareButton: React.FC<{
  url: string;
  quote: string;
  socialIconSize: number;
}> = ({ url, quote, socialIconSize }) => (
  <SocialShareButton
    variant="contained"
    color={COLOR_FACEBOOK}
    disableElevation
  >
    <ReactShare.FacebookShareButton url={url} quote={quote}>
      <ReactShare.FacebookIcon
        size={socialIconSize}
        round={false}
        fill="auto"
      />
    </ReactShare.FacebookShareButton>
  </SocialShareButton>
);

export default FacebookShareButton;
