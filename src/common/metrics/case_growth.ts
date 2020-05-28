import { COLOR_MAP } from 'common/colors';
import { Level, LevelInfoMap } from 'common/level';
import { getLevel, Metric } from 'common/metric';
import { levelText } from 'common/utils/chart';
import { formatDecimal } from 'common/utils';
import { Projection } from 'common/models/Projection';

export const METRIC_NAME = 'Infection rate';

const SHORT_DESCRIPTION_LOW = 'Active cases are decreasing';
const SHORT_DESCRIPTION_MEDIUM = 'Active cases are slowly increasing';
const SHORT_DESCRIPTION_HIGH = 'Active cases are increasing';
const SHORT_DESCRIPTION_UNKNOWN = 'Insufficient data to assess';

const LIMIT_LOW = 1;
const LIMIT_MEDIUM = 1.2;
const LIMIT_HIGH = Infinity;

const LOW_NAME = 'Low';
const MEDIUM_NAME = 'Medium';
const HIGH_NAME = 'High';
const UNKNOWN = 'Unknown';

export const CASE_GROWTH_RATE_LEVEL_INFO_MAP: LevelInfoMap = {
  [Level.LOW]: {
    level: Level.LOW,
    upperLimit: LIMIT_LOW,
    name: LOW_NAME,
    color: COLOR_MAP.GREEN.BASE,
    detail: () => SHORT_DESCRIPTION_LOW,
  },
  [Level.MEDIUM]: {
    level: Level.MEDIUM,
    upperLimit: LIMIT_MEDIUM,
    name: MEDIUM_NAME,
    color: COLOR_MAP.ORANGE.BASE,
    detail: () => SHORT_DESCRIPTION_MEDIUM,
  },
  [Level.HIGH]: {
    level: Level.HIGH,
    upperLimit: LIMIT_HIGH,
    name: HIGH_NAME,
    color: COLOR_MAP.RED.BASE,
    detail: () => SHORT_DESCRIPTION_HIGH,
  },
  [Level.UNKNOWN]: {
    level: Level.UNKNOWN,
    upperLimit: 0,
    name: UNKNOWN,
    color: COLOR_MAP.GRAY.BASE,
    detail: () => SHORT_DESCRIPTION_UNKNOWN,
  },
};

export const CASE_GROWTH_DISCLAIMER =
  'Each data point is a 14-day weighted average. We present the most recent seven days of data as a dashed line, as data is often revised by states several days after reporting. Containing COVID requires an infection rate of less than 1.0.';

export function caseGrowthStatusText(projection: Projection) {
  const rt = projection.rt!;
  if (rt === null) {
    return 'Not enough case data is available to generate infection growth rate.';
  }
  const level = getLevel(Metric.CASE_GROWTH_RATE, rt);
  const additionalPeople = formatDecimal(rt);
  const infectionRate = `On average, each person in ${projection.locationName} with COVID is infecting ${additionalPeople} other people.`;

  const epidemiologyReasoning = levelText(
    level,
    `Because each person is infecting less than one other person, the total number of current cases in ${projection.locationName} is shrinking.`,
    `Because this number is only slightly above 1.0, it means that COVID is growing, but slowly.`,
    `As such, the total number of current cases in ${projection.locationName} is growing exponentially.`,
  );

  return `${infectionRate} ${epidemiologyReasoning}`;
}
