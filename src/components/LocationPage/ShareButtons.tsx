import React, { useState } from 'react';
import { ClickAwayListener } from '@material-ui/core';
import SocialButtons from './SocialButtons';
import { Wrapper } from './ShareButtons.style';
import ShareButton from 'components/NewLocationPage/ShareButton/ShareButton';
import { Region } from 'common/regions';
import { useEscToClose, useBreakpoint } from 'common/hooks';

const ShareButtons: React.FC<{
  shareQuote: string;
  shareUrl: string;
  region: Region;
  showEmbedButton?: boolean;
}> = ({ shareQuote, shareUrl, region, showEmbedButton }) => {
  const [showSocialButtons, setShowSocialButtons] = useState(false);

  const hideSocialButtons = () => setShowSocialButtons(false);

  const isMobile = useBreakpoint(600);

  const iconSize = isMobile ? 40 : 50;

  useEscToClose(hideSocialButtons);

  return (
    <ClickAwayListener onClickAway={() => setShowSocialButtons(false)}>
      <Wrapper>
        <ShareButton
          onClickShare={() => setShowSocialButtons(!showSocialButtons)}
        />
        {showSocialButtons && (
          <SocialButtons
            iconSize={iconSize}
            shareURL={shareUrl}
            shareQuote={shareQuote}
            region={region}
            hideSocialButtons={() => hideSocialButtons()}
            showEmbedButton={showEmbedButton}
          />
        )}
      </Wrapper>
    </ClickAwayListener>
  );
};

export default ShareButtons;
