import React from 'react';
import { InferGetStaticPropsType } from 'next';

import { LocationPage } from 'screens/LocationPage';
import PageWrapper from 'screens/utils/PageWrapper';

import {
  getLocationPageStaticProps,
  getStatePathParams,
  stateParamsToRegion,
} from 'screens/utils/ssg_utils';
import { State } from 'common/regions';

import { getRegionDB } from 'common/regions';

export async function getStaticPaths() {
  const regions = await getRegionDB();
  return getStatePathParams(regions);
}

export async function getStaticProps({ params }: { params: any }) {
  const regions = await getRegionDB();
  const region = stateParamsToRegion(regions, params);
  const props = getLocationPageStaticProps(region);
  return props;
}

function Page({
  regionObject,
  locationSummary,
  title,
  description,
  ccviScores,
  lastUpdatedDateString,
}: InferGetStaticPropsType<typeof getStaticProps>) {
  const region = State.fromObject(regionObject);

  return (
    <PageWrapper>
      <LocationPage
        region={region}
        locationSummary={locationSummary}
        title={title}
        description={description}
        ccviScores={ccviScores}
        lastUpdatedDateString={lastUpdatedDateString}
      />
    </PageWrapper>
  );
}

export default Page;
