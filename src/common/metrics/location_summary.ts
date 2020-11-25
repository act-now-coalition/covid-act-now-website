import { COLOR_MAP } from 'common/colors';
import { Level, LevelInfoMap } from 'common/level';

// Note: These names are used on SocialLocationPreview
const LOW_NAME = 'Low';
const MEDIUM_NAME = 'Medium';
const MEDIUM_HIGH_NAME = 'High';
const HIGH_NAME = 'Critical';
const SUPER_CRITICAL_NAME = 'Extreme';
const UNKNOWN = 'Unknown';

const LEGEND_SUMMARY_LOW = 'On track to contain COVID';
const LEGEND_SUMMARY_MEDIUM = 'Slow disease growth';
const LEGEND_SUMMARY_MEDIUM_HIGH = 'At risk of outbreak';
const LEGEND_SUMMARY_HIGH = 'Active or imminent outbreak';
const LEGEND_SUMMARY_SUPER_CRITICAL = 'Extreme outbreak';

export const LOCATION_SUMMARY_LEVELS: LevelInfoMap = {
  [Level.LOW]: {
    level: Level.LOW,
    upperLimit: 0,
    name: LOW_NAME,
    summary: LEGEND_SUMMARY_LOW,
    color: COLOR_MAP.GREEN.BASE,
    detail: locationName =>
      `${locationName} is on track to contain COVID. Cases are steadily decreasing and ${locationName}’s COVID preparedness meets or exceeds international standards.`,
  },
  [Level.MEDIUM]: {
    level: Level.MEDIUM,
    upperLimit: 0,
    name: MEDIUM_NAME,
    summary: LEGEND_SUMMARY_MEDIUM,
    color: COLOR_MAP.ORANGE.BASE,
    detail: locationName =>
      `COVID in ${locationName} is spreading in a slow and controlled fashion, and ${locationName}’s COVID preparedness meets international standards.`,
  },
  [Level.HIGH]: {
    level: Level.HIGH,
    upperLimit: 0,
    name: MEDIUM_HIGH_NAME,
    summary: LEGEND_SUMMARY_MEDIUM_HIGH,
    color: COLOR_MAP.ORANGE_DARK.BASE,
    detail: locationName =>
      `${locationName} is at risk of an outbreak. COVID cases are either increasing at a rate likely to overwhelm hospitals and/or the state’s COVID preparedness is below international standards.`,
  },
  [Level.CRITICAL]: {
    level: Level.CRITICAL,
    upperLimit: 0,
    name: HIGH_NAME,
    summary: LEGEND_SUMMARY_HIGH,
    color: COLOR_MAP.RED.BASE,
    detail: locationName =>
      `${locationName} is either actively experiencing an outbreak or is at extreme risk. COVID cases are exponentially growing and/or ${locationName}’s COVID preparedness is significantly below international standards.`,
  },
  [Level.SUPER_CRITICAL]: {
    level: Level.SUPER_CRITICAL,
    upperLimit: 0,
    name: SUPER_CRITICAL_NAME,
    summary: LEGEND_SUMMARY_SUPER_CRITICAL,
    color: COLOR_MAP.RED.DARK,
    detail: locationName =>
      `${locationName} is currently experiencing an extreme outbreak. Strong interventions are necessary to control the spread and reduce the burden on healthcare systems.`,
  },
  [Level.UNKNOWN]: {
    level: Level.UNKNOWN,
    upperLimit: 0,
    name: UNKNOWN,
    summary: UNKNOWN,
    color: COLOR_MAP.GRAY.BASE,
    detail: locationName => 'We don’t have enough data to assess COVID risk.',
  },
};
