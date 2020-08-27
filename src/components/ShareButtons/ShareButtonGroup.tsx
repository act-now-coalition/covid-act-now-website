import React, { useState } from 'react';
import ButtonGroup from '@material-ui/core/ButtonGroup';
import { ClickAwayListener } from '@material-ui/core';
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
            <FacebookShareButton url={url} quote={quote} />
            <TwitterShareButton url={url} quote={quote} hashtags={hashtags} />
            <LinkedinShareButton url={url} quote={quote} />
            <CopyLinkButton url={url} />
          </SocialButtonsContainer>
        )}
      </div>
    </ClickAwayListener>
  );
};

export default ShareImageButtons;
