import { COLOR_MAP } from 'common/colors';
import { Level, LevelInfoMap } from 'common/level';

const LOW_NAME = 'Reduced';
const MEDIUM_NAME = 'Moderate';
const HIGH_NAME = 'Elevated';
const UNKNOWN = 'Unknown';

export const LOCATION_SUMMARY_LEVELS: LevelInfoMap = {
  [Level.LOW]: {
    level: Level.LOW,
    upperLimit: 0,
    name: LOW_NAME,
    color: COLOR_MAP.GREEN.BASE,
    detail: locationName =>
      `${locationName}’s COVID risk is reduced because all of ${locationName}’s COVID metrics  meet international standards.`,
  },
  [Level.MEDIUM]: {
    level: Level.MEDIUM,
    upperLimit: 0,
    name: MEDIUM_NAME,
    color: COLOR_MAP.ORANGE.BASE,
    detail: locationName =>
      `${locationName}’s COVID risk is moderate because at least one of ${locationName}’s  COVID metrics do not meet international standards.`,
  },
  [Level.HIGH]: {
    level: Level.HIGH,
    upperLimit: 0,
    name: HIGH_NAME,
    color: COLOR_MAP.RED.BASE,
    detail: locationName =>
      `${locationName}’s COVID risk is elevated because at least one of ${locationName}’s COVID metrics is substantially below international standards.`,
  },
  [Level.UNKNOWN]: {
    level: Level.UNKNOWN,
    upperLimit: 0,
    name: UNKNOWN,
    color: COLOR_MAP.GRAY.BASE,
    detail: locationName =>
      'We don’t have enough data to assess reopening risk.',
  },
};
