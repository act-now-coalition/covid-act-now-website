import urlJoin from 'url-join';
import deburr from 'lodash/deburr';
import flatten from 'lodash/flatten';
import isNumber from 'lodash/isNumber';
import words from 'lodash/words';
import max from 'lodash/max';
import { color } from 'd3-color';
import { schemeCategory10 } from 'd3-scale-chromatic';
import { fetchProjectionsRegion } from 'common/utils/model';
import { Column, DatasetId, Projection } from 'common/models/Projection';
import { share_image_url } from 'assets/data/share_images_url.json';
import { SeriesType, Series, ExploreMetric, DataMeasure } from './interfaces';
import regions, {
  County,
  MetroArea,
  Region,
  RegionType,
  State,
  getAutocompleteRegions,
  USA,
} from 'common/regions';
import { fail } from '@actnowcoalition/assert';
import { pluralize, formatPercent, formatDecimal } from 'common/utils';
import {
  TimeUnit,
  DateFormat,
  formatDateTime,
  getTimeDiff,
  subtractTime,
} from '@actnowcoalition/time-utils';

export enum Period {
  DAYS_60,
  DAYS_180,
  ALL,
}

const EXPLORE_PERIODS = [Period.DAYS_60, Period.DAYS_180, Period.ALL];

interface PeriodDefinition {
  increment: number;
  label: string;
  xTicktimeUnit: TimeUnit;
}

export const periodMap: {
  [period in Period]: PeriodDefinition;
} = {
  [Period.DAYS_60]: {
    increment: 60,
    label: '60',
    xTicktimeUnit: TimeUnit.WEEKS,
  },
  [Period.DAYS_180]: {
    increment: 180,
    label: '180',
    xTicktimeUnit: TimeUnit.MONTHS,
  },
  [Period.ALL]: {
    increment: -1,
    label: 'All time',
    xTicktimeUnit: TimeUnit.MONTHS,
  },
};

export function getPeriodLabel(period: Period) {
  return periodMap[period].label;
}

export function getXTickTimeUnitForPeriod(period: Period) {
  return periodMap[period].xTicktimeUnit;
}

export function getAllPeriodLabels() {
  return EXPLORE_PERIODS.map(getPeriodLabel);
}

export function getDateRange(period: Period): Date[] {
  const dateTo = new Date();
  const dateFrom =
    period === Period.ALL
      ? new Date('2020-03-01')
      : subtractTime(dateTo, periodMap[period].increment, TimeUnit.DAYS);
  return [dateFrom, dateTo];
}

// We try to keep these alphabetized by metric name to make the trends metric list easier to navigate for users.
export const EXPLORE_METRICS = [
  ExploreMetric.ADMISSIONS_PER_100K,
  ExploreMetric.CASES,
  ExploreMetric.WEEKLY_CASES,
  ExploreMetric.DEATHS,
  ExploreMetric.WEEKLY_DEATHS,
  ExploreMetric.HOSPITALIZATIONS,
  ExploreMetric.ICU_USED,
  ExploreMetric.ICU_HOSPITALIZATIONS,
  ExploreMetric.RATIO_BEDS_WITH_COVID,
  ExploreMetric.POSITIVITY_RATE,
  ExploreMetric.VACCINATIONS_FIRST_DOSE,
  ExploreMetric.VACCINATIONS_COMPLETED,
  ExploreMetric.VACCINATIONS_ADDITIONAL_DOSE,
  ExploreMetric.VACCINATIONS_BIVALENT_FALL_2022,
];

// Note that these specifically are counts, not percentages, and can normalized
// to per 100K when multiple locations are displayed, in which case we manipulate
// the labels to indicate the 'per 100K'.
// Therefore, don't add a 'percentage' type metric to this without updating
// that code accordingly.
export const ORIGINAL_EXPLORE_METRICS = [
  ExploreMetric.CASES,
  ExploreMetric.DEATHS,
  ExploreMetric.HOSPITALIZATIONS,
  ExploreMetric.ICU_HOSPITALIZATIONS,
  ExploreMetric.WEEKLY_CASES,
  ExploreMetric.WEEKLY_DEATHS,
];

export function getMetricByChartId(chartId: string): ExploreMetric | undefined {
  switch (chartId) {
    case 'cases':
      return ExploreMetric.CASES;
    case 'deaths':
      return ExploreMetric.DEATHS;
    case 'hospitalizations':
      return ExploreMetric.HOSPITALIZATIONS;
    case 'icu-hospitalizations':
      return ExploreMetric.ICU_HOSPITALIZATIONS;
    case 'vaccinationsInitiated':
      return ExploreMetric.VACCINATIONS_FIRST_DOSE;
    case 'vaccinationsCompleted':
      return ExploreMetric.VACCINATIONS_COMPLETED;
    case 'vaccinationsAdditionalDose':
      return ExploreMetric.VACCINATIONS_ADDITIONAL_DOSE;
    case 'icuUtilization':
      return ExploreMetric.ICU_USED;
    case 'testPositiveRate':
      return ExploreMetric.POSITIVITY_RATE;
    case 'weeklyCovidAdmissionsPer100k':
      return ExploreMetric.ADMISSIONS_PER_100K;
    case 'bedsWithCovidPatientsRatio':
      return ExploreMetric.RATIO_BEDS_WITH_COVID;
    case 'weeklyNewCasesPer100k':
      return ExploreMetric.WEEKLY_CASES;
    case 'caseDensityByCases':
      return ExploreMetric.DAILY_CASES_PER_100K;
    case 'vaccinations':
      return ExploreMetric.VACCINATIONS_BIVALENT_FALL_2022;
  }
}

function getDatasetIdByMetric(metric: ExploreMetric): DatasetId {
  switch (metric) {
    case ExploreMetric.CASES:
      return 'smoothedDailyCases';
    case ExploreMetric.DEATHS:
      return 'smoothedDailyDeaths';
    case ExploreMetric.HOSPITALIZATIONS:
      return 'smoothedHospitalizations';
    case ExploreMetric.ICU_HOSPITALIZATIONS:
      return 'smoothedICUHospitalizations';
    case ExploreMetric.VACCINATIONS_FIRST_DOSE:
      return 'vaccinationsInitiated';
    case ExploreMetric.VACCINATIONS_COMPLETED:
      return 'vaccinationsCompleted';
    case ExploreMetric.VACCINATIONS_ADDITIONAL_DOSE:
      return 'vaccinationsAdditionalDose';
    case ExploreMetric.ICU_USED:
      return 'icuUtilization';
    case ExploreMetric.POSITIVITY_RATE:
      return 'testPositiveRate';
    case ExploreMetric.ADMISSIONS_PER_100K:
      return 'weeklyCovidAdmissionsPer100k';
    case ExploreMetric.RATIO_BEDS_WITH_COVID:
      return 'bedsWithCovidPatientsRatio';
    case ExploreMetric.WEEKLY_CASES:
      return 'weeklyCases';
    case ExploreMetric.WEEKLY_DEATHS:
      return 'weeklyDeaths';
    case ExploreMetric.DAILY_CASES_PER_100K:
      return 'caseDensityByCases';
    case ExploreMetric.VACCINATIONS_BIVALENT_FALL_2022:
      return 'vaccinations';
  }
}

export const formatDecimalAxis = (num: number, places = 2): string => {
  if (num === null) {
    return '-';
  }
  /**
   * If value is between 100k and 1m, display in abbreviated form.
   * Examples
   * - 100,000 => 100K
   * - 1,000,000 => 1M
   * - 1,100,000 => 1.1M
   */
  if (num >= 100_000) {
    //@ts-ignore
    return new Intl.NumberFormat('en', { notation: 'compact' }).format(num);
  } else {
    return num.toLocaleString(undefined, {
      minimumFractionDigits: places,
      maximumFractionDigits: places,
    });
  }
};

export const getYFormat = (dataMeasure: DataMeasure, places: number) => {
  const yFormat = (value: number) =>
    dataMeasure === DataMeasure.PERCENT
      ? formatPercent(value, places)
      : formatDecimalAxis(value, places);
  return yFormat;
};

interface SerieDescription {
  label: string;
  tooltipLabel: string;
  datasetId: DatasetId;
  type: SeriesType;
}

interface ExploreMetricDescription {
  title: string;
  name: string;
  chartId: string;
  seriesList: SerieDescription[];
  dataMeasure: DataMeasure;
  yAxisDecimalPlaces: number;
  maxY?: number;
}

export const exploreMetricData: {
  [metric in ExploreMetric]: ExploreMetricDescription;
} = {
  [ExploreMetric.CASES]: {
    title: 'Cases',
    name: 'Cases',
    chartId: 'cases',
    dataMeasure: DataMeasure.INTEGER,
    yAxisDecimalPlaces: 0,
    seriesList: [
      {
        label: 'Cases',
        tooltipLabel: 'cases',
        datasetId: 'rawDailyCases',
        type: SeriesType.BAR,
      },
      {
        label: '7 Day Average',
        tooltipLabel: 'cases',
        datasetId: 'smoothedDailyCases',
        type: SeriesType.LINE,
      },
    ],
  },
  [ExploreMetric.DEATHS]: {
    title: 'Deaths',
    name: 'Deaths',
    chartId: 'deaths',
    dataMeasure: DataMeasure.INTEGER,
    yAxisDecimalPlaces: 1,
    seriesList: [
      {
        label: 'Deaths',
        tooltipLabel: 'Deaths',
        datasetId: 'rawDailyDeaths',
        type: SeriesType.BAR,
      },
      {
        label: '7 Day Average',
        tooltipLabel: 'Deaths',
        datasetId: 'smoothedDailyDeaths',
        type: SeriesType.LINE,
      },
    ],
  },
  [ExploreMetric.HOSPITALIZATIONS]: {
    title: 'Hospitalizations',
    name: 'Current COVID Hospitalizations',
    chartId: 'hospitalizations',
    dataMeasure: DataMeasure.INTEGER,
    yAxisDecimalPlaces: 0,
    seriesList: [
      {
        label: 'Current COVID Hospitalizations',
        tooltipLabel: 'COVID Hospitalizations',
        datasetId: 'rawHospitalizations',
        type: SeriesType.BAR,
      },
      {
        label: '7 Day Average',
        tooltipLabel: 'COVID Hospitalizations',
        datasetId: 'smoothedHospitalizations',
        type: SeriesType.LINE,
      },
    ],
  },
  [ExploreMetric.ICU_HOSPITALIZATIONS]: {
    title: 'ICU hospitalizations',
    name: 'Current COVID ICU Hospitalizations',
    chartId: 'icu-hospitalizations',
    dataMeasure: DataMeasure.INTEGER,
    yAxisDecimalPlaces: 1,
    seriesList: [
      {
        label: 'Current COVID ICU Hospitalizations',
        tooltipLabel: 'COVID ICU Hospitalizations',
        datasetId: 'rawICUHospitalizations',
        type: SeriesType.BAR,
      },
      {
        label: '7 Day Average',
        tooltipLabel: 'COVID ICU Hospitalizations',
        datasetId: 'smoothedICUHospitalizations',
        type: SeriesType.LINE,
      },
    ],
  },
  [ExploreMetric.VACCINATIONS_FIRST_DOSE]: {
    title: '% Vaccinated (1+ dose)',
    name: 'Percent vaccinated (1+ dose)',
    chartId: 'vaccinations_first_dose',
    dataMeasure: DataMeasure.PERCENT,
    yAxisDecimalPlaces: 0,
    maxY: 1,
    seriesList: [
      {
        label: 'Percent Vaccinated (1+ dose)',
        tooltipLabel: 'Percent Vaccinated (1+ dose)',
        datasetId: 'vaccinationsInitiated',
        type: SeriesType.LINE,
      },
    ],
  },
  [ExploreMetric.VACCINATIONS_ADDITIONAL_DOSE]: {
    title: '% Vaccinated (booster shot)',
    name: 'Percent vaccinated (booster shot)',
    chartId: 'vaccinations_additional_dose',
    dataMeasure: DataMeasure.PERCENT,
    yAxisDecimalPlaces: 0,
    maxY: 1,
    seriesList: [
      {
        label: 'Percent vaccinated (booster shot)',
        tooltipLabel: 'Percent vaccinated (booster shot)',
        datasetId: 'vaccinationsAdditionalDose',
        type: SeriesType.LINE,
      },
    ],
  },
  [ExploreMetric.VACCINATIONS_COMPLETED]: {
    title: '% Vaccinated (2+ doses or J&J)',
    name: 'Percent vaccinated (2+ doses or J&J)',
    chartId: 'vaccinations_completed',
    dataMeasure: DataMeasure.PERCENT,
    yAxisDecimalPlaces: 0,
    maxY: 1,
    seriesList: [
      {
        label: 'Percent Vaccinated (2+ doses or J&J)',
        tooltipLabel: 'Percent Vaccinated (2+ doses or J&J)',
        datasetId: 'vaccinationsCompleted',
        type: SeriesType.LINE,
      },
    ],
  },
  [ExploreMetric.VACCINATIONS_BIVALENT_FALL_2022]: {
    title: '% Vaccinated (bivalent booster shot)',
    name: 'Percent vaccinated (bivalent booster shot)',
    chartId: 'vaccinations_bivalent_dose_fall_2022',
    dataMeasure: DataMeasure.PERCENT,
    yAxisDecimalPlaces: 0,
    maxY: 1,
    seriesList: [
      {
        label: 'Percent vaccinated (bivalent booster shot)',
        tooltipLabel: 'Percent vaccinated (bivalent booster shot)',
        datasetId: 'vaccinations',
        type: SeriesType.LINE,
      },
    ],
  },
  [ExploreMetric.ICU_USED]: {
    title: 'ICU capacity used',
    name: 'ICU capacity used',
    chartId: 'icu_capacity_used',
    dataMeasure: DataMeasure.PERCENT,
    yAxisDecimalPlaces: 0,
    seriesList: [
      {
        label: 'ICU capacity used',
        tooltipLabel: 'ICU capacity used',
        datasetId: 'icuUtilization',
        type: SeriesType.LINE,
      },
    ],
  },
  [ExploreMetric.POSITIVITY_RATE]: {
    title: 'Positive test rate',
    name: 'Positive test rate',
    chartId: 'positivity_rate',
    dataMeasure: DataMeasure.PERCENT,
    yAxisDecimalPlaces: 1,
    seriesList: [
      {
        label: 'Positive test rate',
        tooltipLabel: 'Positive test rate',
        datasetId: 'testPositiveRate',
        type: SeriesType.LINE,
      },
    ],
  },

  [ExploreMetric.ADMISSIONS_PER_100K]: {
    title: 'Admissions',
    name: 'Weekly COVID admissions per 100k',
    chartId: 'admissions_per_100k', // TODO(8.2) (Chelsi) - what are these ids used for
    dataMeasure: DataMeasure.INTEGER,
    yAxisDecimalPlaces: 1,
    seriesList: [
      {
        label: 'Weekly COVID admissions per 100k',
        tooltipLabel: 'Weekly COVID admissions per 100k',
        datasetId: 'weeklyCovidAdmissionsPer100k',
        type: SeriesType.LINE,
      },
    ],
  },
  [ExploreMetric.RATIO_BEDS_WITH_COVID]: {
    title: 'Patients w/ COVID (% of all beds)',
    name: 'Patients w/ COVID (% of all beds)',
    chartId: 'ratio_beds_with_covid_patients', // TODO(8.2) (Chelsi) - what are these ids used for
    dataMeasure: DataMeasure.PERCENT,
    yAxisDecimalPlaces: 1,
    seriesList: [
      {
        label: 'Patients w/ COVID (% of all beds)',
        tooltipLabel: 'Patients w/ COVID (% of all beds)',
        datasetId: 'bedsWithCovidPatientsRatio',
        type: SeriesType.LINE,
      },
    ],
  },
  [ExploreMetric.WEEKLY_CASES]: {
    title: 'Cases',
    name: 'Weekly reported cases',
    chartId: 'weekly_new_cases', // TODO(8.2) (Chelsi) - what are these ids used for
    dataMeasure: DataMeasure.INTEGER,
    yAxisDecimalPlaces: 0,
    seriesList: [
      {
        label: 'Weekly reported cases',
        tooltipLabel: 'Weekly reported cases',
        datasetId: 'weeklyCases',
        type: SeriesType.LINE,
      },
    ],
  },
  [ExploreMetric.WEEKLY_DEATHS]: {
    title: 'Deaths',
    name: 'Weekly deaths',
    chartId: 'weekly_deaths',
    dataMeasure: DataMeasure.INTEGER,
    yAxisDecimalPlaces: 0,
    seriesList: [
      {
        label: 'Weekly deaths',
        tooltipLabel: 'Weekly deaths',
        datasetId: 'weeklyDeaths',
        type: SeriesType.LINE,
      },
    ],
  },
  [ExploreMetric.DAILY_CASES_PER_100K]: {
    title: 'Daily new cases per 100k',
    name: 'Daily new cases per 100k',
    chartId: 'daily_new_cases',
    dataMeasure: DataMeasure.INTEGER,
    yAxisDecimalPlaces: 0,
    seriesList: [
      {
        label: 'Daily new cases per 100k',
        tooltipLabel: 'Daily new cases per 100k',
        datasetId: 'caseDensityByCases',
        type: SeriesType.LINE,
      },
    ],
  },
};

export const EXPLORE_CHART_IDS = Object.values(exploreMetricData).map(
  metric => metric.chartId,
);

/**
 * Remove points without y values at the begining and end of the series.
 *
 * TODO(pablo): Ideally, we would like to remove segments that are missing
 * values in the middle of the series too, but that will require changing
 * the implementation of the charts to handle segments instead of a continuous
 * series.
 */
export function cleanSeries(data: Column[]) {
  return data.filter(point => isNumber(point.y));
}

/**
 * Returns both the raw and smoothed series for the given metric and
 * projection. It's used for the single-location Explore chart, which
 * represents the raw data with bars and smoothed data with a line.
 */
export function getAllSeriesForMetric(
  metric: ExploreMetric,
  projection: Projection,
): Series[] {
  const metricDefinition = exploreMetricData[metric];
  return metricDefinition.seriesList.map(item => ({
    data: cleanSeries(projection.getDataset(item.datasetId)),
    type: item.type,
    label: item.label,
    shortLabel: item.label,
    tooltipLabel: item.tooltipLabel,
  }));
}

function scalePer100k(data: Column[], population: number) {
  return data.map(({ x, y }) => ({ x, y: y / (population / 100000) }));
}

/**
 * Returns the smoothed series for a given metric and projection. It's
 * used for the multiple-locations Explore chart. It receives a color
 * so we can differentiate the lines in the chart
 */
export function getAveragedSeriesForMetric(
  metric: ExploreMetric,
  projection: Projection,
  color: string,
  normalizeData: boolean,
): Series {
  const { fips, totalPopulation } = projection;
  const datasetId = getDatasetIdByMetric(metric);
  const location = regions.findByFipsCode(fips)!;
  const data = cleanSeries(projection.getDataset(datasetId));
  const metricName = exploreMetricData[metric].seriesList[0].tooltipLabel;
  return {
    data: normalizeData ? scalePer100k(data, totalPopulation) : data,
    type: SeriesType.LINE,
    params: {
      stroke: color,
      fill: color,
    },
    label: getLocationLabel(location),
    shortLabel: getShortLocationLabel(location),
    tooltipLabel: normalizeData
      ? `${metricName} per 100k population`
      : metricName,
  };
}

export function getTitle(metric: ExploreMetric) {
  return exploreMetricData[metric].title;
}

export function getMetricDataMeasure(metric: ExploreMetric) {
  return exploreMetricData[metric].dataMeasure;
}

export function getYAxisDecimalPlaces(metric: ExploreMetric) {
  return exploreMetricData[metric].yAxisDecimalPlaces;
}

export function getMaxYFromDefinition(metric: ExploreMetric): number | null {
  const maxY = exploreMetricData[metric].maxY;
  return !maxY ? null : maxY;
}

export function getMetricName(metric: ExploreMetric) {
  return exploreMetricData[metric].name;
}

export function getChartIdByMetric(metric: ExploreMetric) {
  return exploreMetricData[metric].chartId;
}

function getLabelEnding(metric: ExploreMetric, multiLocation: boolean) {
  switch (metric) {
    case ExploreMetric.CASES:
      return multiLocation
        ? '(daily reported cases per 100k)'
        : '(daily reported cases)';
    case ExploreMetric.DEATHS:
      return multiLocation ? '(daily per 100k)' : '(daily)';
    case ExploreMetric.HOSPITALIZATIONS:
      return multiLocation ? '(w/ COVID per 100k)' : '(w/ COVID)';
    case ExploreMetric.ICU_HOSPITALIZATIONS:
      return multiLocation ? '(w/ COVID per 100k)' : '(w/ COVID)';
    case ExploreMetric.ADMISSIONS_PER_100K:
      return '(weekly COVID admissions per 100k)';
    case ExploreMetric.WEEKLY_DEATHS:
      return multiLocation ? '(weekly per 100k)' : '(weekly)';
    case ExploreMetric.WEEKLY_CASES:
      return multiLocation
        ? '(weekly reported cases per 100k)'
        : '(weekly reported cases)';
    default:
      return '';
  }
}

export function getMetricLabels(multiLocation: boolean): string[] {
  return EXPLORE_METRICS.map((metric: ExploreMetric) =>
    [getTitle(metric), getLabelEnding(metric, multiLocation)].join(' '),
  );
}

export function findPointByDate(data: Column[], date: Date): Column | null {
  const idx = data.findIndex(
    p => new Date(p.x).toDateString() === date.toDateString(),
  );
  return idx >= 0 ? data[idx] : null;
}

function sanitizeLocationName(name: string) {
  return words(deburr(name)).join('-').toLowerCase();
}

function getLocationFileName(region: Region) {
  return sanitizeLocationName(region.fullName);
}

export function getImageFilename(locations: Region[], metric: ExploreMetric) {
  const downloadDate = formatDateTime(new Date(), DateFormat.YYYY_MM_DD);
  const chartId = getChartIdByMetric(metric);
  const fileNameSuffix = `${chartId}-${downloadDate}`;

  switch (locations.length) {
    case 0:
      return `${fileNameSuffix}.png`;
    case 1:
    case 2:
      const locationNames = locations.map(getLocationFileName).join('-');
      return `${locationNames}-${fileNameSuffix}.png`;
    default:
      return `multiple-locations-${fileNameSuffix}.png`;
  }
}

/**
 * Generates the URL of the export images for the given fips code and chart.
 * It needs to be consistent with the share image routing in
 * src/screens/internal/ShareImage/ShareImage.tsx.
 */
export function getExportImageUrl(sharedComponentId: string) {
  return urlJoin(share_image_url, `share/${sharedComponentId}/export.png`);
}

export function getChartUrl(sharedComponentId: string, region: Region | null) {
  const redirectTo = urlJoin(
    region ? region.relativeUrl : '/',
    'explore',
    sharedComponentId,
  );
  const url = urlJoin(window.location.origin, 'share', sharedComponentId);
  // NOTE: Trailing '/' is significant so we hit the index.html page with correct meta tags and
  // so we don't get redirected and lose the query params.
  return `${url}/?redirectTo=${encodeURIComponent(redirectTo)}`;
}

export function getSocialQuote(regions: Region[], metric: ExploreMetric) {
  const locationName = getLocationNames(regions, /*limit=*/ 5);
  switch (metric) {
    case ExploreMetric.CASES:
      return `Daily cases in ${locationName}, according to @CovidActNow. See the chart: `;
    case ExploreMetric.DEATHS:
      return `Daily deaths in ${locationName}, according to @CovidActNow. See the chart: `;
    case ExploreMetric.HOSPITALIZATIONS:
      return `Hospitalizations in ${locationName}, according to @CovidActNow. See the chart: `;
    case ExploreMetric.ICU_HOSPITALIZATIONS:
      return `ICU hospitalizations in ${locationName}, according to @CovidActNow. See the chart: `;
    case ExploreMetric.VACCINATIONS_FIRST_DOSE:
      return `Percent vaccinated (1+ dose) in ${locationName}, according to @CovidActNow. See the chart: `;
    case ExploreMetric.VACCINATIONS_COMPLETED:
      return `Percent vaccinated (2+ doses or J&J) in ${locationName}, according to @CovidActNow. See the chart: `;
    case ExploreMetric.VACCINATIONS_ADDITIONAL_DOSE:
      return `Percent vaccinated (booster shot) in ${locationName}, according to @CovidActNow. See the chart: `;
    case ExploreMetric.ICU_USED:
      return `ICU capacity used in ${locationName}, according to @CovidActNow. See the chart: `;
    case ExploreMetric.POSITIVITY_RATE:
      return `Positive test rate in ${locationName}, according to @CovidActNow. See the chart: `;
  }
  return '';
}

const pluralizeWeeks = (num: number) => pluralize(num, 'week', 'weeks');
const pluralizeDays = (num: number) => pluralize(num, 'day', 'days');

/**
 * Returns the relative time between two dates in days and weeks, for example:
 * today, 1 day ago, 5 days ago, 3 weeks and 2 days ago, 5 weeks ago, etc.
 */
export function weeksAgo(dateFrom: Date, dateTo: Date) {
  const totalDays = Math.floor(getTimeDiff(dateTo, dateFrom, TimeUnit.DAYS));
  const totalWeeks = Math.floor(totalDays / 7);
  const numDaysWithinPastWeek = Math.floor(totalDays % 7);

  if (totalDays < 7) {
    return totalDays === 0
      ? 'today'
      : `${formatDecimal(totalDays, 0)} ${pluralizeDays(totalDays)} ago`;
  } else {
    const weeksAgo = `${formatDecimal(totalWeeks, 0)} ${pluralizeWeeks(
      totalWeeks,
    )}`;
    const daysAgo =
      numDaysWithinPastWeek > 0
        ? `, ${formatDecimal(numDaysWithinPastWeek, 0)} ${pluralizeDays(
            numDaysWithinPastWeek,
          )}`
        : '';
    return `${weeksAgo} ${daysAgo} ago`;
  }
}

export function getLocationLabel(location: Region) {
  if (location instanceof County) {
    return `${location.abbreviation} ${(location as County).stateCode}`;
  } else if (location instanceof State) {
    return location.fullName;
  } else if (location instanceof MetroArea) {
    return location.fullName;
  } else if (location instanceof USA) {
    return location.shortName;
  } else {
    fail('unsupported region');
  }
}

function truncateCountyName(countyName: string) {
  return countyName.length <= 11
    ? countyName
    : `${countyName.slice(0, 11).trim()}…`;
}

function getShortLocationLabel(location: Region) {
  return location.regionType === RegionType.COUNTY
    ? truncateCountyName(location.abbreviation)
    : location.abbreviation;
}

export function getLocationNames(
  locations: Region[],
  limit = Number.POSITIVE_INFINITY,
) {
  if (locations.length === 1) {
    return getLocationLabel(locations[0]);
  }
  const labels = locations.map(getLocationLabel);
  const truncate = labels.length > limit;
  const [firstLabels, lastLabel] = truncate
    ? [labels.slice(0, limit), 'more']
    : [labels.slice(0, labels.length - 1), labels[labels.length - 1]];

  return `${firstLabels.join(', ')} and ${lastLabel}`;
}

export function getExploreAutocompleteLocations(locationFips: string) {
  const currentLocation = regions.findByFipsCode(locationFips)!;
  const locations = getAutocompleteRegions(currentLocation);
  return [regions.usa, ...locations];
}

/**
 * An array of 10 colors designed for categorical data. See
 * https://github.com/d3/d3-scale-chromatic for additional options
 */
const SERIES_COLORS = schemeCategory10;

async function getProjectionForRegion(region: Region): Promise<Projection> {
  const projections = await fetchProjectionsRegion(region);
  return projections.primary;
}

export function getChartSeries(
  metric: ExploreMetric,
  regions: Region[],
  normalizeData: boolean,
): Promise<Series[]> {
  if (regions.length === 1) {
    return getProjectionForRegion(regions[0]).then(projection =>
      getAllSeriesForMetric(metric, projection),
    );
  } else {
    return Promise.all(
      regions.map(async (region, i) => {
        const projection = await getProjectionForRegion(region);
        return getAveragedSeriesForMetric(
          metric,
          projection,
          SERIES_COLORS[i % SERIES_COLORS.length],
          normalizeData,
        );
      }),
    ).then(flatten);
  }
}

export function getSeriesLabel(series: Series, isMobile: boolean) {
  return isMobile ? series.shortLabel : series.label;
}

/**
 * The resulting color depends on the original color and the `amount` number,
 * if the `amount` number is too high the resulting color will be white.
 * https://github.com/d3/d3-color#color_brighter
 */
export function brightenColor(colorCode: string, amount = 1): string {
  const colorObject = color(colorCode);
  return colorObject ? colorObject.brighter(amount).hex() : colorCode;
}

const getY = (d: Column) => d.y;

function isInDateRange(date: Date, dateFrom: Date, dateTo: Date) {
  return dateFrom <= date && date <= dateTo;
}

/* Gets overall maxY value to adjust y-axis when a new date range is selected from dropdown menu */
export function getMaxY(seriesList: Series[], dateFrom: Date, dateTo: Date) {
  const maxPerSeries = seriesList.map(series => {
    const dataInRange = series.data.filter(d =>
      isInDateRange(new Date(d.x), dateFrom, dateTo),
    );
    const seriesMax = max(dataInRange.map(getY)) || 1;
    return seriesMax;
  });

  const overallMaxY = max(maxPerSeries);

  return overallMaxY;
}
