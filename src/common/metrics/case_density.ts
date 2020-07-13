import { COLOR_MAP } from 'common/colors';
import { Level, LevelInfoMap } from 'common/level';
import { Projection, CASE_FATALITY_RATIO } from 'common/models/Projection';
import { formatInteger, formatPercent } from 'common/utils';

export const METRIC_NAME = 'Case Density';

export const CASE_DENSITY_LEVEL_INFO_MAP: LevelInfoMap = {
  [Level.LOW]: {
    level: Level.LOW,
    upperLimit: 1,
    name: 'Low',
    color: COLOR_MAP.GREEN.BASE,
    detail: () => 'Low',
  },
  [Level.MEDIUM]: {
    level: Level.MEDIUM,
    upperLimit: 10,
    name: 'Medium',
    color: COLOR_MAP.ORANGE.BASE,
    detail: () => 'Medium',
  },
  [Level.HIGH]: {
    level: Level.HIGH,
    upperLimit: 50,
    name: 'High',
    color: COLOR_MAP.ORANGE_DARK.BASE,
    detail: () => 'High',
  },
  [Level.CRITICAL]: {
    level: Level.CRITICAL,
    upperLimit: 100,
    name: 'Critical',
    color: COLOR_MAP.RED.BASE,
    detail: () => 'Critical',
  },
  [Level.UNKNOWN]: {
    level: Level.UNKNOWN,
    upperLimit: 0,
    name: 'Unknown',
    color: COLOR_MAP.GRAY.BASE,
    detail: () => 'Unknown',
  },
};

const casesPerDeath = formatInteger(1 / CASE_FATALITY_RATIO);
const caseFatalityRatioPercent = formatPercent(CASE_FATALITY_RATIO, 0);

export const CASE_DENSITY_DISCLAIMER = `We estimate ${casesPerDeath} cases 
for every reported death (${caseFatalityRatioPercent} infection fatality 
rate). Note that this will not match reported cases in many states, as 
testing is only detecting a small number of actual cases.`;

export const caseDensityStatusText = (projection: Projection) => {
  return 'Case Density Status Text';
};
