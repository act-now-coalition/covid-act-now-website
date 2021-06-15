import React from 'react';
import some from 'lodash/some';
import { Metric } from 'common/metricEnum';
import { ExploreMetric } from 'components/Explore';
import MetricChart from 'components/Charts/MetricChart';
import SingleLocationParent from './SingleLocationParent';
import { Projections } from 'common/models/Projections';
import {
  getMetricNameForStat,
  metricSubLabelText,
} from 'components/NewLocationPage/SummaryStat/utils';
import ChartTab from 'components/NewLocationPage/ChartTabs/ChartTab';
import { MetricValues } from 'common/models/Projections';
import { getAveragedSeriesForMetric } from 'components/Explore/utils';
import { formatValue, getLevelInfo } from 'common/metric';
import { last } from 'components/Charts/utils';
import { formatDecimal } from 'common/utils';
import VaccinationChartTabs from './VaccinationChartTabs';

export enum MetricType {
  KEY_METRIC,
  EXPLORE_METRIC,
}

export interface ValueInfo {
  unformattedValue: number | null;
  formattedValue: string;
  levelColor?: string;
}

export interface MetricChartInfo {
  metric: Metric | ExploreMetric;
  metricType: MetricType;
  renderChart: (projections: Projections) => React.ReactElement;
  renderTabLabel: (
    metricValueInfo: ValueInfo,
    projections: Projections,
  ) => React.ReactElement;
}

export interface ChartGroup {
  groupHeader: string;
  metricList: MetricChartInfo[];
}

export const CHART_GROUPS: ChartGroup[] = [
  {
    groupHeader: '% Vaccinated',
    metricList: [
      {
        metric: Metric.VACCINATIONS,
        metricType: MetricType.KEY_METRIC,
        renderTabLabel: (metricValue, projections) => (
          <VaccinationChartTabs projections={projections} />
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
        metricType: MetricType.KEY_METRIC,
        renderTabLabel: (metricValue, projections) => (
          <ChartTab
            metricName={getMetricNameForStat(Metric.CASE_DENSITY)}
            subLabel={metricSubLabelText[Metric.CASE_DENSITY]}
            metricValueInfo={metricValue}
          />
        ),
        renderChart: projections => (
          <MetricChart metric={Metric.CASE_DENSITY} projections={projections} />
        ),
      },
      {
        metric: Metric.CASE_GROWTH_RATE,
        metricType: MetricType.KEY_METRIC,
        renderTabLabel: (metricValue, projections) => (
          <ChartTab
            metricName={getMetricNameForStat(Metric.CASE_GROWTH_RATE)}
            metricValueInfo={metricValue}
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
        metricType: MetricType.KEY_METRIC,
        renderTabLabel: (metricValue, projections) => (
          <ChartTab
            metricName={getMetricNameForStat(Metric.POSITIVE_TESTS)}
            metricValueInfo={metricValue}
          />
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
        metricType: MetricType.KEY_METRIC,
        renderTabLabel: (metricValue, projections) => (
          <ChartTab metricName="ICU used" metricValueInfo={metricValue} /> // (chelsi) make a map of these chart-specific metric names
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
        metricType: MetricType.EXPLORE_METRIC,
        renderTabLabel: (metricValue, projections) => (
          <ChartTab metricName="ICU patients" metricValueInfo={metricValue} />
        ),
        renderChart: projections => (
          <SingleLocationParent
            metric={ExploreMetric.ICU_HOSPITALIZATIONS}
            projections={projections}
          />
        ),
      },
      {
        metric: ExploreMetric.HOSPITALIZATIONS,
        metricType: MetricType.EXPLORE_METRIC,
        renderTabLabel: (metricValue, projections) => (
          <ChartTab
            metricName="Hospitalized patients"
            metricValueInfo={metricValue}
          />
        ),
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
        metricType: MetricType.EXPLORE_METRIC,
        renderTabLabel: (metricValue, projections) => (
          <ChartTab
            metricName="Daily new deaths"
            metricValueInfo={metricValue}
          />
        ),
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

export const nullValueString = '--';

export function getValueInfo(
  stats: MetricValues,
  metricItem: MetricChartInfo,
  projections: Projections,
): ValueInfo {
  const { metric, metricType } = metricItem;
  if (metricType === MetricType.KEY_METRIC) {
    const statValue = stats[metric as Metric];
    const levelInfo = getLevelInfo(metric as Metric, statValue);
    const formattedValue = formatValue(
      metric as Metric,
      statValue,
      nullValueString,
    );
    return {
      unformattedValue: statValue,
      formattedValue,
      levelColor: levelInfo.color,
    };
  } else {
    const smoothedSeries = getAveragedSeriesForMetric(
      metric as ExploreMetric,
      projections.primary,
      '',
      false,
    );
    const hasData = some([smoothedSeries], ({ data }) => data.length > 0);
    if (!hasData) {
      return { unformattedValue: null, formattedValue: nullValueString };
    } else {
      const data = smoothedSeries.data.filter(data => Number.isFinite(data.y));
      const lastPoint = last(data);
      return {
        unformattedValue: lastPoint.y,
        formattedValue: formatDecimal(lastPoint.y, 1),
      };
    }
  }
}
