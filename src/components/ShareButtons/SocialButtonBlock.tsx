import React from 'react';
import FacebookShareButton from './FacebookShareButton';
import TwitterShareButton from './TwitterShareButton';
import LinkedinShareButton from './LinkedinShareButton';
import CopyLinkButton from './CopyLinkButton';
import { SocialButtonsContainer } from './ShareButtons.style';

const SocialButtonBlock: React.FC<{
  url: string;
  quote: string;
  socialIconSize: number;
  onClickContainer: () => void;
  onShareOnFacebook: () => void;
  onShareOnTwitter: () => void;
  onShareOnLinkedin: () => void;
  onCopyLink: () => void;
}> = ({
  url,
  quote,
  socialIconSize,
  onClickContainer,
  onShareOnFacebook,
  onShareOnTwitter,
  onShareOnLinkedin,
  onCopyLink,
}) => {
  const socialSharingProps = {
    url,
    quote,
    socialIconSize,
  };
  return (
    <SocialButtonsContainer onClick={onClickContainer}>
      <FacebookShareButton
        onClickShare={onShareOnFacebook}
        {...socialSharingProps}
      />
      <TwitterShareButton
        onClickShare={onShareOnTwitter}
        {...socialSharingProps}
        hashtags={['COVIDActNow']}
      />
      <LinkedinShareButton
        onClickShare={onShareOnLinkedin}
        {...socialSharingProps}
      />
      <CopyLinkButton url={socialSharingProps.url} onCopyLink={onCopyLink} />
    </SocialButtonsContainer>
  );
};

export default SocialButtonBlock;
