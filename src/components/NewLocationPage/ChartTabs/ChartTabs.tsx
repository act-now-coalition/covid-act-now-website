import React, { FunctionComponent } from 'react';
import { Tab, Tabs, TabsWrapper } from './ChartTab.style';
import ChartTab from './ChartTab';
import { Metric } from 'common/metricEnum';
import { formatValue, getLevelInfo } from 'common/metric';

export interface TabContent {
  metric: Metric;
  value: number;
  metricName: string;
  subLabel?: string[];
}

const ChartTabs: FunctionComponent<{
  activeTabIndex: number;
  // tabsContent: TabContent[];
  onChangeTab: (newTabIndex: number) => void;
}> = ({ activeTabIndex, onChangeTab, children }) => {
  return (
    <TabsWrapper>
      <Tabs
        value={activeTabIndex}
        onChange={(event, tabIndex) => onChangeTab(tabIndex)}
        aria-label="Metrics Tabs"
        variant="scrollable"
      >
        {children}
        {/* {tabsContent.map((tab: TabContent, i: number) => {
        return (
          <Tab
            key={`tab-${i}`}
            disableRipple
            disableFocusRipple
            label={<ChartTab metricName={tab.metricName} subLabel={tab.subLabel}/>}
            // label={<ChartTab metric={tab.metric} value={tab.value} metricName={tab.metricName} hasSubLabel={tab.hasSubLabel}/>}
            id={`tab-id-${i}`}
            aria-controls={`tab-id-${i}`}
          />
        );
      })} */}
      </Tabs>
    </TabsWrapper>
  );
};

export default ChartTabs;
