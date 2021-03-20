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

function Location(props: LocationPageWrapperProps) {
  const { regionObject, locationSummary, title, description } = props;

  const region = MetroArea.fromObject(regionObject as MetroAreaObject);

  return (
    <PageWrapper>
      <LocationPage
        region={region}
        locationSummary={locationSummary}
        title={title}
        description={description}
      />
    </PageWrapper>
  );
}

export { getStaticPaths, getStaticProps };
export default Location;
