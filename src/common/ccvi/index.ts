import { PURPLE_MAP } from 'common/colors';

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

export function getCcviLevel(score: number): CcviLevel | null {
  for (const level of allCcviLevels) {
    if (score <= CCVI_LEVEL_INFO_MAP[level].upperLimit) {
      return level;
    }
  }
  return null;
}
