import moment from 'moment';
import urlJoin from 'url-join';
import {
  deburr,
  dropRightWhile,
  dropWhile,
  flatten,
  isNumber,
  max,
  range,
  words,
  partition,
} from 'lodash';
import { schemeCategory10 } from 'd3-scale-chromatic';
import { fetchProjections } from 'common/utils/model';
import { Column, Projection, DatasetId } from 'common/models/Projection';
import {
  findLocationForFips,
  getLocationNames as getAllLocations,
  getLocationNameForFips,
  getLocationUrlForFips,
  isStateFips,
  findStateByFips,
  Location,
} from 'common/locations';
import { share_image_url } from 'assets/data/share_images_url.json';
import { SeriesType, Series } from './interfaces';
import {
  isState,
  isCounty,
  belongsToState,
} from 'components/AutocompleteLocations';

export function getMaxBy<T>(
  seriesList: Series[],
  getValue: (d: Column) => T,
  defaultValue: T,
): T {
  const maxValue = max(seriesList.map(({ data }) => max(data.map(getValue))));
  return maxValue || defaultValue;
}

export function getTimeAxisTicks(from: Date, to: Date) {
  const dateFrom = moment(from).startOf('month').toDate();
  const numMonths = moment(to).diff(dateFrom, 'months');
  return range(1, numMonths + 1).map(i =>
    moment(dateFrom).add(i, 'month').toDate(),
  );
}

export enum ExploreMetric {
  CASES,
  DEATHS,
  HOSPITALIZATIONS,
  ICU_HOSPITALIZATIONS,
}

export const EXPLORE_METRICS = [
  ExploreMetric.CASES,
  ExploreMetric.DEATHS,
  ExploreMetric.HOSPITALIZATIONS,
  ExploreMetric.ICU_HOSPITALIZATIONS,
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
  }
}

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
}

export const exploreMetricData: {
  [metric in ExploreMetric]: ExploreMetricDescription;
} = {
  [ExploreMetric.CASES]: {
    title: 'Cases',
    name: 'Cases',
    chartId: 'cases',
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
    title: 'ICU Hospitalizations',
    name: 'Current COVID ICU Hospitalizations',
    chartId: 'icu-hospitalizations',
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
};

export const EXPLORE_CHART_IDS = Object.values(exploreMetricData).map(
  metric => metric.chartId,
);

const missingValue = (point: Column) => !isNumber(point.y);

/**
 * Remove points without y values at the begining and end of the series.
 *
 * TODO(pablo): Ideally, we would like to remove segments that are missing
 * values in the middle of the series too, but that will require changing
 * the implementation of the charts to handle segments instead of a continuous
 * series.
 */
function cleanSeries(data: Column[]) {
  return dropWhile(dropRightWhile(data, missingValue), missingValue);
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
function getAveragedSeriesForMetric(
  metric: ExploreMetric,
  projection: Projection,
  color: string,
  normalizeData: boolean,
): Series {
  const { fips, totalPopulation } = projection;
  const datasetId = getDatasetIdByMetric(metric);
  const location = findLocationForFips(fips);
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
    tooltipLabel: normalizeData
      ? `${metricName} per 100k population`
      : metricName,
  };
}

export function getTitle(metric: ExploreMetric) {
  return exploreMetricData[metric].title;
}

export function getMetricName(metric: ExploreMetric) {
  return exploreMetricData[metric].name;
}

export function getChartIdByMetric(metric: ExploreMetric) {
  return exploreMetricData[metric].chartId;
}

export function getMetricLabels() {
  return EXPLORE_METRICS.map(getTitle);
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

export function getImageFilename(fips: string, metric: ExploreMetric) {
  const locationName = getLocationNameForFips(fips) || '';
  const chartId = getChartIdByMetric(metric);
  const downloadDate = moment().format('YYYY-MM-DD');
  return `${sanitizeLocationName(locationName)}-${chartId}-${downloadDate}.png`;
}

function getRelativeUrl(fips: string) {
  if (isStateFips(fips)) {
    const { state_code } = findStateByFips(fips);
    return `states/${state_code.toLowerCase()}`;
  } else {
    return `counties/${fips}`;
  }
}

/**
 * Generates the URL of the export images for the given fips code and chart.
 * It needs to be consistent with the path on the share image generation
 * script in `scripts/generate_share_images/index.ts`
 */
export function getExportImageUrl(fips: string, metric: ExploreMetric) {
  const chartId = getChartIdByMetric(metric);
  const relativeUrl = getRelativeUrl(fips);
  return urlJoin(share_image_url, relativeUrl, `explore/${chartId}/export.png`);
}

export function getChartUrl(fips: string, metric: ExploreMetric) {
  const chartId = getChartIdByMetric(metric);
  const locationUrl = getLocationUrlForFips(fips);
  const isState = isStateFips(fips);
  return isState
    ? `${locationUrl}explore/${chartId}`
    : `${locationUrl}/explore/${chartId}`;
}

export function getSocialQuote(fips: string, metric: ExploreMetric) {
  const locationName = getLocationNameForFips(fips);
  switch (metric) {
    case ExploreMetric.CASES:
      return `${locationName}’s daily cases, according to @CovidActNow. See the chart: `;
    case ExploreMetric.DEATHS:
      return `${locationName}’s daily deaths, according to @CovidActNow. See the chart: `;
    case ExploreMetric.HOSPITALIZATIONS:
      return `${locationName}’s hospitalizations, according to @CovidActNow. See the chart: `;
    case ExploreMetric.ICU_HOSPITALIZATIONS:
      return `${locationName}’s ICU hospitalizations, according to @CovidActNow. See the chart: `;
  }
  return '';
}

const pluralize = (num: number, singular: string, plural: string) =>
  num === 1 ? singular : plural;

const pluralizeWeeks = (num: number) => pluralize(num, 'week', 'weeks');
const pluralizeDays = (num: number) => pluralize(num, 'day', 'days');

/**
 * Returns the relative time between two dates in days and weeks, for example:
 * today, 1 day ago, 5 days ago, 3 weeks and 2 days ago, 5 weeks ago, etc.
 */
export function weeksAgo(dateFrom: Date, dateTo: Date) {
  const totalDays = moment(dateTo).diff(dateFrom, 'days');
  const totalWeeks = Math.floor(totalDays / 7);
  const numDays = totalDays % 7;

  if (totalDays < 7) {
    return totalDays === 0
      ? 'today'
      : `${totalDays} ${pluralizeDays(totalDays)} ago`;
  } else {
    const weeksAgo = `${totalWeeks} ${pluralizeWeeks(totalWeeks)}`;
    const daysAgo = numDays > 0 ? `, ${numDays} ${pluralizeDays(numDays)}` : '';
    return `${weeksAgo} ${daysAgo} ago`;
  }
}

export function getLocationLabel(location: Location) {
  return location.county
    ? `${location.county}, ${location.state_code}`
    : location.state;
}

export function getLocationNames(locations: Location[]) {
  if (locations.length === 1) {
    return getLocationLabel(locations[0]);
  }

  const lastLocation = locations[locations.length - 1];
  const otherLocations = locations.slice(0, locations.length - 1);

  return `${otherLocations
    .map(getLocationLabel)
    .join(', ')} and ${getLocationLabel(lastLocation)}.`;
}

/**
 * Returns a list of locations for the autocomplete component. We try to show
 * the most relevant options first. For a state, we show states, counties in
 * the state and then other counties. For a county, we show counties in the
 * state, then states and then other counties.
 */
export function getAutocompleteLocations(locationFips: string) {
  const allLocations = getAllLocations();
  const currentLocation = findLocationForFips(locationFips);
  const [states, allCounties] = partition(allLocations, isState);
  const [stateCounties, otherCounties] = partition(allCounties, county =>
    belongsToState(county, currentLocation.state_fips_code),
  );

  return isStateFips(locationFips)
    ? [...states, ...stateCounties, ...otherCounties]
    : [...stateCounties, ...states, ...otherCounties];
}

/**
 * An array of 10 colors designed for categorical data. See
 * https://github.com/d3/d3-scale-chromatic for additional options
 */
const SERIES_COLORS = schemeCategory10;

const getCountyForLocation = (location: Location) =>
  isCounty(location) ? location : undefined;

export function getChartSeries(
  metric: ExploreMetric,
  locations: Location[],
  normalizeData: boolean,
): Promise<Series[]> {
  if (locations.length === 1) {
    return fetchProjections(
      locations[0].state_code,
      getCountyForLocation(locations[0]),
    ).then(projections => getAllSeriesForMetric(metric, projections.primary));
  } else {
    return Promise.all(
      locations.map(async (location, i) => {
        const { state_code } = location;
        const county = getCountyForLocation(location);
        const projections = await fetchProjections(state_code, county);
        return getAveragedSeriesForMetric(
          metric,
          projections.primary,
          SERIES_COLORS[i % SERIES_COLORS.length],
          normalizeData,
        );
      }),
    ).then(flatten);
  }
}
