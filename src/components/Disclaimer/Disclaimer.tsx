import React, { Fragment } from 'react';

import { DisclaimerWrapper, DisclaimerBody } from './Disclaimer.style';
import LightTooltip from 'components/LightTooltip/LightTooltip';
import { useModelLastUpdatedDate } from 'common/utils/model';
import { Metric } from 'common/metric';
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
        {metricName === Metric.CASE_DENSITY && (
          <Fragment>
            <span>
              Our risk levels for daily new cases are based on the{' '}
              <a
                href="https://ethics.harvard.edu/files/center-for-ethics/files/key_metrics_and_indicators_v4.pdf"
                target="_blank"
                rel="noopener noreferrer"
              >
                “Key Metrics for Covid Suppression”
              </a>{' '}
              by Harvard Global Health Institute and others.
              <br />
              When estimating the number of people who will become infected in
              the course of a year, we rely on the{' '}
              <a
                href="https://www.globalhealthnow.org/2020-06/us-cases-10x-higher-reported"
                target="_blank"
                rel="noopener noreferrer"
              >
                CDC’s estimate
              </a>{' '}
              that confirmed cases represent as few as 10% of overall
              infections.
            </span>
          </Fragment>
        )}
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
        {getMetricDisclaimer(metricName)} Learn more about{' '}
        <a
          href="https://docs.google.com/document/d/1cd_cEpNiIl1TzUJBvw9sHLbrbUZ2qCxgN32IqVLa3Do/edit"
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
