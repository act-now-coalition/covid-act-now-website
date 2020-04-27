import { COLOR_MAP } from './interventions';

// TODO(@pnavarrc): Integrate with @sgoldblatt enums/status.ts
interface ZoneInfo {
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
    upperLimit: 0.25,
    name: 'Sufficient',
    color: COLOR_MAP.GREEN.BASE,
  },
  [Level.MEDIUM]: {
    upperLimit: 0.8,
    name: 'At risk',
    color: COLOR_MAP.ORANGE.BASE,
  },
  [Level.HIGH]: {
    upperLimit: Infinity,
    name: 'Overloaded',
    color: COLOR_MAP.RED.BASE,
  },
};
