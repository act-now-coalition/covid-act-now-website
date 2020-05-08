import moment from 'moment';
import { COLOR_MAP } from './interventions';
import * as ChartContent from 'content/charts';

export enum ChartType {
  CASE_GROWTH_RATE = 'Infection growth rate',
  POSITIVE_TESTS = 'Positive test rate',
  HOSPITAL_USAGE = 'ICU headroom used',
}

export const ChartTypeToTitle = {
  [ChartType.CASE_GROWTH_RATE]: ChartContent.CASE_GROWTH_RATE_TITLE,
  [ChartType.POSITIVE_TESTS]: ChartContent.POSITIVE_TESTS_TITLE,
  [ChartType.HOSPITAL_USAGE]: ChartContent.HOSPITAL_USAGE_TITLE,
};

export interface LevelInfo {
  level: string;
  upperLimit: number;
  name: string;
  color: string;
  detail: string;
}

export enum Level {
  LOW = 'LOW',
  MEDIUM = 'MEDIUM',
  HIGH = 'HIGH',
  UNKNOWN = 'UNKNOWN',
}

export interface Zones {
  [Level.LOW]: LevelInfo;
  [Level.MEDIUM]: LevelInfo;
  [Level.HIGH]: LevelInfo;
  [Level.UNKNOWN]: LevelInfo;
}

export const COLOR_ZONE = {
  [Level.LOW]: COLOR_MAP.GREEN.BASE,
  [Level.MEDIUM]: COLOR_MAP.ORANGE.BASE,
  [Level.HIGH]: COLOR_MAP.RED.BASE,
  [Level.UNKNOWN]: COLOR_MAP.GRAY.BASE,
};

// For the summary text
export const LEGEND_TEXT: Zones = {
  [Level.LOW]: {
    level: Level.LOW,
    upperLimit: 0,
    name: ChartContent.ZONE_LOW_NAME,
    color: COLOR_MAP.GREEN.BASE,
    detail: ChartContent.SUMMARY_LEGEND_LOW,
  },
  [Level.MEDIUM]: {
    level: Level.MEDIUM,
    upperLimit: 0,
    name: ChartContent.ZONE_MEDIUM_NAME,
    color: COLOR_MAP.ORANGE.BASE,
    detail: ChartContent.SUMMARY_LEGEND_MEDIUM,
  },
  [Level.HIGH]: {
    level: Level.HIGH,
    upperLimit: 0,
    name: ChartContent.ZONE_HIGH_NAME,
    color: COLOR_MAP.RED.BASE,
    detail: ChartContent.SUMMARY_LEGEND_HIGH,
  },
  [Level.UNKNOWN]: {
    level: Level.UNKNOWN,
    upperLimit: 0,
    name: ChartContent.ZONE_UNKNOWN,
    color: COLOR_MAP.GRAY.BASE,
    detail: ChartContent.SUMMARY_LEGEND_UNKNWON,
  },
};

// Case Growth Rate
export const CASE_GROWTH_RATE: Zones = {
  [Level.LOW]: {
    level: Level.LOW,
    upperLimit: ChartContent.CASE_GROWTH_LIMIT_LOW,
    name: ChartContent.ZONE_LOW_NAME,
    color: COLOR_MAP.GREEN.BASE,
    detail: ChartContent.CASE_GROWTH_LEGEND_LOW,
  },
  [Level.MEDIUM]: {
    level: Level.MEDIUM,
    upperLimit: ChartContent.CASE_GROWTH_LIMIT_MEDIUM,
    name: ChartContent.ZONE_MEDIUM_NAME,
    color: COLOR_MAP.ORANGE.BASE,
    detail: ChartContent.CASE_GROWTH_LEGEND_MEDIUM,
  },
  [Level.HIGH]: {
    level: Level.HIGH,
    upperLimit: ChartContent.CASE_GROWTH_LIMIT_HIGH,
    name: ChartContent.ZONE_HIGH_NAME,
    color: COLOR_MAP.RED.BASE,
    detail: ChartContent.CASE_GROWTH_LEGEND_HIGH,
  },
  [Level.UNKNOWN]: {
    level: Level.UNKNOWN,
    upperLimit: 0,
    name: ChartContent.ZONE_UNKNOWN,
    color: COLOR_MAP.GRAY.BASE,
    detail: ChartContent.CASE_GROWTH_LEGEND_UNKNOWN,
  },
};

// Positive Tests (upperLimit as %)
export const POSITIVE_TESTS: Zones = {
  [Level.LOW]: {
    level: Level.LOW,
    upperLimit: ChartContent.POSITIVE_TESTS_LIMIT_LOW,
    name: ChartContent.ZONE_LOW_NAME,
    color: COLOR_MAP.GREEN.BASE,
    detail: ChartContent.POSITIVE_TESTS_LEGEND_LOW,
  },
  [Level.MEDIUM]: {
    level: Level.MEDIUM,
    upperLimit: ChartContent.POSITIVE_TESTS_LIMIT_MEDIUM,
    name: ChartContent.ZONE_MEDIUM_NAME,
    color: COLOR_MAP.ORANGE.BASE,
    detail: ChartContent.POSITIVE_TESTS_LEGEND_MEDIUM,
  },
  [Level.HIGH]: {
    level: Level.HIGH,
    upperLimit: ChartContent.POSITIVE_TESTS_LIMIT_HIGH,
    name: ChartContent.ZONE_HIGH_NAME,
    color: COLOR_MAP.RED.BASE,
    detail: ChartContent.POSITIVE_TESTS_LEGEND_HIGH,
  },
  [Level.UNKNOWN]: {
    level: Level.UNKNOWN,
    upperLimit: 0,
    name: ChartContent.ZONE_UNKNOWN,
    color: COLOR_MAP.GRAY.BASE,
    detail: ChartContent.POSITIVE_TESTS_LEGEND_UNKNOWN,
  },
};

// Hospital Usage (upperLimit as %)
export const HOSPITAL_USAGE: Zones = {
  [Level.LOW]: {
    level: Level.LOW,
    upperLimit: ChartContent.HOSPITAL_USAGE_LIMIT_LOW,
    name: ChartContent.ZONE_LOW_NAME,
    color: COLOR_MAP.GREEN.BASE,
    detail: ChartContent.HOSPTIAL_USAGE_LEGEND_LOW,
  },
  [Level.MEDIUM]: {
    level: Level.MEDIUM,
    upperLimit: ChartContent.HOSPITAL_USAGE_LIMIT_MEDIUM,
    name: ChartContent.ZONE_MEDIUM_NAME,
    color: COLOR_MAP.ORANGE.BASE,
    detail: ChartContent.HOSPTIAL_USAGE_LEGEND_MEDIUM,
  },
  [Level.HIGH]: {
    level: Level.HIGH,
    upperLimit: ChartContent.HOSPITAL_USAGE_LIMIT_HIGH,
    name: ChartContent.ZONE_HIGH_NAME,
    color: COLOR_MAP.RED.BASE,
    detail: ChartContent.HOSPTIAL_USAGE_LEGEND_HIGH,
  },
  [Level.UNKNOWN]: {
    level: Level.UNKNOWN,
    upperLimit: 0,
    name: ChartContent.ZONE_UNKNOWN,
    color: COLOR_MAP.GRAY.BASE,
    detail: ChartContent.HOSPTIAL_USAGE_LEGEND_UNKNOWN,
  },
};

const CHART_ZONES = {
  [ChartType.CASE_GROWTH_RATE]: CASE_GROWTH_RATE,
  [ChartType.POSITIVE_TESTS]: POSITIVE_TESTS,
  [ChartType.HOSPITAL_USAGE]: HOSPITAL_USAGE,
};

export function getLevelForChart(chartType: ChartType, value: number) {
  const allZonesForChartType = CHART_ZONES[chartType];
  return determineZone(allZonesForChartType, value);
}

export function getLevelInfoForChartType(
  chartType: ChartType,
  value: number | null,
): LevelInfo {
  const allZonesForChartType = CHART_ZONES[chartType];
  const zone = determineZone(allZonesForChartType, value);
  return allZonesForChartType[zone];
}

export function determineZone(zones: Zones, value: number | null): Level {
  // TODO(michael): Is there a typesafe way to enumerate enum values? :-/
  if (value === null) return Level.UNKNOWN;
  for (const level of [Level.LOW, Level.MEDIUM, Level.HIGH]) {
    if (value <= zones[level].upperLimit) {
      return level;
    }
  }
  return Level.UNKNOWN;
}
