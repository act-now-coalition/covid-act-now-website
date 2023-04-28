import React, { Fragment } from 'react';
import { COLOR_MAP } from 'common/colors';
import { Level, LevelInfoMap } from 'common/level';
import { Metric } from 'common/metricEnum';
import { formatDecimal } from 'common/utils';
import { Projections } from 'common/models/Projections';
import { MetricDefinition } from './interfaces';
import Thermometer from 'components/Thermometer';
import { InfoTooltip, renderTooltipContent } from 'components/InfoTooltip';
import { metricToTooltipMap } from 'cms-content/tooltips';
import { trackOpenTooltip } from 'components/InfoTooltip';
import { getRegionMetricOverride } from 'cms-content/region-overrides';
import { getDataset, isEmpty } from 'common/models/ProjectionsPair';

const METRIC_NAME = 'Infection rate';

export const CaseGrowthMetric: MetricDefinition = {
  renderStatus,
  renderThermometer,
  renderInfoTooltip,
  metricName: METRIC_NAME,
  extendedMetricName: METRIC_NAME,
  metricNameForCompare: METRIC_NAME,
  metricNameForSummaryStat: METRIC_NAME,
};

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

function renderStatus(projections: Projections): React.ReactElement {
  const rt = projections.getMetricValue(Metric.CASE_GROWTH_RATE);
  const { locationName, region } = projections;
  const isBlocked = getRegionMetricOverride(region, Metric.CASE_GROWTH_RATE)
    ?.blocked;
  const timeseries = getDataset(projections.primary, Metric.CASE_GROWTH_RATE);
  const timeseriesEmpty = isEmpty(timeseries);

  if (isBlocked || timeseriesEmpty) {
    return (
      <Fragment>
        Unable to generate up-to-date{' '}
        {CaseGrowthMetric.extendedMetricName.toLowerCase()}. This could be due
        to missing or unreliable data.{' '}
      </Fragment>
    );
  }

  if (rt === null) {
    return (
      <Fragment>
        Data for {CaseGrowthMetric.extendedMetricName.toLowerCase()} is out of
        date. We display timeseries data for for historical purposes, but it
        should not be used for current guidance. Missing data may be caused by
        lack of reporting from local sources.{' '}
      </Fragment>
    );
  }

  return (
    <Fragment>
      On average, each person in {locationName} with COVID is infecting{' '}
      {formatDecimal(rt)} other people. If this number is over 1.0, it means
      that the total number of COVID cases is growing.
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
      description: 'COVID increasing exponentially',
      color: levelCritical.color,
      roundTop: true,
      roundBottom: false,
    },
    {
      title: `${levelMedium.upperLimit} - ${levelHigh.upperLimit}`,
      color: levelHigh.color,
      roundTop: false,
      roundBottom: false,
    },
    {
      title: `${levelLow.upperLimit} - ${levelMedium.upperLimit}`,
      color: levelMedium.color,
      roundTop: false,
      roundBottom: false,
    },
    {
      title: `Under ${levelLow.upperLimit}`,
      description: 'COVID decreasing',
      color: levelLow.color,
      roundTop: false,
      roundBottom: true,
    },
  ];
  return <Thermometer items={items} />;
}

function renderInfoTooltip(): React.ReactElement {
  const { body } = metricToTooltipMap[Metric.CASE_GROWTH_RATE].metricDefinition;

  return (
    <InfoTooltip
      title={renderTooltipContent(body)}
      aria-label={`Show definition of ${CaseGrowthMetric.metricName} metric`}
      trackOpenTooltip={() =>
        trackOpenTooltip(`Metric definition: ${Metric.CASE_GROWTH_RATE}`)
      }
    />
  );
}
