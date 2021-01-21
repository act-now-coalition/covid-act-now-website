import React, { Fragment } from 'react';
import { COLOR_MAP } from 'common/colors';
import { Level, LevelInfoMap } from 'common/level';
import { levelText } from 'common/utils/chart';
import { getLevel, Metric } from 'common/metric';
import { formatPercent, formatInteger, assert } from 'common/utils';
import { Projections } from 'common/models/Projections';
import { MetricDefinition } from './interfaces';
import ExternalLink from '../../components/ExternalLink';
import Thermometer from 'components/Thermometer';

const METRIC_NAME = 'ICU capacity used';

export const ICUCapacityUsed: MetricDefinition = {
  renderStatus,
  renderDisclaimer,
  renderThermometer,
  metricName: METRIC_NAME,
  extendedMetricName: METRIC_NAME,
  metricNameForCompare: METRIC_NAME,
};

export const STATES_WITH_DATA_OVERRIDES = ['Nevada'];

const SHORT_DESCRIPTION_LOW = 'Can likely handle a new wave of COVID';
const SHORT_DESCRIPTION_MEDIUM = 'Can likely handle a new wave of COVID';
const SHORT_DESCRIPTION_MEDIUM_HIGH = 'At risk to a new wave of COVID';
const SHORT_DESCRIPTION_HIGH = 'High risk of hospital overload';
const SHORT_DESCRIPTION_UNKNOWN = 'Insufficient data to assess';

const LIMIT_LOW = 0.7;
const LIMIT_MEDIUM = 0.8;
const LIMIT_MEDIUM_HIGH = 0.85;
const LIMIT_HIGH = Infinity;

const LOW_NAME = 'Low';
const MEDIUM_NAME = 'Medium';
const MEDIUM_HIGH_NAME = 'High';
const HIGH_NAME = 'Critical';
const UNKNOWN = 'Unknown';

export const HOSPITAL_USAGE_LEVEL_INFO_MAP: LevelInfoMap = {
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

function renderStatus(projections: Projections): React.ReactElement {
  const icu = projections.primary.icuCapacityInfo;
  const locationName = projections.locationName;

  if (icu === null) {
    return (
      <Fragment>
        {ICUCapacityUsed.extendedMetricName} is not available due to
        insufficient data.
      </Fragment>
    );
  }

  const totalICUBeds = formatInteger(icu.totalBeds);
  const totalICUPatients = formatInteger(icu.totalPatients);
  if (icu.metricValue === null) {
    if (icu.totalBeds === 0 || icu.totalBeds > 15) {
      debugger;
    }
    assert(
      icu.totalBeds > 0 && icu.totalBeds <= 15,
      'value should only be missing due to insufficient beds.',
    );
    return (
      <Fragment>
        {locationName} has reported having {totalICUBeds} staffed adult ICU beds
        and {totalICUPatients} are currently filled. Due to the low number of
        beds, we do not report {ICUCapacityUsed.extendedMetricName} data.
      </Fragment>
    );
  }

  const icuCapacityUsed =
    icu.metricValue > 1 ? '>100%' : formatPercent(icu.metricValue);

  // We'll almost always have the breakdown, but might not depending on redacted data.
  let patientBreakdown = '';
  if (icu.covidPatients !== null && icu.nonCovidPatients !== null) {
    const nonCovidICUPatients = formatInteger(icu.nonCovidPatients);
    const covidICUPatients = formatInteger(icu.covidPatients);
    patientBreakdown = `${nonCovidICUPatients} are filled by non-COVID patients and ${covidICUPatients} are filled by COVID patients.`;
  }

  const level = getLevel(Metric.HOSPITAL_USAGE, icu.metricValue);
  const textLevel = levelText(
    level,
    'This suggests there is likely enough capacity to absorb a wave of new COVID infections',
    'This suggests some ability to absorb an increase in COVID cases',
    'This suggests hospitals may not be well positioned to absorb a wave of new COVID infections without substantial surge capacity. Caution is warranted',
    'This suggests hospitals cannot absorb a wave of new COVID infections without substantial surge capacity.',
  );

  return (
    <Fragment>
      {locationName} has reported having {totalICUBeds} staffed adult ICU beds.{' '}
      {patientBreakdown} Overall, {totalICUPatients} out of {totalICUBeds} (
      {icuCapacityUsed}) are filled. {textLevel}.
    </Fragment>
  );
}

function renderDisclaimer(projections: Projections): React.ReactElement {
  return (
    <Fragment>
      ICU data sourced from the{' '}
      <ExternalLink href="https://healthdata.gov/dataset/covid-19-reported-patient-impact-and-hospital-capacity-state-timeseries">
        Department of Health and Human Services (HHS)
      </ExternalLink>
      . As of December 21, we use "{ICUCapacityUsed.extendedMetricName}" instead
      of "ICU headroom used" as our primary ICU metric. Learn more about our{' '}
      <ExternalLink href="/covid-risk-levels-metrics#icu-capacity-used">
        ICU capacity methodology
      </ExternalLink>
    </Fragment>
  );
}

function renderThermometer(): React.ReactElement {
  const levelInfo = HOSPITAL_USAGE_LEVEL_INFO_MAP;
  const levelCritical = levelInfo[Level.CRITICAL];
  const levelHigh = levelInfo[Level.HIGH];
  const levelMedium = levelInfo[Level.MEDIUM];
  const levelLow = levelInfo[Level.LOW];

  const format = (value: number) => formatPercent(value, 0);

  const items = [
    {
      title: `Over ${format(levelHigh.upperLimit)}`,
      description:
        'ICU at high risk of being overloaded in case of a COVID surge',
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
      description: 'ICU can likely handle a COVID surge',
      color: levelLow.color,
      roundTop: false,
      roundBottom: true,
    },
  ];
  return <Thermometer items={items} />;
}
