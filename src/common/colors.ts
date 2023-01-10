import grey from '@material-ui/core/colors/grey';
import { Level } from 'common/level';
import { LocationSummary } from './location_summaries';
import { Metric } from './metricEnum';

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
    LIGHT: '#FFF5E6',
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
  NEW_BLUE: {
    // rename these
    BASE: '#3567FD',
    DARK: '#002CB4',
    DARKEST: '#000824',
    MEDIUM_DARK: 'rgba(53, 103, 253, 0.8)',
    MEDIUM: 'rgba(53, 103, 253, .6)',
    LIGHT: 'rgba(53, 103, 253, .15)',
    PURPLE: '#5361FD',
  },
  VACCINATIONS_BLUE: {
    0: '#B7C8FF',
    1: '#6F93FF',
    2: '#3567FD',
    3: '#002CB4',
    4: '#00175D',
  },
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

export function vaccineColorFromLocationSummary(
  summary: LocationSummary | null | undefined,
  defaultColor = COLOR_MAP.GRAY.LIGHT,
): string {
  const val = summary?.metrics?.[Metric.VACCINATIONS]?.value ?? null;
  if (val === null) {
    return defaultColor;
  } else {
    return vaccineColor(val);
  }
}

export function vaccineColor(val: number): string {
  // Round to the nearest .01 before calculating color to make it match the
  // rounding we do in the map / compare table.
  // TODO(michael): Ideally we'd use roundMetricValue() from metric.tsx but that
  // causes a circular dependency. :-(
  val = Number(val.toFixed(2));

  const colors = COLOR_MAP.VACCINATIONS_BLUE;
  if (val < 0.5) {
    return colors[0];
  } else if (val < 0.6) {
    return colors[1];
  } else if (val < 0.7) {
    return colors[2];
  } else if (val < 0.8) {
    return colors[3];
  } else {
    return colors[4];
  }
}

export const VACCINATIONS_COLOR_MAP = {
  INITIATED: COLOR_MAP.VACCINATIONS_BLUE[0],
  COMPLETED: COLOR_MAP.VACCINATIONS_BLUE[1],
  ADDITIONAL_DOSE: COLOR_MAP.VACCINATIONS_BLUE[3],
  BIVALENT_FALL_2022: COLOR_MAP.VACCINATIONS_BLUE[4],
};
