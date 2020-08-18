import { Column } from 'common/models/Projection';

export enum ChartType {
  LINE,
  BAR,
}

export interface Series {
  data: Column[];
  type: ChartType;
  label: string;
}

export enum ExploreMetric {
  CASES,
  DEATHS,
  HOSPITALIZATIONS,
  ICU_HOSPITALIZATIONS,
}
