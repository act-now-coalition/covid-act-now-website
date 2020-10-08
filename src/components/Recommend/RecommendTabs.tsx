import React, { useState } from 'react';
import * as Style from './RecommendModal.style';

type Markdown = string;
type Color = string;

interface SourceLevel {
  color: Color;
  label: string;
  body: Markdown; // markdown
}

const RecommendTabs: React.FC<{ levels: SourceLevel[] }> = ({ levels }) => {
  const [activeTabIndex, setActiveTabIndex] = useState(0);
  const currentLevel = levels[activeTabIndex];
  return (
    <Style.LevelContainer>
      <Style.Tabs
        value={activeTabIndex}
        aria-label="Level Tabs"
        variant="scrollable"
        onChange={(event, tabIndex) => setActiveTabIndex(tabIndex)}
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
