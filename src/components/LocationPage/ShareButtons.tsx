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

  const [showShareIcons, setShowShareIcons] = useState(false);

  return (
    <ClickAwayListener onClickAway={() => setShowShareIcons(false)}>
      <Wrapper>
        <ShareButton onClickShare={() => setShowShareIcons(!showShareIcons)} />
        {showShareIcons && (
          <SocialButtons
            iconSize={40}
            shareURL={shareURL}
            shareQuote={shareQuote}
            region={region}
          />
        )}
      </Wrapper>
    </ClickAwayListener>
  );
};

export default ShareButtons;
