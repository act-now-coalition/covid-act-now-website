import React, { Fragment } from 'react';

import { DisclaimerWrapper, DisclaimerBody } from './Disclaimer.style';
import LightTooltip from 'components/LightTooltip/LightTooltip';
import { useModelLastUpdatedDate } from 'common/utils/model';
import { Metric } from 'common/metric';
import { CASE_GROWTH_DISCLAIMER } from 'common/metrics/case_growth';
import { POSITIVE_RATE_DISCLAIMER } from 'common/metrics/positive_rate';
import { HOSPITALIZATIONS_DISCLAIMER } from 'common/metrics/hospitalizations';
import { CONTACT_TRACING_DISCLAIMER } from 'common/metrics/contact_tracing';
const Disclaimer = ({ metricName }: { metricName: number }) => {
  const METRIC_TO_DISCLAIMER: { [metricName: number]: string } = {
    [Metric.CASE_GROWTH_RATE]: CASE_GROWTH_DISCLAIMER,
    [Metric.POSITIVE_TESTS]: POSITIVE_RATE_DISCLAIMER,
    [Metric.HOSPITAL_USAGE]: HOSPITALIZATIONS_DISCLAIMER,
    [Metric.CONTACT_TRACING]: CONTACT_TRACING_DISCLAIMER,
  };

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
        {metricName === Metric.CONTACT_TRACING && (
          <Fragment>
            <a
              href="https://covidlocal.org/assets/documents/COVID%20Local%20Metrics%20overview.pdf"
              target="_blank"
              rel="noopener noreferrer"
            >
              Experts recommend
            </a>{' '}
          </Fragment>
        )}
        {metricName === Metric.HOSPITAL_USAGE && (
          <a
            href="https://preventepidemics.org/wp-content/uploads/2020/04/COV020_WhenHowTightenFaucet_v3.pdf"
            target="_blank"
            rel="noopener noreferrer"
          >
            Resolve to Save Lives
          </a>
        )}
        {METRIC_TO_DISCLAIMER[metricName]} Learn more about{' '}
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
