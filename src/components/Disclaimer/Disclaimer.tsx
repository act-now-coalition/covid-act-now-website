import React from 'react';
import { DisclaimerWrapper, DisclaimerBody } from './Disclaimer.style';
import LightTooltip from 'components/LightTooltip/LightTooltip';
import { useModelLastUpdatedDate } from 'common/utils/model';
import { getMetricDisclaimer } from 'common/metric';

const Disclaimer = ({ metricName }: { metricName: number }) => {
  const lastUpdatedDate: Date | null = useModelLastUpdatedDate() || new Date();
  const lastUpdatedDateString =
    lastUpdatedDate !== null ? lastUpdatedDate.toLocaleDateString() : '';
  return (
    <DisclaimerWrapper>
      <DisclaimerBody>
        <LightTooltip
          title="Currently we aggregate data over 4 day intervals to smooth out inconsistencies in the source data. We’re working on improving this now."
          placement="bottom"
        >
          <span>Last updated {lastUpdatedDateString}.</span>
        </LightTooltip>{' '}
        {getMetricDisclaimer(metricName)}
      </DisclaimerBody>
    </DisclaimerWrapper>
  );
};

export default Disclaimer;
