import React from 'react';
import { Row, ScoreNameCell, LevelCell } from './SubscoresBlock.style';
import { orderedCcviThemes, CcviThemeInfo } from 'cms-content/tooltips';
import { InfoTooltip } from 'components/InfoTooltip';
import { RegionCcviItem } from 'common/data';
import { getCcviLevel, getCcviLevelColor, getCcviLevelName } from 'common/ccvi';

export interface ThemeWithScore extends CcviThemeInfo {
  score: number;
}

const SubscoresBlock: React.FC<{ scores: RegionCcviItem }> = ({ scores }) => {
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
      {themesWithScores.map((theme: ThemeWithScore, i: number) => {
        const grayRow = i % 2 === 0;
        const level = getCcviLevel(theme.score);
        const levelName = getCcviLevelName(level);
        return (
          <Row grayRow={grayRow}>
            <ScoreNameCell>
              {theme.subscoreName}
              <InfoTooltip
                title={theme.content}
                aria-label={`Show definition of ${theme.subscoreName}`}
                trackOpenTooltip={() => {}}
                trackCloseTooltip={() => {}}
              />
            </ScoreNameCell>
            <LevelCell color={getCcviLevelColor(level)}>{levelName}</LevelCell>
          </Row>
        );
      })}
    </>
  );
};

export default SubscoresBlock;
