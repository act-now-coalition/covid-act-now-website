import React, { Fragment } from 'react';
import { COLOR_MAP } from 'common/colors';
import { Projections } from 'common/models/Projections';
import { formatDecimal, formatInteger } from 'common/utils';
import Thermometer from 'components/Thermometer';
import { MetricDefinition } from './interfaces';
import { Metric } from 'common/metricEnum';
import { InfoTooltip, renderTooltipContent } from 'components/InfoTooltip';
import { metricToTooltipMap } from 'cms-content/tooltips';
import { trackOpenTooltip } from 'components/InfoTooltip';
import { Level, LevelInfoMap } from 'common/level';

// TODO(8.2) : Update with real metric + content:

export const WeeklyNewCasesPer100kMetric: MetricDefinition = {
  renderStatus,
  renderThermometer,
  renderInfoTooltip,
  metricName: 'Weekly new cases',
  extendedMetricName: 'Weekly new cases per 100k population',
  metricNameForCompare: `Weekly new cases per 100k`,
  metricNameForSummaryStat: 'Weekly new cases',
};

export const WEEKLY_NEW_CASES_PER_100K_LEVEL_INFO_MAP: LevelInfoMap = {
  [Level.LOW]: {
    level: Level.LOW,
    upperLimit: 1,
    name: 'Low',
    color: COLOR_MAP.GREEN.BASE,
    detail: () => 'COVID is being effectively contained',
  },
  [Level.MEDIUM]: {
    level: Level.MEDIUM,
    upperLimit: 10,
    name: 'Medium',
    color: COLOR_MAP.ORANGE.BASE,
    detail: () => 'COVID not contained, but at low levels',
  },
  [Level.HIGH]: {
    level: Level.HIGH,
    upperLimit: 25,
    name: 'High',
    color: COLOR_MAP.ORANGE_DARK.BASE,
    detail: () => 'Very large number of new cases',
  },
  [Level.UNKNOWN]: {
    level: Level.UNKNOWN,
    upperLimit: 0,
    name: 'Unknown',
    color: COLOR_MAP.GRAY.BASE,
    detail: () => 'Insufficient data to assess',
  },

  // Not to be used:
  [Level.CRITICAL]: {
    level: Level.CRITICAL,
    upperLimit: 75,
    name: 'Critical',
    color: COLOR_MAP.RED.BASE,
    detail: () => 'Dangerous number of new cases',
  },
  [Level.SUPER_CRITICAL]: {
    level: Level.SUPER_CRITICAL,
    upperLimit: Infinity,
    name: 'Extreme',
    color: COLOR_MAP.RED.DARK,
    detail: () => 'Very dangerous number of new cases',
  },
};

function renderStatus(projections: Projections): React.ReactElement {
  const { totalPopulation, currentDailyAverageCases } = projections.primary;
  const currentCaseDensity = projections.getMetricValue(Metric.CASE_DENSITY);
  const locationName = projections.locationName;
  if (
    currentCaseDensity === null ||
    totalPopulation === null ||
    currentDailyAverageCases === null
  ) {
    return (
      <Fragment>
        Unable to generate{' '}
        {WeeklyNewCasesPer100kMetric.extendedMetricName.toLowerCase()}. This
        could be due to insufficient data.
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
  const levelInfo = WEEKLY_NEW_CASES_PER_100K_LEVEL_INFO_MAP;
  const levelHigh = levelInfo[Level.HIGH];
  const levelMedium = levelInfo[Level.MEDIUM];
  const levelLow = levelInfo[Level.LOW];

  const items = [
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
      aria-label={`Show definition of ${WeeklyNewCasesPer100kMetric.metricName} metric`}
      trackOpenTooltip={() =>
        trackOpenTooltip(`Metric definition: ${Metric.CASE_DENSITY}`)
      }
    />
  );
}
