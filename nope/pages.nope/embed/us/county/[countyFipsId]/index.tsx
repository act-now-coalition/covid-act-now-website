import React from 'react';
import { GetStaticPaths, GetStaticProps } from 'next';

import {
  getCountyFipsPathParams,
  makeEmbedRegionGetStaticProps,
  countyFipsIdParamsToRegion,
} from 'screens/utils/ssg_utils';

import { LocationEmbed, LocationEmbedProps } from 'screens/Embed/Embed';

const getStaticPaths: GetStaticPaths = getCountyFipsPathParams;

const getStaticProps: GetStaticProps = makeEmbedRegionGetStaticProps({
  paramsToRegion: countyFipsIdParamsToRegion,
});

function EmbedPage(props: LocationEmbedProps) {
  return <LocationEmbed {...props} />;
}

export { getStaticPaths, getStaticProps };
export default EmbedPage;
