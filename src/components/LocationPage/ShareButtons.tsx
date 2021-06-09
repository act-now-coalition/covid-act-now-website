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
import { useEscToClose, useBreakpoint } from 'common/hooks';

const ShareButtons: React.FC<{
  region: Region;
  stats: MetricValues;
  chartIdentifier: number;
  showEmbedButton?: boolean;
}> = ({ region, stats, chartIdentifier, showEmbedButton }) => {
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
            shareURL={shareURL}
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
