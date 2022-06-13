import sum from 'lodash/sum';
import isNumber from 'lodash/isNumber';
import partition from 'lodash/partition';
import { Projection, Column } from 'common/models/Projection';
import { getMetricNameForCompare, formatValue } from 'common/metric';
import { Metric } from 'common/metricEnum';
import { Level } from 'common/level';
import { Recommendation, RecommendCategory } from 'cms-content/recommendations';
import { EventAction, EventCategory, trackEvent } from 'components/Analytics';
import { formatDecimal } from '.';
import { getAbbreviatedCounty, Region } from 'common/regions';
import {
  TimeUnit,
  getStartOf,
  subtractTime,
} from '@actnowcoalition/time-utils';

export function trackRecommendationsEvent(action: EventAction, label: string) {
  trackEvent(EventCategory.RECOMMENDATIONS, action, label);
}

const casesPerWeekMetricName = 'new cases per 100k in the last 7 days';

export function getRecommendations(
  region: Region | null,
  recommendations: Recommendation[],
): any[] {
  const recommendationCategoryOrdering = [
    RecommendCategory.MASKS,
    RecommendCategory.TESTING,
    RecommendCategory.VACCINATION,
    RecommendCategory.BOOSTER,
  ];

  let remainingRecommendations = recommendations;
  let orderedRecommendations: Recommendation[] = [];

  // Partitioning to control order.
  for (const category of recommendationCategoryOrdering) {
    const [inCategory, notInCategory] = partition(
      remainingRecommendations,
      item => item.category === category,
    );
    orderedRecommendations = orderedRecommendations.concat(inCategory);
    remainingRecommendations = notInCategory;
  }

  const allRecommendations = [
    ...orderedRecommendations,
    ...remainingRecommendations,
  ];

  return allRecommendations;
}

/**
 * The Fed Task Force document bases the risk levels on the total number of new
 * cases in a week per 100,000 population.
 */
function getWeeklyNewCasesPer100k(projection: Projection): number | null {
  const { totalPopulation } = projection;
  const dateTo = getStartOf(new Date(), TimeUnit.DAYS);
  const dateFrom = subtractTime(dateTo, 1, TimeUnit.WEEKS);

  const getY = (point: Column) => point.y;

  const dailyNewCases = projection
    .getDataset('rawDailyCases')
    .filter(point => isNumber(getY(point)))
    .filter(point => isBetweenDates(point, dateFrom, dateTo));

  const weeklyNewCasesPer100k =
    sum(dailyNewCases.map(getY)) / (totalPopulation / 100_000);

  return isNumber(weeklyNewCasesPer100k) ? weeklyNewCasesPer100k : null;
}

function isBetweenDates(point: Column, dateFrom: Date, dateTo: Date) {
  const date = new Date(point.x);
  return dateFrom <= date && date < dateTo;
}

/*
 * Generates location+metric-specific section of intro blurb
 */
export function getDynamicIntroCopy(
  projection: Projection,
  locationName: string,
  metricValues: { [metric in Metric]: number | null },
): string {
  const hasPosTestRate = isNumber(metricValues[Metric.POSITIVE_TESTS]);

  const numCasesPerWeek = getWeeklyNewCasesPer100k(projection);
  const numCasesPerWeekText = formatDecimal(numCasesPerWeek || 0, 1);

  const blurb = `Based on ${locationName}'s ${casesPerWeekMetricName} (${numCasesPerWeekText})${
    hasPosTestRate
      ? ` and ${getMetricNameForCompare(
          Metric.POSITIVE_TESTS,
        ).toLowerCase()} (${formatValue(
          Metric.POSITIVE_TESTS,
          metricValues[Metric.POSITIVE_TESTS],
          '',
        )})`
      : ''
  }, people in ${locationName} are advised to adhere to the following recommendations.`;

  return blurb;
}

/*
  Keeping recommends share quote copy seperate
  from text in location_summary.ts
*/
export const summaryByLevel = {
  [Level.LOW]: 'is at low risk',
  [Level.MEDIUM]: 'is at medium risk',
  [Level.HIGH]: 'is at high risk',
  [Level.CRITICAL]: 'is at very high risk',
  [Level.SUPER_CRITICAL]: 'is at extremely high risk',
};

export function getShareQuote(locationName: string, alarmLevel: Level): string {
  const locationNameWithAbbreviation = getAbbreviatedCounty(locationName);
  // We also use Level.UNKNOWN when giving recommendations for the whole US
  const unknownShareQuote = `These are the COVID guidelines set by the CDC:`;

  if (alarmLevel === Level.UNKNOWN) {
    return unknownShareQuote;
  }
  return `According to @CovidActNow, ${locationNameWithAbbreviation} ${summaryByLevel[alarmLevel]}. These are the COVID guidelines set by the CDC:`;
}
