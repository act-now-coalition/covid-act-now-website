import React, { FunctionComponent } from 'react';
import { Tab, Tabs } from './ChartTab.style';
import ChartTab from './ChartTab';
import { Metric } from 'common/metricEnum';

export interface TabContent {
  metric: Metric;
  value: number;
}

const ChartTabs: FunctionComponent<{
  activeTabIndex: number;
  tabsContent: TabContent[];
  onChangeTab: (newTabIndex: number) => void;
}> = ({ activeTabIndex, tabsContent, onChangeTab }) => {
  return (
    <Tabs
      value={activeTabIndex}
      onChange={(event, tabIndex) => onChangeTab(tabIndex)}
      aria-label="Metrics Tabs"
      variant="scrollable"
    >
      {tabsContent.map((tab: TabContent, i: number) => {
        return (
          <Tab
            key={`tab-${i}`}
            disableRipple
            disableFocusRipple
            label={<ChartTab metric={tab.metric} value={tab.value} />}
            id={`tab-id-${i}`}
            aria-controls={`tab-id-${i}`}
          />
        );
      })}
    </Tabs>
  );
};

export default ChartTabs;
