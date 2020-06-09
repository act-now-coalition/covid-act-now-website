import React, { Fragment } from 'react';

import { DisclaimerWrapper, DisclaimerBody } from './Disclaimer.style';
import LightTooltip from 'components/LightTooltip/LightTooltip';
import { useModelLastUpdatedDate } from 'common/utils/model';
import { Metric } from 'common/metric';

const Disclaimer = ({
  metricName,
  children,
}: {
  metricName?: number;
  children: React.ReactNode;
}) => {
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
        {children} Learn more about{' '}
        <a
          href="https://blog.covidactnow.org/modeling-metrics-critical-to-reopen-safely/"
          target="_blank"
          rel="noopener noreferrer"
        >
          our methodology
        </a>{' '}
        and{' '}
        <a
          href="https://docs.google.com/presentation/d/1XmKCBWYZr9VQKFAdWh_D7pkpGGM_oR9cPjj-UrNdMJQ/edit"
          target="_blank"
          rel="noopener noreferrer"
        >
          our data sources
        </a>
        {metricName === Metric.CONTACT_TRACING && (
          <Fragment>
            {' '}
            (for contact tracing data, we partner with{' '}
            <a
              href="https://testandtrace.com/"
              target="_blank"
              rel="noopener noreferrer"
            >
              testandtrace.com
            </a>
            )
          </Fragment>
        )}
        .
      </DisclaimerBody>
    </DisclaimerWrapper>
  );
};

export default Disclaimer;
