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
  howItsGraded?: string;
  dataSource?: React.ReactElement;
  metricDefinition: string;
  learnLink?: string;
  metricName: string;
}

const metricToLearnLink: { [key in Metric]: string } = {
  [Metric.CASE_DENSITY]: '/covid-community-level-metrics#daily-new-cases',
  [Metric.CASE_GROWTH_RATE]: '/covid-community-level-metrics#infection-rate',
  [Metric.HOSPITAL_USAGE]: '/covid-community-level-metrics#icu-capacity-used',
  [Metric.POSITIVE_TESTS]: '/covid-community-level-metrics#positive-test-rate',
  [Metric.VACCINATIONS]: '/covid-community-level-metrics#percent-vaccinated',
  [Metric.ADMISSIONS_PER_100K]:
    '/covid-community-level-metrics#weekly-admissions',
  [Metric.RATIO_BEDS_WITH_COVID]:
    '/covid-community-level-metrics#patients-with-covid',
  [Metric.WEEKLY_CASES_PER_100K]:
    '/covid-community-level-metrics#weekly-new-cases',
};

const howItsGradedMap: { [key: number]: string } = {
  [Metric.ADMISSIONS_PER_100K]:
    'Levels for weekly new admissions are based on the CDC’s Community Level framework. Less than 10 weekly new admissions is considered Low, between 10 and 19.9 is considered Medium, and greater than or equal to 20 is considered High. No color grading is applied prior to the April 18, 2022 change to a community risk level framework, which better reflects the more recent decreased risk of severe illness and death from COVID due to vaccines, therapeutics, and past COVID infections, and other developments.',
  [Metric.RATIO_BEDS_WITH_COVID]:
    'Levels for percentage of patients with COVID are generally based on the CDC’s Community Level framework. Less than 10% of all new beds is considered Low, between 10 and 14.9% is considered Medium, and greater than or equal to 15% is considered High. No color grading is applied prior to the April 18, 2022 change to a community risk level framework, which better reflects the more recent decreased risk of severe illness and death from COVID due to vaccines, therapeutics, and past COVID infections, and other developments.',
  [Metric.WEEKLY_CASES_PER_100K]:
    'Levels for weekly new cases are based on the CDC’s Community Level framework. Less than 200 cases is considered Lower, while greater than or equal to 200 cases is considered Higher. No color grading is applied prior to the April 18, 2022 change to a community risk level framework, which better reflects the more recent decreased risk of severe illness and death from COVID due to vaccines, therapeutics, and past COVID infections, and other developments.',
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
    howItsGraded: howItsGradedMap[metric],
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
  [ExploreMetric.WEEKLY_DEATHS]: {
    metricName: 'weekly deaths',
    howItsCalculated: 'Our weekly deaths number is a rolling seven-day sum.',
    metricDefinition: 'This is the number of COVID deaths per week.',
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
    howItsCalculated:
      'Our hospitalizations number is a seven-day average. For counties, it is calculated for the health service area that contains the county, and then county-level data is estimated by disaggregating the data by population.',
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
