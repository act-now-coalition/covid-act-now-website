import { max as d3Max } from 'd3-array';
import { cleanSeries } from 'components/Explore/utils';
import { ExploreMetric } from 'components/Explore';
import { Column, DatasetId, Projection } from 'common/models/Projection';
import { fetchProjectionsRegion } from 'common/utils/model';
import { Region } from 'common/regions';

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

// Used to select explore tab when clicking corresponding metric's spark line:
export const SparkLineToExploreMetric: {
  [metric in SparkLineMetric]: ExploreMetric;
} = {
  [SparkLineMetric.WEEKLY_CASES_PER_100K]: ExploreMetric.WEEKLY_CASES,
  [SparkLineMetric.ADMISSIONS_PER_100K]: ExploreMetric.ADMISSIONS_PER_100K,
  [SparkLineMetric.RATIO_BEDS_WITH_COVID]: ExploreMetric.RATIO_BEDS_WITH_COVID,
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
