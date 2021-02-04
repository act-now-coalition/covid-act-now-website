import _ from 'lodash';
import { Metric } from 'common/metric';
import { Projection, Column } from 'common/models/Projection';
import { Projections } from 'common/models/Projections';
import { fail, assert } from 'common/utils';
import { MetroArea } from 'common/regions';

export enum SortType {
  ALPHABETICAL,
  POPULATION,
  SERIES_DIFF,
  METRIC_DIFF,
}

/** A pair of left/right projections (e.g. from two different snapshots) */
export class ProjectionsPair {
  static MISSING_METRIC_DIFF = 9999;

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
      return rightMetric === null ? 0 : this.MISSING_METRIC_DIFF;
    } else if (rightMetric === null) {
      return leftMetric === null ? 0 : this.MISSING_METRIC_DIFF + 1;
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

function getDataset(projection: Projection, metric: Metric): Column[] {
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
      return projection.getDataset('vaccinations');
    default:
      fail('Unknown metric: ' + metric);
  }
}

/** Computes the RMSD between the two datasets. */
function rootMeanSquareDiff(
  leftDataset: Column[],
  rightDataset: Column[],
): number {
  const leftDataPoints = _.filter(leftDataset, d => d.y != null).length;
  const rightDataPoints = _.filter(rightDataset, d => d.y != null).length;

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

  const min = Math.min(_.minBy(left, d => d.y)!.y, _.minBy(right, d => d.y)!.y);
  const max = Math.max(_.maxBy(left, d => d.y)!.y, _.maxBy(right, d => d.y)!.y);
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
    _.find(left, d => d.y != null)!.x,
    _.find(right, d => d.y != null)!.x,
  );
  const endTime = Math.min(
    _.findLast(left, d => d.y != null)!.x,
    _.findLast(right, d => d.y != null)!.x,
  );

  const leftStartIndex = _.findIndex(left, d => d.x === startTime);
  const rightStartIndex = _.findIndex(right, d => d.x === startTime);
  const leftEndIndex = _.findIndex(left, d => d.x === endTime);
  const rightEndIndex = _.findIndex(right, d => d.x === endTime);

  return [
    left.slice(leftStartIndex, leftEndIndex + 1),
    right.slice(rightStartIndex, rightEndIndex + 1),
  ];
}
