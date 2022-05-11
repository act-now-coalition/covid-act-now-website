import React, { useEffect, useState } from 'react';
import { Projection } from 'common/models/Projection';
import VaccinationProgressBlock from './VaccinationProgressBarBlock';
import { getProjectionForRegion } from '../SparkLineBlock/utils';
import regions from 'common/regions';

export default {
  title: 'Location Page/Vaccinations progress bar block',
  component: VaccinationProgressBlock,
};

export const Example = () => {
  const region = regions.findByFipsCodeStrict('36');
  const [projection, setProjection] = useState<Projection>();

  useEffect(() => {
    const fetchProjection = () => getProjectionForRegion(region);
    fetchProjection().then(setProjection);
  }, [region]);

  if (!projection) {
    return null;
  }
  return (
    <VaccinationProgressBlock
      locationName={region.name}
      projection={projection}
    />
  );
};
