import React, { useState } from 'react';
import ButtonGroup from '@material-ui/core/ButtonGroup';
import { ClickAwayListener } from '@material-ui/core';
import { ShareButton } from 'components/ShareButtons/ShareButtons.style';
import { useEscToClose, useBreakpoint } from 'common/hooks';
import SocialButtonBlock from 'components/ShareButtons/SocialButtonBlock';
import { EventAction, EventCategory, trackEvent } from 'components/Analytics';

function trackShare(label: string) {
  trackEvent(EventCategory.VULNERABILITIES, EventAction.SHARE, label);
}

const ShareButtons: React.FC<{ shareUrl: string }> = ({ shareUrl }) => {
  const [showSocialButtons, setShowSocialButtons] = useState(false);

  const hideSocialButtons = () => {
    const timeoutId = setTimeout(() => setShowSocialButtons(false), 1500);
    return () => clearTimeout(timeoutId);
  };

  useEscToClose(hideSocialButtons);

  const isMobile = useBreakpoint(600);

  const socialSharingProps = {
    url: shareUrl,
    quote: 'test quote',
    socialIconSize: isMobile ? 40 : 50,
  };

  return (
    <ClickAwayListener onClickAway={() => hideSocialButtons()}>
      <div style={{ position: 'relative', width: 'fit-content' }}>
        <ButtonGroup aria-label="share buttons" variant="outlined">
          <ShareButton
            onClick={() => setShowSocialButtons(!showSocialButtons)}
            disabled={false}
          >
            Share
          </ShareButton>
        </ButtonGroup>
        {showSocialButtons && (
          <SocialButtonBlock
            onClickContainer={() => hideSocialButtons()}
            onShareOnFacebook={() => trackShare('facebook')}
            onShareOnTwitter={() => trackShare('twitter')}
            onShareOnLinkedin={() => trackShare('linkedin')}
            onCopyLink={() =>
              trackEvent(EventCategory.VULNERABILITIES, EventAction.COPY_LINK)
            }
            {...socialSharingProps}
          />
        )}
      </div>
    </ClickAwayListener>
  );
};

export default ShareButtons;
