import { Level } from 'common/level';
import { Metric } from 'common/metric';
import LocationSummariesJSON from 'assets/data/summaries.json';
import { findStateFipsCode } from 'common/locations';

export interface MetricSummary {
  value: number | null;
  level: Level;
}

export interface LocationSummary {
  level: Level;
  metrics: {
    [metric in Metric]?: MetricSummary;
  };
}

export type SummariesMap = { [fips: string]: LocationSummary };

export const LocationSummariesByFIPS = LocationSummariesJSON as SummariesMap;

export function stateSummary(stateCode: string): LocationSummary | null {
  const fips = findStateFipsCode(stateCode);
  return LocationSummariesByFIPS[fips] || null;
}

export function countySummary(fips: string): LocationSummary | null {
  return LocationSummariesByFIPS[fips] || null;
}
