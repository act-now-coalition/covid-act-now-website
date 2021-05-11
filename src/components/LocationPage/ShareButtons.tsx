import React, { useState } from 'react';
import urlJoin from 'url-join';
import SocialButtons from './SocialButtons';
import {
  SaveOrShareContainer,
  DesktopButtonsWrapper,
  MobileButtonsWrapper,
  ClickAwayWrapper,
  SocialButtonsWrapper,
} from './ShareButtons.style';
import ShareButton from 'components/NewLocationPage/ShareButton/ShareButton';
import { ClickAwayListener } from '@material-ui/core';
import makeChartShareQuote from 'common/utils/makeChartShareQuote';
import * as urls from 'common/urls';
import { Region } from 'common/regions';

interface InnerContentProps {
  region: Region;
  iconSize: number;
  shareURL: string;
  shareQuote: string;
  chartIdentifier: number;
}

const InnerContent = ({
  region,
  iconSize,
  shareURL,
  shareQuote,
}: InnerContentProps) => {
  const [showShareIcons, setShowShareIcons] = useState(false);

  // Delay allows the user to briefly see copy-link button text change when clicked
  const hideSocialButtons = () => {
    const timeoutId = setTimeout(() => {
      setShowShareIcons(false);
    }, 1500);
    return () => clearTimeout(timeoutId);
  };

  return (
    <ClickAwayListener onClickAway={() => setShowShareIcons(false)}>
      <ClickAwayWrapper>
        <SaveOrShareContainer>
          <ShareButton
            onClickShare={() => {
              setShowShareIcons(!showShareIcons);
            }}
          />
        </SaveOrShareContainer>
        <SocialButtonsWrapper
          onClick={() => {
            hideSocialButtons();
          }}
        >
          {showShareIcons && (
            <SocialButtons
              iconSize={iconSize}
              shareURL={shareURL}
              shareQuote={shareQuote}
            />
          )}
        </SocialButtonsWrapper>
      </ClickAwayWrapper>
    </ClickAwayListener>
  );
};

interface ShareButtonProps {
  region: Region;
  stats: any;
  isMobile: Boolean;
  chartIdentifier: number;
}
const ShareButtons = ({
  region,
  stats,
  isMobile,
  chartIdentifier,
}: ShareButtonProps) => {
  const shareQuote = makeChartShareQuote(
    region.fullName,
    stats,
    chartIdentifier,
  );

  const shareBaseURL = region.canonicalUrl;

  const shareURL = urls.addSharingId(
    urlJoin(shareBaseURL, `chart/${chartIdentifier}`),
  );

  if (isMobile) {
    return (
      <MobileButtonsWrapper>
        <InnerContent
          iconSize={40}
          shareURL={shareURL}
          shareQuote={shareQuote}
          chartIdentifier={chartIdentifier}
          region={region}
        />
      </MobileButtonsWrapper>
    );
  } else {
    return (
      <DesktopButtonsWrapper>
        <InnerContent
          iconSize={50}
          shareURL={shareURL}
          shareQuote={shareQuote}
          chartIdentifier={chartIdentifier}
          region={region}
        />
      </DesktopButtonsWrapper>
    );
  }
};

export default ShareButtons;
