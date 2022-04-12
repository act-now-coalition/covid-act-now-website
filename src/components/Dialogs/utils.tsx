import React from 'react';
import { Sources } from 'api/schema/RegionSummaryWithTimeseries';
import { Metric } from 'common/metricEnum';
import { metricToTooltipMap } from 'cms-content/tooltips';
import { Region } from 'common/regions';
import { getDataSourceTooltipContent } from 'common/utils/provenance';
import { ExploreMetric } from 'components/Explore';
import { getMetricNameExtended } from 'common/metric';

export interface MetricModalContent {
  howItsCalculated: string;
  dataSource?: React.ReactElement;
  metricDefinition: string;
  learnLink?: string;
  metricName: string;
}

const metricToLearnLink: { [key in Metric]: string } = {
  [Metric.CASE_DENSITY]: '/covid-risk-levels-metrics#daily-new-cases',
  [Metric.CASE_GROWTH_RATE]: '/covid-risk-levels-metrics#infection-rate',
  [Metric.HOSPITAL_USAGE]: '/covid-risk-levels-metrics#icu-capacity-used',
  [Metric.POSITIVE_TESTS]: '/covid-risk-levels-metrics#positive-test-rate',
  [Metric.VACCINATIONS]: '/covid-risk-levels-metrics#percent-vaccinated',

  // TODO(8.2) - finalize hash links
  [Metric.ADMISSIONS_PER_100K]:
    '/covid-risk-levels-metrics#admissions-per-100k',
  [Metric.RATIO_BEDS_WITH_COVID]:
    '/covid-risk-levels-metrics#ratio-beds-with-covid',
  [Metric.WEEKLY_CASES_PER_100K]:
    '/covid-risk-levels-metrics#weekly-cases-per-100k',
};

export function getMetricModalContent(
  region: Region,
  metric: Metric,
  provenance?: Sources,
): MetricModalContent {
  const howItsCalculated = metricToTooltipMap[metric].metricCalculation.body;

  const dataSource = getDataSourceTooltipContent(metric, region, provenance);

  const metricDefinition = metricToTooltipMap[metric].metricDefinition.body;

  const learnLink = metricToLearnLink[metric];

  const modalContent = {
    metricName: getMetricNameExtended(metric),
    howItsCalculated,
    dataSource,
    metricDefinition,
    learnLink,
  };

  return modalContent;
}

interface ExploreMetricModalMapContent {
  metricName: string;
  howItsCalculated: string;
  metricDefinition: string;
  source: string;
  statusTextMeasure: string;
}

export const exploreMetricToFooterContentMap: {
  [key: number]: ExploreMetricModalMapContent;
} = {
  [ExploreMetric.DEATHS]: {
    metricName: 'daily deaths',
    howItsCalculated: 'Our daily deaths number is a seven-day average.',
    metricDefinition: 'This is the number of COVID deaths per day.',
    source: 'The New York Times',
    statusTextMeasure: 'weekly deaths',
  },
  [ExploreMetric.ICU_HOSPITALIZATIONS]: {
    metricName: 'ICU hospitalizations',
    howItsCalculated: 'Our ICU hospitalizations number is a seven-day average.',
    metricDefinition:
      'This is the number of patients currently hospitalized in the ICU with COVID.',
    source: 'Department of Health and Human Services',
    statusTextMeasure: 'COVID patients hospitalized in ICUs',
  },
  [ExploreMetric.HOSPITALIZATIONS]: {
    metricName: 'hospitalizations',
    howItsCalculated: 'Our hospitalizations number is a seven-day average.',
    metricDefinition:
      'This is the number of patients currently hospitalized with COVID.',
    source: 'Department of Health and Human Services',
    statusTextMeasure: 'COVID patients in hospitals',
  },
};

export function getExploreMetricModalContent(
  region: Region,
  metric: ExploreMetric,
): MetricModalContent {
  const {
    howItsCalculated,
    metricDefinition,
    metricName,
    source,
  } = exploreMetricToFooterContentMap[metric];

  const dataSource = (
    <p>
      Our data for {metricName} in {region.shortName} comes from {source}
    </p>
  );

  const modalContent = {
    metricName,
    howItsCalculated,
    dataSource,
    metricDefinition,
  };

  return modalContent;
}
