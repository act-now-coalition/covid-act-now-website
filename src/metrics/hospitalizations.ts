import { COLOR_MAP } from 'enums/interventions';
import { Level, Levels } from 'enums/levels';

export const METRIC_NAME = 'ICU headroom used';

// SHORT_DESCRIPTION --> HOSPITAL USAGE
const SHORT_DESCRIPTION_LOW = 'Can likely handle a new wave of COVID';
const SHORT_DESCRIPTION_MEDIUM = 'At risk to a new wave of COVID';
const SHORT_DESCRIPTION_HIGH = 'Unable to handle a new wave of COVID';
const SHORT_DESCRIPTION_UNKNOWN = 'Insufficient data to assess';

// LIMITS --> HOSPITAL USAGE
const LIMIT_LOW = 0.7;
const LIMIT_MEDIUM = 0.95;
const LIMIT_HIGH = Infinity;

const LOW_NAME = 'Reduced';
const MEDIUM_NAME = 'Moderate';
const HIGH_NAME = 'Elevated';
const UNKNOWN = 'Unknown';

// Hospital Usage (upperLimit as %)
export const HOSPITAL_USAGE_LEVELS: Levels = {
  [Level.LOW]: {
    level: Level.LOW,
    upperLimit: LIMIT_LOW,
    name: LOW_NAME,
    color: COLOR_MAP.GREEN.BASE,
    detail: SHORT_DESCRIPTION_LOW,
  },
  [Level.MEDIUM]: {
    level: Level.MEDIUM,
    upperLimit: LIMIT_MEDIUM,
    name: MEDIUM_NAME,
    color: COLOR_MAP.ORANGE.BASE,
    detail: SHORT_DESCRIPTION_MEDIUM,
  },
  [Level.HIGH]: {
    level: Level.HIGH,
    upperLimit: LIMIT_HIGH,
    name: HIGH_NAME,
    color: COLOR_MAP.RED.BASE,
    detail: SHORT_DESCRIPTION_HIGH,
  },
  [Level.UNKNOWN]: {
    level: Level.UNKNOWN,
    upperLimit: 0,
    name: UNKNOWN,
    color: COLOR_MAP.GRAY.BASE,
    detail: SHORT_DESCRIPTION_UNKNOWN,
  },
};
