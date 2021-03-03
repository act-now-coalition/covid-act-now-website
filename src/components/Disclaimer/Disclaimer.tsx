import React from 'react';
import { DisclaimerWrapper } from './Disclaimer.style';
import { getMetricDisclaimer } from 'common/metric';
import { Region } from 'common/regions';
import { MetricToProvenance } from 'components/Disclaimer/utils';

const Disclaimer = ({
  metricName,
  region,
  provenanceInfo,
}: {
  metricName: number;
  region: Region;
  provenanceInfo: MetricToProvenance;
}) => {
  return (
    <DisclaimerWrapper>
      {getMetricDisclaimer(metricName, region, provenanceInfo)}
    </DisclaimerWrapper>
  );
};

export default Disclaimer;
