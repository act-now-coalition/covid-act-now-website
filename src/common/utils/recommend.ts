import moment from 'moment';
import { sum, isNumber } from 'lodash';
import { Projection, Column } from 'common/models/Projection';
import {
  Metric,
  getLevel,
  getMetricNameForCompare,
  formatValue,
} from 'common/metric';
import { Level } from 'common/level';

export enum FedLevel {
  RED,
  YELLOW,
  GREEN,
}

export enum HarvardLevel {
  RED,
  ORANGE,
  YELLOW,
  GREEN,
}

enum Source {
  FED,
  HARVARD,
}

// Note: We need to change this interface to match the CMS data structure (or import it
// from the CMS content directory). It's here just as a placeholder.
export interface Recommendation {
  id: string;
  category: string;
  copy: string;
  source: Source;
  level: FedLevel | HarvardLevel;
}

/**
 * TODO: Add the more nuanced levels for the Fed recommendations
 */
export function getRecommendations(
  projection: Projection,
  recommendations: Recommendation[],
): Recommendation[] {
  const fedLevel = getFedLevel(projection);
  const harvardLevel = getHarvardLevel(projection);

  const fedRecommendations = recommendations
    .filter(item => item.source === Source.FED)
    .filter(item => item.level === fedLevel);

  const harvardRecommendations = recommendations
    .filter(item => item.source === Source.HARVARD)
    .filter(item => item.level === harvardLevel);

  return [...fedRecommendations, ...harvardRecommendations];
}

/**
 * The Fed Task Force recommendations are based on the total number of new cases in a week
 * per 100k population and the positive tests rate.
 *
 * https://www.nytimes.com/interactive/2020/07/28/us/states-report-virus-response-july-26.html
 */
export function getFedLevel(projection: Projection): FedLevel {
  const weeklyCasesPer100k = getWeeklyNewCasesPer100k(projection);
  const positiveTestRate = projection.currentTestPositiveRate;

  if (
    weeklyCasesPer100k === FedLevel.RED &&
    positiveTestRate === FedLevel.RED
  ) {
    return FedLevel.RED;
  } else if (
    weeklyCasesPer100k === FedLevel.YELLOW ||
    positiveTestRate === FedLevel.YELLOW
  ) {
    return FedLevel.YELLOW;
  } else {
    return FedLevel.GREEN;
  }
}

/**
 * Harvard GLobal Health Institute uses daily new cases per 100k population to determine
 * recommendations for schools and online learning.
 *
 * https://globalepidemics.org/wp-content/uploads/2020/07/pandemic_resilient_schools_briefing_72020.pdf
 */
export function getHarvardLevel(projection: Projection): HarvardLevel {
  const { currentCaseDensity } = projection;
  const newCasesLevel = getLevel(Metric.CASE_DENSITY, currentCaseDensity);

  switch (newCasesLevel) {
    case Level.CRITICAL:
      return HarvardLevel.RED;
    case Level.HIGH:
      return HarvardLevel.ORANGE;
    case Level.MEDIUM:
      return HarvardLevel.YELLOW;
    case Level.LOW:
      return HarvardLevel.GREEN;
    default:
      return HarvardLevel.RED;
  }
}

/**
 * The Fed Task Force document bases the risk levels on the total number of new
 * cases in a week per 100,000 population.
 */
function getWeeklyNewCasesPer100k(projection: Projection): number | undefined {
  const { totalPopulation } = projection;
  const dateTo = moment().startOf('day').toDate();
  const dateFrom = moment(dateTo).subtract(1, 'week').toDate();

  const dailyNewCases = projection
    .getDataset('rawDailyCases')
    .filter(point => isBetweenDates(point, dateFrom, dateTo));

  const weeklyNewCasesPer100k =
    sum(dailyNewCases) / (totalPopulation / 100_000);

  return weeklyNewCasesPer100k;
}

function isBetweenDates(point: Column, dateFrom: Date, dateTo: Date) {
  const date = new Date(point.x);
  return dateFrom <= date && date < dateTo;
}

// TODOS(Chelsi):
// 1. get source names from CMS
// 2. split up + extract non-dynamic peice of blurb (with source names) to style differently
export function getIntroBlurb(
  locationName: string,
  metricValues: { [metric in Metric]: number | null },
): string {
  const hasPosTestRate = isNumber(metricValues[Metric.POSITIVE_TESTS]);

  const blurb = `These recommendations match the guidelines set by White House Coronavirus Task Force and Harvard Global Health Institute according to ${locationName}'s ${getMetricNameForCompare(
    Metric.CASE_DENSITY,
  ).toLowerCase()} (${formatValue(
    Metric.CASE_DENSITY,
    metricValues[Metric.CASE_DENSITY],
    '',
  )}) ${
    hasPosTestRate
      ? `and ${getMetricNameForCompare(
          Metric.POSITIVE_TESTS,
        ).toLowerCase()} (${formatValue(
          Metric.POSITIVE_TESTS,
          metricValues[Metric.POSITIVE_TESTS],
          '',
        )}).`
      : ''
  }`;

  return blurb;
}
