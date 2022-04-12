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
  ADMISSIONS_PER_100K = 0,
  RATIO_BEDS_WITH_COVID = 1,
  WEEKLY_CASES_PER_100K = 2,
  WEEKLY_DEATHS_PER_100K = 3,
  CASES = 4,
  DEATHS = 5,
  HOSPITALIZATIONS = 6,
  ICU_HOSPITALIZATIONS = 7,
  VACCINATIONS_FIRST_DOSE = 8,
  VACCINATIONS_COMPLETED = 9,
  VACCINATIONS_ADDITIONAL_DOSE = 10,
  ICU_USED = 11,
  POSITIVITY_RATE = 12,
}

export enum DataMeasure {
  INTEGER,
  PERCENT,
}
