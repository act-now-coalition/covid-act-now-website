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
  indicatorColor: string;
  renderPanel: () => React.ReactNode;
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
        $indicatorColor={tabList[selectedTabIndex].indicatorColor}
      >
        {tabList.map((tabInfo, index) => (
          <StyledTab
            id={`tab-${index}`}
            key={`tab-${index}`}
            label={tabInfo.title}
            aria-controls={`tabpanel-${index}`}
          />
        ))}
      </StyledTabs>
      <PanelContainer>
        {tabList.map((tabInfo, index) => (
          <Panel
            id={`tabpanel-${index}`}
            key={`tabpanel-${index}`}
            selectedTabIndex={selectedTabIndex}
            tabIndex={index}
            aria-labelledby={`tab-${index}`}
          >
            {tabInfo.renderPanel()}
          </Panel>
        ))}
      </PanelContainer>
    </Container>
  );
};

export default TabsPanel;
