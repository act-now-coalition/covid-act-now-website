import React from 'react';
import {
  USMapImage,
  USMapImageProps,
} from 'screens/internal/ShareImage/USMapImage';

import { getLastUpdatedDateString } from 'screens/utils/ssg_utils';

async function getStaticProps() {
  const lastUpdatedDateString = await getLastUpdatedDateString();
  return {
    props: {
      lastUpdatedDateString,
    },
  };
}

function Page({ lastUpdatedDateString }: USMapImageProps) {
  return <USMapImage lastUpdatedDateString={lastUpdatedDateString} />;
}

export { getStaticProps };
export default Page;
