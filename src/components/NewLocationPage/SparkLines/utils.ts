import { fetchProjectionsRegion } from 'common/utils/model';
import { Region } from 'common/regions';
import { Column, DatasetId } from 'common/models/Projection';
import { SeriesType } from 'components/Explore/interfaces';
import { cleanSeries } from 'components/Explore/utils';
import { max as d3Max } from 'd3-array';
import { assert } from 'common/utils';

export const daysToChart = 30;

interface ProjectionLike {
  getDataset(datasetId: DatasetId): Column[];
  fips: string;
}

export interface Point {
  x: Date;
  y: number;
}

export enum SparkLineMetric {
  CASES,
  HOSPITALIZATIONS,
  DEATHS,
}

export const orderedSparkLineMetrics = [
  SparkLineMetric.CASES,
  SparkLineMetric.DEATHS,
  SparkLineMetric.HOSPITALIZATIONS,
];

export interface Series {
  datasetId: DatasetId;
  type: SeriesType; // only keep if i want to pass in the array of series, rather than each individually
}

export interface SeriesWithData extends Series {
  data: any[]; // fix this any
}

interface MetricDescription {
  title: string;
  seriesList: Series[];
}

export const sparkLinesMetricData: {
  [metric in SparkLineMetric]: MetricDescription;
} = {
  [SparkLineMetric.CASES]: {
    title: 'Cases',
    seriesList: [
      {
        datasetId: 'rawDailyCases',
        type: SeriesType.BAR,
      },
      {
        datasetId: 'smoothedDailyCases',
        type: SeriesType.LINE,
      },
    ],
  },
  [SparkLineMetric.DEATHS]: {
    title: 'Deaths',
    seriesList: [
      {
        datasetId: 'rawDailyDeaths',
        type: SeriesType.BAR,
      },
      {
        datasetId: 'smoothedDailyDeaths',
        type: SeriesType.LINE,
      },
    ],
  },
  [SparkLineMetric.HOSPITALIZATIONS]: {
    title: 'Hospitalizations',
    seriesList: [
      {
        datasetId: 'rawHospitalizations',
        type: SeriesType.BAR,
      },
      {
        datasetId: 'smoothedHospitalizations',
        type: SeriesType.LINE,
      },
    ],
  },
};

export async function getProjectionForRegion(
  region: Region,
): Promise<ProjectionLike> {
  const projections = await fetchProjectionsRegion(region);
  return projections.primary;
}

/**
 * Returns both the raw and smoothed series for the given metric.
 * Raw series used by bar chart, smoothed series used by line chart.
 */
export function getAllSeriesForMetric(
  metric: SparkLineMetric,
  projection: ProjectionLike,
): SeriesWithData[] {
  const metricDefinition = sparkLinesMetricData[metric];
  return metricDefinition.seriesList.map((item: Series) => ({
    ...item,
    data: cleanSeries(projection.getDataset(item.datasetId)),
  }));
}

export function getSparkLineSeries(metric: SparkLineMetric, region: Region) {
  return getProjectionForRegion(region).then(projection =>
    getAllSeriesForMetric(metric, projection),
  );
}

function getMaxY(series: Point[]) {
  return d3Max(series, (d: Point) => d.y);
}

export function getOverallMaxY(seriesA: Point[], seriesB: Point[]) {
  const maxA = getMaxY(seriesA);
  const maxB = getMaxY(seriesB);
  assert(maxA, 'Maximum value unexpectedly not found'); // theres probably a better way
  assert(maxB, 'Maximum value unexpectedly not found');
  return Math.max(maxA, maxB);
}
