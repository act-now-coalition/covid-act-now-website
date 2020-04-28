import { COLOR_MAP } from './interventions';
import { fail } from 'assert';

export enum ChartType {
  CASE_GROWTH_RATE = 'Infection rate',
  POSITIVE_TESTS = 'Positive tests',
  HOSPITAL_USAGE = 'Hospital ICU occupancy',
}

export const ChartTypeToTitle = {
  [ChartType.CASE_GROWTH_RATE]: 'Infection rate',
  [ChartType.POSITIVE_TESTS]: 'Positive tests',
  [ChartType.HOSPITAL_USAGE]: 'Hospital ICU occupancy',
};

export interface LevelInfo {
  lowerLimit: number;
  upperLimit: number;
  name: string;
  color: string;
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
export const SUMMARY_TEXT: Zones = {
  [Level.LOW]: {
    lowerLimit: 0,
    upperLimit: 0,
    name: 'All criteria met for reopening',
    color: COLOR_MAP.GREEN.BASE,
  },
  [Level.MEDIUM]: {
    lowerLimit: 0,
    upperLimit: 0,
    name: 'Some criteria met for reopening',
    color: COLOR_MAP.ORANGE.BASE,
  },
  [Level.HIGH]: {
    lowerLimit: 0,
    upperLimit: 0,
    name: 'No criteria met for reopening',
    color: COLOR_MAP.RED.BASE,
  },
  [Level.UNKNOWN]: {
    lowerLimit: 0,
    upperLimit: 0,
    name: 'Unknown',
    color: COLOR_MAP.GRAY.BASE,
  },
};

export const CASE_GROWTH_RATE: Zones = {
  [Level.LOW]: {
    lowerLimit: 0.85,
    upperLimit: 1.0,
    name: 'Low',
    color: COLOR_MAP.GREEN.BASE,
  },
  [Level.MEDIUM]: {
    lowerLimit: 1.0,
    upperLimit: 1.2,
    name: 'Medium',
    color: COLOR_MAP.ORANGE.BASE,
  },
  [Level.HIGH]: {
    lowerLimit: 1.2,
    upperLimit: 2.5,
    name: 'High',
    color: COLOR_MAP.RED.BASE,
  },
  [Level.UNKNOWN]: {
    lowerLimit: 0,
    upperLimit: 0,
    name: 'Unknown',
    color: COLOR_MAP.GRAY.BASE,
  },
};

export const POSITIVE_TESTS: Zones = {
  [Level.LOW]: {
    lowerLimit: 0.0,
    upperLimit: 0.03,
    name: 'Low',
    color: COLOR_MAP.GREEN.BASE,
  },
  [Level.MEDIUM]: {
    lowerLimit: 0.03,
    upperLimit: 0.10,
    name: 'Medium',
    color: COLOR_MAP.ORANGE.BASE,
  },
  [Level.HIGH]: {
    lowerLimit: 0.10,
    upperLimit: 1,
    name: 'High',
    color: COLOR_MAP.RED.BASE,
  },
  [Level.UNKNOWN]: {
    lowerLimit: 0,
    upperLimit: 0,
    name: 'Unknown',
    color: COLOR_MAP.GRAY.BASE,
  },
};

export const HOSPITAL_USAGE: Zones = {
  [Level.LOW]: {
    lowerLimit: 0.6,
    upperLimit: 0.88,
    name: 'Low',
    color: COLOR_MAP.GREEN.BASE,
  },
  [Level.MEDIUM]: {
    lowerLimit: 0.88,
    upperLimit: 1.0,
    name: 'Medium',
    color: COLOR_MAP.ORANGE.BASE,
  },
  [Level.HIGH]: {
    lowerLimit: 1.0,
    upperLimit: 1.25,
    name: 'High',
    color: COLOR_MAP.RED.BASE,
  },
  [Level.UNKNOWN]: {
    lowerLimit: 0,
    upperLimit: 0,
    name: 'Unknown',
    color: COLOR_MAP.GRAY.BASE,
  },
};

const CHART_ZONES = {
  [ChartType.CASE_GROWTH_RATE]: CASE_GROWTH_RATE,
  [ChartType.POSITIVE_TESTS]: POSITIVE_TESTS,
  [ChartType.HOSPITAL_USAGE]: HOSPITAL_USAGE,
};

export function getChartColumnFromChartType(chartType: ChartType): string {
  if (chartType === ChartType.CASE_GROWTH_RATE) {
    return 'rtRange';
  } else if (chartType === ChartType.HOSPITAL_USAGE) {
    return 'icuUtilization';
  } else if (chartType === ChartType.POSITIVE_TESTS) {
    return 'testPositiveRate';
  }
  fail('Unsupported ChartType');
}

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
