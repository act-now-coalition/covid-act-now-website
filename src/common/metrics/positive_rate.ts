import { COLOR_MAP } from 'common/colors';
import { Level, LevelInfoMap } from 'common/level';

export const METRIC_NAME = 'Positive test rate';

const LOW_NAME = 'Low';
const MEDIUM_NAME = 'Medium';
const HIGH_NAME = 'High';
const UNKNOWN = 'Unknown';

const SHORT_DESCRIPTION_LOW = 'Indicates widespread testing';
const SHORT_DESCRIPTION_MEDIUM = 'Indicates limited testing';
const SHORT_DESCRIPTION_HIGH = 'Indicates insufficient testing';
const SHORT_DESCRIPTION_UNKNOWN = 'Insufficient data to assess';

const LIMIT_LOW = 0.03;
const LIMIT_MEDIUM = 0.1;
const LIMIT_HIGH = Infinity;

export const POSITIVE_TESTS_LEVEL_INFO_MAP: LevelInfoMap = {
  [Level.LOW]: {
    level: Level.LOW,
    upperLimit: LIMIT_LOW,
    name: LOW_NAME,
    color: COLOR_MAP.GREEN.BASE,
    detail: () => SHORT_DESCRIPTION_LOW,
  },
  [Level.MEDIUM]: {
    level: Level.MEDIUM,
    upperLimit: LIMIT_MEDIUM,
    name: MEDIUM_NAME,
    color: COLOR_MAP.ORANGE.BASE,
    detail: () => SHORT_DESCRIPTION_MEDIUM,
  },
  [Level.HIGH]: {
    level: Level.HIGH,
    upperLimit: LIMIT_HIGH,
    name: HIGH_NAME,
    color: COLOR_MAP.RED.BASE,
    detail: () => SHORT_DESCRIPTION_HIGH,
  },
  [Level.UNKNOWN]: {
    level: Level.UNKNOWN,
    upperLimit: 0,
    name: UNKNOWN,
    color: COLOR_MAP.GRAY.BASE,
    detail: () => SHORT_DESCRIPTION_UNKNOWN,
  },
};

export const POSITIVE_RATE_DISCLAIMER =
  'The World Health Organization recommends a positive test rate of less than 10%. The countries most successful in containing COVID have rates of 3% or less. We calculate the rate as a 7-day trailing average.';
