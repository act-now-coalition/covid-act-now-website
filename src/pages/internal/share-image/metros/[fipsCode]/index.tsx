import React from 'react';
import { GetStaticPaths, GetStaticProps } from 'next';

import {
  getMetroAreaFipsPathParams,
  makeEmbedRegionGetStaticProps,
  fipsCodeParamsToRegion,
} from 'screens/utils/ssg_utils';

import LocationShareCardImage, {
  LocationShareCardImageProps,
} from 'screens/internal/ShareImage/LocationShareCardImage';

const getStaticPaths: GetStaticPaths = getMetroAreaFipsPathParams;

const getStaticProps: GetStaticProps = makeEmbedRegionGetStaticProps({
  paramsToRegion: fipsCodeParamsToRegion,
});

function Page(props: LocationShareCardImageProps) {
  return <LocationShareCardImage {...props} />;
}

export { getStaticPaths, getStaticProps };
export default Page;
