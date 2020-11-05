import React from 'react';
import { DisclaimerWrapper, DisclaimerBody } from './Disclaimer.style';
import { useModelLastUpdatedDate } from 'common/utils/model';
import { getMetricDisclaimer } from 'common/metric';
import { Projections } from 'common/models/Projections';

const Disclaimer = ({
  metricName,
  projections,
}: {
  metricName: number;
  projections: Projections;
}) => {
  const lastUpdatedDate: Date | null = useModelLastUpdatedDate() || new Date();
  const lastUpdatedDateString =
    lastUpdatedDate !== null ? lastUpdatedDate.toLocaleDateString() : '';
  return (
    <DisclaimerWrapper>
      <DisclaimerBody>
        Last updated {lastUpdatedDateString}.{' '}
        {getMetricDisclaimer(metricName, projections)}
      </DisclaimerBody>
    </DisclaimerWrapper>
  );
};

export default Disclaimer;
