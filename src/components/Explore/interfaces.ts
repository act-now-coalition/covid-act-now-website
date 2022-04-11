import { Column } from 'common/models/Projection';

export enum SeriesType {
  LINE,
  BAR,
}

export interface SeriesParams {
  stroke?: string;
  fill?: string;
  strokeOpacity?: number;
  strokeDasharray?: string;
}

export interface Series {
  data: Column[];
  type: SeriesType;
  label: string;
  shortLabel: string;
  tooltipLabel: string;
  params?: SeriesParams;
}

/**
 * Indices assigned to each enumerated explore metric needs to match
 * the order of the dropdown items in EXPLORE_METRICS in Explore/utils.ts.
 *
 * So if we change the ordering of items in EXPLORE_METRIC,
 * we need to update these assigned indices to match.
 */
export enum ExploreMetric {
  CASES = 10,
  DEATHS = 11,
  HOSPITALIZATIONS = 0,
  ICU_HOSPITALIZATIONS = 1,
  VACCINATIONS_FIRST_DOSE = 2,
  VACCINATIONS_COMPLETED = 3,
  VACCINATIONS_ADDITIONAL_DOSE = 4,
  ICU_USED = 5,
  POSITIVITY_RATE = 6,
  ADMISSIONS_PER_100K = 7,
  RATIO_BEDS_WITH_COVID = 8,
  WEEKLY_CASES_PER_100K = 9,
}

export enum DataMeasure {
  INTEGER,
  PERCENT,
}
