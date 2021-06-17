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
} from 'components/Charts/Redesign/Groupings';
import { MetricValues } from 'common/models/Projections';
import ChartFooter from 'components/NewLocationPage/ChartFooter/ChartFooter';
import { Metric } from 'common/metricEnum';

const NewChartBlock: React.FC<{
  isMobile: boolean;
  region: Region;
  stats: MetricValues;
  projections: Projections;
  group: ChartGroup;
  clickedStatMetric: Metric | null;
  groupRef: React.RefObject<HTMLDivElement>;
}> = ({ projections, stats, group, region, groupRef, clickedStatMetric }) => {
  const { metricList, groupHeader } = group;

  // TODO (chelsi) - revisit placement of these state/setState variables
  const [activeTabIndex, setActiveTabIndex] = useState(0);
  const onChangeTab = (newTabIndex: number) => {
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

  return (
    <>
      <SectionHeader ref={groupRef}>{groupHeader}</SectionHeader>
      <TabsWrapper activeTabIndex={activeTabIndex} onChangeTab={onChangeTab}>
        {metricList.map((metricItem: MetricChartInfo, i: number) => {
          const metricValueInfo = getValueInfo(stats, metricItem, projections);
          return (
            <Tab
              key={`tab-${i}`}
              disableRipple
              disableFocusRipple
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

export default NewChartBlock;
