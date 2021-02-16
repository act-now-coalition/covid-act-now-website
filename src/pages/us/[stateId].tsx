import React from 'react';
import { GetStaticPaths, GetStaticProps } from 'next';

import { LocationPage } from 'screens/LocationPage';
import PageWrapper from 'screens/utils/PageWrapper';

import {
  LocationPageWrapperProps,
  makeLocationPageGetStaticProps,
  getStatePathParams,
  stateParamsToRegion,
} from 'screens/utils/ssg_utils';
import { State, StateObject } from 'common/regions';

const getStaticPaths: GetStaticPaths = getStatePathParams;

const getStaticProps: GetStaticProps = makeLocationPageGetStaticProps({
  paramsToRegion: stateParamsToRegion,
});

function Location({
  regionObject,
  locationSummary,
  title,
  description,
  ccviScores,
  lastUpdatedDateString,
}: LocationPageWrapperProps) {
  const region = State.fromObject(regionObject as StateObject);

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

export { getStaticPaths, getStaticProps };
export default Location;
