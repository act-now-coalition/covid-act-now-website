import { COLOR_MAP } from 'common/colors';
import { Level, LevelInfoMap } from 'common/level';
import { Projection } from 'common/models/Projection';
import { levelText } from 'common/utils/chart';
import { getLevel, Metric } from 'common/metric';
import { formatDecimal } from 'common/utils';

export const METRIC_NAME = 'Case Density';

export const CASE_DENSITY_LEVEL_INFO_MAP: LevelInfoMap = {
  [Level.LOW]: {
    level: Level.LOW,
    upperLimit: 1,
    name: 'Low',
    color: COLOR_MAP.GREEN.BASE,
    detail: () => 'COVID is being effectively contained',
  },
  [Level.MEDIUM]: {
    level: Level.MEDIUM,
    upperLimit: 10,
    name: 'Medium',
    color: COLOR_MAP.ORANGE.BASE,
    detail: () => 'COVID is spreading in a controlled fashion',
  },
  [Level.HIGH]: {
    level: Level.HIGH,
    upperLimit: 25,
    name: 'High',
    color: COLOR_MAP.ORANGE_DARK.BASE,
    detail: () => 'Broad uncontrolled COVID spread',
  },
  [Level.CRITICAL]: {
    level: Level.CRITICAL,
    upperLimit: Infinity,
    name: 'Critical',
    color: COLOR_MAP.RED.BASE,
    detail: () => 'An active outbreak',
  },
  [Level.UNKNOWN]: {
    level: Level.UNKNOWN,
    upperLimit: 0,
    name: 'Unknown',
    color: COLOR_MAP.GRAY.BASE,
    detail: () => 'Insufficient data to assess',
  },
};

export const CASE_DENSITY_DISCLAIMER = `Note that the number of persons infected is substantially higher than the number of confirmed cases. In many states, as testing is only detecting a small number of actual cases.`;

export function caseDensityStatusText(projection: Projection) {
  const { currentCaseDensity, currentDailyDeaths, locationName } = projection;

  if (currentCaseDensity === null || currentDailyDeaths === null) {
    return `Not enough case data is available to generate ${METRIC_NAME.toLowerCase()}.`;
  }

  const level = getLevel(Metric.CASE_DENSITY, currentCaseDensity);
  const dailyCases = formatDecimal(currentCaseDensity, 1);

  const statusText1 = `Over the last week, ${locationName} has reported
   ${dailyCases} new confirmed cases per day for every
    100,000 residents.`;

  const statusText2 = levelText(
    level,
    `If these rates continue, we estimate less than 1% of ${locationName}’s population will be infected in the next year.`,
    `If these rates continue, we estimate less than 1-10% of ${locationName}’s population will be infected in the next year.`,
    `If these rates continue, we estimate less than 10-25% of ${locationName}’s population will be infected in the next year. Caution is warranted.`,
    `If these rates continue, we estimate more than >25% of ${locationName}’s population will be infected in the next year. Aggressive action urgently needed.`,
  );

  return `${statusText1} ${statusText2}`;
}
