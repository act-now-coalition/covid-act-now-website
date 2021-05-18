import React, { useState } from 'react';
import urlJoin from 'url-join';
import { ClickAwayListener } from '@material-ui/core';
import SocialButtons from './SocialButtons';
import { Wrapper } from './ShareButtons.style';
import ShareButton from 'components/NewLocationPage/ShareButton/ShareButton';
import makeChartShareQuote from 'common/utils/makeChartShareQuote';
import * as urls from 'common/urls';
import { Region } from 'common/regions';
import type { MetricValues } from 'common/models/Projections';
import { useEscToClose } from 'common/hooks';

const ShareButtons: React.FC<{
  region: Region;
  stats: MetricValues;
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

  const [showSocialButtons, setShowSocialButtons] = useState(false);

  const hideSocialButtons = () => {
    const timeoutId = setTimeout(() => setShowSocialButtons(false), 1500);
    return () => clearTimeout(timeoutId);
  };

  useEscToClose(hideSocialButtons);

  return (
    <ClickAwayListener onClickAway={() => setShowSocialButtons(false)}>
      <Wrapper>
        <ShareButton
          onClickShare={() => setShowSocialButtons(!showSocialButtons)}
        />
        {showSocialButtons && (
          <SocialButtons
            iconSize={40}
            shareURL={shareURL}
            shareQuote={shareQuote}
            region={region}
            hideSocialButtons={() => hideSocialButtons()}
          />
        )}
      </Wrapper>
    </ClickAwayListener>
  );
};

export default ShareButtons;
