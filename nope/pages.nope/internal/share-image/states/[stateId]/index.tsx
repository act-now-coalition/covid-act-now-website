import React from 'react';

import { GetStaticPaths, GetStaticProps } from 'next';

import {
  makeEmbedRegionGetStaticProps,
  getStatePathParams,
  stateParamsToRegion,
} from 'screens/utils/ssg_utils';

import LocationShareCardImage, {
  LocationShareCardImageProps,
} from 'screens/internal/ShareImage/LocationShareCardImage';

const getStaticPaths: GetStaticPaths = getStatePathParams;

// These pages use the same static props as the embed pages
const getStaticProps: GetStaticProps = makeEmbedRegionGetStaticProps({
  paramsToRegion: stateParamsToRegion,
});

function Page(props: LocationShareCardImageProps) {
  return <LocationShareCardImage {...props} />;
}

export { getStaticPaths, getStaticProps };
export default Page;
