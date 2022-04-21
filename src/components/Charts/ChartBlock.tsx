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
  getValueInfo,
  trackTabClick,
} from 'components/Charts/Groupings';
import { MetricValues } from 'common/models/Projections';
import ChartFooter from 'components/NewLocationPage/ChartFooter/ChartFooter';
import { Metric } from 'common/metricEnum';

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

  const { unformattedValue, formattedValue } = getValueInfo(
    stats,
    metricList[activeTabIndex],
    projections,
  );
  const hasValue = Number.isFinite(unformattedValue);

  // Checks if url is a chart-share-link (ie. it contains a chartId)
  // If so - selects tab of respective metric's chart tab
  useEffect(() => {
    // Turn all metrics into strings so we check for equivalence against chartId
    const metricsInMetricListAsString = metricList
      .map(metricListItem => metricListItem.metric)
      .map(item => item.toString());
    if (chartId && metricsInMetricListAsString.includes(chartId)) {
      const idx = findIndex(
        metricsInMetricListAsString,
        item => item === chartId,
      );
      setActiveTabIndex(idx);
    }
  }, [activeTabIndex, chartId, metricList]);

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
      {hasValue && (
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
