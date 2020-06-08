import { COLOR_MAP } from 'common/colors';
import { Level, LevelInfoMap } from 'common/level';

// Note: These names are used on SocialLocationPreview
const LOW_NAME = 'Low';
const MEDIUM_NAME = 'Medium';
const MEDIUM_HIGH_NAME = 'High';
const HIGH_NAME = 'Critical';
const UNKNOWN = 'Unknown';

export const LOCATION_SUMMARY_LEVELS: LevelInfoMap = {
  [Level.LOW]: {
    level: Level.LOW,
    upperLimit: 0,
    name: LOW_NAME,
    color: COLOR_MAP.GREEN.BASE,
    detail: locationName =>
      `${locationName} is on track to contain COVID. Cases are steadily decreasing and ${locationName}’s COVID preparedness meets or exceeds international standards.`,
  },
  [Level.MEDIUM]: {
    level: Level.MEDIUM,
    upperLimit: 0,
    name: MEDIUM_NAME,
    color: COLOR_MAP.ORANGE.BASE,
    detail: locationName =>
      `COVID in ${locationName} is spreading in a slow and controlled fashion, and ${locationName}’s COVID preparedness meets international standards. If this trend continues, ${locationName} may eventually achieve herd immunity, though this may take years.`,
  },
  [Level.MEDIUM_HIGH]: {
    level: Level.MEDIUM_HIGH,
    upperLimit: 0,
    name: MEDIUM_HIGH_NAME,
    color: COLOR_MAP.ORANGE_DARK.BASE,
    detail: locationName =>
      `${locationName} is at risk of an outbreak. COVID cases are either increasing at a rate likely to overwhelm hospitals and/or the state’s COVID preparedness is well below international standards.`,
  },
  [Level.HIGH]: {
    level: Level.HIGH,
    upperLimit: 0,
    name: HIGH_NAME,
    color: COLOR_MAP.RED.BASE,
    detail: locationName =>
      `${locationName} is either actively experiencing an outbreak or is at extreme risk. COVID cases are exponentially growing and/or ${locationName}’s COVID preparedness is dangerously below international standards.`,
  },
  [Level.UNKNOWN]: {
    level: Level.UNKNOWN,
    upperLimit: 0,
    name: UNKNOWN,
    color: COLOR_MAP.GRAY.BASE,
    detail: locationName => 'We don’t have enough data to assess COVID risk.',
  },
};
