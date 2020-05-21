import React, { Fragment, useState } from 'react';

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
  SaveOrShareContainer,
  SaveOrShareButton,
  SocialShareButton,
  ShareWrapper,
} from './ChartShareButtons.style';

const ChartShareButtons = props => {
  const { isFirst } = props;
  const [showShareIcons, setShowShareIcons] = useState(false);

  return (
    <ShareWrapper isFirst={isFirst}>
      <SaveOrShareContainer>
        <SaveOrShareButton>Save</SaveOrShareButton>
        <SaveOrShareButton
          isLast
          onClick={() => {
            setShowShareIcons(!showShareIcons);
          }}
        >
          Share
        </SaveOrShareButton>
      </SaveOrShareContainer>

      {showShareIcons && <SocialButtons />}
    </ShareWrapper>
  );
};

const SocialButtons = props => {
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

export default ChartShareButtons;
