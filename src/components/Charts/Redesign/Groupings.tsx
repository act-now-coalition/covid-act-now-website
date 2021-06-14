import React from 'react';
import { Metric } from 'common/metricEnum';
import { ExploreMetric } from 'components/Explore';
import MetricChart from 'components/Charts/MetricChart';
import { Projections } from 'common/models/Projections';
import { getMetricNameExtended } from 'common/metric';
import {
  getMetricNameForStat,
  metricSubLabelText,
} from 'components/NewLocationPage/SummaryStat/utils';
import ChartTab from 'components/NewLocationPage/ChartTabs/ChartTab';
import { getMetricName } from 'components/Explore/utils';

export interface metricChartInfo {
  metric: Metric | ExploreMetric;
  // datasetId: string;
  renderChart: (projections: Projections) => React.ReactElement;
  renderTabLabel: () => React.ReactElement;
}

export interface ChartGroup {
  groupHeader: string;
  metricList: metricChartInfo[];
}

export const CHART_GROUPS: ChartGroup[] = [
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
          <ChartTab metricName={getMetricNameForStat(Metric.HOSPITAL_USAGE)} />
        ),
        renderChart: projections => (
          <MetricChart
            metric={Metric.HOSPITAL_USAGE}
            projections={projections}
          />
        ),
      },
      // {
      //   metric: ExploreMetric.ICU_HOSPITALIZATIONS,
      //   renderTabLabel: () => (
      //     <ChartTab
      //       metricName={getMetricName(ExploreMetric.ICU_HOSPITALIZATIONS)}
      //     />
      //   ),
      //   // renderChart: projections => (
      //   //   <MetricChart
      //   //     metric={Metric.HOSPITAL_USAGE}
      //   //     projections={projections}
      //   //   />
      //   // ),
      //   renderChart: (projections) => (<div>Hello</div>),
      // },
    ],
  },
];
