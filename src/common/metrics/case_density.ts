import { COLOR_MAP } from 'common/colors';
import { Level, LevelInfoMap } from 'common/level';
import { Projection } from 'common/models/Projection';
import { levelText } from 'common/utils/chart';
import { getLevel, Metric } from 'common/metric';
import { formatDecimal } from 'common/utils';

export const METRIC_NAME = 'Daily new cases per 100k population';

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
    detail: () => 'COVID not contained, but at low levels',
  },
  [Level.HIGH]: {
    level: Level.HIGH,
    upperLimit: 25,
    name: 'High',
    color: COLOR_MAP.ORANGE_DARK.BASE,
    detail: () => 'Very large number of new cases',
  },
  [Level.CRITICAL]: {
    level: Level.CRITICAL,
    upperLimit: Infinity,
    name: 'Critical',
    color: COLOR_MAP.RED.BASE,
    detail: () => 'Dangerous number of new cases',
  },
  [Level.UNKNOWN]: {
    level: Level.UNKNOWN,
    upperLimit: 0,
    name: 'Unknown',
    color: COLOR_MAP.GRAY.BASE,
    detail: () => 'Insufficient data to assess',
  },
};

export const CASE_DENSITY_DISCLAIMER = `In most locations, not every infected person is tested. Therefore, the number of actual infections is almost always higher than the number of confirmed cases. Our risk levels for daily new cases are based on the “Key Metrics for Covid Suppression” by Harvard Global Health Institute and others. When estimating the number of people who will become infected in the course of a year, we rely on CDC’s estimate that confirmed cases represent as few as 10% of overall infections.`;

export function caseDensityStatusText(projection: Projection) {
  const { currentCaseDensity, currentDailyDeaths, locationName } = projection;

  if (currentCaseDensity === null || currentDailyDeaths === null) {
    return `Not enough case data is available to generate ${METRIC_NAME.toLowerCase()}.`;
  }

  const level = getLevel(Metric.CASE_DENSITY, currentCaseDensity);
  const dailyCases = formatDecimal(currentCaseDensity, 1);

  const statusText1 = `Over the last week, ${locationName} has averaged
   ${dailyCases} new confirmed cases per day for every
    100,000 residents.`;

  const statusText2 = levelText(
    level,
    `As context, if these rates were to continue, less than 2% of ${locationName}’s population would be infected in the next year *.`,
    `As context, if these rates were to continue, less than 20% of ${locationName}’s population would be infected in the next year.`,
    `As context, if these rates were to continue, less than 50% of ${locationName}’s population would be infected in the next year.`,
    `As context, if these rates were to continue, more than 50% of ${locationName}’s population would be infected in the next year.`,
  );

  return `${statusText1} ${statusText2}`;
}
