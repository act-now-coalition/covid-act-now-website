import { Metric } from 'common/metric';
import { SortType } from 'common/models/ProjectionsPair';

export const COUNTIES_LIMIT = 100;
export const METROS_LIMIT = 100;

// For "interesting" regions, we take the 30 top diffs of the counties with
// > 500k population and the 20 top diffs of metro areas.
export const INTERESTING_COUNTIES_POPULATION = 500000;
export const INTERESTING_COUNTIES_TOP_DIFFS = 30;
export const INTERESTING_METROS_TOP_DIFFS = 20;

export enum Locations {
  STATES_AND_INTERESTING_REGIONS,
  STATES,
  TOP_COUNTIES_BY_POPULATION,
  TOP_COUNTIES_BY_DIFF,
  TOP_METROS_BY_POPULATION,
}

export interface Options {
  leftSnapshot: number;
  rightSnapshot: number;
  sortType: SortType;
  metric: Metric;
  locations: Locations;
}
