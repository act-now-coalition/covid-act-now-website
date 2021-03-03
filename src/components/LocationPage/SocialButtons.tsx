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

const SocialButtons = ({
  iconSize,
  shareURL,
  shareQuote,
}: {
  iconSize: number;
  shareURL: string;
  shareQuote: string;
}) => {
  const url = shareURL || 'https://covidactnow.org/';
  const quote =
    shareQuote ||
    'I’m keeping track of the latest COVID data and risk levels with @CovidActNow. What does your community look like?';
  const hashtag = 'COVIDActNow';

  const [copyLinkButtonTextA, setCopyLinkButtonTextA] = useState('Copy');
  const [copyLinkButtonTextB, setCopyLinkButtonTextB] = useState('Link');

  const iconProps = {
    size: iconSize,
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
        <LinkedinShareButton url={url} title={quote}>
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
