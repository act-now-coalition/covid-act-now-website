import React, { useState } from 'react';
import ShareBlock from './ShareBlock';
import { STATES } from 'common';

import EmbedPreview from './EmbedPreview';
import { County } from 'common/locations';
import { Projections } from 'common/models/Projections';

const BASE_SHARE_URL = 'https://covidactnow.org/us';

interface ShareModelBlockProps {
  stateId: string;
  county: County | undefined;
  projections: Projections;
  stats: any;
}

const ShareModelBlock: React.FC<ShareModelBlockProps> = ({
  stateId,
  county,
  projections,
  stats,
}) => {
  const { displayName, shareURL } = getUrlAndShareQuote(stateId, county);
  const countyName = county && county.county;
  const shareQuote = `I'm keeping track of ${displayName}'s COVID data and risk level with @CovidActNow. What does your community look like?`;
  const [showEmbedPreviewModal, setShowEmbedPreviewModal] = useState(false);

  return (
    <>
      <ShareBlock
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

function getUrlAndShareQuote(stateId: string, county: County | undefined) {
  let shareURL = BASE_SHARE_URL;
  let displayName = 'the country';
  if (county) {
    shareURL = `${BASE_SHARE_URL}/${stateId.toLowerCase()}/county/${
      county.county_url_name
    }`;
    // @ts-ignore
    displayName = `${county.county}, ${STATES[stateId]}`;
  } else if (stateId) {
    shareURL = `${BASE_SHARE_URL}/${stateId.toLowerCase()}`;
    // @ts-ignore
    displayName = STATES[stateId];
  }

  return { shareURL, displayName };
}
export default ShareModelBlock;
