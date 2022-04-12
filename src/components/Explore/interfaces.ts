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
  CASES = 1,
  DEATHS = 2,
  HOSPITALIZATIONS = 3,
  ICU_HOSPITALIZATIONS = 4,
  VACCINATIONS_FIRST_DOSE = 5,
  VACCINATIONS_COMPLETED = 6,
  VACCINATIONS_ADDITIONAL_DOSE = 7,
  ICU_USED = 8,
  POSITIVITY_RATE = 9,
  ADMISSIONS_PER_100K = 10,
  RATIO_BEDS_WITH_COVID = 11,
}

export enum DataMeasure {
  INTEGER,
  PERCENT,
}
