import React, { useState } from 'react';
import ShareBlock from './ShareBlock';
import { Region } from 'common/regions';

import EmbedPreview from './EmbedPreview';
import { Projections } from 'common/models/Projections';

const BASE_SHARE_URL = 'https://covidactnow.org/us';

interface ShareModelBlockParams {
  region?: Region;
  projections?: Projections;
  stats?: any;
  isLocationPage?: boolean;
}

const ShareModelBlock = ({
  region,
  projections,
  stats,
  isLocationPage,
}: ShareModelBlockParams) => {
  const { displayName, shareURL } = getUrlAndShareQuote(region);
  const shareQuote = `I'm keeping track of ${displayName}'s vaccination progress and COVID risk level data with @CovidActNow. What does your community look like?`;
  const [showEmbedPreviewModal, setShowEmbedPreviewModal] = useState(false);
  return (
    <>
      <ShareBlock
        region={region}
        shareURL={shareURL}
        shareQuote={shareQuote}
        projections={projections}
        onClickEmbed={() => setShowEmbedPreviewModal(true)}
        stats={stats}
        isLocationPage={isLocationPage}
      />
      {/* todo: add region to this. county={county} */}
      <EmbedPreview
        open={showEmbedPreviewModal}
        onClose={() => setShowEmbedPreviewModal(false)}
        region={region}
      />
    </>
  );
};

function getUrlAndShareQuote(region?: Region) {
  return region
    ? {
        shareURL: region.canonicalUrl,
        displayName: region.fullName,
      }
    : {
        shareURL: BASE_SHARE_URL,
        displayName: 'the country',
      };
}
export default ShareModelBlock;
