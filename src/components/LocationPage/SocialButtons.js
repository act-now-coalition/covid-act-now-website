import React, { useState } from 'react';
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
  const { iconSize: size, shareURL, shareQuote } = props;

  const url = shareURL || 'https://covidactnow.org/';
  const quote =
    shareQuote ||
    '@CovidActNow has real-time COVID data and risk level for your community. Check it out: ';
  const hashtag = 'COVIDActNow';

  const [copyLinkButtonTextA, setCopyLinkButtonTextA] = useState('Copy');
  const [copyLinkButtonTextB, setCopyLinkButtonTextB] = useState('Link');

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
        <FacebookShareButton url={url} quote={quote}>
          <FacebookIcon {...iconProps} />
        </FacebookShareButton>
      </SocialShareButton>
      <SocialShareButton {...buttonProps} color="#00acee">
        <TwitterShareButton url={url} hashtags={[hashtag]} title={quote}>
          <TwitterIcon {...iconProps} />
        </TwitterShareButton>
      </SocialShareButton>
      <SocialShareButton {...buttonProps} color="#007fb1">
        <LinkedinShareButton url={url} hashtags={[hashtag]} title={quote}>
          <LinkedinIcon {...iconProps} />
        </LinkedinShareButton>
      </SocialShareButton>
      <CopyToClipboard
        text={url}
        onCopy={() => {
          setCopyLinkButtonTextA('Copied!');
          setCopyLinkButtonTextB('');
        }}
      >
        <SocialShareButton {...buttonProps} color="#007fb1" isLast>
          <CopyLinkButton>
            {copyLinkButtonTextA}
            <br />
            {copyLinkButtonTextB}
          </CopyLinkButton>
        </SocialShareButton>
      </CopyToClipboard>
    </SocialButtonsContainer>
  );
};

export default SocialButtons;
