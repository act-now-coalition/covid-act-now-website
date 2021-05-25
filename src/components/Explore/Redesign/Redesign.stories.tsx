import React, { useMemo } from 'react';
import Explore, { ExploreMetric } from 'components/Explore';

export default {
  title: 'Location page redesign/Explore',
  component: Explore,
};

export const RedesignExample = () => {
  const initialFipsList = useMemo(() => ['12'], ['13']);

  return (
    <>
      <Explore
        initialFipsList={initialFipsList}
        title="Trends"
        defaultMetric={ExploreMetric.CASES}
      />
    </>
  );
};
