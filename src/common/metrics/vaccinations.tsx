import React, { Fragment } from 'react';
import { COLOR_MAP } from 'common/colors';
import { Level, LevelInfo, LevelInfoMap } from 'common/level';
import { formatPercent, formatInteger } from 'common/utils';
import { Projections } from 'common/models/Projections';
import { MetricDefinition } from './interfaces';
import ExternalLink from 'components/ExternalLink';
import { trackEvent, EventCategory, EventAction } from 'components/Analytics';

const METRIC_NAME = 'Vaccinated';

export const VaccinationsMetric: MetricDefinition = {
  renderStatus,
  renderDisclaimer,
  renderThermometer,
  metricName: METRIC_NAME,
  extendedMetricName: 'Vaccinated: 1st and 2nd shot',
  metricNameForCompare: 'Vaccinated (1st shot)',
};

const SHORT_DESCRIPTION_LOW = 'Population given the first shot';
// const SHORT_DESCRIPTION_UNKNOWN = 'Insufficient data to assess';

const UNKNOWN = 'Unknown';

// HACK: There isn't a clean way to avoid having grading / zones right now.
const dummyLevelInfo: LevelInfo = {
  level: Level.LOW,
  upperLimit: 1,
  name: '',
  color: '',
  detail: () => '',
};

export const VACCINATIONS_LEVEL_INFO_MAP: LevelInfoMap = {
  [Level.LOW]: {
    level: Level.LOW,
    upperLimit: 1,
    name: '',
    color: COLOR_MAP.ORANGE.BASE,
    detail: () => SHORT_DESCRIPTION_LOW,
  },
  [Level.MEDIUM]: dummyLevelInfo,
  [Level.HIGH]: dummyLevelInfo,
  [Level.CRITICAL]: dummyLevelInfo,
  [Level.SUPER_CRITICAL]: dummyLevelInfo,
  [Level.UNKNOWN]: {
    level: Level.UNKNOWN,
    upperLimit: 1,
    name: UNKNOWN,
    color: COLOR_MAP.GRAY.BASE,
    detail: () => '',
  },
};

function renderStatus(projections: Projections): React.ReactElement {
  const info = projections.primary.vaccinationsInfo;
  if (!info) {
    return <Fragment>No vaccination data is available.</Fragment>;
  }
  const { locationName } = projections;

  const peopleInitiated = formatInteger(info.peopleInitiated);
  const percentInitiated = formatPercent(info.ratioInitiated, 1);
  const peopleVaccinated = formatInteger(info.peopleVaccinated);
  const percentVaccinated = formatPercent(info.ratioVaccinated, 1);

  let distributedText = <Fragment />;
  if (info.dosesDistributed && info.ratioDosesAdministered) {
    distributedText = (
      <Fragment>
        This this means that {locationName} has administered{' '}
        {formatPercent(info.ratioDosesAdministered)} of their supply of{' '}
        {formatInteger(info.dosesDistributed)} vaccine doses.
      </Fragment>
    );
  }

  return (
    <Fragment>
      In {locationName}, {peopleInitiated} people ({percentInitiated}) have
      received the first shot and {peopleVaccinated} ({percentVaccinated}) have
      also received the second shot. {distributedText} According to the CDC,
      fewer than 0.001% of those who have received the first dose have
      experienced a severe adverse reaction, none of them deadly.
    </Fragment>
  );
}

function trackClickVaccinationData() {
  trackEvent(
    EventCategory.VACCINATION,
    EventAction.CLICK_LINK,
    'CDC Data Tracker - Vaccinations',
  );
}

function renderDisclaimer(): React.ReactElement {
  return (
    <Fragment>
      Vaccination data is provided by the{' '}
      <ExternalLink
        href="https://covid.cdc.gov/covid-data-tracker/#vaccinations"
        onClick={trackClickVaccinationData}
      >
        CDC
      </ExternalLink>{' '}
      or retrieved from state websites. Reporting may be delayed from the time
      of vaccination.
    </Fragment>
  );
}

function renderThermometer(): React.ReactElement {
  // NOTE: We don't grade on vaccinations yet, so no thermometer.
  return <div />;
}
