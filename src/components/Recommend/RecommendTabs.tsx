import React, { useState } from 'react';
import * as Style from './RecommendModal.style';
import useMediaQuery from '@material-ui/core/useMediaQuery';
import { useTheme } from '@material-ui/core/styles';
import { FedLevel, HarvardLevel } from 'cms-content/recommendations';

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
  initialLevel: number;
}> = ({ levels, onSelectLevel, initialLevel }) => {
  const [activeTabIndex, setActiveTabIndex] = useState<number>(initialLevel);
  const currentLevel = levels[activeTabIndex];

  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down(850));
  const tabsVariant = isMobile ? 'scrollable' : 'standard';

  function onSelectTab(tabIndex: number) {
    onSelectLevel(levels[tabIndex]);
    setActiveTabIndex(tabIndex);
  }

  return (
    <Style.LevelContainer>
      <Style.Tabs
        centered
        value={activeTabIndex}
        aria-label="Level Tabs"
        variant={tabsVariant}
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
      <Style.LevelDescription source={currentLevel.body} linkTarget="_blank" />
    </Style.LevelContainer>
  );
};

export default RecommendTabs;
