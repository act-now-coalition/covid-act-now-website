import { COLOR_MAP } from './interventions';
import { fail } from 'assert';

export enum ChartType {
  CASE_GROWTH_RATE = "Case growth",
  POSITIVE_TESTS = "Positive tests",
  HOSPITAL_USAGE = 'Hospital ICU occupancy',
}

export interface ZoneInfo {
  upperLimit: number;
  name: string;
  color: string;
}

export enum Level {
  LOW = 'LOW',
  MEDIUM = 'MEDIUM',
  HIGH = 'HIGH',
}

export interface Zones {
  [Level.LOW]: ZoneInfo;
  [Level.MEDIUM]: ZoneInfo;
  [Level.HIGH]: ZoneInfo;
}

export const COLOR_ZONE = {
  [Level.LOW]: COLOR_MAP.GREEN.BASE,
  [Level.MEDIUM]: COLOR_MAP.ORANGE.BASE,
  [Level.HIGH]: COLOR_MAP.RED.BASE,
};

// Case Growth Rate
export const CASE_GROWTH_RATE: Zones = {
  [Level.LOW]: {
    upperLimit: 1.05,
    name: 'Shrinking',
    color: COLOR_MAP.GREEN.BASE,
  },
  [Level.MEDIUM]: {
    upperLimit: 1.4,
    name: 'Stabilizing',
    color: COLOR_MAP.ORANGE.BASE,
  },
  [Level.HIGH]: {
    upperLimit: Infinity,
    name: 'Growing',
    color: COLOR_MAP.RED.BASE,
  },
};

// Positive Tests (upperLimit as %)
export const POSITIVE_TESTS: Zones = {
  [Level.LOW]: {
    upperLimit: 0.06,
    name: 'Low',
    color: COLOR_MAP.GREEN.BASE,
  },
  [Level.MEDIUM]: {
    upperLimit: 0.12,
    name: 'Medium',
    color: COLOR_MAP.ORANGE.BASE,
  },
  [Level.HIGH]: {
    upperLimit: Infinity,
    name: 'High',
    color: COLOR_MAP.RED.BASE,
  },
};

// Hospital Usage (upperLimit as %)
export const HOSPITAL_USAGE: Zones = {
  [Level.LOW]: {
    upperLimit: 0.8125,
    name: 'Sufficient',
    color: COLOR_MAP.GREEN.BASE,
  },
  [Level.MEDIUM]: {
    upperLimit: 0.95,
    name: 'At risk',
    color: COLOR_MAP.ORANGE.BASE,
  },
  [Level.HIGH]: {
    upperLimit: Infinity,
    name: 'Overloaded',
    color: COLOR_MAP.RED.BASE,
  },
};

const CHART_ZONES = {
  [ChartType.CASE_GROWTH_RATE]: CASE_GROWTH_RATE,
  [ChartType.POSITIVE_TESTS]: POSITIVE_TESTS,
  [ChartType.HOSPITAL_USAGE]: HOSPITAL_USAGE, 
}

export function determineZoneInfoForChart(chartType: ChartType, value: number): ZoneInfo {
  const zonesForChart = CHART_ZONES[chartType];
  const zone = determineZone(zonesForChart, value)
  return zonesForChart[zone];
}

export function determineZone(zones: Zones, value: number): Level {
  // TODO(michael): Is there a typesafe way to enumerate enum values? :-/
  for (const level of [Level.LOW, Level.MEDIUM, Level.HIGH]) {
    if (value <= zones[level].upperLimit) {
      return level;
    }
  }
  fail('Failed to find zone for value: ' + value);
}

export function worstStatus(statusList: Level[]): Level {
  if (statusList.indexOf(Level.HIGH) > -1) {
    return Level.HIGH;
  } else if (statusList.indexOf(Level.MEDIUM) > -1) {
    return Level.MEDIUM;
  } else {
    return Level.LOW;
  }
}

export function worstStatusColor(statusList: Level[]): string {
  return CASE_GROWTH_RATE[worstStatus(statusList)].color;
}