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

export const RatioBedsWithCovidPatientsMetric: MetricDefinition = {
  renderStatus,
  renderThermometer,
  renderInfoTooltip,
  metricName: 'Patients w/ COVID',
  extendedMetricName:
    'Percent of staffed inpatient beds occupied by COVID patients',
  metricNameForCompare: `Patients w/ COVID (% of all beds)`,
  metricNameForSummaryStat: 'Patients',
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

  const hsaCopy = `the ${projections.primary.hsaName} Health Service Area`;
  return (
    <Fragment>
      {formatPercent(currentRatioBedsWithCovid)} of staffed inpatient beds in{' '}
      {projections.isCounty ? hsaCopy : locationName} are occupied by COVID
      patients.
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
      title: 'Over 15%',
      color: levelHigh.color,
      roundTop: true,
      roundBottom: false,
    },
    {
      title: '10% - 14.9%',
      color: levelMedium.color,
      roundTop: false,
      roundBottom: false,
    },
    {
      title: 'Under 10%',
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
