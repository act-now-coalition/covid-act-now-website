import React from 'react';
import { GetStaticPaths, GetStaticProps } from 'next';

import { LocationPage } from 'screens/LocationPage';
import PageWrapper from 'screens/utils/PageWrapper';

import {
  getMetroAreaPathParams,
  LocationPageWrapperProps,
  makeLocationPageGetStaticProps,
  metroAreaParamsToRegion,
} from 'screens/utils/ssg_utils';
import { MetroArea, MetroAreaObject } from 'common/regions';

const getStaticPaths: GetStaticPaths = getMetroAreaPathParams;

const getStaticProps: GetStaticProps = makeLocationPageGetStaticProps({
  paramsToRegion: metroAreaParamsToRegion,
});

function Location({
  regionObject,
  locationSummary,
  title,
  description,
  ccviScores,
  lastUpdatedDateString,
}: LocationPageWrapperProps) {
  const region = MetroArea.fromObject(regionObject as MetroAreaObject);

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
