import React from 'react';

import { GetStaticPaths, GetStaticProps } from 'next';

import {
  makeEmbedRegionGetStaticProps,
  getStatePathParams,
} from 'screens/utils/ssg_utils';

import regions from 'common/regions/region_db';
import { LocationEmbed, LocationEmbedProps } from 'screens/Embed/Embed';

const getStaticPaths: GetStaticPaths = getStatePathParams;

const getStaticProps: GetStaticProps = makeEmbedRegionGetStaticProps({
  paramsToRegion: params => {
    const stateId = (params?.stateId ?? '') as string;
    const region = stateId ? regions.findStateByUrlParams(stateId) : null;
    return region;
  },
});

function EmbedPage(props: LocationEmbedProps) {
  return <LocationEmbed {...props} />;
}

export { getStaticPaths, getStaticProps };
export default EmbedPage;
