import { Projections } from 'common/models/Projections';
import _ from 'lodash';
import { ProjectionsPair, SortType } from './ProjectionsPair';
import { Metric } from 'common/metric';

/** A set of left/right projection pairs across multiple locations. */
export class ProjectionsSet {
  static fromProjections(
    leftProjections: Projections[],
    rightProjections: Projections[],
  ) {
    const leftProjectionsByFips: { [fips: string]: Projections } = {};
    const rightProjectionsByFips: { [fips: string]: Projections } = {};
    for (const projections of leftProjections) {
      leftProjectionsByFips[projections.fips] = projections;
    }
    for (const projections of rightProjections) {
      rightProjectionsByFips[projections.fips] = projections;
    }

    const projectionPairs = [];
    for (const fips in leftProjectionsByFips) {
      const left = leftProjectionsByFips[fips];
      if (rightProjectionsByFips[fips]) {
        const right = rightProjectionsByFips[fips];
        projectionPairs.push(new ProjectionsPair(left, right));
      }
    }
    return new ProjectionsSet(projectionPairs);
  }

  constructor(private readonly pairs: ProjectionsPair[]) {}

  sortBy(sortType: SortType, metric: Metric): ProjectionsSet {
    return new ProjectionsSet(
      this.pairs.sort((left, right) => left.compare(right, sortType, metric)),
    );
  }

  top(limit: number, sortType: SortType, metric: Metric) {
    const sortedSet = this.sortBy(sortType, metric);
    return new ProjectionsSet(_.take(sortedSet.pairs, limit));
  }

  get isEmpty(): boolean {
    return _.isEmpty(this.pairs);
  }

  map<T>(fn: (x: ProjectionsPair) => T): T[] {
    return this.pairs.map(fn);
  }
}
