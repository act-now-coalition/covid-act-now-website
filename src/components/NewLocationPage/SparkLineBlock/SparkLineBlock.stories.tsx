import React, { useEffect, useState } from 'react';
import SparkLineBlock from './SparkLineBlock';
import { Projection } from 'common/models/Projection';
import regions from 'common/regions';
import { getProjectionForRegion } from './utils';

export default {
  title: 'Location Page/Spark lines',
  component: SparkLineBlock,
};

export const Michigan = () => {
  const testRegion = regions.findByFipsCodeStrict('26');
  const [projection, setProjection] = useState<Projection>();

  useEffect(() => {
    const fetchProjection = () => getProjectionForRegion(testRegion);
    fetchProjection().then(setProjection);
  }, [testRegion]);

  if (!projection) {
    return null;
  }

  return <SparkLineBlock region={testRegion} onClickSparkLine={() => {}} />;
};

export const BostonMetro = () => {
  const testRegion = regions.findByFipsCodeStrict('14460');
  const [projection, setProjection] = useState<Projection>();

  useEffect(() => {
    const fetchProjection = () => getProjectionForRegion(testRegion);
    fetchProjection().then(setProjection);
  }, [testRegion]);

  if (!projection) {
    return null;
  }

  return <SparkLineBlock region={testRegion} onClickSparkLine={() => {}} />;
};

export const MaricopaCounty = () => {
  const testRegion = regions.findByFipsCodeStrict('04013');
  const [projection, setProjection] = useState<Projection>();

  useEffect(() => {
    const fetchProjection = () => getProjectionForRegion(testRegion);
    fetchProjection().then(setProjection);
  }, [testRegion]);

  if (!projection) {
    return null;
  }

  return <SparkLineBlock region={testRegion} onClickSparkLine={() => {}} />;
};
