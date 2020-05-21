import React, { useState } from 'react';
import ShareBlock from './ShareBlock';
import { STATES } from 'common';

import EmbedPreview from './EmbedPreview';

const ShareModelBlock = ({
  condensed,
  stateId,
  county,
  projections,
  stats,
}) => {
  const stateName = STATES[stateId];
  const countyName = county && county.county;
  const displayName = countyName ? `${countyName}, ${stateName}` : stateName;
  const shareURL = `https://covidactnow.org/us/${stateId.toLowerCase()}${
    county ? `/county/${county.county_url_name}` : ''
  }`;
  const shareQuote = `${displayName}'s COVID risk from @CovidActNow, check it out: `;
  const [showEmbedPreviewModal, setShowEmbedPreviewModal] = useState(false);

  return (
    <>
      <ShareBlock
        condensed={condensed}
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
export default ShareModelBlock;
