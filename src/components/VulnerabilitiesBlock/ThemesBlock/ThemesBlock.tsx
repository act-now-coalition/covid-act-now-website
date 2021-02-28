import React from 'react';
import { Row, ThemeNameCell, LevelCell } from './ThemesBlock.style';
import { orderedCcviThemes, CcviThemeInfo } from 'cms-content/tooltips';
import { InfoTooltip } from 'components/InfoTooltip';
import { RegionCcviItem } from 'common/data';
import { getCcviLevel, getCcviLevelColor, getCcviLevelName } from 'common/ccvi';

export interface ThemeWithScore extends CcviThemeInfo {
  score: number;
}

const ThemesBlock: React.FC<{ scores: RegionCcviItem }> = ({ scores }) => {
  const themesWithScores: ThemeWithScore[] = orderedCcviThemes.map(
    (item: CcviThemeInfo) => {
      return {
        ...item,
        score: scores[item.theme],
      };
    },
  );

  return (
    <>
      {themesWithScores.map((theme: ThemeWithScore) => {
        const level = getCcviLevel(theme.score);
        const levelName = getCcviLevelName(level);
        return (
          <Row key={theme.subscoreName}>
            <ThemeNameCell>
              {theme.subscoreName}
              <InfoTooltip
                title={theme.content}
                aria-label={`Show definition of ${theme.subscoreName}`}
                trackOpenTooltip={() => {}}
                trackCloseTooltip={() => {}}
              />
            </ThemeNameCell>
            <LevelCell
              aria-label={levelName.toLowerCase()}
              color={getCcviLevelColor(level)}
            >
              {levelName}
            </LevelCell>
          </Row>
        );
      })}
    </>
  );
};

export default ThemesBlock;
