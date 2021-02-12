import React from 'react';
import { DisclaimerWrapper } from './Disclaimer.style';
import { getMetricDisclaimer } from 'common/metric';
import { Region } from 'common/regions';

const Disclaimer = ({
  metricName,
  region,
}: {
  metricName: number;
  region: Region;
}) => {
  return (
    <DisclaimerWrapper>
      {getMetricDisclaimer(metricName, region)}
    </DisclaimerWrapper>
  );
};

export default Disclaimer;
