import React, { Fragment } from 'react';
import { COLOR_MAP } from 'common/colors';
import { Level, LevelInfoMap } from 'common/level';
import { Metric } from 'common/metricEnum';
import { formatPercent } from 'common/utils';
import { Projections } from 'common/models/Projections';
import { MetricDefinition } from './interfaces';
import Thermometer from 'components/Thermometer';
import { InfoTooltip, renderTooltipContent } from 'components/InfoTooltip';
import { metricToTooltipMap } from 'cms-content/tooltips';
import { trackOpenTooltip } from 'components/InfoTooltip';
import { getRegionMetricOverride } from 'cms-content/region-overrides';
import { getDataset, isEmpty } from 'common/models/ProjectionsPair';

const METRIC_NAME = 'Positive test rate';

export const PositiveTestRateMetric: MetricDefinition = {
  renderStatus,
  renderThermometer,
  renderInfoTooltip,
  metricName: METRIC_NAME,
  extendedMetricName: METRIC_NAME,
  metricNameForCompare: METRIC_NAME,
  metricNameForSummaryStat: METRIC_NAME,
};

const LOW_NAME = 'Low';
const MEDIUM_NAME = 'Medium';
const MEDIUM_HIGH_NAME = 'High';
const HIGH_NAME = 'Critical';
const UNKNOWN = 'Unknown';

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
  },

  [Level.MEDIUM]: {
    level: Level.MEDIUM,
    upperLimit: LIMIT_MEDIUM,
    name: MEDIUM_NAME,
    color: COLOR_MAP.ORANGE.BASE,
  },
  [Level.HIGH]: {
    level: Level.HIGH,
    upperLimit: LIMIT_MEDIUM_HIGH,
    name: MEDIUM_HIGH_NAME,
    color: COLOR_MAP.ORANGE_DARK.BASE,
  },
  [Level.CRITICAL]: {
    level: Level.CRITICAL,
    upperLimit: LIMIT_HIGH,
    name: HIGH_NAME,
    color: COLOR_MAP.RED.BASE,
  },
  // We don't have a SUPER_CRITICAL threshold, so upperLimit is same as CRITICAL to hide it.
  [Level.SUPER_CRITICAL]: {
    level: Level.SUPER_CRITICAL,
    upperLimit: LIMIT_HIGH,
    name: HIGH_NAME,
    color: COLOR_MAP.RED.BASE,
  },
  [Level.UNKNOWN]: {
    level: Level.UNKNOWN,
    upperLimit: 0,
    name: UNKNOWN,
    color: COLOR_MAP.GRAY.BASE,
  },
};

function renderStatus(projections: Projections) {
  const currentTestPositiveRate = projections.getMetricValue(
    Metric.POSITIVE_TESTS,
  );
  const { locationName, region } = projections;
  const isBlocked = getRegionMetricOverride(region, Metric.POSITIVE_TESTS)
    ?.blocked;
  const timeseries = getDataset(projections.primary, Metric.POSITIVE_TESTS);
  const timeseriesEmpty = isEmpty(timeseries);

  if (isBlocked || timeseriesEmpty) {
    return (
      <Fragment>
        Unable to generate up-to-date{' '}
        {PositiveTestRateMetric.extendedMetricName.toLowerCase()}. This could be
        due to missing or unreliable data.{' '}
      </Fragment>
    );
  }

  if (currentTestPositiveRate === null) {
    return (
      <Fragment>
        Data for {PositiveTestRateMetric.extendedMetricName.toLowerCase()} is
        out of date. We display timeseries data for historical purposes, but it
        should not be used for current guidance. Missing data may be caused by
        lack of reporting from local sources.{' '}
      </Fragment>
    );
  }
  const percentage = formatPercent(currentTestPositiveRate, 1);

  return (
    <Fragment>
      As of May 2024, {percentage} of COVID tests in {locationName} were
      positive. The positive test rate does not include data on at-home positive
      tests.
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
      description: 'Inadequate testing',
      color: levelCritical.color,
      roundTop: true,
      roundBottom: false,
    },
    {
      title: `${format(levelMedium.upperLimit)} - ${format(
        levelHigh.upperLimit,
      )}`,
      color: levelHigh.color,
      roundTop: false,
      roundBottom: false,
    },
    {
      title: `${format(levelLow.upperLimit)} - ${format(
        levelMedium.upperLimit,
      )}`,
      color: levelMedium.color,
      roundTop: false,
      roundBottom: false,
    },
    {
      title: `Under ${format(levelLow.upperLimit)}`,
      description: 'Adequate testing',
      color: levelLow.color,
      roundTop: false,
      roundBottom: true,
    },
  ];
  return <Thermometer items={items} />;
}

function renderInfoTooltip(): React.ReactElement {
  const { body } = metricToTooltipMap[Metric.POSITIVE_TESTS].metricDefinition;

  return (
    <InfoTooltip
      title={renderTooltipContent(body)}
      aria-label={`Show definition of ${PositiveTestRateMetric.metricName} metric`}
      trackOpenTooltip={() =>
        trackOpenTooltip(`Metric definition: ${Metric.POSITIVE_TESTS}`)
      }
    />
  );
}
