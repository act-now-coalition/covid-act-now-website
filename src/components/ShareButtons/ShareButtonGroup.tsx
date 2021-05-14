import React, { useState } from 'react';
import ButtonGroup from '@material-ui/core/ButtonGroup';
import { ClickAwayListener } from '@material-ui/core';
import ShareButton from 'components/NewLocationPage/ShareButton/ShareButton';
import { useEscToClose, useBreakpoint } from 'common/hooks';
import SocialButtonBlock from './SocialButtonBlock';
import { Region } from 'common/regions';

const ShareImageButtons: React.FC<{
  imageUrl: string | (() => Promise<string>);
  imageFilename: string;
  url: string | (() => Promise<string>);
  quote: string;
  disabled?: boolean;
  region?: Region;
  onSaveImage?: () => void;
  onCopyLink?: () => void;
  onShareOnFacebook: () => void;
  onShareOnTwitter: () => void;
}> = ({
  url,
  quote,
  region,
  onShareOnFacebook,
  onShareOnTwitter,
  onCopyLink = () => {},
}) => {
  // Turn url / imageUrl into asynchronous getters if they aren't already.
  const getUrl = typeof url === 'string' ? () => Promise.resolve(url) : url;

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
          <ShareButton onClickShare={toggleSocialButtons} />
        </ButtonGroup>
        {socialSharingProps && (
          <SocialButtonBlock
            {...socialSharingProps}
            region={region}
            onShareOnFacebook={onShareOnFacebook}
            onShareOnTwitter={onShareOnTwitter}
            onCopyLink={onCopyLink}
          />
        )}
      </div>
    </ClickAwayListener>
  );
};

export default ShareImageButtons;
