import React, { ReactNode } from 'react';
import { COLOR_MAP } from 'common/colors';
import { Level, LevelInfoMap } from 'common/level';
import { Projection } from 'common/models/Projection';
import { getLevel, Metric } from 'common/metric';
import { formatDecimal, formatPercent, formatInteger } from 'common/utils';

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

export function caseDensityStatusText(projection: Projection) {
  const {
    currentCaseDensity,
    currentDailyDeaths,
    locationName,
    totalPopulation,
  } = projection;

  if (currentCaseDensity === null || currentDailyDeaths === null) {
    return `Not enough case data is available to generate ${METRIC_NAME.toLowerCase()}.`;
  }

  const levelFactor = {
    [Level.LOW]: 1,
    [Level.MEDIUM]: 10,
    [Level.HIGH]: 20,
    [Level.CRITICAL]: 100,
    [Level.UNKNOWN]: 0,
  };

  const level = getLevel(Metric.CASE_DENSITY, currentCaseDensity);
  const caseIncidence = formatDecimal(currentCaseDensity, 1);
  const yearlyCases = currentCaseDensity * 356 * levelFactor[level];
  const estimatedYearlyCases = yearlyCases * 5;
  const percentOfPopulation = Math.min(
    1,
    estimatedYearlyCases / totalPopulation,
  );

  const yearlyCasesText = formatInteger(yearlyCases);
  const estimatedYearlyInfectionsText = formatInteger(estimatedYearlyCases);
  const percentOfPopulationText = formatPercent(percentOfPopulation, 1);

  const statusText1 = `Over the last week, ${locationName} has averaged
   ${caseIncidence} new confirmed cases per day for every
    100,000 residents.`;

  // TODO(pablo): Add link https://www.globalhealthnow.org/2020-06/us-cases-10x-higher-reported
  const statusText2 = `Over the next year this translates to ${yearlyCasesText} cases and an estimated ${estimatedYearlyInfectionsText} infections (${percentOfPopulationText} of the population).`;

  return `${statusText1} ${statusText2}`;
}

export const statusText: React.FunctionComponent<{
  projection: Projection;
}> = ({ projection }) => {
  const {
    locationName,
    currentCaseDensity,
    currentDailyDeaths,
    totalPopulation,
  } = projection;
  if (
    currentCaseDensity === null ||
    currentDailyDeaths === null ||
    totalPopulation === null
  ) {
    return (
      <React.Fragment>
        {`Not enough case data is available to generate ${METRIC_NAME.toLowerCase()}.`}
      </React.Fragment>
    );
  }
  const dailyCases = formatDecimal(currentCaseDensity, 1);
  const level = getLevel(Metric.CASE_DENSITY, currentCaseDensity);

  const levelFactor = {
    [Level.LOW]: 1,
    [Level.MEDIUM]: 10,
    [Level.HIGH]: 20,
    [Level.CRITICAL]: 100,
    [Level.UNKNOWN]: 0,
  };

  const casesPerYear = currentCaseDensity * 356 * levelFactor[level];
  const casesPerYearText = formatInteger(casesPerYear);
  const estimatedCasesPerYear = casesPerYear * 5;
  const estimatedCasesPerYearText = formatInteger(estimatedCasesPerYear);
  const percentOfPopulation = Math.min(
    1,
    estimatedCasesPerYear / totalPopulation,
  );
  const percentOfPopulationText = formatPercent(percentOfPopulation, 1);

  return (
    <React.Fragment>
      {`Over the last week, ${locationName} has averaged ${dailyCases} new
        confirmed cases per day for every 100,000 residents. Over the next 
        year this translates to ${casesPerYearText} cases and an`}{' '}
      {/* <ExternalLink href="https://www.globalhealthnow.org/2020-06/us-cases-10x-higher-reported">
          estimated
        </ExternalLink>{' '} */}
      {`${estimatedCasesPerYearText} infections (${percentOfPopulationText} of the population).`}
    </React.Fragment>
  );
};
