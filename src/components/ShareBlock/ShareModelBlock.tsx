import React, { useState } from 'react';
import ShareBlock from './ShareBlock';
import { County, MetroArea, Region, State } from 'common/regions';

import EmbedPreview from './EmbedPreview';
import { Projections } from 'common/models/Projections';
import { findCountyByFips } from 'common/locations';
import { fail } from 'common/utils';

const BASE_SHARE_URL = 'https://covidactnow.org/us';

interface ShareModelBlockParams {
  region?: Region;
  projections?: Projections;
  stats?: any;
}

const ShareModelBlock = ({
  region,
  projections,
  stats,
}: ShareModelBlockParams) => {
  const { displayName, shareURL } = getUrlAndShareQuote(region);
  const shareQuote = `I'm keeping track of ${displayName}'s COVID data and risk level with @CovidActNow. What does your community look like?`;
  const [showEmbedPreviewModal, setShowEmbedPreviewModal] = useState(false);
  const county = region && findCountyByFips(region.fipsCode);
  return (
    <>
      <ShareBlock
        region={region}
        shareURL={shareURL}
        shareQuote={shareQuote}
        projections={projections}
        onClickEmbed={() => setShowEmbedPreviewModal(true)}
        stats={stats}
      />
      {/* todo: add region to this. county={county} */}
      <EmbedPreview
        open={showEmbedPreviewModal}
        onClose={() => setShowEmbedPreviewModal(false)}
        county={county}
      />
    </>
  );
};

function getUrlAndShareQuote(region?: Region) {
  let shareURL = BASE_SHARE_URL;
  let displayName = 'the country';
  if (region instanceof County) {
    const county = region as County;
    shareURL = `${BASE_SHARE_URL}/${region.state.urlSegment}/county/${region.urlSegment}`;
    displayName = `${county.fullName}`;
  } else if (region instanceof State) {
    const state = region as State;
    shareURL = `${BASE_SHARE_URL}/${state.urlSegment}`;
    displayName = state.fullName;
  } else if (region instanceof MetroArea) {
    shareURL = region.canonicalUrl;
    displayName = region.fullName;
  } else if (region) {
    fail('Unsupported region');
  }

  return { shareURL, displayName };
}
export default ShareModelBlock;
