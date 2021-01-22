import moment from 'moment';
import { sum, isNumber, reject, isNull, partition } from 'lodash';
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
  RecommendCategory,
  RecommendID,
} from 'cms-content/recommendations';
import { allIcons } from 'cms-content/recommendations';
import { EventAction, EventCategory, trackEvent } from 'components/Analytics';
import { getAbbreviatedCounty } from 'common/utils/compare';
import { formatDecimal } from '.';
import {
  getStateName,
  showExposureNotifications,
} from 'components/LocationPage/Notifications';
import regions from 'common/regions';

export function trackRecommendationsEvent(action: EventAction, label: string) {
  trackEvent(EventCategory.RECOMMENDATIONS, action, label);
}

const casesPerWeekMetricName = 'new cases per 100k in the last 7 days';

/**
 * TODO: Add the more nuanced levels for the Fed recommendations
 */

const YELLOW_RECOMMENDATION_EXCEPTIONS = ['GYMS_YELLOW', 'BARS_YELLOW'];

function getExposureRecommendation(
  projection: Projection,
): Recommendation | null {
  const region = regions.findByFipsCode(projection.fips);
  if (!region) {
    return null;
  }

  const recommendationCopy = `**Notifications**: Add your phone to [${getStateName(
    region,
  )}'s 
  exposure notification system](https://g.co/ens) to receive alerts when you have been 
  in close contact with someone who later tests positive for COVID. 
  Your privacy is protected as your identity is not known and your location 
  is not tracked. `;

  const exposureRecommendation: Recommendation = {
    body: recommendationCopy,
    source: RecommendationSource.NONE,
    level: FedLevel.GREEN,
    category: RecommendCategory.EXPOSURE_APP,
    id: RecommendID.EXPOSURE_APP,
  };

  return showExposureNotifications(region) ? exposureRecommendation : null;
}

//TODO (Chelsi): fix the any
export function getRecommendations(
  projection: Projection,
  recommendations: Recommendation[],
): any[] {
  const fedLevel = getFedLevel(projection);
  const harvardLevel = getHarvardLevel(projection);
  const positiveTestRate = getPositiveTestRate(projection);

  const harvardRecommendations = recommendations
    .filter(item => item.source === RecommendationSource.HARVARD)
    .filter(item => item.level === harvardLevel);

  let fedRecommendations = recommendations
    .filter(item => item.source === RecommendationSource.FED)
    .filter(item => {
      // If the fedLevel is null, we return recommendations for the Green levels
      return isNull(fedLevel)
        ? item.level === FedLevel.GREEN
        : item.level === fedLevel;
    });

  const travelRecommendation = recommendations.filter(
    item => item.category === RecommendCategory.TRAVEL,
  );

  /**
   * Some Fed recommendations in the Yellow level only apply when the positive
   * test rate is over 3% - we filter those out when that's the case.
   */
  const isLowYellowLevel =
    isNumber(fedLevel) &&
    fedLevel === FedLevel.YELLOW &&
    isNumber(positiveTestRate) &&
    positiveTestRate < 3 / 100;

  // Limit gyms to 25% occupancy and close bars until percent positive rates are under 3%
  if (isLowYellowLevel) {
    fedRecommendations = reject(fedRecommendations, item =>
      YELLOW_RECOMMENDATION_EXCEPTIONS.includes(item.id),
    );
  }

  // Orders based on relevance:
  const [gatheringRecommendation, otherFedRecommentations] = partition(
    fedRecommendations,
    item => item.category === RecommendCategory.GATHERINGS,
  );
  const [masksRecommendation, finalOtherFedRecommendations] = partition(
    otherFedRecommentations,
    item => item.category === RecommendCategory.MASKS,
  );

  const notificatonRecommendation = getExposureRecommendation(projection);
  const exposureRecommendations = notificatonRecommendation
    ? [notificatonRecommendation]
    : [];

  const allRecommendations = [
    ...exposureRecommendations,
    ...travelRecommendation,
    ...gatheringRecommendation,
    ...masksRecommendation,
    ...finalOtherFedRecommendations,
    ...harvardRecommendations,
  ];

  return allRecommendations.map(getIcon);
}

/**
 * The Fed Task Force recommendations are based on the total number of new cases in a week
 * per 100k population and the positive tests rate.
 *
 * https://www.nytimes.com/interactive/2020/07/28/us/states-report-virus-response-july-26.html
 */
export function getFedLevel(projection: Projection): FedLevel | null {
  const weeklyCasesPer100k = getWeeklyNewCasesPer100k(projection);
  const positiveTestRate = getPositiveTestRate(projection);

  if (!isNumber(weeklyCasesPer100k) || !isNumber(positiveTestRate)) {
    return null;
  }

  const redPosTest = positiveTestRate > 0.1;
  const redCases = weeklyCasesPer100k > 100;
  const yellowPosTest = 0.05 < positiveTestRate && positiveTestRate <= 0.1;
  const yellowCases = 10 < weeklyCasesPer100k && weeklyCasesPer100k <= 100;

  if (redPosTest && redCases) {
    return FedLevel.RED;
  } else if ((redPosTest || redCases) && (yellowPosTest || yellowCases)) {
    return FedLevel.YELLOW;
  } else if (yellowPosTest && yellowCases) {
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
    case Level.SUPER_CRITICAL:
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

export function getModalCopyWithFedLevel(
  projection: Projection,
  locationName: string,
  metricValues: { [metric in Metric]: number | null },
): string {
  const hasPositiveTest = isNumber(getPositiveTestRate(projection));
  const numCasesPerWeek = getWeeklyNewCasesPer100k(projection);
  const numCasesperWeekText = formatDecimal(numCasesPerWeek || 0, 1);
  const positiveTestRate = formatValue(
    Metric.POSITIVE_TESTS,
    metricValues[Metric.POSITIVE_TESTS],
    '',
  );
  const positiveTestRateMetricName = getMetricNameForCompare(
    Metric.POSITIVE_TESTS,
  ).toLowerCase();

  const fedLevel = getFedLevel(projection)?.toLowerCase();

  if (!hasPositiveTest) {
    return '';
  } else {
    return `${locationName} is in its ${fedLevel} zone with ${numCasesperWeekText} ${casesPerWeekMetricName}
      and ${positiveTestRate} ${positiveTestRateMetricName}.`;
  }
}

export function getModalCopyWithHarvardLevel(
  projection: Projection,
  locationName: string,
  metricValues: { [metric in Metric]: number | null },
): string {
  const harvardLevel = getHarvardLevel(projection).toLowerCase();
  const hasPositiveTest = isNumber(getPositiveTestRate(projection));

  const dailyNewCasesPer100k = formatValue(
    Metric.CASE_DENSITY,
    metricValues[Metric.CASE_DENSITY],
    '',
  );
  const newCasesMetricName = getMetricNameForCompare(
    Metric.CASE_DENSITY,
  ).toLowerCase();
  const positiveTestRate = formatValue(
    Metric.POSITIVE_TESTS,
    metricValues[Metric.POSITIVE_TESTS],
    '',
  );
  const positiveTestRateMetricName = getMetricNameForCompare(
    Metric.POSITIVE_TESTS,
  ).toLowerCase();

  return `${locationName} is in its ${harvardLevel} zone with ${dailyNewCasesPer100k} ${newCasesMetricName}${
    hasPositiveTest
      ? ` and ${positiveTestRate} ${positiveTestRateMetricName}`
      : ''
  }.`;
}

/**
 * The Fed Task Force document bases the risk levels on the total number of new
 * cases in a week per 100,000 population.
 */
function getWeeklyNewCasesPer100k(projection: Projection): number | null {
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

  return isNumber(weeklyNewCasesPer100k) ? weeklyNewCasesPer100k : null;
}

function getPositiveTestRate(projection: Projection) {
  return projection.currentTestPositiveRate;
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

function getIcon(
  recommendation: Recommendation,
  i: number,
): RecommendationWithIcon {
  const correspondingIcon = allIcons.filter(
    (icon: RecommendIcon) => icon.category === recommendation.category,
  );
  return {
    recommendationInfo: recommendation,
    iconInfo: correspondingIcon[0],
    index: i,
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
  [Level.SUPER_CRITICAL]: 'is experiencing a severe outbreak',
};

export function getShareQuote(locationName: string, alarmLevel: Level): string {
  const locationNameWithAbbreviation = getAbbreviatedCounty(locationName);

  const unknownShareQuote = `These are White House Coronavirus Task Force’s and Harvard Global Health Institute’s official COVID recommendations for ${locationNameWithAbbreviation}:`;

  if (alarmLevel === Level.UNKNOWN) {
    return unknownShareQuote;
  }
  return `According to @CovidActNow, ${locationNameWithAbbreviation} ${summaryByLevel[alarmLevel]}. These are White House Coronavirus Task Force’s and Harvard Global Health Institute’s official recommendations:`;
}
