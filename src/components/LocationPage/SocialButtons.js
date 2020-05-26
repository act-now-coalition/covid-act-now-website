import React from 'react';
import { CopyToClipboard } from 'react-copy-to-clipboard';

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

const SocialButtons = props => {
  const { iconSize: size, shareURL } = props;

  const url = shareURL || 'https://covidactnow.org/';
  const hashtag = 'COVIDActNow';

  const iconProps = {
    size,
    round: false,
    fill: 'auto',
  };

  const buttonProps = {
    disableElevation: true,
    variant: 'contained',
  };

  return (
    <SocialButtonsContainer>
      <SocialShareButton {...buttonProps} color="#3b5998">
        <FacebookShareButton url={url}>
          <FacebookIcon {...iconProps} />
        </FacebookShareButton>
      </SocialShareButton>
      <SocialShareButton {...buttonProps} color="#00acee">
        <TwitterShareButton url={url} hashtags={[hashtag]}>
          <TwitterIcon {...iconProps} />
        </TwitterShareButton>
      </SocialShareButton>
      <SocialShareButton {...buttonProps} color="#007fb1">
        <LinkedinShareButton url={url} hashtags={[hashtag]}>
          <LinkedinIcon {...iconProps} />
        </LinkedinShareButton>
      </SocialShareButton>
      <CopyToClipboard
        text={url}
        onCopy={() => {
          console.log('Todo: figure out what ux change should be here');
        }}
      >
        <SocialShareButton {...buttonProps} color="#007fb1" isLast>
          <CopyLinkButton>
            Copy
            <br />
            Link
          </CopyLinkButton>
        </SocialShareButton>
      </CopyToClipboard>
    </SocialButtonsContainer>
  );
};

export default SocialButtons;
