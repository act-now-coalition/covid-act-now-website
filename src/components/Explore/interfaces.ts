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

export enum ExploreMetric {
  RATIO_BEDS_WITH_COVID,
  ADMISSIONS_PER_100K,
  WEEKLY_DEATHS,
  WEEKLY_CASES,
  CASES,
  DEATHS,
  HOSPITALIZATIONS,
  ICU_HOSPITALIZATIONS,
  VACCINATIONS_FIRST_DOSE,
  VACCINATIONS_COMPLETED,
  VACCINATIONS_ADDITIONAL_DOSE,
  VACCINATIONS_BIVALENT_FALL_2022,
  ICU_USED,
  POSITIVITY_RATE,
  DAILY_CASES_PER_100K,
}

export enum DataMeasure {
  INTEGER,
  PERCENT,
}
