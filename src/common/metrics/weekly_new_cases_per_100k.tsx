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

export const WeeklyNewCasesPer100kMetric: MetricDefinition = {
  renderStatus,
  renderThermometer,
  renderInfoTooltip,
  metricName: 'Weekly new reported cases',
  extendedMetricName: 'Weekly new reported cases per 100k',
  metricNameForCompare: `Weekly new cases per 100k`,
  metricNameForSummaryStat: 'Cases',
};

const LIMIT_LOW = 200;
const LIMIT_HIGH = Infinity;

// Weekly new cases doesn't have a medium level, only low and high. So we use the following variables for both medium and high:
const colorHigh = COLOR_MAP.ORANGE.BASE;
const nameHigh = 'Higher';

export const WEEKLY_NEW_CASES_PER_100K_LEVEL_INFO_MAP: LevelInfoMap = {
  [Level.LOW]: {
    level: Level.LOW,
    upperLimit: LIMIT_LOW,
    name: 'Lower',
    color: COLOR_MAP.GREEN.BASE,
    detail: () => 'COVID is being effectively contained',
  },
  [Level.MEDIUM]: {
    level: Level.MEDIUM,
    upperLimit: LIMIT_HIGH,
    name: nameHigh,
    color: colorHigh,
    detail: () => 'COVID not contained, but at low levels',
  },
  [Level.HIGH]: {
    level: Level.HIGH,
    upperLimit: LIMIT_HIGH,
    name: nameHigh,
    color: colorHigh,
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
    upperLimit: LIMIT_HIGH,
    name: 'Critical',
    color: COLOR_MAP.RED.BASE,
    detail: () => 'Dangerous number of new cases',
  },
  [Level.SUPER_CRITICAL]: {
    level: Level.SUPER_CRITICAL,
    upperLimit: LIMIT_HIGH,
    name: 'Extreme',
    color: COLOR_MAP.RED.DARK,
    detail: () => 'Very dangerous number of new cases',
  },
};

function renderStatus(projections: Projections): React.ReactElement {
  const { totalPopulation, currentDailyAverageCases } = projections.primary;
  const currentWeeklyReportedCases = projections.getMetricValue(
    Metric.WEEKLY_CASES_PER_100K,
  );
  const locationName = projections.locationName;
  if (
    currentWeeklyReportedCases === null ||
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

  const newCasesPerWeek = currentDailyAverageCases * 7;
  const newCasesPerWeekText = formatInteger(newCasesPerWeek);

  return (
    <Fragment>
      Over the last week, {locationName} had {newCasesPerWeekText} new reported
      cases (<b>{formatDecimal(currentWeeklyReportedCases, 1)}</b> for every
      100,000 residents). Reported cases do not include all at-home positive
      tests.
    </Fragment>
  );
}

function renderThermometer(): React.ReactElement {
  const levelInfo = WEEKLY_NEW_CASES_PER_100K_LEVEL_INFO_MAP;
  const levelHigh = levelInfo[Level.HIGH];
  const levelLow = levelInfo[Level.LOW];

  const items = [
    {
      title: `> ${LIMIT_LOW}`,
      color: levelHigh.color,
      roundTop: true,
      roundBottom: false,
    },
    {
      title: `≤ ${LIMIT_LOW}`,
      color: levelLow.color,
      roundTop: false,
      roundBottom: true,
    },
  ];
  return <Thermometer items={items} />;
}

function renderInfoTooltip(): React.ReactElement {
  const { body } = metricToTooltipMap[
    Metric.WEEKLY_CASES_PER_100K
  ].metricDefinition;

  return (
    <InfoTooltip
      title={renderTooltipContent(body)}
      aria-label={`Show definition of ${WeeklyNewCasesPer100kMetric.metricName} metric`}
      trackOpenTooltip={() =>
        trackOpenTooltip(`Metric definition: ${Metric.WEEKLY_CASES_PER_100K}`)
      }
    />
  );
}
