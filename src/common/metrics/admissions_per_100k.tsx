import React, { Fragment } from 'react';
import { COLOR_MAP } from 'common/colors';
import { Projections } from 'common/models/Projections';
import { formatDecimal } from 'common/utils';
import { formatInteger } from '@actnowcoalition/number-format';
import Thermometer from 'components/Thermometer';
import { MetricDefinition } from './interfaces';
import { Metric } from 'common/metricEnum';
import { InfoTooltip, renderTooltipContent } from 'components/InfoTooltip';
import { metricToTooltipMap } from 'cms-content/tooltips';
import { trackOpenTooltip } from 'components/InfoTooltip';
import { Level, LevelInfoMap } from 'common/level';

export const AdmissionsPer100kMetric: MetricDefinition = {
  renderStatus,
  renderThermometer,
  renderInfoTooltip,
  metricName: 'Weekly COVID admissions',
  extendedMetricName: 'Weekly hospital admissions of COVID patients per 100k',
  metricNameForCompare: `Weekly COVID admissions per 100k`,
  metricNameForSummaryStat: 'Admissions',
};

const LIMIT_LOW = 10;
const LIMIT_MEDIUM = 19.999;
const LIMIT_HIGH = Infinity;

export const ADMISSIONS_PER_100K_LEVEL_INFO_MAP: LevelInfoMap = {
  [Level.LOW]: {
    level: Level.LOW,
    upperLimit: LIMIT_LOW,
    name: 'Low',
    color: COLOR_MAP.GREEN.BASE,
  },
  [Level.MEDIUM]: {
    level: Level.MEDIUM,
    upperLimit: LIMIT_MEDIUM,
    name: 'Medium',
    color: COLOR_MAP.ORANGE.BASE,
  },
  [Level.HIGH]: {
    level: Level.HIGH,
    upperLimit: LIMIT_HIGH,
    name: 'High',
    color: COLOR_MAP.ORANGE_DARK.BASE,
  },
  [Level.UNKNOWN]: {
    level: Level.UNKNOWN,
    upperLimit: 0,
    name: 'Unknown',
    color: COLOR_MAP.GRAY.BASE,
  },

  // Not to be used:
  [Level.CRITICAL]: {
    level: Level.CRITICAL,
    upperLimit: LIMIT_HIGH,
    name: 'Critical',
    color: COLOR_MAP.RED.BASE,
  },
  [Level.SUPER_CRITICAL]: {
    level: Level.SUPER_CRITICAL,
    upperLimit: LIMIT_HIGH,
    name: 'Extreme',
    color: COLOR_MAP.RED.DARK,
  },
};

function renderStatus(projections: Projections): React.ReactElement {
  const {
    totalPopulation,
    currentWeeklyCovidAdmissions,
    hsaName,
  } = projections.primary;
  const weeklyCovidAdmissionsPer100k = projections.getMetricValue(
    Metric.ADMISSIONS_PER_100K,
  );

  // NOTE: We reverse engineer the actual weekly admissions number for counties because the HHS source
  // data does not match due to data suppression.
  let weeklyCovidAdmissionsCdc: number | null = null;
  if (
    weeklyCovidAdmissionsPer100k !== null &&
    projections.primary.hsaPopulation !== null
  ) {
    weeklyCovidAdmissionsCdc =
      weeklyCovidAdmissionsPer100k *
      (projections.primary.hsaPopulation / 100_000);
  }

  const weeklyNewCovidAdmissions = projections.isCounty
    ? weeklyCovidAdmissionsCdc
    : currentWeeklyCovidAdmissions;
  const locationName = projections.locationName;
  if (
    weeklyCovidAdmissionsPer100k === null ||
    totalPopulation === null ||
    weeklyNewCovidAdmissions === null
  ) {
    return (
      <Fragment>
        Unable to generate{' '}
        {AdmissionsPer100kMetric.extendedMetricName.toLowerCase()}. This could
        be due to insufficient data.
      </Fragment>
    );
  }

  const hsaCopy = `the ${hsaName} Health Service Area`;
  // Try not to round to zero (since it will probably be >0 per 100k).
  const weeklyNewCovidAdmissionsText =
    weeklyNewCovidAdmissions >= 0.1 && weeklyNewCovidAdmissions < 1
      ? formatDecimal(weeklyNewCovidAdmissions, 1)
      : formatInteger(weeklyNewCovidAdmissions);

  return (
    <Fragment>
      Over the last week, {projections.isCounty ? hsaCopy : locationName} had{' '}
      {weeklyNewCovidAdmissionsText} new COVID hospital admissions (
      <b>{formatDecimal(weeklyCovidAdmissionsPer100k, 1)}</b> for every 100,000
      residents). Grading is not applied to weekly COVID admissions prior to
      April 18, 2022, indicated by the dotted line. This date marks our change
      to measure community risk levels, a framework that is only relevant for
      the current phase of the pandemic.
    </Fragment>
  );
}

function renderThermometer(): React.ReactElement {
  const levelInfo = ADMISSIONS_PER_100K_LEVEL_INFO_MAP;
  const levelHigh = levelInfo[Level.HIGH];
  const levelMedium = levelInfo[Level.MEDIUM];
  const levelLow = levelInfo[Level.LOW];

  const items = [
    {
      title: `Over 19.9`,
      color: levelHigh.color,
      roundTop: true,
      roundBottom: false,
    },
    {
      title: '10-19.9',
      color: levelMedium.color,
      roundTop: false,
      roundBottom: false,
    },
    {
      title: 'Under 10',
      color: levelLow.color,
      roundTop: false,
      roundBottom: true,
    },
  ];
  return <Thermometer items={items} />;
}

function renderInfoTooltip(): React.ReactElement {
  const { body } = metricToTooltipMap[
    Metric.ADMISSIONS_PER_100K
  ].metricDefinition;

  return (
    <InfoTooltip
      title={renderTooltipContent(body)}
      aria-label={`Show definition of ${AdmissionsPer100kMetric.metricName} metric`}
      trackOpenTooltip={() =>
        trackOpenTooltip(`Metric definition: ${Metric.ADMISSIONS_PER_100K}`)
      }
    />
  );
}
