import { COLOR_MAP } from 'common/colors';
import { Level, LevelInfoMap } from 'common/level';

const LOW_NAME = 'Reduced';
const MEDIUM_NAME = 'Moderate';
const HIGH_NAME = 'Elevated';
const UNKNOWN = 'Unknown';

const SHORT_DESCRIPTION_LOW = 'Reduced risk based on reopening metrics.';
const SHORT_DESCRIPTION_MEDIUM = 'Moderate risk based on reopening metrics.';
const SHORT_DESCRIPTION_HIGH = 'Elevated risk based on reopening metrics.';
const SHORT_DESCRIPTION_UNKNWON =
  'We don’t have enough data to assess reopening risk.';

export const LOCATION_SUMMARY_LEVELS: LevelInfoMap = {
  [Level.LOW]: {
    level: Level.LOW,
    upperLimit: 0,
    name: LOW_NAME,
    color: COLOR_MAP.GREEN.BASE,
    detail: SHORT_DESCRIPTION_LOW,
  },
  [Level.MEDIUM]: {
    level: Level.MEDIUM,
    upperLimit: 0,
    name: MEDIUM_NAME,
    color: COLOR_MAP.ORANGE.BASE,
    detail: SHORT_DESCRIPTION_MEDIUM,
  },
  [Level.HIGH]: {
    level: Level.HIGH,
    upperLimit: 0,
    name: HIGH_NAME,
    color: COLOR_MAP.RED.BASE,
    detail: SHORT_DESCRIPTION_HIGH,
  },
  [Level.UNKNOWN]: {
    level: Level.UNKNOWN,
    upperLimit: 0,
    name: UNKNOWN,
    color: COLOR_MAP.GRAY.BASE,
    detail: SHORT_DESCRIPTION_UNKNWON,
  },
};
