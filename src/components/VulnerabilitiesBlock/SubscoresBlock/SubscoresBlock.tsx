import React from 'react';
import { Row, ScoreNameCell, LevelCell } from './SubscoresBlock.style';
import { orderedCcviSubscores } from 'cms-content/tooltips';
import { InfoTooltip } from 'components/InfoTooltip';

const SubscoresBlock: React.FC<{ score: number }> = ({ score }) => {
  return (
    <>
      {orderedCcviSubscores.map((subscore: any, i: number) => {
        const grayRow = i % 2 == 0;
        const tooltipProps = {
          title: subscore.content,
          'aria-label': `Show definition of ${subscore.subscoreName}`,
          trackOpenTooltip: () => {},
          trackCloseTooltip: () => {},
        };
        return (
          <Row grayRow={grayRow}>
            <ScoreNameCell>
              {subscore.subscoreName}
              <InfoTooltip {...tooltipProps} />
            </ScoreNameCell>
            <LevelCell>Very high</LevelCell>
          </Row>
        );
      })}
    </>
  );
};

export default SubscoresBlock;
