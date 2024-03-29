import React, { Fragment } from 'react';
import { COLOR_MAP } from 'common/colors';
import { Level, LevelInfoMap } from 'common/level';
import { Projections } from 'common/models/Projections';
import { formatDecimal } from 'common/utils';
import { formatInteger } from '@actnowcoalition/number-format';
import Thermometer from 'components/Thermometer';
import { MetricDefinition } from './interfaces';
import { Metric } from 'common/metricEnum';
import { InfoTooltip, renderTooltipContent } from 'components/InfoTooltip';
import { metricToTooltipMap } from 'cms-content/tooltips';
import { trackOpenTooltip } from 'components/InfoTooltip';
import { getRegionMetricOverride } from 'cms-content/region-overrides';
import { getDataset, isEmpty } from 'common/models/ProjectionsPair';

export const CaseIncidenceMetric: MetricDefinition = {
  renderStatus,
  renderThermometer,
  renderInfoTooltip,
  metricName: 'Daily new cases',
  extendedMetricName: 'Daily new cases per 100k population',
  metricNameForCompare: `Daily new cases per 100k`,
  metricNameForSummaryStat: 'Daily new cases',
};

export const CASE_DENSITY_LEVEL_INFO_MAP: LevelInfoMap = {
  [Level.LOW]: {
    level: Level.LOW,
    upperLimit: 1,
    name: 'Low',
    color: COLOR_MAP.GREEN.BASE,
  },
  [Level.MEDIUM]: {
    level: Level.MEDIUM,
    upperLimit: 10,
    name: 'Medium',
    color: COLOR_MAP.ORANGE.BASE,
  },
  [Level.HIGH]: {
    level: Level.HIGH,
    upperLimit: 25,
    name: 'High',
    color: COLOR_MAP.ORANGE_DARK.BASE,
  },
  [Level.CRITICAL]: {
    level: Level.CRITICAL,
    upperLimit: 75,
    name: 'Critical',
    color: COLOR_MAP.RED.BASE,
  },
  [Level.SUPER_CRITICAL]: {
    level: Level.SUPER_CRITICAL,
    upperLimit: Infinity,
    name: 'Extreme',
    color: COLOR_MAP.RED.DARK,
  },
  [Level.UNKNOWN]: {
    level: Level.UNKNOWN,
    upperLimit: 0,
    name: 'Unknown',
    color: COLOR_MAP.GRAY.BASE,
  },
};

function renderStatus(projections: Projections): React.ReactElement {
  const {
    totalPopulation,
    currentDailyAverageCases,
    region,
  } = projections.primary;
  const currentCaseDensity = projections.getMetricValue(Metric.CASE_DENSITY);
  const locationName = projections.locationName;
  const isBlocked = getRegionMetricOverride(region, Metric.CASE_DENSITY)
    ?.blocked;
  const timeseries = getDataset(projections.primary, Metric.CASE_DENSITY);
  const timeseriesEmpty = isEmpty(timeseries);

  if (isBlocked || timeseriesEmpty) {
    return (
      <Fragment>
        Unable to generate up-to-date{' '}
        {CaseIncidenceMetric.extendedMetricName.toLowerCase()}. This could be
        due to missing or unreliable data.{' '}
      </Fragment>
    );
  }

  if (
    currentCaseDensity === null ||
    totalPopulation === null ||
    currentDailyAverageCases === null
  ) {
    return (
      <Fragment>
        Data for {CaseIncidenceMetric.extendedMetricName.toLowerCase()} is out
        of date. We display timeseries data for historical purposes, but it
        should not be used for current guidance. Missing data may be caused by
        lack of reporting from local sources.{' '}
      </Fragment>
    );
  }

  const newCasesPerDay = currentDailyAverageCases;
  // Try not to round cases/day to zero (since it will probably be >0 per 100k).
  const newCasesPerDayText =
    newCasesPerDay >= 0.1 && newCasesPerDay < 1
      ? formatDecimal(newCasesPerDay, 1)
      : formatInteger(newCasesPerDay);

  return (
    <Fragment>
      Over the last week, {locationName} has averaged {newCasesPerDayText} new
      confirmed cases per day (<b>{formatDecimal(currentCaseDensity, 1)}</b> for
      every 100,000 residents).
    </Fragment>
  );
}

function renderThermometer(): React.ReactElement {
  const levelInfo = CASE_DENSITY_LEVEL_INFO_MAP;
  const levelExtreme = levelInfo[Level.SUPER_CRITICAL];
  const levelCritical = levelInfo[Level.CRITICAL];
  const levelHigh = levelInfo[Level.HIGH];
  const levelMedium = levelInfo[Level.MEDIUM];
  const levelLow = levelInfo[Level.LOW];

  const items = [
    {
      title: `Over ${levelCritical.upperLimit}`,
      description: 'Extremely high risk',
      color: levelExtreme.color,
      roundTop: true,
      roundBottom: false,
    },
    {
      title: `${levelHigh.upperLimit} - ${levelCritical.upperLimit}`,
      color: levelCritical.color,
      roundTop: false,
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
      description: 'On track for containment',
      color: levelLow.color,
      roundTop: false,
      roundBottom: true,
    },
  ];
  return <Thermometer items={items} />;
}

function renderInfoTooltip(): React.ReactElement {
  const { body } = metricToTooltipMap[Metric.CASE_DENSITY].metricDefinition;

  return (
    <InfoTooltip
      title={renderTooltipContent(body)}
      aria-label={`Show definition of ${CaseIncidenceMetric.metricName} metric`}
      trackOpenTooltip={() =>
        trackOpenTooltip(`Metric definition: ${Metric.CASE_DENSITY}`)
      }
    />
  );
}
