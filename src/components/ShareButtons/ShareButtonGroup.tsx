import React, { useState } from 'react';
import ButtonGroup from '@material-ui/core/ButtonGroup';
import { ClickAwayListener, useMediaQuery } from '@material-ui/core';
import { useTheme } from '@material-ui/core/styles';
import { downloadImage } from './utils';
import FacebookShareButton from './FacebookShareButton';
import TwitterShareButton from './TwitterShareButton';
import LinkedinShareButton from './LinkedinShareButton';
import CopyLinkButton from './CopyLinkButton';
import { ShareButton, SocialButtonsContainer } from './ShareButtons.style';

const ShareImageButtons: React.FC<{
  imageUrl: string | (() => Promise<string>);
  imageFilename: string;
  url: string | (() => Promise<string>);
  quote: string;
  hashtags: string[];
  disabled?: boolean;
  onSaveImage?: () => void;
  onCopyLink?: () => void;
  onShareOnFacebook: () => void;
  onShareOnTwitter: () => void;
}> = ({
  imageUrl,
  imageFilename,
  url,
  quote,
  hashtags,
  disabled = false,
  onShareOnFacebook,
  onShareOnTwitter,
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

  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down('xs'));
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
          <SocialButtonsContainer onClick={() => hideSocialButtons(1500)}>
            <FacebookShareButton
              onClickShare={onShareOnFacebook}
              {...socialSharingProps}
            />
            <TwitterShareButton
              onClickShare={onShareOnTwitter}
              {...socialSharingProps}
              hashtags={hashtags}
            />
            <LinkedinShareButton {...socialSharingProps} />
            <CopyLinkButton
              url={socialSharingProps.url}
              onCopyLink={onCopyLink}
            />
          </SocialButtonsContainer>
        )}
      </div>
    </ClickAwayListener>
  );
};

export default ShareImageButtons;
