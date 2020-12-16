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
import Thermometer from 'components/Thermometer';
import { MetricDefinition } from './interfaces';

export const CaseIncidenceMetric: MetricDefinition = {
  renderStatus,
  renderDisclaimer,
  renderThermometer,
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
    upperLimit: 75,
    name: 'Critical',
    color: COLOR_MAP.RED.BASE,
    detail: () => 'Dangerous number of new cases',
  },
  [Level.SUPER_CRITICAL]: {
    level: Level.SUPER_CRITICAL,
    upperLimit: Infinity,
    name: 'Extreme',
    color: COLOR_MAP.RED.DARK,
    detail: () => 'Very dangerous number of new cases',
  },
  [Level.UNKNOWN]: {
    level: Level.UNKNOWN,
    upperLimit: 0,
    name: 'Unknown',
    color: COLOR_MAP.GRAY.BASE,
    detail: () => 'Insufficient data to assess',
  },
};

function renderStatus(projections: Projections): React.ReactElement {
  const {
    currentCaseDensity,
    totalPopulation,
    currentDailyAverageCases,
  } = projections.primary;
  const locationName = projections.locationName;
  if (
    currentCaseDensity === null ||
    totalPopulation === null ||
    currentDailyAverageCases === null
  ) {
    return (
      <Fragment>
        Unable to generate{' '}
        {CaseIncidenceMetric.extendedMetricName.toLowerCase()}. This could be
        due to insufficient data.
      </Fragment>
    );
  }

  const ESTIMATED_INFECTIONS_FACTOR = 5;
  const newCasesPerDay = currentDailyAverageCases;
  // Try not to round cases/day to zero (since it will probably be >0 per 100k).
  const newCasesPerDayText =
    newCasesPerDay >= 0.1 && newCasesPerDay < 1
      ? formatDecimal(newCasesPerDay, 1)
      : formatInteger(newCasesPerDay);
  const newCasesPerYear = 365 * newCasesPerDay;
  const estimatedNewInfectionsPerYear =
    ESTIMATED_INFECTIONS_FACTOR * newCasesPerYear;

  // Makes sure estimated # of cases and infections over the next year don't go above total population:
  function maxAtTotalPopulation(num: number) {
    return Math.min(num, totalPopulation);
  }
  const estimatedNewInfectionsPerYearWithMax = maxAtTotalPopulation(
    estimatedNewInfectionsPerYear,
  );
  const newCasesPerYearWithMax = maxAtTotalPopulation(newCasesPerYear);

  const estimatedPercentageNewInfectedPerYear = Math.min(
    1,
    estimatedNewInfectionsPerYear / totalPopulation,
  );

  return (
    <Fragment>
      Over the last week, {locationName} has averaged {newCasesPerDayText} new
      confirmed cases per day (<b>{formatDecimal(currentCaseDensity, 1)}</b> for
      every 100,000 residents). If this trend continued for the next year, this
      would translate to approximately {formatEstimate(newCasesPerYearWithMax)}{' '}
      cases and an{' '}
      <ExternalLink href="https://www.globalhealthnow.org/2020-06/us-cases-10x-higher-reported">
        estimated
      </ExternalLink>{' '}
      {formatEstimate(estimatedNewInfectionsPerYearWithMax)} infections (
      {formatPercent(estimatedPercentageNewInfectedPerYear)} of the population).
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

function renderThermometer(): React.ReactElement {
  const levelInfo = CASE_DENSITY_LEVEL_INFO_MAP;
  const levelExtreme = levelInfo[Level.SUPER_CRITICAL];
  const levelCritical = levelInfo[Level.CRITICAL];
  const levelHigh = levelInfo[Level.HIGH];
  const levelMedium = levelInfo[Level.MEDIUM];
  const levelLow = levelInfo[Level.LOW];

  const items = [
    {
      title: `Over ${levelCritical.upperLimit}`,
      description: levelExtreme.detail(),
      color: levelExtreme.color,
      roundTop: true,
      roundBottom: false,
    },
    {
      title: `${levelHigh.upperLimit} - ${levelCritical.upperLimit}`,
      description: levelCritical.detail(),
      color: levelCritical.color,
      roundTop: false,
      roundBottom: false,
    },
    {
      title: `${levelMedium.upperLimit} - ${levelHigh.upperLimit}`,
      description: levelHigh.detail(),
      color: levelHigh.color,
      roundTop: false,
      roundBottom: false,
    },
    {
      title: `${levelLow.upperLimit} - ${levelMedium.upperLimit}`,
      description: levelMedium.detail(),
      color: levelMedium.color,
      roundTop: false,
      roundBottom: false,
    },
    {
      title: `Under ${levelLow.upperLimit}`,
      description: levelLow.detail(),
      color: levelLow.color,
      roundTop: false,
      roundBottom: true,
    },
  ];
  return <Thermometer items={items} />;
}
