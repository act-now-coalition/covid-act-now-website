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
import Thermometer from 'components/Thermometer';

const METRIC_NAME = 'Tracers hired';

export const ContactTracingMetric: MetricDefinition = {
  renderStatus,
  renderDisclaimer,
  renderThermometer,
  metricName: METRIC_NAME,
  extendedMetricName: METRIC_NAME,
  metricNameForCompare: METRIC_NAME,
};

const SHORT_DESCRIPTION_LOW = ''; // LOW is unused.
const SHORT_DESCRIPTION_MEDIUM = 'Too many cases and too few tracers hired';
const SHORT_DESCRIPTION_MEDIUM_HIGH =
  'Insufficient tracers, even if the program is run effectively';
const SHORT_DESCRIPTION_HIGH =
  'Enough tracers, if the program is run effectively';
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
  // TODO(michael): Comment and clean up.
  [Level.SUPER_CRITICAL]: {
    level: Level.SUPER_CRITICAL,
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

function renderStatus(projections: Projections): React.ReactElement {
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
    ``, // LOW is unused
    `With insufficient contact tracing staff, ${locationName} is unlikely to be able to successfully identify and isolate sources of disease spread fast enough to prevent new outbreaks.`,
    `With insufficient contact tracing staff, ${locationName} is unlikely to be able to successfully identify and isolate sources of disease spread fast enough to prevent new outbreaks.`,
    `Sufficient staff alone does not guarantee successful contact tracing. ${locationName} will need to ensure the contact tracing program is run effectively and that testing with short test result turnaround time is widely available.`,
  );

  return (
    <Fragment>
      With {weeklyAverage} new daily cases on average, {locationName} needs an
      estimated {numNeededTracers} contact tracers on staff to trace each new
      case to a known case within 48 hours of detection. Per our best available
      data, {locationName} has {numTracers} contact tracers, fulfilling{' '}
      {contactTracingRate} of this staffing requirement. {outcomesAtLevel}
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
      ). Learn about recent{' '}
      <ExternalLink href="https://blog.covidactnow.org/changes-to-how-we-assess-contact-tracing/">
        changes to how we assess contact tracing
      </ExternalLink>
      . We know that measuring contact tracing capacity solely by the number of
      staff is not reliable, and we are working on a more accurate metric to
      assess contact tracing capacity.
    </Fragment>
  );
}

function renderThermometer(): React.ReactElement {
  const levelInfo = CONTACT_TRACING_LEVEL_INFO_MAP;
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
      roundBottom: true,
    },
  ];
  return <Thermometer items={items} />;
}
