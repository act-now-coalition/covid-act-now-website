import { INTERVENTIONS } from 'common/interventions';
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
    DARK: '#82000E',
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
  GRAY: {
    BASE: '#CCCCCC',
    LIGHT: '#E3E3E3',
    DARK: '#999999',
  },
};

export const LEVEL_COLOR = {
  [Level.LOW]: COLOR_MAP.GREEN.BASE,
  [Level.MEDIUM]: COLOR_MAP.ORANGE.BASE,
  [Level.HIGH]: COLOR_MAP.ORANGE_DARK.BASE,
  [Level.CRITICAL]: COLOR_MAP.RED.BASE,
  [Level.UNKNOWN]: COLOR_MAP.GRAY.BASE,
};

export const INTERVENTION_COLOR_MAP = {
  [INTERVENTIONS.LIMITED_ACTION]: COLOR_MAP.RED.BASE,
  [INTERVENTIONS.SOCIAL_DISTANCING]: COLOR_MAP.ORANGE.BASE,
  [INTERVENTIONS.SHELTER_IN_PLACE]: COLOR_MAP.GREEN.BASE,
  [INTERVENTIONS.SHELTER_IN_PLACE_WORST_CASE]: COLOR_MAP.GREEN.DARK,
  [INTERVENTIONS.PROJECTED]: COLOR_MAP.BLUE,
};

export function stateColor(stateCode) {
  const summary = stateSummary(stateCode);
  return summary ? LEVEL_COLOR[summary.level] : COLOR_MAP.GRAY.LIGHT;
}

export function countyColor(
  countyFipsCode,
  defaultColor = COLOR_MAP.GRAY.LIGHT,
) {
  const summary = countySummary(countyFipsCode);
  return summary ? LEVEL_COLOR[summary.level] : defaultColor;
}

export const LEVEL_COLOR_CONTACT_TRACING = {
  [Level.LOW]: COLOR_MAP.RED.BASE,
  [Level.MEDIUM]: COLOR_MAP.ORANGE_DARK.BASE,
  [Level.HIGH]: COLOR_MAP.ORANGE.BASE,
  [Level.CRITICAL]: COLOR_MAP.GREEN.BASE,
  [Level.UNKNOWN]: COLOR_MAP.GRAY.BASE,
};
