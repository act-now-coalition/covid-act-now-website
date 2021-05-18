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
  onShareOnFacebook: () => void;
  onShareOnTwitter: () => void;
  onCopyLink: () => void;
}> = ({
  url,
  quote,
  socialIconSize,
  onShareOnFacebook,
  onShareOnTwitter,
  onCopyLink,
  region,
}) => {
  const socialSharingProps = {
    url,
    quote,
    socialIconSize,
  };
  const [showEmbedPreviewModal, setShowEmbedPreviewModal] = useState(false);
  const [shareMenuOpen, setShareMenuOpen] = useState(false);
  function closeShareButtonGroup() {
    setTimeout(() => setShareMenuOpen(true), 1000);
  }
  return (
    <>
      {!shareMenuOpen && (
        <SocialButtonsContainer>
          <FacebookShareButton
            onClickShare={() => {
              onShareOnFacebook();
              closeShareButtonGroup();
            }}
            {...socialSharingProps}
          />
          <TwitterShareButton
            onClickShare={() => {
              onShareOnTwitter();
              closeShareButtonGroup();
            }}
            {...socialSharingProps}
            hashtags={['COVIDActNow']}
          />
          <CopyLinkButton
            url={socialSharingProps.url}
            onCopyLink={() => {
              onCopyLink();
              closeShareButtonGroup();
            }}
          />
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
        </SocialButtonsContainer>
      )}
    </>
  );
};

export default SocialButtonBlock;
