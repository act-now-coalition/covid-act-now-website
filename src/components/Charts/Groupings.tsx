import React from 'react';
import some from 'lodash/some';
import find from 'lodash/find';
import { Metric } from 'common/metricEnum';
import { ExploreMetric, getTitle } from 'components/Explore';
import MetricChart from 'components/Charts/MetricChart';
import SingleLocationChartContainer from './SingleLocationChartContainer';
import { Projections } from 'common/models/Projections';
import {
  getMetricNameForStat,
  metricSubLabelText,
} from 'components/NewLocationPage/SummaryStat/utils';
import ChartTab from 'components/NewLocationPage/ChartTabs/ChartTab';
import { MetricValues } from 'common/models/Projections';
import { getAveragedSeriesForMetric } from 'components/Explore/utils';
import { formatValue, getMetricName, getLevelInfo } from 'common/metric';
import { last } from 'components/Charts/utils';
import { formatDecimal } from 'common/utils';
import VaccinationChartTabs from 'components/NewLocationPage/ChartTabs/VaccinationChartTabs';
import { EventAction, EventCategory, trackEvent } from 'components/Analytics';

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

export enum GroupHeader {
  COMMUNITY_LEVEL = 'Community level metrics',
  VACCINATED = '% Vaccinated',
  TRANSMISSION = 'Transmission metrics',
}

export interface ChartGroup {
  groupHeader: GroupHeader;
  metricList: MetricChartInfo[];
}

export const CHART_GROUPS: ChartGroup[] = [
  {
    groupHeader: GroupHeader.COMMUNITY_LEVEL,
    metricList: [
      {
        metric: Metric.WEEKLY_CASES_PER_100K,
        metricType: MetricType.KEY_METRIC,
        renderTabLabel: (metricValue, projections) => (
          <ChartTab
            metricName={getMetricName(Metric.WEEKLY_CASES_PER_100K)}
            subLabel={metricSubLabelText[Metric.WEEKLY_CASES_PER_100K]}
            metricValueInfo={metricValue}
          />
        ),
        renderChart: projections => (
          <MetricChart
            metric={Metric.WEEKLY_CASES_PER_100K}
            projections={projections}
          />
        ),
      },
      {
        metric: Metric.ADMISSIONS_PER_100K,
        metricType: MetricType.KEY_METRIC,
        renderTabLabel: (metricValue, projections) => (
          <ChartTab
            metricName={getMetricName(Metric.ADMISSIONS_PER_100K)}
            subLabel={metricSubLabelText[Metric.ADMISSIONS_PER_100K]}
            metricValueInfo={metricValue}
          />
        ),
        renderChart: projections => (
          <MetricChart
            metric={Metric.ADMISSIONS_PER_100K}
            projections={projections}
          />
        ),
      },
      {
        metric: Metric.RATIO_BEDS_WITH_COVID,
        metricType: MetricType.KEY_METRIC,
        renderTabLabel: (metricValue, projections) => (
          <ChartTab
            metricName={getMetricName(Metric.RATIO_BEDS_WITH_COVID)}
            subLabel={metricSubLabelText[Metric.RATIO_BEDS_WITH_COVID]}
            metricValueInfo={metricValue}
          />
        ),
        renderChart: projections => (
          <MetricChart
            metric={Metric.RATIO_BEDS_WITH_COVID}
            projections={projections}
          />
        ),
      },
    ],
  },
  {
    groupHeader: GroupHeader.TRANSMISSION,
    metricList: [
      {
        metric: Metric.CASE_DENSITY,
        metricType: MetricType.KEY_METRIC,
        renderTabLabel: (metricValue, projections) => (
          <ChartTab
            metricName="Daily New Cases per 100k"
            metricValueInfo={metricValue}
            showColorIndicator={false}
          />
        ),
        renderChart: projections => (
          <SingleLocationChartContainer
            metric={ExploreMetric.DAILY_CASES_PER_100K}
            projections={projections}
          />
        ),
      },
      {
        metric: Metric.CASE_GROWTH_RATE,
        metricType: MetricType.KEY_METRIC,
        renderTabLabel: (metricValue, projections) => (
          <ChartTab
            metricName={getMetricNameForStat(Metric.CASE_GROWTH_RATE)}
            metricValueInfo={metricValue}
            showColorIndicator={false}
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
            showColorIndicator={false}
          />
        ),
        renderChart: projections => (
          <SingleLocationChartContainer
            metric={ExploreMetric.POSITIVITY_RATE}
            projections={projections}
          />
        ),
      },
    ],
  },
  {
    groupHeader: GroupHeader.VACCINATED,
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

// Used for scrolling to correct chart group when clicking summary stat
export const getChartGroupFromMetric = (
  metricToScrollTo: Metric,
): ChartGroup | null => {
  const groupWithMetric = find(
    CHART_GROUPS,
    group =>
      find(group.metricList, metric => metric.metric === metricToScrollTo) !==
      undefined,
  );
  return groupWithMetric ?? null;
};

function getMetricNameForTracking(metricItem: MetricChartInfo): string {
  const { metric } = metricItem;
  if (metricItem.metricType === MetricType.EXPLORE_METRIC) {
    return getTitle(metric as ExploreMetric);
  } else if (metricItem.metricType === MetricType.KEY_METRIC) {
    return getMetricName(metric as Metric);
  } else return '';
}

export function trackTabClick(metricItem: MetricChartInfo) {
  console.log('tracking label', getMetricNameForTracking(metricItem));
  trackEvent(
    EventCategory.METRICS,
    EventAction.CLICK,
    `Chart tab: ${getMetricNameForTracking(metricItem)}`,
  );
}
