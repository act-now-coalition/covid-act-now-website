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
import {
  FedLevel,
  HarvardLevel,
  Recommendation,
  RecommendationSource,
  RecommendIcon,
  RecommendationWithIcon,
} from 'cms-content/recommendations';
import { allIcons } from 'cms-content/recommendations';
import { EventAction, EventCategory, trackEvent } from 'components/Analytics';
import { getAbbreviatedCounty } from 'common/utils/compare';

export function trackRecommendationsEvent(action: EventAction, label: string) {
  trackEvent(EventCategory.RECOMMENDATIONS, action, label);
}

/**
 * TODO: Add the more nuanced levels for the Fed recommendations
 */

//TODO (Chelsi): fix the any
export function getRecommendations(
  projection: Projection,
  recommendations: Recommendation[],
): any[] {
  const fedLevel = getFedLevel(projection);
  const harvardLevel = getHarvardLevel(projection);

  const fedRecommendations = recommendations
    .filter(item => item.source === RecommendationSource.FED)
    .filter(item => item.level === fedLevel)
    .map(getIcon);

  const harvardRecommendations = recommendations
    .filter(item => item.source === RecommendationSource.HARVARD)
    .filter(item => item.level === harvardLevel)
    .map(getIcon);

  // TODO (Pablo): Handle more granular recommendations that depend
  // on specific values for positive test rates.

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
  const positiveTestRate = getPositiveTestRate(projection);

  if (weeklyCasesPer100k > 100 && positiveTestRate > 0.1) {
    return FedLevel.RED;
  } else if (
    (10 < weeklyCasesPer100k && weeklyCasesPer100k < 100) ||
    (0.05 <= positiveTestRate && positiveTestRate <= 0.1)
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
function getWeeklyNewCasesPer100k(projection: Projection): number {
  const { totalPopulation } = projection;
  const dateTo = moment().startOf('day').toDate();
  const dateFrom = moment(dateTo).subtract(1, 'week').toDate();

  const getY = (point: Column) => point.y;

  const dailyNewCases = projection
    .getDataset('rawDailyCases')
    .filter(point => isNumber(getY(point)))
    .filter(point => isBetweenDates(point, dateFrom, dateTo));

  const weeklyNewCasesPer100k =
    sum(dailyNewCases.map(getY)) / (totalPopulation / 100_000);

  return isNumber(weeklyNewCasesPer100k) ? weeklyNewCasesPer100k : 0;
}

function getPositiveTestRate(projection: Projection): number {
  const positiveTestRate = projection.currentTestPositiveRate;
  return isNumber(positiveTestRate) ? positiveTestRate : 0;
}

function isBetweenDates(point: Column, dateFrom: Date, dateTo: Date) {
  const date = new Date(point.x);
  return dateFrom <= date && date < dateTo;
}

/*
 * Generates location+metric-specific section of intro blurb
 */
export function getDynamicIntroCopy(
  locationName: string,
  metricValues: { [metric in Metric]: number | null },
): string {
  const hasPosTestRate = isNumber(metricValues[Metric.POSITIVE_TESTS]);

  const blurb = `according to ${locationName}'s ${getMetricNameForCompare(
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

function getIcon(recommendation: Recommendation): RecommendationWithIcon {
  const correspondingIcon = allIcons.filter(
    (icon: RecommendIcon) => icon.category === recommendation.category,
  );
  return {
    recommendationInfo: recommendation,
    iconInfo: correspondingIcon[0],
  };
}

/*
  Keeping recommends share quote copy seperate
  from text in location_summary.ts
*/
export const summaryByLevel = {
  [Level.LOW]: 'is on track to contain COVID',
  [Level.MEDIUM]: 'is spreading in a slow and controlled fashion',
  [Level.HIGH]: 'is at risk of an outbreak',
  [Level.CRITICAL]:
    'is either actively experiencing an outbreak or is at extreme risk',
  [Level.UNKNOWN]: '', // ** What do we want here? **
};

export function getShareQuote(locationName: string, alarmLevel: Level): string {
  return `According to @CovidActNow, ${getAbbreviatedCounty(locationName)} ${
    summaryByLevel[alarmLevel]
  }. These are White House Coronavirus Task Force’s and Harvard Global Health Institute’s official recommendations:`;
}
