import React from 'react';
import { DisclaimerWrapper, DisclaimerBody } from './Disclaimer.style';
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
      <DisclaimerBody>
        {getMetricDisclaimer(metricName, projections)}
      </DisclaimerBody>
    </DisclaimerWrapper>
  );
};

export default Disclaimer;
