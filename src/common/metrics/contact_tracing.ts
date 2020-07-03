import { COLOR_MAP } from 'common/colors';
import { Level, LevelInfoMap } from 'common/level';
import { levelText } from 'common/utils/chart';
import { getLevel, Metric } from 'common/metric';
import { formatPercent, formatInteger } from 'common/utils';
import { Projection, TRACERS_NEEDED_PER_CASE } from 'common/models/Projection';

export const METRIC_NAME = 'Contacts traced';

const SHORT_DESCRIPTION_LOW = 'Too many cases and too little tracing';
const SHORT_DESCRIPTION_MEDIUM = 'Too many cases and too little tracing';
const SHORT_DESCRIPTION_MEDIUM_HIGH =
  'Insufficient tracing to stop the spread of COVID';
const SHORT_DESCRIPTION_HIGH = 'Enough tracing to help contain COVID';
const SHORT_DESCRIPTION_UNKNOWN = 'Insufficient data to assess';

const LIMIT_LOW = 0.07;
const LIMIT_MEDIUM = 0.2;
const LIMIT_MEDIUM_HIGH = 0.9;
const LIMIT_HIGH = Infinity;

const LOW_NAME = 'Critical';
const MEDIUM_NAME = 'Low';
const MEDIUM_HIGH_NAME = 'Medium';
const HIGH_NAME = 'High';
const UNKNOWN = 'Unknown';

export const REVERSE_ORDER = true;

export const CONTACT_TRACING_LEVEL_INFO_MAP: LevelInfoMap = {
  [Level.LOW]: {
    level: Level.LOW,
    upperLimit: LIMIT_LOW,
    name: LOW_NAME,
    color: COLOR_MAP.RED.BASE,
    detail: () => SHORT_DESCRIPTION_LOW,
  },
  [Level.MEDIUM]: {
    level: Level.MEDIUM,
    upperLimit: LIMIT_MEDIUM,
    name: MEDIUM_NAME,
    color: COLOR_MAP.ORANGE_DARK.BASE,
    detail: () => SHORT_DESCRIPTION_MEDIUM,
  },
  [Level.MEDIUM_HIGH]: {
    level: Level.MEDIUM_HIGH,
    upperLimit: LIMIT_MEDIUM_HIGH,
    name: MEDIUM_HIGH_NAME,
    color: COLOR_MAP.ORANGE.BASE,
    detail: () => SHORT_DESCRIPTION_MEDIUM_HIGH,
  },
  [Level.CRITICAL]: {
    level: Level.CRITICAL,
    upperLimit: LIMIT_HIGH,
    name: HIGH_NAME,
    color: COLOR_MAP.GREEN.BASE,
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

export function contactTracingStatusText(projection: Projection) {
  const currentContactTracers = projection.currentContactTracers;
  const weeklyAverageResult = projection.getWeeklyAverageForDay(
    projection.dailyPositiveTests,
  );
  const currentWeeklyAverage =
    weeklyAverageResult && Math.round(weeklyAverageResult);
  const currentContactTracingMetric = projection.currentContactTracerMetric;
  if (
    currentContactTracingMetric === null ||
    currentContactTracers === null ||
    currentWeeklyAverage === null
  ) {
    return 'No contact tracing data is available.';
  }
  const location = projection.locationName;
  const level = getLevel(Metric.CONTACT_TRACING, currentContactTracingMetric);

  const numTracers = formatInteger(currentContactTracers);
  const weeklyAverage = formatInteger(currentWeeklyAverage);
  const numNeededTracers = formatInteger(
    currentWeeklyAverage * TRACERS_NEEDED_PER_CASE,
  );
  const overview = `Per best available data, ${location} has ${numTracers} contact tracers. With an average of ${weeklyAverage} new daily cases, 
    we estimate ${location} needs ${numNeededTracers} contact tracing staff to trace all new cases in 48 hours, before too many other people are infected.`;

  const contactTracingRate = levelText(
    level,
    `only ${formatPercent(currentContactTracingMetric)}`,
    `only ${formatPercent(currentContactTracingMetric)}`,
    `${formatPercent(currentContactTracingMetric)}`,
    `${formatPercent(currentContactTracingMetric)}`,
  );

  const outcomesAtLevel = levelText(
    level,
    `These low levels of tracing suggest there may be an active outbreak underway in ${location}, or almost no tracing capacity exists. Aggressive action urgently needed.`,
    `These low levels of tracing suggest there may be an active outbreak underway in ${location}, or that little tracing capacity exists. Strong caution warranted.`,
    `At these lower levels of tracing, it is unlikely ${location} will be able to successfully identify and isolate sources of disease spread fast enough to prevent new outbreaks.`,
    'When this level of tracing is coupled with widely available testing, COVID can be contained without resorting to lockdowns.',
  );

  const details = `This means that ${location} is likely able to trace ${contactTracingRate} of new COVID infections in 48 hours. ${outcomesAtLevel}`;

  return `${overview} ${details}`;
}

export const CONTACT_TRACING_DISCLAIMER = `that at least 90% of contacts for each new case must be traced within 48 hours in order to contain COVID. Experts estimate that tracing each new case within 48 hours requires an average of ${TRACERS_NEEDED_PER_CASE} contact tracers per new case, as well as fast testing.`;
