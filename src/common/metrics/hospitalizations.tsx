import React, { Fragment } from 'react';
import { COLOR_MAP } from 'common/colors';
import { Level, LevelInfoMap } from 'common/level';
import { levelText } from 'common/utils/chart';
import { getLevel, Metric } from 'common/metric';
import { formatPercent, formatInteger } from 'common/utils';
import { Projections } from 'common/models/Projections';
import { MetricDefinition } from './interfaces';
import ExternalLink from '../../components/ExternalLink';
import Thermometer from 'components/Thermometer';
import { NonCovidPatientsMethod } from 'common/models/ICUHeadroom';

const METRIC_NAME = 'ICU capacity used';

// TODO(michael): Rename internal references to "headroom", etc.
export const ICUHeadroomMetric: MetricDefinition = {
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
const SHORT_DESCRIPTION_UNKNOWN =
  'Unavailable while we switch to an improved data source';

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
  const icu = projections.primary.icuHeadroomInfo;
  const locationName = projections.locationName;

  if (icu === null) {
    // TODO(michael): Put this generic message back in place once we've
    // re-enabled counties / metros.
    // return (
    //   <Fragment>
    //     Unable to generate {ICUHeadroomMetric.extendedMetricName}. This could be
    //     due to insufficient data.
    //   </Fragment>
    // );
    return (
      <Fragment>
        The {ICUHeadroomMetric.extendedMetricName} metric is currently
        unavailable for {projections.locationName} while we switch to using more
        accurate hospital data provided by the Department of Health and Human
        Services. Check back soon for updates.
      </Fragment>
    );
  } else if (icu.overrideInPlace) {
    return (
      <Fragment>
        While no government-reported data is currently available, news reports
        suggest that ICUs are at or near capacity.
      </Fragment>
    );
  }

  const totalICUBeds = formatInteger(icu.totalBeds);
  const nonCovidICUPatients = formatInteger(icu.nonCovidPatients);
  const covidICUPatients = formatInteger(icu.covidPatients);
  const totalICUPatients = formatInteger(
    icu.nonCovidPatients + icu.covidPatients,
  );
  const icuHeadroom =
    icu.metricValue > 1 ? '>100%' : formatPercent(icu.metricValue);

  const level = getLevel(Metric.HOSPITAL_USAGE, icu.metricValue);
  const textLevel = levelText(
    level,
    'This suggests there is likely enough capacity to absorb a wave of new COVID infections',
    'This suggests some ability to absorb an increase in COVID cases',
    'This suggests hospitals may not be well positioned to absorb a wave of new COVID infections without substantial surge capacity. Caution is warranted',
    'This suggests hospitals cannot absorb a wave of new COVID infections without substantial surge capacity. Aggressive action urgently needed',
  );

  // TODO(michael): I think this should always be true if/when we exclusively use HHS data, but as
  // long as we are mixing sources, we may be missing covid patients.
  const includeBreakdown =
    icu.covidPatientsIsActual &&
    icu.nonCovidPatientsMethod === NonCovidPatientsMethod.ACTUAL;
  const patientBreakdown = includeBreakdown
    ? `${nonCovidICUPatients} are filled by non-COVID patients and ${covidICUPatients} are filled by COVID patients.`
    : '';

  return (
    <Fragment>
      {locationName} has reported having {totalICUBeds} staffed adult ICU beds.{' '}
      {patientBreakdown} Overall, {totalICUPatients} out of {totalICUBeds} (
      {icuHeadroom}) are filled. {textLevel}.
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
      . As of December 21, we use "{ICUHeadroomMetric.extendedMetricName}"
      instead of "ICU headroom used" as our primary ICU metric. Learn more about
      our{' '}
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
