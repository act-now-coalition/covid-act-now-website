import { COLOR_MAP } from 'common/colors';
import { Level, LevelInfoMap } from 'common/level';

export const METRIC_NAME = 'ICU headroom used';

const SHORT_DESCRIPTION_LOW = 'Can likely handle a new wave of COVID';
const SHORT_DESCRIPTION_MEDIUM = 'At risk to a new wave of COVID';
const SHORT_DESCRIPTION_HIGH = 'Unable to handle a new wave of COVID';
const SHORT_DESCRIPTION_UNKNOWN = 'Insufficient data to assess';

const LIMIT_LOW = 0.5;
const LIMIT_MEDIUM = 0.7;
const LIMIT_HIGH = Infinity;

const LOW_NAME = 'Low';
const MEDIUM_NAME = 'Medium';
const HIGH_NAME = 'High';
const UNKNOWN = 'Unknown';

export const HOSPITAL_USAGE_LEVEL_INFO_MAP: LevelInfoMap = {
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
