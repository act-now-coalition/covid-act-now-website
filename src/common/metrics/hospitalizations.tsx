import React, { Fragment } from 'react';
import { COLOR_MAP } from 'common/colors';
import { Level, LevelInfoMap } from 'common/level';
import { levelText } from 'common/utils/chart';
import { getLevel, Metric } from 'common/metric';
import { formatPercent, formatInteger } from 'common/utils';
import { Projections } from 'common/models/Projections';
import { NonCovidPatientsMethod } from 'common/models/ICUHeadroom';
import { MetricDefinition } from './interfaces';
import ExternalLink from '../../components/ExternalLink';
import Thermometer from 'components/Thermometer';

const METRIC_NAME = 'ICU headroom used';

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
  const icu = projections.primary.icuHeadroomInfo;
  const locationName = projections.locationName;

  if (icu === null) {
    return (
      <Fragment>
        Unable to generate {ICUHeadroomMetric.extendedMetricName}. This could be
        due to insufficient data.
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
  const nonCovidUsedBeds = formatInteger(icu.nonCovidPatients);
  const nonCovidUsedBedsPercent = formatPercent(
    icu.nonCovidPatients / icu.totalBeds,
  );
  const remainingICUBeds = formatInteger(icu.totalBeds - icu.nonCovidPatients);
  const covidICUPatients = formatInteger(icu.covidPatients);
  const icuHeadroom =
    icu.metricValue > 1 ? '>100%' : formatPercent(icu.metricValue);

  const textWeEstimateThatNonCovidPatients = (() => {
    switch (icu.nonCovidPatientsMethod) {
      case NonCovidPatientsMethod.ACTUAL:
        return `${icu.nonCovidPatients}`;
      case NonCovidPatientsMethod.ESTIMATED_FROM_TOTAL_ICU_ACTUAL:
        return `we estimate that ${nonCovidUsedBeds}`;
      case NonCovidPatientsMethod.ESTIMATED_FROM_TYPICAL_UTILIZATION:
        return `we estimate that ${nonCovidUsedBedsPercent} (${nonCovidUsedBeds})`;
    }
  })();

  const textWeEstimate = icu.covidPatientsIsActual ? '' : 'we estimate';

  const level = getLevel(Metric.HOSPITAL_USAGE, icu.metricValue);
  const textLevel = levelText(
    level,
    'This suggests there is likely enough capacity to absorb a wave of new COVID infections',
    'This suggests some ability to absorb an increase in COVID cases',
    'This suggests hospitals may not be well positioned to absorb a wave of new COVID infections without substantial surge capacity. Caution is warranted',
    'This suggests hospitals cannot absorb a wave of new COVID infections without substantial surge capacity. Aggressive action urgently needed',
  );

  return (
    <Fragment>
      {locationName} has about {totalICUBeds} ICU beds. Based on best available
      data, {textWeEstimateThatNonCovidPatients} are currently occupied by
      non-COVID patients. Of the {remainingICUBeds} ICU beds remaining,{' '}
      {textWeEstimate} {covidICUPatients} are needed by COVID cases, or{' '}
      {icuHeadroom} of available beds. {textLevel}.
    </Fragment>
  );
}

function renderDisclaimer(projections: Projections): React.ReactElement {
  // TODO(michael): Use regionType. But that's causing `yarn
  // generate-index-pages` to fail due to circular dependency (I think).
  if (projections.fips.length === 2) {
    return (
      <Fragment>
        Raw data directly sourced from the{' '}
        <ExternalLink href="https://healthdata.gov/dataset/covid-19-reported-patient-impact-and-hospital-capacity-state-timeseries">
          Department of Health and Human Services (HHS)
        </ExternalLink>
        . Learn more about our{' '}
        <ExternalLink href="https://covidactnow.org/covid-risk-levels-metrics#icu-headroom-used">
          ICU Headroom methodology
        </ExternalLink>
        .
      </Fragment>
    );
  } else {
    return (
      <Fragment>
        <ExternalLink href="https://preventepidemics.org/wp-content/uploads/2020/04/COV020_WhenHowTightenFaucet_v3.pdf">
          Resolve to Save Lives
        </ExternalLink>
        , a pandemic think tank, recommends that hospitals maintain enough ICU
        capacity to double the number of COVID patients hospitalized. Learn more
        about{' '}
        <ExternalLink href="https://docs.google.com/document/d/1cd_cEpNiIl1TzUJBvw9sHLbrbUZ2qCxgN32IqVLa3Do/edit">
          our methodology
        </ExternalLink>{' '}
        and{' '}
        <ExternalLink href="https://docs.google.com/presentation/d/1XmKCBWYZr9VQKFAdWh_D7pkpGGM_oR9cPjj-UrNdMJQ/edit">
          our data sources
        </ExternalLink>
        .
      </Fragment>
    );
  }
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
      description: levelCritical.detail(),
      color: levelCritical.color,
      roundTop: true,
      roundBottom: false,
    },
    {
      title: `${format(levelMedium.upperLimit)} - ${format(
        levelHigh.upperLimit,
      )}`,
      description: levelHigh.detail(),
      color: levelHigh.color,
      roundTop: false,
      roundBottom: false,
    },
    {
      title: `${format(levelLow.upperLimit)} - ${format(
        levelMedium.upperLimit,
      )}`,
      description: levelMedium.detail(),
      color: levelMedium.color,
      roundTop: false,
      roundBottom: false,
    },
    {
      title: `Under ${format(levelLow.upperLimit)}`,
      description: levelLow.detail(),
      color: levelLow.color,
      roundTop: false,
      roundBottom: true,
    },
  ];
  return <Thermometer items={items} />;
}
