import React, { useState, useEffect } from 'react';
import findIndex from 'lodash/findIndex';
import isNull from 'lodash/isNull';
import { Projections } from 'common/models/Projections';
import { Region } from 'common/regions';
import { SectionHeader } from 'components/SharedComponents';
import ChartTabs from 'components/NewLocationPage/ChartTabs/ChartTabs';
import {
  Tab,
  InactiveTabWrapper,
} from 'components/NewLocationPage/ChartTabs/ChartTab.style';
import {
  ChartGroup,
  MetricChartInfo,
  MetricType,
  getValueInfo,
  trackTabClick,
} from 'components/Charts/Groupings';
import { MetricValues } from 'common/models/Projections';
import ChartFooter from 'components/NewLocationPage/ChartFooter/ChartFooter';
import { Metric } from 'common/metricEnum';
import { getRegionMetricOverride } from 'cms-content/region-overrides';

const ChartBlock: React.FC<{
  isMobile: boolean;
  region: Region;
  stats: MetricValues;
  projections: Projections;
  group: ChartGroup;
  clickedStatMetric: Metric | null;
  chartId?: string;
}> = ({ projections, stats, group, region, clickedStatMetric, chartId }) => {
  const { metricList, groupHeader } = group;

  // TODO (chelsi) - revisit placement of these state/setState variables
  const [activeTabIndex, setActiveTabIndex] = useState(0);
  const onChangeTab = (newTabIndex: number) => {
    trackTabClick(metricList[newTabIndex]);
    setActiveTabIndex(newTabIndex);
  };

  // Selects correct tab after clicking summary stat + scrolling to chart block
  useEffect(() => {
    if (!isNull(clickedStatMetric)) {
      const clickedStatMetricIndex = findIndex(
        metricList,
        item => item.metric === clickedStatMetric,
      );
      if (clickedStatMetricIndex >= 0) {
        setActiveTabIndex(clickedStatMetricIndex);
      }
    }
  }, [metricList, clickedStatMetric]);

  const TabsWrapper = metricList.length === 1 ? InactiveTabWrapper : ChartTabs;

  const { formattedValue } = getValueInfo(
    stats,
    metricList[activeTabIndex],
    projections,
  );

  // HACK: Vaccination metric returns bivalent booster data, but we only
  // want to not show the footer if there is no 1+ dose data
  const metric = metricList[activeTabIndex].metric;
  const isKeyMetric =
    metricList[activeTabIndex].metricType === MetricType.KEY_METRIC;

  // HACK: We don't have a blocking mechanism for the ExploreMetrics, so always assume they are not blocked.
  const isBlocked = isKeyMetric
    ? getRegionMetricOverride(region, metric as Metric)?.blocked
    : false;

  // Used to make sure user can change tabs after landing on a page via a share link (and having a tab auto-selected)
  const [hasSelectedSharedTab, setHasSelectedSharedTab] = useState<boolean>(
    false,
  );

  // Checks if url is a chart-share-link (ie. it contains a chartId)
  // If so - selects tab of respective metric's chart tab
  useEffect(() => {
    if (!chartId) {
      return;
    } else {
      // Turn all metrics into strings so we check for equivalence against chartId
      const metricsInMetricListAsString = metricList.map(item =>
        item.metric.toString(),
      );
      if (
        chartId &&
        metricsInMetricListAsString.includes(chartId) &&
        !hasSelectedSharedTab
      ) {
        const idx = findIndex(
          metricsInMetricListAsString,
          item => item === chartId,
        );
        if (idx >= 0) {
          setActiveTabIndex(idx);
          setHasSelectedSharedTab(true);
        }
      }
    }
  }, [activeTabIndex, chartId, metricList, hasSelectedSharedTab]);

  return (
    <>
      <SectionHeader>{groupHeader}</SectionHeader>
      <TabsWrapper activeTabIndex={activeTabIndex} onChangeTab={onChangeTab}>
        {metricList.map((metricItem: MetricChartInfo, i: number) => {
          const metricValueInfo = getValueInfo(stats, metricItem, projections);
          return (
            <Tab
              key={`tab-${i}`}
              label={metricItem.renderTabLabel(metricValueInfo, projections)}
              id={`tab-id-${i}`}
              aria-controls={`tab-id-${i}`}
            />
          );
        })}
      </TabsWrapper>
      {metricList[activeTabIndex].renderChart(projections)}
      {!isBlocked && (
        <ChartFooter
          metric={metricList[activeTabIndex].metric}
          projections={projections}
          region={region}
          stats={stats}
          metricType={metricList[activeTabIndex].metricType}
          formattedValue={formattedValue}
        />
      )}
    </>
  );
};

export default ChartBlock;
