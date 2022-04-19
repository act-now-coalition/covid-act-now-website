import React from 'react';
import { CircleIcon } from 'components/NewLocationPage/Shared/Shared.style';
import { trackOpenTooltip } from 'components/InfoTooltip';
import { InfoTooltip, renderTooltipContent } from 'components/InfoTooltip';
import { Row, LevelLabel, Wrapper, Title } from './OverallLevelText.style';
import { locationPageHeaderTooltipContent } from 'cms-content/tooltips';
import { LOCATION_SUMMARY_LEVELS } from 'common/metrics/location_summary';
import { Level } from 'common/level';
import { useBreakpoint } from 'common/hooks';

export function renderInfoTooltip(): React.ReactElement {
  const { body } = locationPageHeaderTooltipContent;

  return (
    <InfoTooltip
      title={renderTooltipContent(body)}
      aria-label="Description of community levels"
      trackOpenTooltip={() => trackOpenTooltip('Location page header')}
    />
  );
}

const OverallLevelText: React.FC<{ currentLevel: Level }> = ({
  currentLevel,
}) => {
  const isMobile = useBreakpoint(600);
  const levelInfo = LOCATION_SUMMARY_LEVELS[currentLevel];
  const levelName = isMobile ? levelInfo.summary : levelInfo.name;

  return (
    <Wrapper>
      <Row>
        <Title>Community level</Title>
        {renderInfoTooltip()}
      </Row>
      <Row>
        <CircleIcon $iconColor={levelInfo.color} />
        <LevelLabel>{levelName}</LevelLabel>
      </Row>
    </Wrapper>
  );
};

export default OverallLevelText;
