import React from 'react';

import { GetStaticPaths, GetStaticProps } from 'next';

import {
  getCountyPathParams,
  makeEmbedRegionGetStaticProps,
  countyParamsToRegion,
} from 'screens/utils/ssg_utils';

import { LocationEmbed, LocationEmbedProps } from 'screens/Embed/Embed';

const getStaticPaths: GetStaticPaths = getCountyPathParams;

const getStaticProps: GetStaticProps = makeEmbedRegionGetStaticProps({
  paramsToRegion: countyParamsToRegion,
});

function EmbedPage(props: LocationEmbedProps) {
  return <LocationEmbed {...props} />;
}

export { getStaticPaths, getStaticProps };
export default EmbedPage;
