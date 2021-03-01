import React from 'react';
import { GetStaticPaths, GetStaticProps, InferGetStaticPropsType } from 'next';

import { LocationPage } from 'screens/LocationPage';
import { Projections } from 'common/models/Projections';
import {
  LocationPageWrapperProps,
  makeGetStaticProps,
} from 'screens/LocationPage/ssg_utils';
import regions, { County, CountyObject } from 'common/regions';

const getStaticPaths: GetStaticPaths = async () => {
  const pathParams = regions.counties
    .filter(county => {
      return county.stateCode === 'CA';
    })
    .map(county => {
      return {
        params: {
          stateId: county.state.urlSegment,
          countyId: county.urlSegment,
        },
      };
    });
  return {
    paths: pathParams,
    fallback: false,
  };
};

const getStaticProps: GetStaticProps = makeGetStaticProps({
  paramsToRegion: params => {
    const stateId = (params?.stateId ?? '') as string;
    const countyId = (params?.countyId ?? '') as string;
    const county =
      stateId && countyId
        ? regions.findCountyByUrlParams(stateId, countyId)
        : null;
    return county;
  },
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
    <LocationPage
      region={region}
      projections={projections}
      title={title}
      description={description}
    />
  );
}
export { getStaticPaths, getStaticProps };
export default Location;
