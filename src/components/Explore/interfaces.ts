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
 * So if we change the ordering of items in EXPLORE_METRICS in Explore/utils.ts,
 * we need to update these assigned indices to match.
 */
export enum ExploreMetric {
  WEEKLY_CASES_PER_100K = 0,
  WEEKLY_DEATHS_PER_100K = 1,
  CASES = 2,
  DEATHS = 3,
  HOSPITALIZATIONS = 4,
  ICU_HOSPITALIZATIONS = 5,
  VACCINATIONS_FIRST_DOSE = 6,
  VACCINATIONS_COMPLETED = 7,
  VACCINATIONS_ADDITIONAL_DOSE = 8,
  ICU_USED = 9,
  POSITIVITY_RATE = 10,
  ADMISSIONS_PER_100K = 11,
  RATIO_BEDS_WITH_COVID = 12,
}

export enum DataMeasure {
  INTEGER,
  PERCENT,
}
