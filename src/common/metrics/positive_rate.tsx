import React, { Fragment } from 'react';
import { COLOR_MAP } from 'common/colors';
import { Level, LevelInfoMap } from 'common/level';
import { levelText } from 'common/utils/chart';
import { getLevel, Metric } from 'common/metric';
import { formatPercent } from 'common/utils';
import { Projections } from 'common/models/Projections';
import { MetricDefinition } from './interfaces';
import ExternalLink from 'components/ExternalLink';
import Thermometer from 'components/Thermometer';

const METRIC_NAME = 'Positive test rate';

export const PositiveTestRateMetric: MetricDefinition = {
  renderStatus,
  renderDisclaimer,
  renderThermometer,
  metricName: METRIC_NAME,
  extendedMetricName: METRIC_NAME,
  metricNameForCompare: METRIC_NAME,
};

const LOW_NAME = 'Low';
const MEDIUM_NAME = 'Medium';
const MEDIUM_HIGH_NAME = 'High';
const HIGH_NAME = 'Critical';
const UNKNOWN = 'Unknown';

const SHORT_DESCRIPTION_LOW = 'Indicates widespread testing';
const SHORT_DESCRIPTION_MEDIUM = 'Indicates adequate testing';
const SHORT_DESCRIPTION_MEDIUM_HIGH = 'Indicates insufficient testing';
const SHORT_DESCRIPTION_HIGH = 'Indicates dangerously little testing';
const SHORT_DESCRIPTION_UNKNOWN = 'Insufficient data to assess';

const LIMIT_LOW = 0.03;
const LIMIT_MEDIUM = 0.1;
const LIMIT_MEDIUM_HIGH = 0.2;
const LIMIT_HIGH = Infinity;

export const POSITIVE_TESTS_LEVEL_INFO_MAP: LevelInfoMap = {
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
  // We don't have a SUPER_CRITICAL threshold, so upperLimit is same as CRITICAL to hide it.
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

function renderStatus(projections: Projections) {
  const { currentTestPositiveRate, locationName } = projections.primary;
  if (currentTestPositiveRate === null) {
    const fips = projections.fips;
    if ((fips.length > 2 && fips.startsWith('12')) || fips.startsWith('42')) {
      return (
        <Fragment>
          {PositiveTestRateMetric.extendedMetricName} is currently unavailable
          for {projections.locationName} while we make improvements to our data
          source.
        </Fragment>
      );
    }
    return (
      <Fragment>
        Unable to generate{' '}
        {PositiveTestRateMetric.extendedMetricName.toLowerCase()}. This could be
        due to insufficient data.
      </Fragment>
    );
  }
  const level = getLevel(Metric.POSITIVE_TESTS, currentTestPositiveRate);
  const lowSizableLarge = levelText(
    level,
    'low',
    'significant',
    'relatively high',
    'relatively high',
  );
  const percentage = formatPercent(currentTestPositiveRate, 1);

  const testingBroadlyText = levelText(
    level,
    `which suggests enough widespread, aggressive testing in ${locationName} to detect most new cases`,
    `meaning that ${locationName}’s testing meets WHO minimums but needs to be further expanded to detect most new cases`,
    `which indicates that testing in ${locationName} is limited and that most cases may go undetected`,
    `which indicates that testing in ${locationName} is limited and that most cases likely go undetected`,
  );

  const textForecast = levelText(
    level,
    `Identifying and isolating new cases can help contain COVID without resorting to lockdowns`,
    `Identifying and isolating new cases can help contain COVID without resorting to lockdowns`,
    `At these levels, it is hard to know how fast COVID is actually spreading, and there is risk of being surprised by a second wave of disease. Caution is warranted`,
    `At these levels, it is hard to know how fast COVID is actually spreading, and there is very high risk of being surprised by a wave of disease. More testing urgently needed`,
  );

  return (
    <Fragment>
      A {lowSizableLarge} percentage ({percentage}) of COVID tests were
      positive, {testingBroadlyText}. {textForecast}.
    </Fragment>
  );
}

function renderDisclaimer(projections: Projections): React.ReactElement {
  const usingCMSData =
    projections.primary.testPositiveRateSource === 'CDCTesting';
  return (
    <Fragment>
      The World Health Organization recommends a positive test rate of less than
      10%. The countries most successful in containing COVID have rates of 3% or
      less.{' '}
      {usingCMSData ? (
        <React.Fragment>
          {METRIC_NAME} for {projections.locationName} comes from data
          aggregated by the Centers for Medicare and Medicaid Services. It is
          calculated as a 14-day trailing average and may take a week or more to
          update.
        </React.Fragment>
      ) : (
        <React.Fragment>
          We calculate the rate as a 7-day trailing average.
        </React.Fragment>
      )}{' '}
      Learn more about{' '}
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
  const levelInfo = POSITIVE_TESTS_LEVEL_INFO_MAP;
  const levelCritical = levelInfo[Level.CRITICAL];
  const levelHigh = levelInfo[Level.HIGH];
  const levelMedium = levelInfo[Level.MEDIUM];
  const levelLow = levelInfo[Level.LOW];

  const format = (value: number) => formatPercent(value, 0);

  const items = [
    {
      title: `Over ${format(levelHigh.upperLimit)}`,
      description: levelCritical.detail(),
      color: levelCritical.color,
      roundTop: true,
      roundBottom: false,
    },
    {
      title: `${format(levelMedium.upperLimit)} - ${format(
        levelHigh.upperLimit,
      )}`,
      description: levelHigh.detail(),
      color: levelHigh.color,
      roundTop: false,
      roundBottom: false,
    },
    {
      title: `${format(levelLow.upperLimit)} - ${format(
        levelMedium.upperLimit,
      )}`,
      description: levelMedium.detail(),
      color: levelMedium.color,
      roundTop: false,
      roundBottom: false,
    },
    {
      title: `Under ${format(levelLow.upperLimit)}`,
      description: levelLow.detail(),
      color: levelLow.color,
      roundTop: false,
      roundBottom: true,
    },
  ];
  return <Thermometer items={items} />;
}
