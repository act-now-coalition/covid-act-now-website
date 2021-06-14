import React from 'react';
import { Metric } from 'common/metricEnum';
import { ExploreMetric } from 'components/Explore';
import MetricChart from 'components/Charts/MetricChart';
import SingleLocationParent from './SingleLocationParent';
import { Projections } from 'common/models/Projections';
// import { getMetricNameExtended } from 'common/metric';
import {
  getMetricNameForStat,
  metricSubLabelText,
} from 'components/NewLocationPage/SummaryStat/utils';
import ChartTab from 'components/NewLocationPage/ChartTabs/ChartTab';
// import { getMetricName } from 'components/Explore/utils';

export interface metricChartInfo {
  metric: Metric | ExploreMetric;
  renderChart: (projections: Projections) => React.ReactElement;
  renderTabLabel: () => React.ReactElement;
}

export interface ChartGroup {
  groupHeader: string;
  metricList: metricChartInfo[];
}

export const CHART_GROUPS: ChartGroup[] = [
  {
    groupHeader: '% Vaccinated',
    metricList: [
      {
        metric: Metric.VACCINATIONS,
        renderTabLabel: () => (
          <ChartTab
            metricName={getMetricNameForStat(Metric.VACCINATIONS)}
            subLabel={metricSubLabelText[Metric.VACCINATIONS]}
          />
        ),
        renderChart: projections => (
          <MetricChart metric={Metric.VACCINATIONS} projections={projections} />
        ),
      },
    ],
  },
  {
    groupHeader: 'Cases',
    metricList: [
      {
        metric: Metric.CASE_DENSITY,
        renderTabLabel: () => (
          <ChartTab
            metricName={getMetricNameForStat(Metric.CASE_DENSITY)}
            subLabel={metricSubLabelText[Metric.CASE_DENSITY]}
          />
        ),
        renderChart: projections => (
          <MetricChart metric={Metric.CASE_DENSITY} projections={projections} />
        ),
      },
      {
        metric: Metric.CASE_GROWTH_RATE,
        renderTabLabel: () => (
          <ChartTab
            metricName={getMetricNameForStat(Metric.CASE_GROWTH_RATE)}
          />
        ),
        renderChart: projections => (
          <MetricChart
            metric={Metric.CASE_GROWTH_RATE}
            projections={projections}
          />
        ),
      },
      {
        metric: Metric.POSITIVE_TESTS,
        renderTabLabel: () => (
          <ChartTab metricName={getMetricNameForStat(Metric.POSITIVE_TESTS)} />
        ),
        renderChart: projections => (
          <MetricChart
            metric={Metric.POSITIVE_TESTS}
            projections={projections}
          />
        ),
      },
    ],
  },
  {
    groupHeader: 'Hospitalizations',
    metricList: [
      {
        metric: Metric.HOSPITAL_USAGE,
        renderTabLabel: () => (
          <ChartTab metricName="ICU used" /> // (chelsi) make a map of these chart-specific metric names
        ),
        renderChart: projections => (
          <MetricChart
            metric={Metric.HOSPITAL_USAGE}
            projections={projections}
          />
        ),
      },
      {
        metric: ExploreMetric.ICU_HOSPITALIZATIONS,
        renderTabLabel: () => <ChartTab metricName="ICU patients" />,
        renderChart: projections => (
          <SingleLocationParent
            metric={ExploreMetric.ICU_HOSPITALIZATIONS}
            projections={projections}
          />
        ),
      },
      {
        metric: ExploreMetric.HOSPITALIZATIONS,
        renderTabLabel: () => <ChartTab metricName="Hospitalized patients" />,
        renderChart: projections => (
          <SingleLocationParent
            metric={ExploreMetric.HOSPITALIZATIONS}
            projections={projections}
          />
        ),
      },
    ],
  },
  {
    groupHeader: 'Deaths',
    metricList: [
      {
        metric: ExploreMetric.DEATHS,
        renderTabLabel: () => <ChartTab metricName="Daily new deaths" />,
        renderChart: projections => (
          <SingleLocationParent
            metric={ExploreMetric.DEATHS}
            projections={projections}
          />
        ),
      },
    ],
  },
];
