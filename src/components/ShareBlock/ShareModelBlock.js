import React, { useState } from 'react';
import ShareBlock from './ShareBlock';
import { STATES } from 'common';

import EmbedPreview from './EmbedPreview';

const BASE_SHARE_URL = 'https://covidactnow.org/us';

const ShareModelBlock = ({ stateId, county, projections, stats }) => {
  const { displayName, shareURL } = getUrlAndShareQuote({ stateId, county });
  const countyName = county && county.county;
  const shareQuote = `I'm keeping track of ${displayName}'s COVID data and risk level with @CovidActNow. What does your community look like?`;
  const [showEmbedPreviewModal, setShowEmbedPreviewModal] = useState(false);

  return (
    <>
      <ShareBlock
        displayName={displayName}
        stateId={stateId}
        shareURL={shareURL}
        countyName={countyName}
        shareQuote={shareQuote}
        projections={projections}
        onClickEmbed={() => setShowEmbedPreviewModal(true)}
        stats={stats}
      />
      <EmbedPreview
        open={showEmbedPreviewModal}
        county={county}
        onClose={() => setShowEmbedPreviewModal(false)}
      />
    </>
  );
};

function getUrlAndShareQuote({ stateId, county }) {
  let shareURL = BASE_SHARE_URL;
  let displayName = 'the country';
  if (county) {
    shareURL = `${BASE_SHARE_URL}/${stateId.toLowerCase()}/county/${
      county.county_url_name
    }`;
    displayName = `${county.county}, ${STATES[stateId]}`;
  } else if (stateId) {
    shareURL = `${BASE_SHARE_URL}/${stateId.toLowerCase()}`;
    displayName = STATES[stateId];
  }

  return { shareURL, displayName };
}
export default ShareModelBlock;
