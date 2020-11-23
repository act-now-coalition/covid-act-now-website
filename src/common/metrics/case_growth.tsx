import React, { Fragment } from 'react';
import { COLOR_MAP } from 'common/colors';
import { Level, LevelInfoMap } from 'common/level';
import { getLevel, Metric } from 'common/metric';
import { levelText } from 'common/utils/chart';
import { formatDecimal } from 'common/utils';
import { Projections } from 'common/models/Projections';
import { MetricDefinition } from './interfaces';
import ExternalLink from 'components/ExternalLink';
import Thermometer from 'components/Thermometer';

const METRIC_NAME = 'Infection rate';

export const CaseGrowthMetric: MetricDefinition = {
  renderStatus,
  renderDisclaimer,
  renderThermometer,
  metricName: METRIC_NAME,
  extendedMetricName: METRIC_NAME,
  metricNameForCompare: METRIC_NAME,
};

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
  // TODO(michael): Comment and clean up.
  [Level.SUPER_CRITICAL]: {
    level: Level.SUPER_CRITICAL,
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

function renderStatus(projections: Projections): React.ReactElement {
  const { locationName, rt } = projections.primary;

  if (rt === null) {
    return (
      <Fragment>
        Unable to generate {CaseGrowthMetric.extendedMetricName.toLowerCase()}.
        This could be due to insufficient data.
      </Fragment>
    );
  }

  const level = getLevel(Metric.CASE_GROWTH_RATE, rt);
  const epidemiologyReasoning = levelText(
    level,
    `Because each person is infecting less than one other person, the total number of current cases in ${locationName} is shrinking.`,
    `Because this number is around 1.0, it means that COVID continues to spread, but in a slow and controlled fashion.`,
    `As such, the total number of active cases in ${locationName} is growing at an unsustainable rate. If this trend continues, the hospital system may become overloaded. Caution is warranted.`,
    `As such, the total number of current cases in ${locationName} is exploding, putting the hospital system at risk. Aggressive action urgently needed.`,
  );

  return (
    <Fragment>
      On average, each person in {locationName} with COVID is infecting{' '}
      {formatDecimal(rt)} other people. {epidemiologyReasoning}
    </Fragment>
  );
}

function renderDisclaimer(): React.ReactElement {
  return (
    <Fragment>
      Each data point is a 14-day weighted average. We present the most recent
      seven days of data as a dashed line, as data is often revised by states
      several days after reporting. Learn more about{' '}
      <ExternalLink href="https://docs.google.com/document/d/1cd_cEpNiIl1TzUJBvw9sHLbrbUZ2qCxgN32IqVLa3Do/edit">
        our methodology
      </ExternalLink>{' '}
      and{' '}
      <ExternalLink href="https://docs.google.com/presentation/d/1XmKCBWYZr9VQKFAdWh_D7pkpGGM_oR9cPjj-UrNdMJQ/edit">
        our data sources
      </ExternalLink>
      .
    </Fragment>
  );
}

function renderThermometer(): React.ReactElement {
  const levelInfo = CASE_GROWTH_RATE_LEVEL_INFO_MAP;
  const levelCritical = levelInfo[Level.CRITICAL];
  const levelHigh = levelInfo[Level.HIGH];
  const levelMedium = levelInfo[Level.MEDIUM];
  const levelLow = levelInfo[Level.LOW];

  const items = [
    {
      title: `Over ${levelHigh.upperLimit}`,
      description: levelCritical.detail(),
      color: levelCritical.color,
      roundTop: true,
      roundBottom: false,
    },
    {
      title: `${levelMedium.upperLimit} - ${levelHigh.upperLimit}`,
      description: levelHigh.detail(),
      color: levelHigh.color,
      roundTop: false,
      roundBottom: false,
    },
    {
      title: `${levelLow.upperLimit} - ${levelMedium.upperLimit}`,
      description: levelMedium.detail(),
      color: levelMedium.color,
      roundTop: false,
      roundBottom: false,
    },
    {
      title: `Under ${levelLow.upperLimit}`,
      description: levelLow.detail(),
      color: levelLow.color,
      roundTop: false,
      roundBottom: true,
    },
  ];
  return <Thermometer items={items} />;
}
