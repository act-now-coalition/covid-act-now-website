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
  HOSPITALIZATIONS = 1,
  ICU_HOSPITALIZATIONS = 2,
  VACCINATIONS_FIRST_DOSE = 3,
  VACCINATIONS_COMPLETED = 4,
  VACCINATIONS_ADDITIONAL_DOSE = 5,
  ICU_USED = 6,
  POSITIVITY_RATE = 7,
  ADMISSIONS_PER_100K = 8,
  RATIO_BEDS_WITH_COVID = 9,

  /**
   * Cases and Deaths no longer used in Trends
   * (i.e. no longer included in EXPLORE_METRICS in Explore/utils.ts),
   * and so we order them last in the enum.
   */
  CASES = 10,
  DEATHS = 11,
}

export enum DataMeasure {
  INTEGER,
  PERCENT,
}
