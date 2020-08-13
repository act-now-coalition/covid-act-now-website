import React, { Fragment } from 'react';
import { COLOR_MAP } from 'common/colors';
import { Level, LevelInfoMap } from 'common/level';
import { levelText } from 'common/utils/chart';
import { getLevel, Metric } from 'common/metric';
import { formatPercent, formatInteger } from 'common/utils';
import { Projections } from 'common/models/Projections';
import { TRACERS_NEEDED_PER_CASE } from 'common/models/Projection';
import { MetricDefinition } from './interfaces';
import ExternalLink from 'components/ExternalLink';

export const METRIC_NAME = 'Contacts traced';

export const ContactTracingMetric: MetricDefinition = {
  renderStatus,
  renderDisclaimer,
  metricName: METRIC_NAME,
  extendedMetricName: METRIC_NAME,
  metricNameForCompare: METRIC_NAME,
};

const SHORT_DESCRIPTION_LOW = 'Too many cases and too little tracing';
const SHORT_DESCRIPTION_MEDIUM = 'Too many cases and too little tracing';
const SHORT_DESCRIPTION_MEDIUM_HIGH =
  'Insufficient tracing to stop the spread of COVID';
const SHORT_DESCRIPTION_HIGH = 'Enough tracing to help contain COVID';
const SHORT_DESCRIPTION_UNKNOWN = 'Insufficient data to assess';

const LOW_NAME = 'Critical';
const MEDIUM_NAME = 'Low';
const MEDIUM_HIGH_NAME = 'Medium';
const HIGH_NAME = 'High';
const UNKNOWN = 'Unknown';

export const REVERSE_ORDER = true;

export const CONTACT_TRACING_LEVEL_INFO_MAP: LevelInfoMap = {
  [Level.LOW]: {
    level: Level.LOW,
    // NOTE: Setting the upperLimit to 0 means we will not grade anybody as
    // Level.LOW ("Critical" on the website). The lowest grade you can get is
    // Level.MEDIUM.
    upperLimit: 0,
    name: LOW_NAME,
    color: COLOR_MAP.RED.BASE,
    detail: () => SHORT_DESCRIPTION_LOW,
  },
  [Level.MEDIUM]: {
    level: Level.MEDIUM,
    upperLimit: 0.1,
    name: MEDIUM_NAME,
    color: COLOR_MAP.ORANGE_DARK.BASE,
    detail: () => SHORT_DESCRIPTION_MEDIUM,
  },
  [Level.HIGH]: {
    level: Level.HIGH,
    upperLimit: 0.9,
    name: MEDIUM_HIGH_NAME,
    color: COLOR_MAP.ORANGE.BASE,
    detail: () => SHORT_DESCRIPTION_MEDIUM_HIGH,
  },
  [Level.CRITICAL]: {
    level: Level.CRITICAL,
    upperLimit: Infinity,
    name: HIGH_NAME,
    color: COLOR_MAP.GREEN.BASE,
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

export function renderStatus(projections: Projections): React.ReactElement {
  const {
    currentContactTracers,
    currentContactTracerMetric,
    locationName,
    currentDailyAverageCases,
  } = projections.primary;

  const currentWeeklyAverage =
    currentDailyAverageCases && Math.round(currentDailyAverageCases);

  if (
    currentContactTracerMetric === null ||
    currentContactTracers === null ||
    currentWeeklyAverage === null
  ) {
    return <Fragment>No contact tracing data is available.</Fragment>;
  }

  const numTracers = formatInteger(currentContactTracers);
  const weeklyAverage = formatInteger(currentWeeklyAverage);
  const numNeededTracers = formatInteger(
    currentWeeklyAverage * TRACERS_NEEDED_PER_CASE,
  );

  const level = getLevel(Metric.CONTACT_TRACING, currentContactTracerMetric);
  const contactTracingRate = levelText(
    level,
    `only ${formatPercent(currentContactTracerMetric)}`,
    `only ${formatPercent(currentContactTracerMetric)}`,
    `${formatPercent(currentContactTracerMetric)}`,
    `${formatPercent(currentContactTracerMetric)}`,
  );

  const outcomesAtLevel = levelText(
    level,
    `These low levels of tracing suggest there may be an active outbreak underway in ${locationName}, or almost no tracing capacity exists. Aggressive action urgently needed.`,
    `These low levels of tracing suggest there may be an active outbreak underway in ${locationName}, or that little tracing capacity exists. Strong caution warranted.`,
    `At these lower levels of tracing, it is unlikely ${locationName} will be able to successfully identify and isolate sources of disease spread fast enough to prevent new outbreaks.`,
    'When this level of tracing is coupled with widely available testing, COVID can be contained without resorting to lockdowns.',
  );

  return (
    <Fragment>
      Per best available data, {locationName} has {numTracers} contact tracers.
      With an average of {weeklyAverage} new daily cases, we estimate{' '}
      {locationName} needs {numNeededTracers} contact tracing staff to trace all
      new cases in 48 hours, before too many other people are infected. This
      means that {locationName} is likely able to trace {contactTracingRate} of
      new COVID infections in 48 hours. {outcomesAtLevel}
    </Fragment>
  );
}

function renderDisclaimer(): React.ReactElement {
  return (
    <Fragment>
      <ExternalLink href="https://covidlocal.org/assets/documents/COVID%20Local%20Metrics%20overview.pdf">
        Experts recommend
      </ExternalLink>{' '}
      that at least 90% of contacts for each new case must be traced within 48
      hours in order to contain COVID. Experts estimate that tracing each new
      case within 48 hours requires an average of {TRACERS_NEEDED_PER_CASE}{' '}
      contact tracers per new case, as well as fast testing. Learn more about{' '}
      <ExternalLink href="https://docs.google.com/document/d/1cd_cEpNiIl1TzUJBvw9sHLbrbUZ2qCxgN32IqVLa3Do/edit">
        our methodology
      </ExternalLink>{' '}
      and{' '}
      <ExternalLink href="https://docs.google.com/presentation/d/1XmKCBWYZr9VQKFAdWh_D7pkpGGM_oR9cPjj-UrNdMJQ/edit">
        our data sources
      </ExternalLink>{' '}
      (for contact tracing data, we partner with{' '}
      <ExternalLink href="https://testandtrace.com/">
        testandtrace.com
      </ExternalLink>
      ).
    </Fragment>
  );
}

export const CONTACT_TRACING_DISCLAIMER = `that at least 90% of contacts for each new case must be traced within 48 hours in order to contain COVID. Experts estimate that tracing each new case within 48 hours requires an average of ${TRACERS_NEEDED_PER_CASE} contact tracers per new case, as well as fast testing.`;
