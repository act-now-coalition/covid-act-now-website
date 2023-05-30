import find from 'lodash/find';
import findLast from 'lodash/findLast';
import findIndex from 'lodash/findIndex';
import filter from 'lodash/filter';
import minBy from 'lodash/minBy';
import maxBy from 'lodash/maxBy';
import { Metric } from 'common/metricEnum';
import { Projection, Column } from 'common/models/Projection';
import { Projections } from 'common/models/Projections';
import { fail, assert } from '@actnowcoalition/assert';
import { MetroArea } from 'common/regions';

export enum SortType {
  ALPHABETICAL,
  POPULATION,
  SERIES_DIFF,
  METRIC_DIFF,
}

/** A pair of left/right projections (e.g. from two different snapshots) */
export class ProjectionsPair {
  // Sentinel diff values that we use to push locations to the top of the list.
  static MISSING_METRIC_DIFF = 9999;
  static ADDED_METRIC_DIFF = 9998;
  static LOWEST_SENTINEL_DIFF = ProjectionsPair.ADDED_METRIC_DIFF;

  constructor(public left: Projections, public right: Projections) {}

  metricDiff(metric: Metric): number {
    const leftMetric = this.left.getMetricValue(metric);
    const rightMetric = this.right.getMetricValue(metric);
    return ProjectionsPair.metricValueDiff(leftMetric, rightMetric);
  }

  static metricValueDiff(
    leftMetric: number | null,
    rightMetric: number | null,
  ) {
    if (leftMetric === null) {
      return rightMetric === null ? 0 : this.ADDED_METRIC_DIFF;
    } else if (rightMetric === null) {
      return leftMetric === null ? 0 : this.MISSING_METRIC_DIFF;
    } else {
      return Math.abs(leftMetric - rightMetric);
    }
  }

  seriesDiff(metric: Metric): number {
    const leftDataset = getDataset(this.left.primary, metric);
    const rightDataset = getDataset(this.right.primary, metric);
    return rootMeanSquareDiff(leftDataset, rightDataset);
  }

  get locationURL(): string {
    return this.left.region.canonicalUrl;
  }

  get fips(): string {
    return this.left.fips;
  }

  get locationName(): string {
    const region = this.left.region;
    if (region instanceof MetroArea) {
      return `${region.fullName}, ${region.stateCodes}`;
    } else {
      return region.fullName;
    }
  }

  get population(): number {
    return this.left.population;
  }

  compare(other: ProjectionsPair, sortType: SortType, metric: Metric) {
    let compare = this.compareInner(other, sortType, metric);
    // Break ties by population.
    if (compare === 0) {
      compare = this.compareInner(other, SortType.POPULATION, metric);
    }
    return compare;
  }

  private compareInner(
    other: ProjectionsPair,
    sortType: SortType,
    metric: Metric,
  ) {
    switch (sortType) {
      case SortType.ALPHABETICAL:
        return this.locationName.localeCompare(other.locationName);

      // NOTE: The following all do (other - this) to intentionally sort in
      // reverse order (biggest to smallest).
      case SortType.POPULATION:
        return other.population - this.population;
      case SortType.SERIES_DIFF:
        return other.seriesDiff(metric) - this.seriesDiff(metric);
      case SortType.METRIC_DIFF:
        return other.metricDiff(metric) - this.metricDiff(metric);
      default:
        fail(`Unknown sortType: ${sortType}`);
    }
  }
}

// TODO(sean): This is useful for getting the corresponding timeseries for a metric.
// We should probably move this to a more central location.
export function getDataset(projection: Projection, metric: Metric): Column[] {
  switch (metric) {
    case Metric.CASE_DENSITY:
      return projection.getDataset('caseDensityByCases');
    case Metric.CASE_GROWTH_RATE:
      return projection
        .getDataset('rtRange')
        .map(d => ({ x: d.x, y: d.y?.rt }));
    case Metric.POSITIVE_TESTS:
      return projection.getDataset('testPositiveRate');
    case Metric.HOSPITAL_USAGE:
      return projection.getDataset('icuUtilization');
    case Metric.VACCINATIONS:
      return projection.getDataset('vaccinationsCompleted');
    case Metric.WEEKLY_CASES_PER_100K:
      return projection.getDataset('weeklyNewCasesPer100k');
    case Metric.RATIO_BEDS_WITH_COVID:
      return projection.getDataset('bedsWithCovidPatientsRatio');
    case Metric.ADMISSIONS_PER_100K:
      return projection.getDataset('weeklyCovidAdmissionsPer100k');
    default:
      fail('Unknown metric: ' + metric);
  }
}

export const isEmpty = (timeseries: Column[]) =>
  timeseries.every(d => d.y === null) || timeseries.length === 0;

/** Computes the RMSD between the two datasets. */
function rootMeanSquareDiff(
  leftDataset: Column[],
  rightDataset: Column[],
): number {
  const leftDataPoints = filter(leftDataset, d => d.y != null).length;
  const rightDataPoints = filter(rightDataset, d => d.y != null).length;

  // TODO(michael): Figure out how to incorporate missing data points better.
  if ((leftDataPoints === 0) !== (rightDataPoints === 0)) {
    // Only one state has data for the metric. That's probably bad.
    return 9999;
  } else if (leftDataPoints === 0 && rightDataPoints === 0) {
    // This can happen if a metric is disabled for a state.
    return 0;
  }

  const [left, right] = trimDatasetsToMatch(leftDataset, rightDataset);
  assert(left.length === right.length, `Datasets should match`);
  const length = left.length;

  const min = Math.min(minBy(left, d => d.y)!.y, minBy(right, d => d.y)!.y);
  const max = Math.max(maxBy(left, d => d.y)!.y, maxBy(right, d => d.y)!.y);
  const range = max - min;

  let sumSquareDiffs = 0;
  for (let i = 0; i < length; i++) {
    if ((left[i].y == null) !== (right[i].y == null)) {
      // TODO(michael): Figure out how to deal with missing data points better.
      sumSquareDiffs += range * range;
    }
    const diff = left[i].y - right[i].y;
    sumSquareDiffs += diff * diff;
  }
  const rmsd = Math.sqrt(sumSquareDiffs / length);
  return rmsd;
}

/** Trims two datasets to the overlapping set of dates. */
function trimDatasetsToMatch(left: Column[], right: Column[]) {
  const startTime = Math.max(
    find(left, d => d.y != null)!.x,
    find(right, d => d.y != null)!.x,
  );
  const endTime = Math.min(
    findLast(left, d => d.y != null)!.x,
    findLast(right, d => d.y != null)!.x,
  );

  const leftStartIndex = findIndex(left, d => d.x === startTime);
  const rightStartIndex = findIndex(right, d => d.x === startTime);
  const leftEndIndex = findIndex(left, d => d.x === endTime);
  const rightEndIndex = findIndex(right, d => d.x === endTime);

  return [
    left.slice(leftStartIndex, leftEndIndex + 1),
    right.slice(rightStartIndex, rightEndIndex + 1),
  ];
}
