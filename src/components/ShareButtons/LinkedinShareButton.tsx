import React from 'react';
import * as ReactShare from 'react-share';
import { SocialShareButton } from './ShareButtons.style';

const COLOR_LINKEDIN = '#007fb1';

export const LinkedinShareButton: React.FC<{
  url: string;
  quote: string;
  socialIconSize: number;
}> = ({ url, quote, socialIconSize }) => (
  <SocialShareButton
    variant="contained"
    color={COLOR_LINKEDIN}
    disableElevation
  >
    <ReactShare.LinkedinShareButton url={url} title={quote}>
      <ReactShare.LinkedinIcon
        size={socialIconSize}
        round={false}
        fill="auto"
      />
    </ReactShare.LinkedinShareButton>
  </SocialShareButton>
);

export default LinkedinShareButton;
