import React from 'react';
import { DisclaimerWrapper, DisclaimerBody } from './Disclaimer.style';
import { useModelLastUpdatedDate } from 'common/utils/model';
import { getMetricDisclaimer } from 'common/metric';

const Disclaimer = ({ metricName }: { metricName: number }) => {
  const lastUpdatedDate: Date | null = useModelLastUpdatedDate() || new Date();
  const lastUpdatedDateString =
    lastUpdatedDate !== null ? lastUpdatedDate.toLocaleDateString() : '';
  return (
    <DisclaimerWrapper>
      <DisclaimerBody>
        Last updated {lastUpdatedDateString}. {getMetricDisclaimer(metricName)}
      </DisclaimerBody>
    </DisclaimerWrapper>
  );
};

export default Disclaimer;
