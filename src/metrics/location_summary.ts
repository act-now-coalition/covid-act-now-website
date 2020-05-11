import { COLOR_MAP } from 'enums/interventions';
import { Level, Levels } from 'enums/levels';

const LOW_NAME = 'Reduced';
const MEDIUM_NAME = 'Moderate';
const HIGH_NAME = 'Elevated';
const UNKNOWN = 'Unknown';

/**
 * Short descriptions are a quick text about the given metric and it's level.
 * They live in the summary component per location. The location summary lives
 * at the page header and describes the overall status of the location.
 */
const SHORT_DESCRIPTION_LOW = 'Reduced risk based on reopening metrics.';
const SHORT_DESCRIPTION_MEDIUM = 'Moderate risk based on reopening metrics.';
const SHORT_DESCRIPTION_HIGH = 'Elevated risk based on reopening metrics.';
const SHORT_DESCRIPTION_UNKNWON =
  'We don’t have enough data to assess reopening risk.';

// For the summary text
export const LOCATION_SUMMARY_LEVELS: Levels = {
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
