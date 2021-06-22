import React, { useState } from 'react';
import FacebookShareButton from './FacebookShareButton';
import TwitterShareButton from './TwitterShareButton';
import CopyLinkButton from './CopyLinkButton';
import {
  SocialButtonsContainer,
  SocialButton,
  SocialShareButton,
} from './ShareButtons.style';
import EmbedPreview from 'components/ShareBlock/EmbedPreview';
import { Region } from 'common/regions';

const SocialButtonBlock: React.FC<{
  url: string;
  quote: string;
  socialIconSize: number;
  region?: Region;
  isHeader?: boolean;
  onShareOnFacebook: () => void;
  onShareOnTwitter: () => void;
  onCopyLink: () => void;
  hideSocialButton: () => void;
}> = ({
  url,
  quote,
  socialIconSize,
  onShareOnFacebook,
  onShareOnTwitter,
  onCopyLink,
  hideSocialButton,
  region,
  isHeader,
}) => {
  const socialSharingProps = {
    url,
    quote,
    socialIconSize,
  };
  const [showEmbedPreviewModal, setShowEmbedPreviewModal] = useState(false);
  function closeShareButtonGroup() {
    setTimeout(() => hideSocialButton(), 1000);
  }
  return (
    <SocialButtonsContainer isHeader={isHeader}>
      {isHeader && (
        <SocialShareButton variant="contained" color="#007fb1">
          <SocialButton onClick={() => setShowEmbedPreviewModal(true)}>
            Embed
          </SocialButton>
          <EmbedPreview
            open={showEmbedPreviewModal}
            onClose={() => {
              setShowEmbedPreviewModal(false);
              closeShareButtonGroup();
            }}
            region={region}
          />
        </SocialShareButton>
      )}
      <CopyLinkButton
        url={socialSharingProps.url}
        onCopyLink={() => {
          onCopyLink();
          closeShareButtonGroup();
        }}
      />
      <TwitterShareButton
        onClickShare={() => {
          onShareOnTwitter();
          closeShareButtonGroup();
        }}
        {...socialSharingProps}
        hashtags={['COVIDActNow']}
      />
      <FacebookShareButton
        onClickShare={() => {
          onShareOnFacebook();
          closeShareButtonGroup();
        }}
        {...socialSharingProps}
      />
    </SocialButtonsContainer>
  );
};

export default SocialButtonBlock;
