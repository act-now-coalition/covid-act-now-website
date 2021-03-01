import { PURPLE_MAP } from 'common/colors';
import { fail } from 'common/utils';
import { Region, State, County } from 'common/regions';

export enum CcviLevel {
  VERY_LOW,
  LOW,
  MEDIUM,
  HIGH,
  VERY_HIGH,
}

const allCcviLevels = [
  CcviLevel.VERY_LOW,
  CcviLevel.LOW,
  CcviLevel.MEDIUM,
  CcviLevel.HIGH,
  CcviLevel.VERY_HIGH,
];

interface CcviLevelInfo {
  color: string;
  levelName: string;
  upperLimit: number;
}

export const CCVI_LEVEL_INFO_MAP: { [level in CcviLevel]: CcviLevelInfo } = {
  [CcviLevel.VERY_LOW]: {
    color: PURPLE_MAP.PURPLE_1,
    levelName: 'Very low',
    upperLimit: 0.2,
  },
  [CcviLevel.LOW]: {
    color: PURPLE_MAP.PURPLE_2,
    levelName: 'Low',
    upperLimit: 0.4,
  },
  [CcviLevel.MEDIUM]: {
    color: PURPLE_MAP.PURPLE_3,
    levelName: 'Medium',
    upperLimit: 0.6,
  },
  [CcviLevel.HIGH]: {
    color: PURPLE_MAP.PURPLE_4,
    levelName: 'High',
    upperLimit: 0.8,
  },
  [CcviLevel.VERY_HIGH]: {
    color: PURPLE_MAP.PURPLE_5,
    levelName: 'Very high',
    upperLimit: 1,
  },
};

export function getCcviLevelColor(level: CcviLevel): string {
  return CCVI_LEVEL_INFO_MAP[level].color;
}

export function getCcviLevelName(level: CcviLevel): string {
  return CCVI_LEVEL_INFO_MAP[level].levelName;
}

export function getCcviLevel(score: number): CcviLevel {
  for (const level of allCcviLevels) {
    if (score <= CCVI_LEVEL_INFO_MAP[level].upperLimit) {
      return level;
    }
  }
  fail('Invalid CCVI encountered: ' + score);
}

export function getCcviLevelNameFromScore(score: number) {
  const level = getCcviLevel(score);
  return getCcviLevelName(level);
}

/**
 * For vulnerabilities module footer.
 * Returns a Surgo URL with region-specific CCVI scores+maps:
 *    State --> returns a county-level state map
 *    County --> returns a neighborhood-level county map
 */
export function getSurgoUrlByRegion(region: Region): string | null {
  const baseUrl = 'https://www.precisionforcoviddata.org/?metricId=ccvi';
  if (region instanceof State) {
    return `${baseUrl}&geoLevel=county&fipsCode=${region.fipsCode}&focusLevel=state&focusFips=${region.fipsCode}`;
  } else if (region instanceof County) {
    return `${baseUrl}&geoLevel=tract&fipsCode=${region.fipsCode}&focusLevel=county&focusFips=${region.fipsCode}`;
  }
  return null;
}
