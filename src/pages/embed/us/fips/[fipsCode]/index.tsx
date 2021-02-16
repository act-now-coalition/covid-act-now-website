import React from 'react';
import { GetStaticPaths, GetStaticProps } from 'next';

import {
  getFipsPathParams,
  makeEmbedRegionGetStaticProps,
  fipsCodeParamsToRegion,
} from 'screens/utils/ssg_utils';

import { LocationEmbed, LocationEmbedProps } from 'screens/Embed/Embed';

const getStaticPaths: GetStaticPaths = getFipsPathParams;

const getStaticProps: GetStaticProps = makeEmbedRegionGetStaticProps({
  paramsToRegion: fipsCodeParamsToRegion,
});

function EmbedPage(props: LocationEmbedProps) {
  return <LocationEmbed {...props} />;
}

export { getStaticPaths, getStaticProps };
export default EmbedPage;
