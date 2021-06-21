import React, { FunctionComponent } from 'react';
import { Tabs, TabsWrapper } from './ChartTab.style';

const ChartTabs: FunctionComponent<{
  activeTabIndex: number;
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
      </Tabs>
    </TabsWrapper>
  );
};

export default ChartTabs;
