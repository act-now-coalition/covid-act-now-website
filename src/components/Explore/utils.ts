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
import { color } from 'd3-color';
import { schemeCategory10 } from 'd3-scale-chromatic';
import { fetchProjections } from 'common/utils/model';
import { Column, DatasetId } from 'common/models/Projection';
import {
  findLocationForFips,
  getLocationNames as getAllLocations,
  getLocationNameForFips,
  isStateFips,
  Location,
  isState,
  isCounty,
  belongsToState,
  getRelativeUrlForFips,
  AGGREGATED_LOCATIONS,
} from 'common/locations';
import { share_image_url } from 'assets/data/share_images_url.json';
import { SeriesType, Series } from './interfaces';
import { getAbbreviatedCounty } from '../../common/utils/compare';
import AggregationsJSON from 'assets/data/aggregations.json';

/** Common interface to represent real Projection objects as well as aggregated projections . */
interface ProjectionLike {
  getDataset(datasetId: DatasetId): Column[];
  fips: string;
  totalPopulation: number;
}

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

export const METHODOLOGY_URL =
  'https://docs.google.com/document/d/1cd_cEpNiIl1TzUJBvw9sHLbrbUZ2qCxgN32IqVLa3Do/edit';

export const DATA_SOURCES_URL =
  'https://docs.google.com/presentation/d/1XmKCBWYZr9VQKFAdWh_D7pkpGGM_oR9cPjj-UrNdMJQ/edit';

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
  projection: ProjectionLike,
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
function getAveragedSeriesForMetric(
  metric: ExploreMetric,
  projection: ProjectionLike,
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
    shortLabel: getShortLocationLabel(location),
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

function getLocationFileName(location: Location) {
  const fipsCode = location.full_fips_code || location.state_fips_code;
  if (fipsCode in AGGREGATED_LOCATIONS) {
    // TODO(michael): Fix any.
    return sanitizeLocationName((AGGREGATED_LOCATIONS as any)[fipsCode].state);
  }
  return sanitizeLocationName(getLocationNameForFips(fipsCode));
}

export function getImageFilename(locations: Location[], metric: ExploreMetric) {
  const downloadDate = moment().format('YYYY-MM-DD');
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
 * It needs to be consistent with the path on the share image generation
 * script in `scripts/generate_share_images/index.ts`
 */
export function getExportImageUrl(sharedComponentId: string) {
  return urlJoin(share_image_url, `share/${sharedComponentId}/export.png`);
}

export function getChartUrl(sharedComponentId: string, locationFips?: string) {
  const redirectTo = urlJoin(
    locationFips ? getRelativeUrlForFips(locationFips) : '/',
    'explore',
    sharedComponentId,
  );
  const url = urlJoin(window.location.origin, 'share', sharedComponentId);
  // NOTE: Trailing '/' is significant so we hit the index.html page with correct meta tags and
  // so we don't get redirected and lose the query params.
  return `${url}/?redirectTo=${encodeURIComponent(redirectTo)}`;
}

export function getSocialQuote(locations: Location[], metric: ExploreMetric) {
  const locationName = getLocationNames(locations, /*limit=*/ 5);
  switch (metric) {
    case ExploreMetric.CASES:
      return `Daily cases in ${locationName}, according to @CovidActNow. See the chart: `;
    case ExploreMetric.DEATHS:
      return `Daily deaths in ${locationName}, according to @CovidActNow. See the chart: `;
    case ExploreMetric.HOSPITALIZATIONS:
      return `Hospitalizations in ${locationName}, according to @CovidActNow. See the chart: `;
    case ExploreMetric.ICU_HOSPITALIZATIONS:
      return `ICU hospitalizations in ${locationName}, according to @CovidActNow. See the chart: `;
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
  const { county: countyName, state_code, state: stateName } = location;
  const stateCode = state_code.toUpperCase();
  return countyName
    ? `${getAbbreviatedCounty(countyName)} ${stateCode}`
    : stateName;
}

function truncateCountyName(countyName: string) {
  return countyName.length <= 11
    ? countyName
    : `${countyName.slice(0, 11).trim()}…`;
}

function getShortLocationLabel(location: Location) {
  const { county: countyName, state_code } = location;
  return countyName
    ? `${truncateCountyName(getAbbreviatedCounty(countyName))}`
    : state_code.toUpperCase();
}

export function getLocationNames(
  locations: Location[],
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

export function getSubtitle(
  metricName: string,
  normalizeData: boolean,
  locations: Location[],
) {
  const textPer100k = normalizeData ? 'per 100k population' : '';
  return locations.length === 0
    ? 'Select states or counties to explore trends'
    : `${metricName} ${textPer100k} in ${getLocationNames(locations)}`;
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

  // TODO(michael): Where should aggregations go in the list?
  return isStateFips(locationFips)
    ? [...AGGREGATED_LOCATIONS, ...states, ...stateCounties, ...otherCounties]
    : [...AGGREGATED_LOCATIONS, ...stateCounties, ...states, ...otherCounties];
}

/**
 * An array of 10 colors designed for categorical data. See
 * https://github.com/d3/d3-scale-chromatic for additional options
 */
const SERIES_COLORS = schemeCategory10;

const getCountyForLocation = (location: Location) =>
  isCounty(location) ? location : undefined;

class AggregatedProjection implements ProjectionLike {
  totalPopulation: number;

  // TODO(michael): Fix any.
  constructor(readonly fips: string, private aggregation: any) {
    this.totalPopulation = aggregation.totalPopulation;
  }

  getDataset(datasetId: DatasetId): Column[] {
    let data: Column[] = [];
    for (let i = 0; i < this.aggregation.dates.length; i++) {
      data.push({
        x: this.aggregation.dates[i],
        y: this.aggregation[datasetId][i],
      });
    }
    return data;
  }
}

async function getProjectionForLocation(
  location: Location,
): Promise<ProjectionLike> {
  const fullFips = location.full_fips_code;
  if (fullFips && fullFips in AggregationsJSON) {
    // This is a special aggregate location.
    // TODO(michael): Fix any.
    console.log('returning aggregated data.');
    return new AggregatedProjection(
      fullFips,
      (AggregationsJSON as any)[fullFips],
    );
  } else {
    const projections = await fetchProjections(
      location.state_code,
      getCountyForLocation(location),
    );
    return projections.primary;
  }
}

export function getChartSeries(
  metric: ExploreMetric,
  locations: Location[],
  normalizeData: boolean,
): Promise<Series[]> {
  if (locations.length === 1) {
    return getProjectionForLocation(locations[0]).then(projection =>
      getAllSeriesForMetric(metric, projection),
    );
  } else {
    return Promise.all(
      locations.map(async (location, i) => {
        const projection = await getProjectionForLocation(location);
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
