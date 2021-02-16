import React, { Fragment } from 'react';
import { COLOR_MAP } from 'common/colors';
import { Level, LevelInfoMap } from 'common/level';
import { Projections } from 'common/models/Projections';
import {
  formatDecimal,
  formatPercent,
  formatInteger,
  formatEstimate,
} from 'common/utils';
import Thermometer from 'components/Thermometer';
import { MetricDefinition } from './interfaces';
import moment from 'moment';
import { Metric } from 'common/metric';
import {
  InfoTooltip,
  DisclaimerTooltip,
  renderTooltipContent,
} from 'components/InfoTooltip';
import { metricToTooltipMap } from 'cms-content/tooltips';
import { Region } from 'common/regions';
import { getDataSourceTooltipContent } from 'components/Disclaimer/utils';
import { trackOpenTooltip, trackCloseTooltip } from 'components/InfoTooltip';

export const CaseIncidenceMetric: MetricDefinition = {
  renderStatus,
  renderDisclaimer,
  renderThermometer,
  renderInfoTooltip,
  metricName: 'Daily new cases',
  extendedMetricName: 'Daily new cases per 100k population',
  metricNameForCompare: `Daily new cases per 100k`,
};

export const CASE_DENSITY_LEVEL_INFO_MAP: LevelInfoMap = {
  [Level.LOW]: {
    level: Level.LOW,
    upperLimit: 1,
    name: 'Low',
    color: COLOR_MAP.GREEN.BASE,
    detail: () => 'COVID is being effectively contained',
  },
  [Level.MEDIUM]: {
    level: Level.MEDIUM,
    upperLimit: 10,
    name: 'Medium',
    color: COLOR_MAP.ORANGE.BASE,
    detail: () => 'COVID not contained, but at low levels',
  },
  [Level.HIGH]: {
    level: Level.HIGH,
    upperLimit: 25,
    name: 'High',
    color: COLOR_MAP.ORANGE_DARK.BASE,
    detail: () => 'Very large number of new cases',
  },
  [Level.CRITICAL]: {
    level: Level.CRITICAL,
    upperLimit: 75,
    name: 'Critical',
    color: COLOR_MAP.RED.BASE,
    detail: () => 'Dangerous number of new cases',
  },
  [Level.SUPER_CRITICAL]: {
    level: Level.SUPER_CRITICAL,
    upperLimit: Infinity,
    name: 'Extreme',
    color: COLOR_MAP.RED.DARK,
    detail: () => 'Very dangerous number of new cases',
  },
  [Level.UNKNOWN]: {
    level: Level.UNKNOWN,
    upperLimit: 0,
    name: 'Unknown',
    color: COLOR_MAP.GRAY.BASE,
    detail: () => 'Insufficient data to assess',
  },
};

function renderStatus(projections: Projections): React.ReactElement {
  const { totalPopulation, currentDailyAverageCases } = projections.primary;
  const currentCaseDensity = projections.getMetricValue(Metric.CASE_DENSITY);
  const locationName = projections.locationName;
  if (
    currentCaseDensity === null ||
    totalPopulation === null ||
    currentDailyAverageCases === null
  ) {
    return (
      <Fragment>
        Unable to generate{' '}
        {CaseIncidenceMetric.extendedMetricName.toLowerCase()}. This could be
        due to insufficient data.
      </Fragment>
    );
  }

  const ESTIMATED_INFECTIONS_FACTOR = 5;
  const newCasesPerDay = currentDailyAverageCases;
  // Try not to round cases/day to zero (since it will probably be >0 per 100k).
  const newCasesPerDayText =
    newCasesPerDay >= 0.1 && newCasesPerDay < 1
      ? formatDecimal(newCasesPerDay, 1)
      : formatInteger(newCasesPerDay);
  const threeMonthsFromNow = moment().add(3, 'months');
  const daysTil3MonthsFromNow = threeMonthsFromNow.diff(moment(), 'days');
  const newCasesPer3Months = daysTil3MonthsFromNow * newCasesPerDay;
  const estimatedNewInfectionsIn3Months =
    ESTIMATED_INFECTIONS_FACTOR * newCasesPer3Months;

  // Makes sure estimated # of cases and infections over the next year don't go above total population:
  function maxAtTotalPopulation(num: number) {
    return Math.min(num, totalPopulation);
  }
  const estimatedNewInfectionsIn3MonthsWithMax = maxAtTotalPopulation(
    estimatedNewInfectionsIn3Months,
  );
  const newCasesIn3MonthsWithMax = maxAtTotalPopulation(newCasesPer3Months);

  const estimatedPercentageNewInfectedIn3Months = Math.min(
    1,
    estimatedNewInfectionsIn3Months / totalPopulation,
  );

  return (
    <Fragment>
      Over the last week, {locationName} has averaged {newCasesPerDayText} new
      confirmed cases per day (<b>{formatDecimal(currentCaseDensity, 1)}</b> for
      every 100,000 residents). If this trend continued for the next three
      months, this would translate to approximately{' '}
      {formatEstimate(newCasesIn3MonthsWithMax)} cases and an estimated{' '}
      {formatEstimate(estimatedNewInfectionsIn3MonthsWithMax)} infections (
      {formatPercent(estimatedPercentageNewInfectedIn3Months)} of the
      population).
    </Fragment>
  );
}

function renderDisclaimer(region: Region): React.ReactElement {
  const { body } = metricToTooltipMap[Metric.CASE_DENSITY].metricCalculation;

  return (
    <Fragment>
      {'Learn more about '}
      <DisclaimerTooltip
        title={getDataSourceTooltipContent(region, Metric.CASE_DENSITY)}
        mainCopy={'where our data comes from'}
        trackOpenTooltip={trackOpenTooltip(
          `Learn more: ${Metric.CASE_DENSITY}`,
        )}
        trackCloseTooltip={trackCloseTooltip(
          `Learn more: ${Metric.CASE_DENSITY}`,
        )}
      />
      {' and '}
      <DisclaimerTooltip
        title={renderTooltipContent(body)}
        mainCopy={'how we calculate our metrics'}
        trackOpenTooltip={trackOpenTooltip(
          `How we calculate: ${Metric.CASE_DENSITY}`,
        )}
        trackCloseTooltip={trackCloseTooltip(
          `How we calculate: ${Metric.CASE_DENSITY}`,
        )}
      />
      .
    </Fragment>
  );
}

function renderThermometer(): React.ReactElement {
  const levelInfo = CASE_DENSITY_LEVEL_INFO_MAP;
  const levelExtreme = levelInfo[Level.SUPER_CRITICAL];
  const levelCritical = levelInfo[Level.CRITICAL];
  const levelHigh = levelInfo[Level.HIGH];
  const levelMedium = levelInfo[Level.MEDIUM];
  const levelLow = levelInfo[Level.LOW];

  const items = [
    {
      title: `Over ${levelCritical.upperLimit}`,
      description: 'Severe outbreak',
      color: levelExtreme.color,
      roundTop: true,
      roundBottom: false,
    },
    {
      title: `${levelHigh.upperLimit} - ${levelCritical.upperLimit}`,
      color: levelCritical.color,
      roundTop: false,
      roundBottom: false,
    },
    {
      title: `${levelMedium.upperLimit} - ${levelHigh.upperLimit}`,
      color: levelHigh.color,
      roundTop: false,
      roundBottom: false,
    },
    {
      title: `${levelLow.upperLimit} - ${levelMedium.upperLimit}`,
      color: levelMedium.color,
      roundTop: false,
      roundBottom: false,
    },
    {
      title: `Under ${levelLow.upperLimit}`,
      description: 'On track for containment',
      color: levelLow.color,
      roundTop: false,
      roundBottom: true,
    },
  ];
  return <Thermometer items={items} />;
}

function renderInfoTooltip(): React.ReactElement {
  const { body } = metricToTooltipMap[Metric.CASE_DENSITY].metricDefinition;

  return (
    <InfoTooltip
      title={renderTooltipContent(body)}
      aria-label={`Show definition of ${CaseIncidenceMetric.metricName} metric`}
      trackOpenTooltip={trackOpenTooltip(
        `Metric definition: ${Metric.CASE_DENSITY}`,
      )}
      trackCloseTooltip={trackCloseTooltip(
        `Metric definition: ${Metric.CASE_DENSITY}`,
      )}
    />
  );
}
