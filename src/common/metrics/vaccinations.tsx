import React, { Fragment } from 'react';
import { COLOR_MAP } from 'common/colors';
import { Level, LevelInfo, LevelInfoMap } from 'common/level';
import { formatPercent } from 'common/utils';
import { formatInteger } from '@actnowcoalition/number-format';
import { Projections } from 'common/models/Projections';
import { MetricDefinition } from './interfaces';
import { Metric } from 'common/metricEnum';
import { InfoTooltip, renderTooltipContent } from 'components/InfoTooltip';
import { metricToTooltipMap } from 'cms-content/tooltips';
import { trackOpenTooltip } from 'components/InfoTooltip';
import ExternalLink from 'components/ExternalLink';

const METRIC_NAME = 'Vaccinated';
const VACCINATION_PERCENTAGE_CAP = 0.95;

export const VaccinationsMetric: MetricDefinition = {
  renderStatus,
  renderThermometer,
  renderInfoTooltip,
  metricName: METRIC_NAME,
  extendedMetricName: 'Vaccination metrics',
  metricNameForCompare: 'Boosted (Bivalent)',
  metricNameForSummaryStat: 'Boosted',
};

const UNKNOWN = 'Unknown';

// HACK: There isn't a clean way to avoid having grading / zones right now.
const dummyLevelInfo: LevelInfo = {
  level: Level.LOW,
  upperLimit: 1,
  name: '',
  color: '',
};

export const VACCINATIONS_LEVEL_INFO_MAP: LevelInfoMap = {
  [Level.LOW]: {
    level: Level.LOW,
    upperLimit: 1,
    name: '',
    color: COLOR_MAP.ORANGE.BASE,
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
  },
};

function renderStatus(projections: Projections): React.ReactElement {
  const info = projections.primary.vaccinationsInfo;

  // HACK (sean): Just assume if either of the initiated/fully-vaccinated ratios are
  // missing that the data is out of date/we have no data. AFAICT there's no instance
  // where booster data exists but not initiated/fully-vaccinated data.
  if (
    info?.peopleInitiated === null ||
    info?.ratioInitiated === null ||
    info?.peopleVaccinated === null ||
    info?.ratioVaccinated === null ||
    info === null
  ) {
    return (
      <Fragment>
        Vaccination data for {projections.locationName} is out of date. We
        display timeseries data for historical purposes, but it should not be
        used for current guidance. Missing data may be caused by lack of
        reporting from local sources.{' '}
      </Fragment>
    );
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
  const peopleBivalentFall2022Booster = info.peopleBivalentBoostedFall2022
    ? formatInteger(info.peopleBivalentBoostedFall2022)
    : null;
  const percentBivalentFall2022Booster = info.ratioBivalentBoostedFall2022
    ? formatPercent(info.ratioBivalentBoostedFall2022, 1)
    : null;

  let additionalDoseText;
  let ifNoAdditionalDoseAnd;
  if (peopleAdditionalDose != null && percentAdditionalDose != null) {
    additionalDoseText = ` ${peopleAdditionalDose} (${percentAdditionalDose})
    have received a booster dose`;
    ifNoAdditionalDoseAnd = ``;
  } else {
    additionalDoseText = ``;
    ifNoAdditionalDoseAnd = ` and`;
  }

  let bivalentFall2022BoosterText;
  let ifNoBivalentFall2022BoosterAnd;
  if (
    peopleBivalentFall2022Booster != null &&
    percentBivalentFall2022Booster != null
  ) {
    bivalentFall2022BoosterText = `, and ${peopleBivalentFall2022Booster} (${percentBivalentFall2022Booster})
    have received an updated bivalent booster dose`;
    ifNoBivalentFall2022BoosterAnd = ``;
  } else {
    bivalentFall2022BoosterText = ``;
    ifNoBivalentFall2022BoosterAnd = `and`;
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
      & Johnson dose, {ifNoBivalentFall2022BoosterAnd}
      {additionalDoseText}
      {bivalentFall2022BoosterText}. We do not yet have data available for the
      2023/2024 updated boosters. <br /> <br /> Fewer than 0.001% of people who
      have received a dose experienced a severe adverse reaction.{' '}
      {cappedVaccinatedCopy}
      <ExternalLink href="https://www.cdc.gov/coronavirus/2019-ncov/vaccines/about-vaccines/index.html">
        See more vaccine resources and FAQs
      </ExternalLink>
      .
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
