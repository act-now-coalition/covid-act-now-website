import React from 'react';
import { COLOR_MAP } from 'common/colors';
import { Level, LevelInfoMap } from 'common/level';
import { getLevel, Metric } from 'common/metric';
import { levelText } from 'common/utils/chart';
import { formatDecimal } from 'common/utils';
import { Projection } from 'common/models/Projection';

export const METRIC_NAME = 'Infection rate';

const SHORT_DESCRIPTION_LOW = 'Active cases are decreasing';
const SHORT_DESCRIPTION_MEDIUM = 'COVID is still spreading, but slowly';
const SHORT_DESCRIPTION_MEDIUM_HIGH = 'Active cases are rapidly increasing';
const SHORT_DESCRIPTION_HIGH = 'Active cases are exponentially increasing';
const SHORT_DESCRIPTION_UNKNOWN = 'Insufficient data to assess';

const LIMIT_LOW = 0.9;
const LIMIT_MEDIUM = 1.1;
const LIMIT_MEDIUM_HIGH = 1.4;
const LIMIT_HIGH = Infinity;

const LOW_NAME = 'Low';
const MEDIUM_NAME = 'Medium';
const MEDIUM_HIGH_NAME = 'High';
const HIGH_NAME = 'Critical';
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
    upperLimit: LIMIT_MEDIUM_HIGH,
    name: MEDIUM_HIGH_NAME,
    color: COLOR_MAP.ORANGE_DARK.BASE,
    detail: () => SHORT_DESCRIPTION_MEDIUM_HIGH,
  },
  [Level.CRITICAL]: {
    level: Level.CRITICAL,
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
  'Each data point is a 14-day weighted average. We present the most recent seven days of data as a dashed line, as data is often revised by states several days after reporting.';

export function renderStatusText(projection: Projection): React.ReactElement {
  const rt = projection.rt!;
  if (rt === null) {
    return (
      <React.Fragment>
        Not enough case data is available to generate infection growth rate.
      </React.Fragment>
    );
  }
  const level = getLevel(Metric.CASE_GROWTH_RATE, rt);
  const additionalPeople = formatDecimal(rt);
  const epidemiologyReasoning = levelText(
    level,
    `Because each person is infecting less than one other person, the total number of current cases in ${projection.locationName} is shrinking.`,
    `Because this number is around 1.0, it means that COVID continues to spread, but in a slow and controlled fashion.`,
    `As such, the total number of active cases in ${projection.locationName} is growing at an unsustainable rate. If this trend continues, the hospital system may become overloaded. Caution is warranted.`,
    `As such, the total number of current cases in ${projection.locationName} is exploding, putting the hospital system at risk. Aggressive action urgently needed.`,
  );

  return (
    <React.Fragment>
      {`On average, each person in ${projection.locationName} with COVID 
        is infecting ${additionalPeople} other people. ${epidemiologyReasoning}`}
    </React.Fragment>
  );
}
