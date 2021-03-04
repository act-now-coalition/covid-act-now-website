import React from 'react';
import { DisclaimerWrapper } from './Disclaimer.style';
import { getMetricDisclaimer } from 'common/metric';
import { Region } from 'common/regions';
import { Metric } from 'common/metricEnum';
import { Sources } from 'api/schema/RegionSummaryWithTimeseries';

const Disclaimer = ({
  metric,
  region,
  provenance,
}: {
  metric: Metric;
  region: Region;
  provenance?: Sources;
}) => {
  return (
    <DisclaimerWrapper>
      {getMetricDisclaimer(metric, region, provenance)}
    </DisclaimerWrapper>
  );
};

export default Disclaimer;
