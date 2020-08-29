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
  imageUrl: string;
  imageFilename: string;
  url: string;
  quote: string;
  hashtags: string[];
}> = ({ imageUrl, imageFilename, url, quote, hashtags }) => {
  const [showSocialButtons, setShowSocialButtons] = useState(false);
  const hideSocialButtons = () => {
    const timeoutId = setTimeout(() => setShowSocialButtons(false), 1500);
    return () => clearTimeout(timeoutId);
  };

  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down('xs'));
  const socialIconSize = isMobile ? 40 : 50;

  const sharedProps = {
    url,
    quote,
    socialIconSize,
  };

  return (
    <ClickAwayListener onClickAway={() => setShowSocialButtons(false)}>
      <div style={{ position: 'relative' }}>
        <ButtonGroup aria-label="share buttons" variant="outlined">
          <ShareButton
            onClick={() => {
              setShowSocialButtons(false);
              downloadImage(imageUrl, imageFilename);
            }}
            disableRipple
            disableFocusRipple
            disableTouchRipple
          >
            Save
          </ShareButton>
          <ShareButton
            onClick={() => setShowSocialButtons(!showSocialButtons)}
            disableRipple
            disableFocusRipple
            disableTouchRipple
          >
            Share
          </ShareButton>
        </ButtonGroup>
        {showSocialButtons && (
          <SocialButtonsContainer onClick={hideSocialButtons}>
            <FacebookShareButton {...sharedProps} />
            <TwitterShareButton {...sharedProps} hashtags={hashtags} />
            <LinkedinShareButton {...sharedProps} />
            <CopyLinkButton url={url} />
          </SocialButtonsContainer>
        )}
      </div>
    </ClickAwayListener>
  );
};

export default ShareImageButtons;
