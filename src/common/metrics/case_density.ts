import { COLOR_MAP } from 'common/colors';
import { Level, LevelInfoMap } from 'common/level';
import { Projection } from 'common/models/Projection';

export const METRIC_NAME = 'Case Density';

export const CASE_DENSITY_DISCLAIMER = 'Case Density Disclaimer';

export const CASE_DENSITY_LEVEL_INFO_MAP: LevelInfoMap = {
  [Level.LOW]: {
    level: Level.LOW,
    upperLimit: 1,
    name: 'Low',
    color: COLOR_MAP.GREEN.BASE,
    detail: () => 'Detail text for Low',
  },
  [Level.MEDIUM]: {
    level: Level.MEDIUM,
    upperLimit: 10,
    name: 'Medium',
    color: COLOR_MAP.ORANGE.BASE,
    detail: () => 'Detail text for Medium',
  },
  [Level.HIGH]: {
    level: Level.HIGH,
    upperLimit: 50,
    name: 'High',
    color: COLOR_MAP.ORANGE_DARK.BASE,
    detail: () => 'Detail text for High',
  },
  [Level.CRITICAL]: {
    level: Level.CRITICAL,
    upperLimit: 100,
    name: 'Critical',
    color: COLOR_MAP.RED.BASE,
    detail: () => 'Detail text for Critical',
  },
  [Level.UNKNOWN]: {
    level: Level.UNKNOWN,
    upperLimit: 0,
    name: 'Unknown',
    color: COLOR_MAP.GRAY.BASE,
    detail: () => 'Unknown',
  },
};

export const caseDensityStatusText = (projection: Projection) => {
  return 'Case Density Status Text';
};
