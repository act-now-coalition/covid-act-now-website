import { COLOR_MAP } from 'common/colors';
import { Level, LevelInfoMap } from 'common/level';
import { levelText } from 'common/utils/chart';
import { getLevel, Metric } from 'common/metric';
import { formatPercent, formatInteger } from 'common/utils';
import { Projection } from 'common/models/Projection';

export const METRIC_NAME = 'ICU headroom used';
export const STATES_WITH_DATA_OVERRIDES = ['Nevada'];

const SHORT_DESCRIPTION_LOW = 'Can likely handle a new wave of COVID';
const SHORT_DESCRIPTION_MEDIUM = 'At risk to a new wave of COVID';
const SHORT_DESCRIPTION_HIGH = 'Unable to handle a new wave of COVID';
const SHORT_DESCRIPTION_UNKNOWN = 'Insufficient data to assess';

const LIMIT_LOW = 0.5;
const LIMIT_MEDIUM = 0.7;
const LIMIT_HIGH = Infinity;

const LOW_NAME = 'Low';
const MEDIUM_NAME = 'Medium';
const HIGH_NAME = 'High';
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

  if (
    currentIcuUtilization === null ||
    currentCovidICUPatients === null ||
    totalICUCapacity === null
  ) {
    return 'No ICU occupancy data is available.';
  }
  const level = getLevel(Metric.HOSPITAL_USAGE, currentIcuUtilization);

  const location = projection.locationName;

  const lowText = `This suggests there is likely enough capacity to absorb a wave of new COVID infections.`;
  const mediumText = `This suggests some ability to absorb an increase in COVID cases, but caution is warranted.`;
  const highText = `This suggests the healthcare system is not well positioned  to absorb a wave of new COVID infections without substantial surge capacity.`;

  const noStateOverride =
    STATES_WITH_DATA_OVERRIDES.indexOf(projection.stateName) < 0 ||
    !projection.hasActualData;

  return `${location} ${noStateOverride ? 'has about' : 'has'} ${formatInteger(
    totalICUCapacity,
  )} ICU beds.
     ${noStateOverride ? 'We estimate that' : ''} ${formatPercent(
    nonCovidPatients / totalICUCapacity,
  )} (${formatInteger(nonCovidPatients)})
        are currently occupied by non-COVID patients. Of the remaining ${formatInteger(
          totalICUCapacity - nonCovidPatients,
        )} ICU beds, ${noStateOverride ? 'we estimate ' : ''}
        ${formatInteger(
          currentCovidICUPatients,
        )} are occupied by COVID cases, or ${formatPercent(
    Math.min(
      1,
      currentCovidICUPatients / (totalICUCapacity - nonCovidPatients),
    ),
  )} of available beds. ${levelText(level, lowText, mediumText, highText)}`;
}
