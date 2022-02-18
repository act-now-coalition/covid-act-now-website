import sum from 'lodash/sum';
import isNumber from 'lodash/isNumber';
import partition from 'lodash/partition';
import { Projection, Column } from 'common/models/Projection';
import { getMetricNameForCompare, formatValue } from 'common/metric';
import { Metric } from 'common/metricEnum';
import { Level } from 'common/level';
import {
  FedLevel,
  Recommendation,
  RecommendationSource,
  RecommendCategory,
  RecommendID,
} from 'cms-content/recommendations';
import { EventAction, EventCategory, trackEvent } from 'components/Analytics';
import { formatDecimal } from '.';
import {
  getStateName,
  showExposureNotifications,
} from 'components/LocationPage/Notifications';
import { getAbbreviatedCounty, Region } from 'common/regions';
import { TimeUnit, getStartOf, subtractTime } from 'common/utils/time-utils';

export function trackRecommendationsEvent(action: EventAction, label: string) {
  trackEvent(EventCategory.RECOMMENDATIONS, action, label);
}

const casesPerWeekMetricName = 'new cases per 100k in the last 7 days';

function getExposureRecommendation(
  region: Region | null,
): Recommendation | null {
  if (!region) {
    return null;
  }

  const recommendationCopy = `**Notifications**: Add your phone to [${getStateName(
    region,
  )}'s
  exposure notification system](https://g.co/ens) to receive alerts when you have been
  in close contact with someone who later tests positive for COVID.`;

  const exposureRecommendation: Recommendation = {
    body: recommendationCopy,
    source: RecommendationSource.NONE,
    level: FedLevel.GREEN,
    category: RecommendCategory.EXPOSURE_APP,
    id: RecommendID.EXPOSURE_APP,
    icon: {
      iconImage: '/images_cms/exposure_recommends_icon.svg',
      altText: 'Notification icon',
    },
  };

  return showExposureNotifications(region) ? exposureRecommendation : null;
}

export function getRecommendations(
  region: Region | null,
  recommendations: Recommendation[],
): any[] {
  // Partitioning to control order:

  const [travelRecommendation, recommendationsWithoutTravel] = partition(
    recommendations,
    item => item.category === RecommendCategory.TRAVEL,
  );

  const [schoolRecommendation, recommendationsWithoutSchool] = partition(
    recommendationsWithoutTravel,
    item => item.category === RecommendCategory.SCHOOLS,
  );

  const [
    gatheringsRecommendation,
    recommendationsWithoutGatherings,
  ] = partition(
    recommendationsWithoutSchool,
    item => item.category === RecommendCategory.GATHERINGS,
  );

  const [masksRecommendation, recommendationsWithoutMasks] = partition(
    recommendationsWithoutGatherings,
    item => item.category === RecommendCategory.MASKS,
  );

  const [
    vaccinationRecommendation,
    recommendationsWithoutVaccination,
  ] = partition(
    recommendationsWithoutMasks,
    item => item.category === RecommendCategory.VACCINATION,
  );

  const [boosterRecommendation, recommendationsWithoutBooster] = partition(
    recommendationsWithoutVaccination,
    item => item.category === RecommendCategory.BOOSTER,
  );

  const [testingRecommendation, otherRecommendations] = partition(
    recommendationsWithoutBooster,
    item => item.category === RecommendCategory.TESTING,
  );

  const notificationRecommendation = getExposureRecommendation(region);
  const exposureRecommendations = notificationRecommendation
    ? [notificationRecommendation]
    : [];

  const allRecommendations = [
    ...masksRecommendation,
    ...gatheringsRecommendation,
    ...exposureRecommendations,
    ...schoolRecommendation,
    ...travelRecommendation,
    ...vaccinationRecommendation,
    ...boosterRecommendation,
    ...testingRecommendation,
    ...otherRecommendations,
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

  // This needs updating (still mentions WH):
  const unknownShareQuote = `These are the COVID guidelines set by the CDC:`;

  if (alarmLevel === Level.UNKNOWN) {
    return unknownShareQuote;
  }
  return `According to @CovidActNow, ${locationNameWithAbbreviation} ${summaryByLevel[alarmLevel]}. These are the COVID guidelines set by the CDC:`;
}
