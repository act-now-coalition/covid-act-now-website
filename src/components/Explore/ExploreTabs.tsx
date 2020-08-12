import React, { FunctionComponent } from 'react';
// import { withStyles } from '@material-ui/core/styles';
// import Tabs from '@material-ui/core/Tabs';
// import Tab from '@material-ui/core/Tab';
import * as Styles from './Explore.style';

const ExploreTabs: FunctionComponent<{
  activeTabIndex: number;
  labels: string[];
  onChangeTab: (event: React.ChangeEvent<{}>, newTabIndex: number) => void;
}> = ({ activeTabIndex, labels, onChangeTab }) => (
  <Styles.Tabs
    value={activeTabIndex}
    onChange={onChangeTab}
    aria-label="Metrics Tabs"
    variant="scrollable"
  >
    {labels.map((label, i) => (
      <Styles.Tab
        disableRipple
        disableFocusRipple
        label={label}
        id={`tab-id-${i}`}
        aria-controls={`tab-id-${i}`}
      />
    ))}
  </Styles.Tabs>
);

export default ExploreTabs;
