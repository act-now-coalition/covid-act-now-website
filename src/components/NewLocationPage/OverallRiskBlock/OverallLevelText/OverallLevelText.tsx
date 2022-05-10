import React from 'react';
import { CircleIcon } from 'components/NewLocationPage/Shared/Shared.style';
import { trackOpenTooltip } from 'components/InfoTooltip';
import { InfoTooltip, renderTooltipContent } from 'components/InfoTooltip';
import {
  Row,
  LevelLabel,
  Wrapper,
  DesktopTitle,
  MobileTitle,
} from './OverallLevelText.style';
import { locationPageHeaderTooltipContent } from 'cms-content/tooltips';
import { LOCATION_SUMMARY_LEVELS } from 'common/metrics/location_summary';
import { Level } from 'common/level';

export function renderInfoTooltip(): React.ReactElement {
  const { body } = locationPageHeaderTooltipContent;

  return (
    <InfoTooltip
      title={renderTooltipContent(body)}
      aria-label="Description of community risk levels"
      trackOpenTooltip={() => trackOpenTooltip('Location page header')}
    />
  );
}

const OverallLevelText: React.FC<{ currentLevel: Level }> = ({
  currentLevel,
}) => {
  const { name, color } = LOCATION_SUMMARY_LEVELS[currentLevel];

  return (
    <div>
      <MobileTitle>Community risk level</MobileTitle>
      <Wrapper>
        <Row>
          <DesktopTitle>Community risk level</DesktopTitle>
          {renderInfoTooltip()}
        </Row>
        <Row>
          <CircleIcon $iconColor={color} />
          <LevelLabel>{name}</LevelLabel>
        </Row>
      </Wrapper>
    </div>
  );
};

export default OverallLevelText;
