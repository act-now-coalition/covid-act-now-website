import React, { useState } from 'react';
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

const NewChartBlock: React.FC<{
  isMobile: boolean;
  region: Region;
  stats: MetricValues;
  projections: Projections;
  group: ChartGroup;
}> = ({ projections, stats, group }) => {
  const { metricList, groupHeader } = group;

  const [activeTabIndex, setActiveTabIndex] = useState(0);
  const onChangeTab = (newTabIndex: number) => {
    setActiveTabIndex(newTabIndex);
  };

  const inactiveTabs = metricList.length === 1;
  const TabsWrapper = inactiveTabs ? InactiveTabWrapper : ChartTabs;

  return (
    <>
      <SectionHeader>{groupHeader}</SectionHeader>
      <TabsWrapper activeTabIndex={activeTabIndex} onChangeTab={onChangeTab}>
        {metricList.map((metricItem: MetricChartInfo, i: number) => {
          const metricValueInfo = getValueInfo(stats, metricItem, projections);
          // const { unformattedValue } = metricValueInfo;

          return (
            <Tab
              key={`tab-${i}`}
              disableRipple
              disableFocusRipple
              label={metricItem.renderTabLabel(metricValueInfo)}
              id={`tab-id-${i}`}
              aria-controls={`tab-id-${i}`}
            />
          );
        })}
      </TabsWrapper>
      {metricList[activeTabIndex].renderChart(projections)}
    </>
  );
};

export default NewChartBlock;
