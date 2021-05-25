import React, { useMemo } from 'react';
import { ExploreMetric } from 'components/Explore';
import ExploreCopy from './ExploreCopy';

export default {
  title: 'Location page redesign/Explore',
  component: ExploreCopy,
};

export const RedesignExample = () => {
  const initialFipsList = useMemo(() => ['12'], ['13']);

  return (
    <>
      <ExploreCopy
        initialFipsList={initialFipsList}
        title="Trends"
        defaultMetric={ExploreMetric.CASES}
      />
    </>
  );
};
