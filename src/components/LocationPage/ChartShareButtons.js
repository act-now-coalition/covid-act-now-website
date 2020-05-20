import React, { Fragment } from 'react';
// import { FacebookIcon, TwitterIcon } from 'react-share';
import InstagramIcon from '../../assets/images/InstagramIcon';

import {
  FacebookShareButton,
  TwitterShareButton,
  LinkedinShareButton,
  FacebookIcon,
  TwitterIcon,
  LinkedinIcon,
} from 'react-share';

import {
  ShareButtonContainer,
  StyledShareButton,
} from '../ShareBlock/ShareBlock.style';

import {
  CopyLinkButton,
  ChartShareButtonsContainer,
  ChartShareButton,
} from './ChartShareButtons.style';
import ChartRtAutosize from 'components/Charts/ChartRt';

const ChartShareButtons = props => {
  const iconSize = 40;

  const buttonProps = {
    disableElevation: true,
    variant: 'contained',
  };

  const iconProps = {
    size: 40,
    round: false,
    fill: 'auto',
    // bgStyle={{ fill: 'auto' }}
  };

  return (
    <ChartShareButtonsContainer>
      {/* before: border-bottom: none */}
      <ChartShareButton {...buttonProps} color="#3b5998">
        <FacebookShareButton
        // url='{url}'
        // quote={quote}
        // beforeOnClick={() => {
        //   trackShare('facebook');
        //   return Promise.resolve();
        // }}
        >
          <FacebookIcon {...iconProps} />
        </FacebookShareButton>
      </ChartShareButton>
      <ChartShareButton {...buttonProps} color="#00acee">
        <TwitterShareButton
        // url={url}
        // title={quote}
        // hashtags={[hashtag]}
        // beforeOnClick={() => {
        //   trackShare('twitter');
        //   return Promise.resolve();
        // }}
        >
          <TwitterIcon {...iconProps} />
        </TwitterShareButton>
      </ChartShareButton>
      <ChartShareButton {...buttonProps} color="#007fb1">
        <LinkedinShareButton
        // url={url}
        // title={quote}
        // @ts-ignore: seems to not be available for linkedin?
        // hashtags={[hashtag]}
        // beforeOnClick={() => {
        //   trackShare('linkedin');
        //   return Promise.resolve();
        // }}
        >
          <LinkedinIcon {...iconProps} />
        </LinkedinShareButton>
      </ChartShareButton>
      <ChartShareButton {...buttonProps} color="#007fb1" isLast>
        <CopyLinkButton>
          Copy
          <br />
          Link
        </CopyLinkButton>
      </ChartShareButton>
    </ChartShareButtonsContainer>
  );
};

export default ChartShareButtons;
