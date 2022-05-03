import React, { Fragment } from 'react';
import { COLOR_MAP } from 'common/colors';
import { Level, LevelInfo, LevelInfoMap } from 'common/level';
import { formatPercent, formatInteger } from 'common/utils';
import { Projections } from 'common/models/Projections';
import { MetricDefinition } from './interfaces';
import { Metric } from 'common/metricEnum';
import { InfoTooltip, renderTooltipContent } from 'components/InfoTooltip';
import { metricToTooltipMap } from 'cms-content/tooltips';
import { trackOpenTooltip } from 'components/InfoTooltip';
import { Link } from 'react-router-dom';

const METRIC_NAME = 'Vaccinated';
const VACCINATION_PERCENTAGE_CAP = 0.95;

export const VaccinationsMetric: MetricDefinition = {
  renderStatus,
  renderThermometer,
  renderInfoTooltip,
  metricName: METRIC_NAME,
  extendedMetricName: 'Percent Vaccinated',
  metricNameForCompare: 'Vaccinated (Booster shot)',
  metricNameForSummaryStat: 'Vaccinated',
};

const SHORT_DESCRIPTION_LOW = 'Population given at least one dose';

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
  const peopleAdditionalDose = info.peopleAdditionalDose
    ? formatInteger(info.peopleAdditionalDose)
    : null;
  const percentAdditionalDose = info.ratioAdditionalDose
    ? formatPercent(info.ratioAdditionalDose, 1)
    : null;

  let additionalDoseText;
  let ifNoAdditionalDoseAnd;
  if (peopleAdditionalDose != null && percentAdditionalDose != null) {
    additionalDoseText = `, and ${peopleAdditionalDose} (${percentAdditionalDose})
    have received a booster shot`;
    ifNoAdditionalDoseAnd = ``;
  } else {
    additionalDoseText = ``;
    ifNoAdditionalDoseAnd = ` and`;
  }

  const cappedVaccinatedCopy =
    info.ratioInitiated >= VACCINATION_PERCENTAGE_CAP ? (
      <p>
        We have capped the vaccination metrics at 95%. This cap helps address
        potential overestimates of vaccination coverage due to incorrect
        reporting of doses, census denominator data not including part-time
        residents, or other potential data reporting errors.{' '}
      </p>
    ) : undefined;

  return (
    <Fragment>
      In {locationName}, {peopleInitiated} people ({percentInitiated}) have
      received at least one dose,{ifNoAdditionalDoseAnd} {peopleVaccinated} (
      {percentVaccinated}) have received at least two doses or a single Johnson
      & Johnson dose{additionalDoseText}. Anybody who is at least 5 years old is
      eligible to be vaccinated. Fewer than 0.001% of people who have received a
      dose experienced a severe adverse reaction. {cappedVaccinatedCopy}
      <Link to="/faq#vaccines">See more vaccine resources and FAQs</Link>.
    </Fragment>
  );
}

function renderThermometer(): React.ReactElement {
  // NOTE: We don't grade on vaccinations yet, so no thermometer.
  return <div />;
}

function renderInfoTooltip(): React.ReactElement {
  const { body } = metricToTooltipMap[Metric.VACCINATIONS].metricDefinition;

  return (
    <InfoTooltip
      title={renderTooltipContent(body)}
      aria-label={`Show definition of ${VaccinationsMetric.metricName} metric`}
      trackOpenTooltip={() =>
        trackOpenTooltip(`How we calculate: ${Metric.VACCINATIONS}`)
      }
    />
  );
}
