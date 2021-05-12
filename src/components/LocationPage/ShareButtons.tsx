import React, { useState } from 'react';
import urlJoin from 'url-join';
import SocialButtons from './SocialButtons';
import { Wrapper } from './ShareButtons.style';
import ShareButton from 'components/NewLocationPage/ShareButton/ShareButton';
import { ClickAwayListener } from '@material-ui/core';
import makeChartShareQuote from 'common/utils/makeChartShareQuote';
import * as urls from 'common/urls';
import { Region } from 'common/regions';

const ShareButtons: React.FC<{
  region: Region;
  stats: any;
  chartIdentifier: number;
}> = ({ region, stats, chartIdentifier }) => {
  const shareQuote = makeChartShareQuote(
    region.fullName,
    stats,
    chartIdentifier,
  );

  const shareBaseURL = region.canonicalUrl;

  const shareURL = urls.addSharingId(
    urlJoin(shareBaseURL, `chart/${chartIdentifier}`),
  );

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
      <Wrapper>
        <ShareButton
          onClickShare={() => {
            setShowShareIcons(!showShareIcons);
          }}
        />
        {showShareIcons && (
          <SocialButtons
            closeOnClick={hideSocialButtons}
            iconSize={40}
            shareURL={shareURL}
            shareQuote={shareQuote}
          />
        )}
      </Wrapper>
    </ClickAwayListener>
  );
};

export default ShareButtons;
