import moment from 'moment';
import {
  max as _max,
  range as _range,
  deburr as _deburr,
  words as _words,
  isNumber,
  dropRightWhile,
} from 'lodash';
import { Series } from './interfaces';
import { Column } from 'common/models/Projection';
import { Projection, DatasetId } from 'common/models/Projection';
import { ChartType } from './interfaces';
import { share_image_url } from 'assets/data/share_images_url.json';
import {
  getLocationNameForFips,
  getLocationUrlForFips,
  isStateFips,
} from 'common/locations';

export function getMaxBy<T>(
  series: Series[],
  getValue: (d: Column) => T,
  defaultValue: T,
): T {
  const maxValue = _max(series.map(({ data }) => _max(data.map(getValue))));
  return maxValue || defaultValue;
}

export function getTimeAxisTicks(from: Date, to: Date) {
  const dateFrom = moment(from).startOf('month').toDate();
  const numMonths = moment(to).diff(dateFrom, 'months');
  return _range(1, numMonths + 1).map(i =>
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

interface SerieDescription {
  label: string;
  tooltipLabel: string;
  datasetId: DatasetId;
  type: ChartType;
}

interface ExploreMetricDescription {
  title: string;
  chartId: string;
  series: SerieDescription[];
}

export const exploreMetricData: {
  [metric in ExploreMetric]: ExploreMetricDescription;
} = {
  [ExploreMetric.CASES]: {
    title: 'Cases',
    chartId: 'cases',
    series: [
      {
        label: 'Cases',
        tooltipLabel: 'Confirmed cases',
        datasetId: 'rawDailyCases',
        type: ChartType.BAR,
      },
      {
        label: '7 Day Average',
        tooltipLabel: 'Confirmed cases',
        datasetId: 'smoothedDailyCases',
        type: ChartType.LINE,
      },
    ],
  },
  [ExploreMetric.DEATHS]: {
    title: 'Deaths',
    chartId: 'deaths',
    series: [
      {
        label: 'Deaths',
        tooltipLabel: 'Deaths',
        datasetId: 'rawDailyDeaths',
        type: ChartType.BAR,
      },
      {
        label: '7 Day Average',
        tooltipLabel: 'Deaths',
        datasetId: 'smoothedDailyDeaths',
        type: ChartType.LINE,
      },
    ],
  },
  [ExploreMetric.HOSPITALIZATIONS]: {
    title: 'Hospitalizations',
    chartId: 'hospitalizations',
    series: [
      {
        label: 'Hospitalizations',
        tooltipLabel: 'Hospitalizations',
        datasetId: 'rawHospitalizations',
        type: ChartType.BAR,
      },
      {
        label: '7 Day Average',
        tooltipLabel: 'Hospitalizations',
        datasetId: 'smoothedHospitalizations',
        type: ChartType.LINE,
      },
    ],
  },
  [ExploreMetric.ICU_HOSPITALIZATIONS]: {
    title: 'ICU Hospitalizations',
    chartId: 'icu-hospitalizations',
    series: [
      {
        label: 'ICU Hospitalizations',
        tooltipLabel: 'ICU Hospitalizations',
        datasetId: 'rawICUHospitalizations',
        type: ChartType.BAR,
      },
      {
        label: '7 Day Average',
        tooltipLabel: 'ICU Hospitalizations',
        datasetId: 'smoothedICUHospitalizations',
        type: ChartType.LINE,
      },
    ],
  },
};

export const EXPLORE_CHART_IDS = Object.values(exploreMetricData).map(
  metric => metric.chartId,
);

const hasValue = (point: Column) => isNumber(point.y);

function cleanSeries(data: Column[]) {
  return dropRightWhile(data, point => !hasValue(point));
}

export function getSeries(
  metric: ExploreMetric,
  projection: Projection,
): Series[] {
  const metricDefinition = exploreMetricData[metric];
  return metricDefinition.series.map(item => ({
    data: cleanSeries(projection.getDataset(item.datasetId)),
    type: item.type,
    label: item.label,
    tooltipLabel: item.tooltipLabel,
  }));
}

export function getTitle(metric: ExploreMetric) {
  return exploreMetricData[metric].title;
}

export function getChartIdByMetric(metric: ExploreMetric) {
  return exploreMetricData[metric].chartId;
}

export function getMetricLabels() {
  return EXPLORE_METRICS.map(metric => exploreMetricData[metric].title);
}

export function findPointByDate(data: Column[], date: Date): Column | null {
  const idx = data.findIndex(
    p => new Date(p.x).toDateString() === date.toDateString(),
  );
  return idx >= 0 ? data[idx] : null;
}

function sanitizeLocationName(name: string) {
  return _words(_deburr(name)).join('-').toLowerCase();
}

export function getImageFilename(fips: string, metric: ExploreMetric) {
  const locationName = getLocationNameForFips(fips) || '';
  const chartId = getChartIdByMetric(metric);
  const downloadDate = moment().format('YYYY-MM-DD');
  return `${sanitizeLocationName(locationName)}-${chartId}-${downloadDate}.png`;
}

export function getExportImageUrl(fips: string, metric: ExploreMetric) {
  const chartId = getChartIdByMetric(metric);
  return `${share_image_url}explore/${chartId}/export.png`;
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
