import grey from '@material-ui/core/colors/grey';
import { Level } from 'common/level';

import { getSummaryFromFips, LocationSummary } from './location_summaries';

export default {
  LIGHTGRAY: '#f2f2f2',
};

// From Figma
export const GREY_0 = '#fafafa';
export const GREY_1 = '#f2f2f2';
export const GREY_2 = '#e5e5e5';
export const GREY_3 = '#bdbdbd';
export const GREY_4 = '#4f4f4f';

export const PURPLE_MAP = {
  PURPLE_1: '#8539FF',
  PURPLE_2: '#6000FE',
  PURPLE_3: '#4A00C3',
  PURPLE_4: '#340088',
  PURPLE_5: '#160039',
};

export const COLOR_MAP = {
  ORANGE: {
    BASE: '#FFC900',
    LIGHT: '#FFC020',
    DARK: '#933500',
  },
  ORANGE_DARK: {
    BASE: '#FF9600',
  },
  RED: {
    BASE: '#D9002C',
    LIGHT: '#FC818F',
    DARK: '#790019',
  },
  GREEN: {
    // Chosen to match "official" green from logo, etc.
    BASE: '#00D474',
    // TODO: Remove GREEN.DARK? Per Josh Ziman we want to consolidate all
    // instances of green into one, as long as text readability is maintained.
    DARK: '#0A3D31',
  },
  BLUE: '#3BBCE6',
  LIGHT_BLUE: '#00bfea',
  GRAY_BODY_COPY: GREY_4,
  GRAY_EXPLORE_CHART: '#e0e0e0',
  GRAY: {
    BASE: '#CCCCCC',
    LIGHT: '#E3E3E3',
    DARK: '#999999',
  },
  // Figma
  GREY_0,
  GREY_1,
  GREY_2,
  GREY_3,
  GREY_4,
  // Material UI
  GREY_50: grey[50],
  GREY_100: grey[100],
  GREY_200: grey[200],
  GREY_600: grey[600],
  GREY_800: grey[800],
  GRAY_ICON: GREY_3,
  PURPLE: '#5900EA',
  LIGHTGRAY: GREY_0,
  LIGHTGRAY_BG: GREY_0,
  LIGHT_YELLOW: '#FFF1BF',
  LIGHT_YELLOW_EMAIL: 'rgba(255, 201, 0, 0.12)',
  BLACK: '#000000',
};

export const LEVEL_COLOR = {
  [Level.LOW]: COLOR_MAP.GREEN.BASE,
  [Level.MEDIUM]: COLOR_MAP.ORANGE.BASE,
  [Level.HIGH]: COLOR_MAP.ORANGE_DARK.BASE,
  [Level.CRITICAL]: COLOR_MAP.RED.BASE,
  [Level.SUPER_CRITICAL]: COLOR_MAP.RED.DARK,
  [Level.UNKNOWN]: COLOR_MAP.GRAY.BASE,
};

export function colorFromLocationSummary(
  summary: LocationSummary | null,
  defaultColor = COLOR_MAP.GRAY.LIGHT,
) {
  return summary ? LEVEL_COLOR[summary.level] : defaultColor;
}

export function countyColor(
  countyFipsCode: string,
  defaultColor = COLOR_MAP.GRAY.LIGHT,
) {
  const summary = getSummaryFromFips(countyFipsCode);
  return colorFromLocationSummary(summary, defaultColor);
}
