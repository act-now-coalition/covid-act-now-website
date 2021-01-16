import React, { Fragment } from 'react';
import { COLOR_MAP } from 'common/colors';
import { Level, LevelInfoMap } from 'common/level';
import { formatPercent, formatInteger } from 'common/utils';
import { Projections } from 'common/models/Projections';
import { MetricDefinition } from './interfaces';
import ExternalLink from 'components/ExternalLink';

const METRIC_NAME = 'Percent Vaccinated';

export const VaccinationsMetric: MetricDefinition = {
  renderStatus,
  renderDisclaimer,
  renderThermometer,
  metricName: METRIC_NAME,
  extendedMetricName: METRIC_NAME,
  metricNameForCompare: METRIC_NAME,
};

// TODO(vaccinations): Figure out levels.
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

export const VACCINATIONS_LEVEL_INFO_MAP: LevelInfoMap = {
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
  // We don't have a SUPER_CRITICAL threshold, so upperLimit is same as CRITICAL to hide it.
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
  const info = projections.primary.vaccinationsInfo;
  if (!info) {
    return <Fragment>No vaccination data is available.</Fragment>;
  }
  const locationName = projections.locationName;

  const peopleInitiated = formatInteger(info.peopleInitiated);
  const percentInitiated = formatPercent(info.percentInitiated);
  const peopleVaccinated = formatInteger(info.peopleVaccinated);
  const percentVaccinated = formatPercent(info.percentVaccinated);

  return (
    <Fragment>
      In {locationName}, {peopleInitiated} ({percentInitiated}) people have
      received the first shot and {peopleVaccinated} ({percentVaccinated}) have
      received the second shot. According to the CDC, fewer than 0.001% have
      experienced severe adverse reactions,{' '}
      <ExternalLink href="https://www.cdc.gov/mmwr/volumes/70/wr/mm7002e1.htm">
        learn more.
      </ExternalLink>
    </Fragment>
  );
}

function renderDisclaimer(): React.ReactElement {
  return (
    <Fragment>
      Vaccination data is provided by the{' '}
      <ExternalLink href="https://covid.cdc.gov/covid-data-tracker/#vaccinations">
        CDC
      </ExternalLink>
      .
    </Fragment>
  );
}

function renderThermometer(): React.ReactElement {
  // NOTE: We don't grade on vaccinations yet, so no thermometer.
  return <div />;
}
