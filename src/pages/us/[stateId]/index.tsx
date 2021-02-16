import React from 'react';
import { GetStaticPaths, GetStaticProps } from 'next';

import { LocationPage } from 'screens/LocationPage';
import PageWrapper from 'screens/utils/PageWrapper';

import { Projections } from 'common/models/Projections';
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
  summaryWithTimeseries,
  title,
  description,
}: LocationPageWrapperProps) {
  const region = State.fromObject(regionObject as StateObject);
  const projections = new Projections(summaryWithTimeseries, region);

  return (
    <PageWrapper>
      <LocationPage
        region={region}
        projections={projections}
        title={title}
        description={description}
      />
    </PageWrapper>
  );
}

export { getStaticPaths, getStaticProps };
export default Location;
