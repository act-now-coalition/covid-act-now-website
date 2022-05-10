import React, { useState } from 'react';
import ButtonGroup from '@material-ui/core/ButtonGroup';
import { ClickAwayListener } from '@material-ui/core';
import ShareButton from 'components/NewLocationPage/ShareButton/ShareButton';
import { default as HeaderShareButton } from 'components/NewLocationPage/HeaderButtons/ShareButton';
import { useEscToClose, useBreakpoint } from 'common/hooks';
import SocialButtonBlock from 'components/ShareButtons/SocialButtonBlock';
import { EventAction, EventCategory, trackEvent } from 'components/Analytics';
import { Region } from 'common/regions';
import { ShareButtonWrapper } from 'components/ShareButtons/ShareButtons.style';

function trackShare(eventCategory: EventCategory, label: string) {
  trackEvent(eventCategory, EventAction.SHARE, label);
}

const ShareButtons: React.FC<{
  eventCategory: EventCategory;
  shareUrl: string;
  shareQuote: string;
  region?: Region;
  isLocationPageHeader?: boolean;
}> = ({
  eventCategory,
  shareUrl,
  shareQuote,
  region,
  isLocationPageHeader,
}) => {
  const [showSocialButtons, setShowSocialButtons] = useState(false);

  const hideSocialButtons = (delay: number = 0) => {
    const timeoutId = setTimeout(() => setShowSocialButtons(false), delay);
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
      <ShareButtonWrapper>
        <ButtonGroup
          aria-label="share buttons"
          variant="outlined"
          style={{ width: '100%' }}
        >
          {isLocationPageHeader ? (
            <HeaderShareButton
              onClickShare={() => setShowSocialButtons(!showSocialButtons)}
            />
          ) : (
            <ShareButton
              onClickShare={() => setShowSocialButtons(!showSocialButtons)}
            />
          )}
        </ButtonGroup>
        {showSocialButtons && (
          <SocialButtonBlock
            onShareOnFacebook={() => trackShare(eventCategory, 'facebook')}
            onShareOnTwitter={() => trackShare(eventCategory, 'twitter')}
            onCopyLink={() =>
              trackEvent(eventCategory, EventAction.COPY_LINK, 'Copy link')
            }
            hideSocialButton={() => hideSocialButtons()}
            region={region}
            isHeader={isLocationPageHeader}
            {...socialSharingProps}
          />
        )}
      </ShareButtonWrapper>
    </ClickAwayListener>
  );
};

export default ShareButtons;
