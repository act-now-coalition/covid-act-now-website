import React, { useState } from 'react';
import { EventAction, EventCategory, trackEvent } from 'components/Analytics';
import * as Style from './RecommendModal.style';

type Markdown = string;
type Color = string;

export interface SourceLevel {
  color: Color;
  label: string;
  body: Markdown; // markdown
}

const RecommendTabs: React.FC<{
  levels: SourceLevel[];
  onSelectLevel: (level: SourceLevel) => void;
}> = ({ levels, onSelectLevel }) => {
  const [activeTabIndex, setActiveTabIndex] = useState(0);
  const currentLevel = levels[activeTabIndex];

  function onSelectTab(tabIndex: number) {
    onSelectLevel(levels[tabIndex]);
    setActiveTabIndex(tabIndex);
  }

  return (
    <Style.LevelContainer>
      <Style.Tabs
        value={activeTabIndex}
        aria-label="Level Tabs"
        variant="scrollable"
        onChange={(event, tabIndex) => onSelectTab(tabIndex)}
        className={`Indicator-${currentLevel.label}`}
      >
        {levels.map((level, i) => (
          <Style.Tab
            key={level.label}
            label={level.label}
            id={`recommend-tab-id-${i}`}
            aria-controls={`tab-id-${i}`}
            disableRipple
            disableFocusRipple
            disableTouchRipple
          />
        ))}
      </Style.Tabs>
      <Style.LevelDescription source={currentLevel.body} />
    </Style.LevelContainer>
  );
};

export default RecommendTabs;
