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

  return (
    <div style={{ position: 'relative' }}>
      <ButtonGroup aria-label="share buttons" variant="outlined">
        <ShareButton
          onClick={() => downloadImage(imageUrl, imageFilename)}
          disableRipple
          disableFocusRipple
          disableTouchRipple
        >
          Save
        </ShareButton>
        <ShareButton
          onClick={() => setShowSocialButtons(true)}
          disableRipple
          disableFocusRipple
          disableTouchRipple
        >
          Share
        </ShareButton>
      </ButtonGroup>
      {showSocialButtons && (
        <ClickAwayListener onClickAway={() => setShowSocialButtons(false)}>
          <SocialButtonsContainer>
            <FacebookShareButton url={url} quote={quote} />
            <TwitterShareButton url={url} quote={quote} hashtags={hashtags} />
            <LinkedinShareButton url={url} quote={quote} />
            <CopyLinkButton url={url} />
          </SocialButtonsContainer>
        </ClickAwayListener>
      )}
    </div>
  );
};

export default ShareImageButtons;
