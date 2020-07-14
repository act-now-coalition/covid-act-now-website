import { COLOR_MAP } from 'common/colors';
import { Level, LevelInfoMap } from 'common/level';
import { Projection, CASE_FATALITY_RATIO } from 'common/models/Projection';
import { formatInteger, formatPercent, formatDecimal } from 'common/utils';
import { levelText } from 'common/utils/chart';
import { getLevel, Metric } from 'common/metric';

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
    upperLimit: Infinity,
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
  const { currentCaseDensity, currentDailyDeaths, locationName } = projection;

  if (currentCaseDensity === null || currentDailyDeaths === null) {
    return `Not enough case data is available to generate ${METRIC_NAME.toLowerCase()}.`;
  }

  const level = getLevel(Metric.CASE_DENSITY, currentCaseDensity);
  const dailyCases = formatDecimal(currentCaseDensity, 1);
  const dailyDeaths = formatDecimal(currentDailyDeaths, 2);

  const statusText1 = `Over the last week, ${locationName} has reported
   ${dailyCases} new cases and ${dailyDeaths} new deaths per day for every
    100,000 residents.`;

  const statusText2 = levelText(
    level,
    `If these rates continue, we estimate less than 1% of ${locationName}’s population will be infected in the next year.`,
    `If these rates continue, we estimate less than 1-10% of ${locationName}’s population will be infected in the next year.`,
    `If these rates continue, we estimate less than 10-50% of ${locationName}’s population will be infected in the next year. Caution is warranted.`,
    `If these rates continue, we estimate less than >50% of ${locationName}’s population will be infected in the next year. Aggressive action urgently needed.`,
  );

  return `${statusText1} ${statusText2}`;
};
