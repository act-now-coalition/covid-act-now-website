import { COLOR_MAP } from 'common/colors';
import { Level, LevelInfoMap } from 'common/level';

// Note: These names are used on SocialLocationPreview
const LOW_NAME = 'Low';
const MEDIUM_NAME = 'Medium';
const MEDIUM_HIGH_NAME = 'High';
const HIGH_NAME = 'Very high';
const SUPER_CRITICAL_NAME = 'Extremely high';
const UNKNOWN = 'Unknown';

const LEGEND_SUMMARY_LOW = 'Low COVID Community Level';
const LEGEND_SUMMARY_MEDIUM = 'Medium COVID Community Level';
const LEGEND_SUMMARY_HIGH = 'High COVID Community Level';

// TODO(8.2): Remove once community level changes are shipped.
const LEGEND_SUMMARY_MEDIUM_HIGH = 'Very high risk';
const LEGEND_SUMMARY_SUPER_CRITICAL = 'Extremely high risk';

export const LOCATION_SUMMARY_LEVELS: LevelInfoMap = {
  [Level.LOW]: {
    level: Level.LOW,
    upperLimit: 0,
    name: LOW_NAME,
    summary: LEGEND_SUMMARY_LOW,
    color: COLOR_MAP.GREEN.BASE,
  },
  [Level.MEDIUM]: {
    level: Level.MEDIUM,
    upperLimit: 0,
    name: MEDIUM_NAME,
    summary: LEGEND_SUMMARY_MEDIUM,
    color: COLOR_MAP.ORANGE.BASE,
  },
  [Level.HIGH]: {
    level: Level.HIGH,
    upperLimit: 0,
    name: MEDIUM_HIGH_NAME,
    summary: LEGEND_SUMMARY_MEDIUM_HIGH,
    color: COLOR_MAP.ORANGE_DARK.BASE,
  },
  [Level.CRITICAL]: {
    level: Level.CRITICAL,
    upperLimit: 0,
    name: HIGH_NAME,
    summary: LEGEND_SUMMARY_HIGH,
    color: COLOR_MAP.RED.BASE,
  },
  [Level.SUPER_CRITICAL]: {
    level: Level.SUPER_CRITICAL,
    upperLimit: 0,
    name: SUPER_CRITICAL_NAME,
    summary: LEGEND_SUMMARY_SUPER_CRITICAL,
    color: COLOR_MAP.RED.DARK,
  },
  [Level.UNKNOWN]: {
    level: Level.UNKNOWN,
    upperLimit: 0,
    name: UNKNOWN,
    summary: UNKNOWN,
    color: COLOR_MAP.GRAY.BASE,
  },
};
