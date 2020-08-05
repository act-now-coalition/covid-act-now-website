import React, { Fragment } from 'react';
import { COLOR_MAP } from 'common/colors';
import { Level, LevelInfoMap } from 'common/level';
import { Projection } from 'common/models/Projection';
import { formatDecimal, formatPercent, formatInteger } from 'common/utils';
import ExternalLink from 'components/ExternalLink';
import { MetricDefinition } from './interfaces';

export const metricCaseIncidence: MetricDefinition = {
  renderStatus,
};

export const METRIC_NAME = 'Daily new cases per 100k population';

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

export function renderStatus(projection: Projection): React.ReactElement {
  const { locationName, currentCaseDensity, totalPopulation } = projection;
  if (currentCaseDensity === null || totalPopulation === null) {
    return (
      <Fragment>
        Not enough case data is available to generate{' '}
        {METRIC_NAME.toLowerCase()}.
      </Fragment>
    );
  }

  const ESTIMATE_FACTOR = 5;

  const dailyCasesPer100k = currentCaseDensity;
  const yearlyCasesPer100k = dailyCasesPer100k * 365;
  const yearlyEstimatedInfectionsPer100k = ESTIMATE_FACTOR * yearlyCasesPer100k;
  const estimatedPercentOfPopulationInfectedYear = Math.min(
    1,
    (100e3 * yearlyEstimatedInfectionsPer100k) / totalPopulation,
  );

  return (
    <Fragment>
      Over the last week, {locationName} has averaged{' '}
      {formatDecimal(dailyCasesPer100k, 1)} new confirmed cases per day for
      every 100,000 residents. Over the next year this translates to{' '}
      {formatInteger(yearlyCasesPer100k)} cases and an{' '}
      <ExternalLink href="https://www.globalhealthnow.org/2020-06/us-cases-10x-higher-reported">
        estimated
      </ExternalLink>{' '}
      {formatInteger(yearlyEstimatedInfectionsPer100k)} infections (
      {formatPercent(estimatedPercentOfPopulationInfectedYear, 1)} of the
      population).
    </Fragment>
  );
}
