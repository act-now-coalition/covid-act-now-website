import React from 'react';

import {
  FacebookShareButton,
  TwitterShareButton,
  LinkedinShareButton,
  FacebookIcon,
  TwitterIcon,
  LinkedinIcon,
} from 'react-share';

import {
  CopyLinkButton,
  SocialButtonsContainer,
  SocialShareButton,
} from './ShareButtons.style';

const SocialButtons = () => {
  const buttonProps = {
    disableElevation: true,
    variant: 'contained',
  };

  const iconProps = {
    size: 50,
    round: false,
    fill: 'auto',
  };

  return (
    <SocialButtonsContainer>
      <SocialShareButton {...buttonProps} color="#3b5998">
        <FacebookShareButton>
          <FacebookIcon {...iconProps} />
        </FacebookShareButton>
      </SocialShareButton>
      <SocialShareButton {...buttonProps} color="#00acee">
        <TwitterShareButton
        // }}
        >
          <TwitterIcon {...iconProps} />
        </TwitterShareButton>
      </SocialShareButton>
      <SocialShareButton {...buttonProps} color="#007fb1">
        <LinkedinShareButton>
          <LinkedinIcon {...iconProps} />
        </LinkedinShareButton>
      </SocialShareButton>
      <SocialShareButton {...buttonProps} color="#007fb1" isLast>
        <CopyLinkButton>
          Copy
          <br />
          Link
        </CopyLinkButton>
      </SocialShareButton>
    </SocialButtonsContainer>
  );
};

export default SocialButtons;
