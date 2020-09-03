import { Column } from 'common/models/Projection';

export enum ChartType {
  LINE,
  BAR,
}

export interface ChartParams {
  stroke?: string;
}

export interface Series {
  data: Column[];
  type: ChartType;
  label: string;
  tooltipLabel: string;
  params?: ChartParams;
}

export enum ExploreMetric {
  CASES,
  DEATHS,
  HOSPITALIZATIONS,
  ICU_HOSPITALIZATIONS,
}
