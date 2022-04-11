import React, { Fragment } from 'react';
import { COLOR_MAP } from 'common/colors';
import { Projections } from 'common/models/Projections';
import { formatPercent } from 'common/utils';
import Thermometer from 'components/Thermometer';
import { MetricDefinition } from './interfaces';
import { Metric } from 'common/metricEnum';
import { InfoTooltip, renderTooltipContent } from 'components/InfoTooltip';
import { metricToTooltipMap } from 'cms-content/tooltips';
import { trackOpenTooltip } from 'components/InfoTooltip';
import { Level, LevelInfoMap } from 'common/level';

// TODO(8.2) : Update with real metric + content:

export const RatioBedsWithCovidPatientsMetric: MetricDefinition = {
  renderStatus,
  renderThermometer,
  renderInfoTooltip,
  metricName: 'Patients w/ COVID',
  extendedMetricName:
    'Percent of staffed inpatient beds occupied by COVID patients',
  metricNameForCompare: `Patients w/ COVID (% of all beds)`,
  metricNameForSummaryStat: 'Patients w/ COVID',
};

const LIMIT_LOW = 0.1;
const LIMIT_MEDIUM = 0.14999;
const LIMIT_HIGH = 1;

export const RATIO_BEDS_WITH_COVID_PATIENTS_LEVEL_INFO_MAP: LevelInfoMap = {
  [Level.LOW]: {
    level: Level.LOW,
    upperLimit: LIMIT_LOW,
    name: 'Low',
    color: COLOR_MAP.GREEN.BASE,
    detail: () => 'COVID is being effectively contained',
  },
  [Level.MEDIUM]: {
    level: Level.MEDIUM,
    upperLimit: LIMIT_MEDIUM,
    name: 'Medium',
    color: COLOR_MAP.ORANGE.BASE,
    detail: () => 'COVID not contained, but at low levels',
  },
  [Level.HIGH]: {
    level: Level.HIGH,
    upperLimit: LIMIT_HIGH,
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
  const currentRatioBedsWithCovid = projections.getMetricValue(
    Metric.RATIO_BEDS_WITH_COVID,
  );
  const locationName = projections.locationName;
  if (currentRatioBedsWithCovid === null) {
    return (
      <Fragment>
        Unable to generate{' '}
        {RatioBedsWithCovidPatientsMetric.extendedMetricName.toLowerCase()}.
        This could be due to insufficient data.
      </Fragment>
    );
  }

  return (
    <Fragment>
      {formatPercent(currentRatioBedsWithCovid)} of staffed inpatient beds in{' '}
      {locationName} are occupied by COVID patients.
    </Fragment>
  );
}

function renderThermometer(): React.ReactElement {
  const levelInfo = RATIO_BEDS_WITH_COVID_PATIENTS_LEVEL_INFO_MAP;
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
  const { body } = metricToTooltipMap[
    Metric.RATIO_BEDS_WITH_COVID
  ].metricDefinition;

  return (
    <InfoTooltip
      title={renderTooltipContent(body)}
      aria-label={`Show definition of ${RatioBedsWithCovidPatientsMetric.metricName} metric`}
      trackOpenTooltip={() =>
        trackOpenTooltip(`Metric definition: ${Metric.RATIO_BEDS_WITH_COVID}`)
      }
    />
  );
}
