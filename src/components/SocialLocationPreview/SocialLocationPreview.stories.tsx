import React from 'react';
import regions from 'common/regions';
import { useProjectionsFromRegion } from 'common/utils/model';
import SocialLocationPreview from './SocialLocationPreview';

export default {
  title: 'Location Page/SocialLocationPreview',
  component: SocialLocationPreview,
};

export const California = () => {
  const region = regions.findByFipsCodeStrict('06');
  const projections = useProjectionsFromRegion(region);

  if (!projections) {
    return null;
  }

  return (
    <div style={{ width: 450 }}>
      <SocialLocationPreview
        projections={projections!}
        stats={projections.getMetricValues()}
      />
    </div>
  );
};
