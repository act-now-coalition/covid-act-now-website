import React from 'react';
import ShareBlock from './ShareBlock';
import { Region } from 'common/regions';

const BASE_SHARE_URL = 'https://covidactnow.org/us';

interface ShareModelBlockParams {
  region?: Region;
}

const ShareModelBlock = ({ region }: ShareModelBlockParams) => {
  return <ShareBlock region={region} />;
};

export function getUrlAndShareQuote(region?: Region) {
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
