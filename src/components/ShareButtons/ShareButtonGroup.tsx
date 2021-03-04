import React, { useState } from 'react';
import ButtonGroup from '@material-ui/core/ButtonGroup';
import { ClickAwayListener } from '@material-ui/core';
import { downloadImage } from './utils';
import { ShareButton } from './ShareButtons.style';
import { useEscToClose, useBreakpoint } from 'common/hooks';
import SocialButtonBlock from './SocialButtonBlock';

const ShareImageButtons: React.FC<{
  imageUrl: string | (() => Promise<string>);
  imageFilename: string;
  url: string | (() => Promise<string>);
  quote: string;
  disabled?: boolean;
  onSaveImage?: () => void;
  onCopyLink?: () => void;
  onShareOnFacebook: () => void;
  onShareOnTwitter: () => void;
  onShareOnLinkedin: () => void;
}> = ({
  imageUrl,
  imageFilename,
  url,
  quote,
  disabled = false,
  onShareOnFacebook,
  onShareOnTwitter,
  onShareOnLinkedin,
  onSaveImage = () => {},
  onCopyLink = () => {},
}) => {
  // Turn url / imageUrl into asynchronous getters if they aren't already.
  const getUrl = typeof url === 'string' ? () => Promise.resolve(url) : url;
  const getImageUrl =
    typeof imageUrl === 'string' ? () => Promise.resolve(imageUrl) : imageUrl;

  const [socialSharingProps, setSocialSharingProps] = useState<{
    url: string;
    quote: string;
    socialIconSize: number;
  } | null>(null);

  const hideSocialButtons = (delay: number = 0) => {
    const timeoutId = setTimeout(() => setSocialSharingProps(null), delay);
    return () => clearTimeout(timeoutId);
  };

  const isMobile = useBreakpoint(600);

  const socialIconSize = isMobile ? 40 : 50;

  const showSocialButtons = () => {
    getUrl().then(url => {
      setSocialSharingProps({
        url,
        quote,
        socialIconSize,
      });
    });
  };

  const toggleSocialButtons = () => {
    if (socialSharingProps) {
      hideSocialButtons();
    } else {
      showSocialButtons();
    }
  };

  useEscToClose(hideSocialButtons, socialSharingProps);

  return (
    <ClickAwayListener onClickAway={() => hideSocialButtons()}>
      <div style={{ position: 'relative' }}>
        <ButtonGroup aria-label="share buttons" variant="outlined">
          <ShareButton
            onClick={() => {
              hideSocialButtons();
              getImageUrl().then(imageUrl =>
                downloadImage(imageUrl, imageFilename),
              );
              onSaveImage();
            }}
            disabled={disabled}
          >
            Save
          </ShareButton>
          <ShareButton onClick={toggleSocialButtons} disabled={disabled}>
            Share
          </ShareButton>
        </ButtonGroup>
        {socialSharingProps && (
          <SocialButtonBlock
            {...socialSharingProps}
            onClickContainer={() => hideSocialButtons(1500)}
            onShareOnFacebook={onShareOnFacebook}
            onShareOnTwitter={onShareOnTwitter}
            onShareOnLinkedin={onShareOnLinkedin}
            onCopyLink={onCopyLink}
          />
        )}
      </div>
    </ClickAwayListener>
  );
};

export default ShareImageButtons;
