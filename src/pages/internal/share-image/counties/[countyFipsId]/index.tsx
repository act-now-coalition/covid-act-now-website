import React from 'react';
import { GetStaticPaths, GetStaticProps } from 'next';

import {
  getCountyFipsPathParams,
  makeEmbedRegionGetStaticProps,
  countyFipsIdParamsToRegion,
} from 'screens/utils/ssg_utils';

import LocationShareCardImage, {
  LocationShareCardImageProps,
} from 'screens/internal/ShareImage/LocationShareCardImage';

const getStaticPaths: GetStaticPaths = getCountyFipsPathParams;

// These pages use the same static props as the embed pages
const getStaticProps: GetStaticProps = makeEmbedRegionGetStaticProps({
  paramsToRegion: countyFipsIdParamsToRegion,
});

function Page(props: LocationShareCardImageProps) {
  return <LocationShareCardImage {...props} />;
}

export { getStaticPaths, getStaticProps };
export default Page;
