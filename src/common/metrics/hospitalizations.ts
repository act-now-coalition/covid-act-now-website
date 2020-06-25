import { COLOR_MAP } from 'common/colors';
import { Level, LevelInfoMap } from 'common/level';
import { levelText } from 'common/utils/chart';
import { getLevel, Metric } from 'common/metric';
import { formatPercent, formatInteger } from 'common/utils';
import { Projection } from 'common/models/Projection';

export const METRIC_NAME = 'ICU headroom used';
export const STATES_WITH_DATA_OVERRIDES = ['Nevada'];

const SHORT_DESCRIPTION_LOW = 'Can likely handle a new wave of COVID';
const SHORT_DESCRIPTION_MEDIUM = 'Can likely handle a new wave of COVID';
const SHORT_DESCRIPTION_MEDIUM_HIGH = 'At risk to a new wave of COVID';
const SHORT_DESCRIPTION_HIGH = 'High risk of hospital overload';
const SHORT_DESCRIPTION_UNKNOWN = 'Insufficient data to assess';

const LIMIT_LOW = 0.5;
const LIMIT_MEDIUM = 0.6;
const LIMIT_MEDIUM_HIGH = 0.7;
const LIMIT_HIGH = Infinity;

const LOW_NAME = 'Low';
const MEDIUM_NAME = 'Medium';
const MEDIUM_HIGH_NAME = 'High';
const HIGH_NAME = 'Critical';
const UNKNOWN = 'Unknown';

export const HOSPITAL_USAGE_LEVEL_INFO_MAP: LevelInfoMap = {
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
  [Level.MEDIUM_HIGH]: {
    level: Level.MEDIUM_HIGH,
    upperLimit: LIMIT_MEDIUM_HIGH,
    name: MEDIUM_HIGH_NAME,
    color: COLOR_MAP.ORANGE_DARK.BASE,
    detail: () => SHORT_DESCRIPTION_MEDIUM_HIGH,
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

export const HOSPITALIZATIONS_DISCLAIMER =
  ', a pandemic think tank, recommends that hospitals maintain enough ICU capacity to double the number of COVID patients hospitalized.';

export function hospitalOccupancyStatusText(projection: Projection) {
  const currentIcuUtilization = projection.currentIcuUtilization;
  const currentCovidICUPatients = projection.currentCovidICUPatients;
  const totalICUCapacity = projection.totalICUCapacity;
  const nonCovidPatients = Math.floor(projection.nonCovidPatients);

  if (projection.icuNearCapacityOverride) {
    return 'While no government-reported data is currently available, news reports suggest that ICUs are at or near capacity.';
  } else if (
    currentIcuUtilization === null ||
    currentCovidICUPatients === null ||
    totalICUCapacity === null
  ) {
    return 'No ICU occupancy data is available.';
  }
  const level = getLevel(Metric.HOSPITAL_USAGE, currentIcuUtilization);

  const location = projection.locationName;

  const noStateOverride =
    STATES_WITH_DATA_OVERRIDES.indexOf(projection.stateName) < 0 ||
    !projection.hasActualData;

  const totalICUBeds = formatInteger(totalICUCapacity);

  const nonCovidUsedBeds = formatInteger(nonCovidPatients);
  const nonCovidUsedBedsPercent = formatPercent(
    nonCovidPatients / totalICUCapacity,
  );
  const remainingICUBeds = formatInteger(totalICUCapacity - nonCovidPatients);
  const covidICUPatients = formatInteger(currentCovidICUPatients);
  const covidICUBeds =
    currentCovidICUPatients / (totalICUCapacity - nonCovidPatients);

  const textHasAbout = noStateOverride ? 'has about' : 'has';
  const textWeEstimateThat = noStateOverride ? 'We estimate that' : '';
  const textWeEstimate = noStateOverride ? 'we estimate' : '';

  const textLevel = levelText(
    level,
    'This suggests there is likely enough capacity to absorb a wave of new COVID infections',
    'This suggests some ability to absorb an increase in COVID cases',
    'This suggests hospitals may not be well positioned to absorb a wave of new COVID infections without substantial surge capacity. Caution is warranted',
    'This suggests hospitals cannot absorb a wave of new COVID infections without substantial surge capacity. Aggressive action urgently needed',
  );

  return `${location} ${textHasAbout} ${totalICUBeds} ICU beds.
    ${textWeEstimateThat} ${nonCovidUsedBedsPercent} (${nonCovidUsedBeds}) are currently occupied by non-COVID patients.
    With ${remainingICUBeds} ICU beds remaining, ${textWeEstimate} ${covidICUPatients} are needed by COVID cases,
    or ${
      covidICUBeds > 1 ? '>100%' : formatPercent(covidICUBeds)
    } of available beds. ${textLevel}.`;
}
