import React from 'react';
import { DisclaimerWrapper } from './Disclaimer.style';
import { getMetricDisclaimer } from 'common/metric';
import { Projections } from 'common/models/Projections';

const Disclaimer = ({
  metricName,
  projections,
}: {
  metricName: number;
  projections: Projections;
}) => {
  return (
    <DisclaimerWrapper>
      {getMetricDisclaimer(metricName, projections)}
    </DisclaimerWrapper>
  );
};

export default Disclaimer;
