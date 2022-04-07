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
import { formatValue, getMetricName } from 'common/metric';
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

// TODO(8.2) Finalize group header
export enum GroupHeader {
  COMMUNITY_LEVEL = 'Community Level Components',
  VACCINATED = '% Vaccinated',
  ADDITIONAL_HOSPITALIZATION = 'Additional Hospitalization Metrics',
  ADDITIONAL_MISC = 'Additional Metrics',
}

export interface ChartGroup {
  groupHeader: GroupHeader;
  metricList: MetricChartInfo[];
}

// TODO(8.2) Replace with final group header
export const CHART_GROUPS: ChartGroup[] = [
  {
    groupHeader: GroupHeader.COMMUNITY_LEVEL,
    metricList: [
      {
        metric: Metric.WEEKLY_CASES_PER_100K,
        metricType: MetricType.KEY_METRIC,
        renderTabLabel: (metricValue, projections) => (
          <ChartTab
            metricName={getMetricNameForStat(Metric.WEEKLY_CASES_PER_100K)}
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
            metricName={getMetricNameForStat(Metric.ADMISSIONS_PER_100K)}
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
            metricName={getMetricNameForStat(Metric.RATIO_BEDS_WITH_COVID)}
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
  {
    groupHeader: GroupHeader.ADDITIONAL_HOSPITALIZATION,
    metricList: [
      {
        metric: Metric.HOSPITAL_USAGE,
        metricType: MetricType.KEY_METRIC,
        renderTabLabel: (metricValue, projections) => (
          <ChartTab metricName="ICU used" metricValueInfo={metricValue} /> // TODO (chelsi): make a map of these chart-specific metric names
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
          <SingleLocationChartContainer
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
          <SingleLocationChartContainer
            metric={ExploreMetric.HOSPITALIZATIONS}
            projections={projections}
          />
        ),
      },
    ],
  },
  {
    groupHeader: GroupHeader.ADDITIONAL_MISC,
    metricList: [
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
      {
        metric: ExploreMetric.DEATHS,
        metricType: MetricType.EXPLORE_METRIC,
        renderTabLabel: (metricValue, projections) => (
          <ChartTab metricName="Daily deaths" metricValueInfo={metricValue} />
        ),
        renderChart: projections => (
          <SingleLocationChartContainer
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
    // const levelInfo = getLevelInfo(metric as Metric, statValue);
    const formattedValue = formatValue(
      metric as Metric,
      statValue,
      nullValueString,
    );
    return {
      unformattedValue: statValue,
      formattedValue,
      // levelColor: levelInfo.color,
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
