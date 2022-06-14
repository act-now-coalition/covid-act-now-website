import { max as d3Max } from 'd3-array';
import { cleanSeries } from 'components/Explore/utils';
import { Column, DatasetId, Projection } from 'common/models/Projection';
import { fetchProjectionsRegion } from 'common/utils/model';
import { Region } from 'common/regions';
import { subtractTime, TimeUnit } from '@actnowcoalition/time-utils';
import { Metric } from 'common/metricEnum';

export const daysToChart = 30;

/**
 * data.x is a date, but the Column interface defines x as a number.
 * dateItem allows us to add a type for x that works for both.
 */
export type dateItem = number | Date;

export enum SparkLineMetric {
  WEEKLY_CASES_PER_100K,
  ADMISSIONS_PER_100K,
  RATIO_BEDS_WITH_COVID,
}

export const SPARK_LINE_METRICS = [
  SparkLineMetric.WEEKLY_CASES_PER_100K,
  SparkLineMetric.ADMISSIONS_PER_100K,
  SparkLineMetric.RATIO_BEDS_WITH_COVID,
];

// Used to select chart tab when clicking corresponding metric's spark line:
export const SparkLineToMetric: {
  [metric in SparkLineMetric]: Metric;
} = {
  [SparkLineMetric.WEEKLY_CASES_PER_100K]: Metric.WEEKLY_CASES_PER_100K,
  [SparkLineMetric.ADMISSIONS_PER_100K]: Metric.ADMISSIONS_PER_100K,
  [SparkLineMetric.RATIO_BEDS_WITH_COVID]: Metric.RATIO_BEDS_WITH_COVID,
};

// TODO (chelsi) - fix need for all metrics as keys
export const MetricToSparkLine: {
  [metric in Metric]: SparkLineMetric;
} = {
  [Metric.WEEKLY_CASES_PER_100K]: SparkLineMetric.WEEKLY_CASES_PER_100K,
  [Metric.ADMISSIONS_PER_100K]: SparkLineMetric.ADMISSIONS_PER_100K,
  [Metric.RATIO_BEDS_WITH_COVID]: SparkLineMetric.RATIO_BEDS_WITH_COVID,
  // Not used, just included for the sake of typescript:
  [Metric.CASE_DENSITY]: SparkLineMetric.RATIO_BEDS_WITH_COVID,
  [Metric.CASE_GROWTH_RATE]: SparkLineMetric.RATIO_BEDS_WITH_COVID,
  [Metric.HOSPITAL_USAGE]: SparkLineMetric.RATIO_BEDS_WITH_COVID,
  [Metric.POSITIVE_TESTS]: SparkLineMetric.RATIO_BEDS_WITH_COVID,
  [Metric.VACCINATIONS]: SparkLineMetric.RATIO_BEDS_WITH_COVID,
};

export interface Series {
  datasetId: DatasetId;
}

export interface SeriesWithData extends Series {
  data: Column[];
}

interface MetricDescription {
  title: string;
  seriesList: Series[];
}

export const sparkLinesMetricData: {
  [metric in SparkLineMetric]: MetricDescription;
} = {
  [SparkLineMetric.WEEKLY_CASES_PER_100K]: {
    title: 'Cases',
    seriesList: [
      {
        datasetId: 'weeklyNewCasesPer100k',
      },
      {
        datasetId: 'weeklyNewCasesPer100k',
      },
    ],
  },
  [SparkLineMetric.ADMISSIONS_PER_100K]: {
    title: 'Admissions',
    seriesList: [
      {
        datasetId: 'weeklyCovidAdmissionsPer100k',
      },
      {
        datasetId: 'weeklyCovidAdmissionsPer100k',
      },
    ],
  },
  [SparkLineMetric.RATIO_BEDS_WITH_COVID]: {
    title: 'COVID Patients',
    seriesList: [
      {
        datasetId: 'bedsWithCovidPatientsRatio',
      },
      {
        datasetId: 'bedsWithCovidPatientsRatio',
      },
    ],
  },
};

/**
 * Returns both the raw and smoothed series for the given metric.
 * Raw series used by bar chart, smoothed series used by line chart.
 */

export function getSparkLineSeriesFromProjection(
  seriesList: Series[],
  projection: Projection,
): SeriesWithData[] {
  return seriesList.map((item: Series) => ({
    ...item,
    data: cleanSeries(projection.getDataset(item.datasetId)),
  }));
}

export function getMaxY(series: Column[]) {
  const maxY = d3Max(series, (d: Column) => d.y);
  return maxY;
}

// Gets most recent 30 days of data
export function getDataFromSeries(series: SeriesWithData, dateFrom: dateItem) {
  const { data } = series;
  const dataByDateFrom = data.filter((point: Column) => point.x >= dateFrom);
  return dataByDateFrom;
}

// For SparkLineBlock.stories.tsx
export async function getProjectionForRegion(
  region: Region,
): Promise<Projection> {
  const projections = await fetchProjectionsRegion(region);
  return projections.primary;
}

// (Chelsi) - fix anys
export interface SparkLineProps {
  rawData: Column[];
  smoothedData: Column[];
  dateFrom: dateItem;
  dateTo: dateItem;
}

export function getSparkLineProps(
  metric: SparkLineMetric,
  projection: Projection,
): SparkLineProps | null {
  const dateTo = new Date();
  const dateFrom = subtractTime(dateTo, daysToChart, TimeUnit.DAYS);

  const { seriesList } = sparkLinesMetricData[metric];

  const metricSeries = getSparkLineSeriesFromProjection(seriesList, projection);
  const rawData = getDataFromSeries(metricSeries[0], dateFrom);
  const smoothedData = getDataFromSeries(metricSeries[1], dateFrom);

  if (!rawData.length || !smoothedData.length) {
    return null;
  }

  return {
    rawData,
    smoothedData,
    dateFrom,
    dateTo,
  };
}
