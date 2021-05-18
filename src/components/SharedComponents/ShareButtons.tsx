import React, { useState } from 'react';
import ButtonGroup from '@material-ui/core/ButtonGroup';
import { ClickAwayListener } from '@material-ui/core';
import ShareButton from 'components/NewLocationPage/ShareButton/ShareButton';
import { useEscToClose, useBreakpoint } from 'common/hooks';
import SocialButtonBlock from 'components/ShareButtons/SocialButtonBlock';
import { EventAction, EventCategory, trackEvent } from 'components/Analytics';
import { Region } from 'common/regions';

function trackShare(eventCategory: EventCategory, label: string) {
  trackEvent(eventCategory, EventAction.SHARE, label);
}

const ShareButtons: React.FC<{
  eventCategory: EventCategory;
  shareUrl: string;
  shareQuote: string;
  region?: Region;
}> = ({ eventCategory, shareUrl, shareQuote, region }) => {
  const [showSocialButtons, setShowSocialButtons] = useState(false);

  const hideSocialButtons = () => {
    const timeoutId = setTimeout(() => setShowSocialButtons(false), 1500);
    return () => clearTimeout(timeoutId);
  };

  useEscToClose(hideSocialButtons);

  const isMobile = useBreakpoint(600);

  const socialSharingProps = {
    url: shareUrl,
    quote: shareQuote,
    socialIconSize: isMobile ? 40 : 50,
  };

  return (
    <ClickAwayListener onClickAway={() => hideSocialButtons()}>
      <div style={{ position: 'relative', width: 'fit-content' }}>
        <ButtonGroup aria-label="share buttons" variant="outlined">
          <ShareButton
            onClickShare={() => setShowSocialButtons(!showSocialButtons)}
          />
        </ButtonGroup>
        {showSocialButtons && (
          <SocialButtonBlock
            onShareOnFacebook={() => trackShare(eventCategory, 'facebook')}
            onShareOnTwitter={() => trackShare(eventCategory, 'twitter')}
            onCopyLink={() => trackEvent(eventCategory, EventAction.COPY_LINK)}
            hideSocialButton={() => hideSocialButtons()}
            region={region}
            {...socialSharingProps}
          />
        )}
      </div>
    </ClickAwayListener>
  );
};

export default ShareButtons;
