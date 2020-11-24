import { Level } from 'common/level';

import { stateSummary, countySummary } from './location_summaries';

export default {
  LIGHTGRAY: '#f2f2f2',
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
    BASE: '#FF0034',
    LIGHT: '#FC818F',
    DARK: '#660015',
  },
  GREEN: {
    // Chosen to match "official" green from logo, etc.
    BASE: '#00D474',
    // TODO: Remove GREEN.DARK? Per Josh Ziman we want to consolidate all
    // instances of green into one, as long as text readability is maintained.
    DARK: '#0A3D31',
  },
  BLUE: '#3BBCE6',
  GRAY_BODY_COPY: '#4f4f4f',
  GRAY_EXPLORE_CHART: '#e0e0e0',
  GRAY: {
    BASE: '#CCCCCC',
    LIGHT: '#E3E3E3',
    DARK: '#999999',
  },
  GRAY_ICON: '#bdbdbd',
  PURPLE: '#5900EA',
  LIGHTGRAY: '#f2f2f2',
  LIGHTGRAY_BG: '#fafafa',
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
  summary,
  defaultColor = COLOR_MAP.GRAY_LIGHT,
) {
  return summary ? LEVEL_COLOR[summary.level] : defaultColor;
}

export function stateColor(stateCode) {
  const summary = stateSummary(stateCode);
  return colorFromLocationSummary(summary);
}

export function countyColor(
  countyFipsCode,
  defaultColor = COLOR_MAP.GRAY.LIGHT,
) {
  const summary = countySummary(countyFipsCode);
  return colorFromLocationSummary(summary, defaultColor);
}

export const LEVEL_COLOR_CONTACT_TRACING = {
  [Level.LOW]: COLOR_MAP.RED.BASE,
  [Level.MEDIUM]: COLOR_MAP.ORANGE_DARK.BASE,
  [Level.HIGH]: COLOR_MAP.ORANGE.BASE,
  [Level.CRITICAL]: COLOR_MAP.GREEN.BASE,
  [Level.SUPER_CRITICAL]: COLOR_MAP.GREEN.BASE,
  [Level.UNKNOWN]: COLOR_MAP.GRAY.BASE,
};
