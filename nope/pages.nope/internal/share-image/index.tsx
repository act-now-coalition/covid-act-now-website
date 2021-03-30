import React from 'react';
import HomeShareCardImage, {
  HomeShareCardImageProps,
} from 'screens/internal/ShareImage/HomeShareCardImage';

import { getLastUpdatedDateString } from 'screens/utils/ssg_utils';

async function getStaticProps() {
  const lastUpdatedDateString = await getLastUpdatedDateString();
  return {
    props: {
      lastUpdatedDateString,
    },
  };
}

function Page({ lastUpdatedDateString }: HomeShareCardImageProps) {
  // the region is null on the homepage
  return <HomeShareCardImage lastUpdatedDateString={lastUpdatedDateString} />;
}
export { getStaticProps };
export default Page;
