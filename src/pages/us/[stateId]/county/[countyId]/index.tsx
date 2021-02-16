import React from 'react';
import { GetStaticPaths, GetStaticProps } from 'next';

import { LocationPage } from 'screens/LocationPage';
import PageWrapper from 'screens/utils/PageWrapper';

import { Projections } from 'common/models/Projections';
import {
  LocationPageWrapperProps,
  makeLocationPageGetStaticProps,
  getCountyPathParams,
  countyParamsToRegion,
} from 'screens/utils/ssg_utils';
import { County, CountyObject } from 'common/regions';

const getStaticPaths: GetStaticPaths = getCountyPathParams;

const getStaticProps: GetStaticProps = makeLocationPageGetStaticProps({
  paramsToRegion: countyParamsToRegion,
});

function Location({
  regionObject,
  summaryWithTimeseries,
  title,
  description,
}: LocationPageWrapperProps) {
  const region = County.fromObject(regionObject as CountyObject);
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
