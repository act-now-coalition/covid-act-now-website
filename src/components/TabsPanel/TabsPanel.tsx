import React, { useState } from 'react';
import {
  Container,
  PanelContainer,
  StyledTab,
  StyledTabs,
} from './TabsPanel.style';
import Panel from './Panel';

export interface TabInfo {
  title: string;
  renderPanel: () => React.ReactNode;
  className: string;
}

function a11yProps(index: number) {
  return {
    id: `tab-${index}`,
    'aria-controls': `tabpanel-${index}`,
  };
}

const TabsPanel: React.FC<{
  tabList: TabInfo[];
  onSelectTab?: (newSelectedTabIndex: number) => void;
}> = ({ tabList, onSelectTab }) => {
  const [selectedTabIndex, setSelectedTabIndex] = useState(0);

  const onChange = (
    event: React.ChangeEvent<{}>,
    newSelectedTabIndex: number,
  ) => {
    setSelectedTabIndex(newSelectedTabIndex);
    if (onSelectTab) {
      onSelectTab(newSelectedTabIndex);
    }
  };

  return (
    <Container>
      <StyledTabs
        value={selectedTabIndex}
        onChange={onChange}
        aria-label="Tabs"
        centered
      >
        {tabList.map((tabInfo, index) => (
          <StyledTab
            className={tabInfo.className}
            key={`tab-${index}`}
            label={tabInfo.title}
            {...a11yProps(index)}
          />
        ))}
      </StyledTabs>
      <PanelContainer>
        {tabList.map((tabInfo, index) => (
          <Panel
            key={`tabpanel-${index}`}
            selectedTabIndex={selectedTabIndex}
            tabIndex={index}
            ariaLabelledBy={`tabpanel-${index}`}
          >
            {tabInfo.renderPanel()}
          </Panel>
        ))}
      </PanelContainer>
    </Container>
  );
};

export default TabsPanel;
