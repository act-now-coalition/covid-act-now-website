import React, { FunctionComponent } from 'react';
import { Tab, Tabs } from './Explore.style';

const ExploreTabs: FunctionComponent<{
  activeTabIndex: number;
  labels: string[];
  onChangeTab: (event: React.ChangeEvent<{}>, newTabIndex: number) => void;
}> = ({ activeTabIndex, labels, onChangeTab }) => (
  <Tabs
    value={activeTabIndex}
    onChange={onChangeTab}
    aria-label="Metrics Tabs"
    variant="scrollable"
  >
    {labels.map((label, i) => (
      <Tab
        key={`tab-${label}`}
        disableRipple
        disableFocusRipple
        label={label}
        id={`tab-id-${i}`}
        aria-controls={`tab-id-${i}`}
      />
    ))}
  </Tabs>
);

export default ExploreTabs;
