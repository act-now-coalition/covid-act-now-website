import React, { Fragment } from 'react';
import { COLOR_MAP } from 'common/colors';
import { Level, LevelInfoMap } from 'common/level';
import { Projections } from 'common/models/Projections';
import {
  formatDecimal,
  formatPercent,
  formatInteger,
  formatEstimate,
} from 'common/utils';
import ExternalLink from 'components/ExternalLink';
import { MetricDefinition } from './interfaces';

export const METRIC_NAME = 'Daily new cases per 100k population';

export const CaseIncidenceMetric: MetricDefinition = {
  renderStatus,
  renderDisclaimer,
  metricName: 'Daily new cases',
  extendedMetricName: 'Daily new cases per 100k population',
  metricNameForCompare: `Daily new cases per 100k`,
};

export const CASE_DENSITY_LEVEL_INFO_MAP: LevelInfoMap = {
  [Level.LOW]: {
    level: Level.LOW,
    upperLimit: 1,
    name: 'Low',
    color: COLOR_MAP.GREEN.BASE,
    detail: () => 'COVID is being effectively contained',
  },
  [Level.MEDIUM]: {
    level: Level.MEDIUM,
    upperLimit: 10,
    name: 'Medium',
    color: COLOR_MAP.ORANGE.BASE,
    detail: () => 'COVID not contained, but at low levels',
  },
  [Level.HIGH]: {
    level: Level.HIGH,
    upperLimit: 25,
    name: 'High',
    color: COLOR_MAP.ORANGE_DARK.BASE,
    detail: () => 'Very large number of new cases',
  },
  [Level.CRITICAL]: {
    level: Level.CRITICAL,
    upperLimit: Infinity,
    name: 'Critical',
    color: COLOR_MAP.RED.BASE,
    detail: () => 'Dangerous number of new cases',
  },
  [Level.UNKNOWN]: {
    level: Level.UNKNOWN,
    upperLimit: 0,
    name: 'Unknown',
    color: COLOR_MAP.GRAY.BASE,
    detail: () => 'Insufficient data to assess',
  },
};

export const CASE_DENSITY_DISCLAIMER = '';

export function renderStatus(projections: Projections): React.ReactElement {
  const {
    locationName,
    currentCaseDensity,
    totalPopulation,
    currentDailyAverageCases,
  } = projections.primary;
  if (
    currentCaseDensity === null ||
    totalPopulation === null ||
    currentDailyAverageCases === null
  ) {
    return (
      <Fragment>
        Not enough case data is available to generate{' '}
        {METRIC_NAME.toLowerCase()}.
      </Fragment>
    );
  }

  const ESTIMATED_INFECTIONS_FACTOR = 5;
  const newCasesPerDay = currentDailyAverageCases;
  const newCasesPerYear = 365 * newCasesPerDay;
  const estimatedNewInfectionsPerYear =
    ESTIMATED_INFECTIONS_FACTOR * newCasesPerYear;
  const estimatedPercentageNewInfectedPerYear = Math.min(
    1,
    estimatedNewInfectionsPerYear / totalPopulation,
  );

  return (
    <Fragment>
      Over the last week, {locationName} has averaged{' '}
      {formatInteger(newCasesPerDay)} new confirmed cases per day (
      <b>{formatDecimal(currentCaseDensity, 1)}</b> for every 100,000
      residents). Over the next year, this translates to around{' '}
      {formatEstimate(newCasesPerYear)} cases and an{' '}
      <ExternalLink href="https://www.globalhealthnow.org/2020-06/us-cases-10x-higher-reported">
        estimated
      </ExternalLink>{' '}
      {formatEstimate(estimatedNewInfectionsPerYear)} infections (
      {formatPercent(estimatedPercentageNewInfectedPerYear, 1)} of the
      population).
    </Fragment>
  );
}

function renderDisclaimer(): React.ReactElement {
  return (
    <Fragment>
      Our risk levels for daily new cases are based on the{' '}
      <ExternalLink href="https://ethics.harvard.edu/files/center-for-ethics/files/key_metrics_and_indicators_v4.pdf">
        “Key Metrics for Covid Suppression”
      </ExternalLink>{' '}
      by Harvard Global Health Institute and others.
      <br />
      When estimating the number of people who will become infected in the
      course of a year, we rely on the{' '}
      <ExternalLink href="https://www.globalhealthnow.org/2020-06/us-cases-10x-higher-reported">
        CDC’s estimate
      </ExternalLink>{' '}
      that confirmed cases represent as few as 10% of overall infections. Learn
      more about{' '}
      <ExternalLink href="https://docs.google.com/document/d/1cd_cEpNiIl1TzUJBvw9sHLbrbUZ2qCxgN32IqVLa3Do/edit">
        our methodology
      </ExternalLink>{' '}
      and{' '}
      <ExternalLink href="https://docs.google.com/presentation/d/1XmKCBWYZr9VQKFAdWh_D7pkpGGM_oR9cPjj-UrNdMJQ/edit">
        our data sources
      </ExternalLink>
      .
    </Fragment>
  );
}
