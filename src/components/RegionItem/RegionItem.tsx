import React from 'react';
import {
  Wrapper,
  CopyContainer,
  ArrowIcon,
  LevelDescription,
  LevelContainer,
  CircleIcon,
  StyledLink,
  IconContainer,
} from './RegionItem.style';
import { Region, State } from 'common/regions';
import { StyledRegionName } from 'components/SharedComponents';
import { getSummaryFromFips } from 'common/location_summaries';
import { EventAction, EventCategory, trackEvent } from 'components/Analytics';
import { colorFromLocationSummary } from 'common/colors';
import { Level } from 'common/level';

function getLevelName(level: Level): string {
  switch (level) {
    case Level.LOW:
      return 'Low';
    case Level.MEDIUM:
      return 'Medium';
    case Level.HIGH:
      return 'High';
    default:
      return 'Unknown';
  }
}

const RegionItem: React.FC<{ region: Region }> = ({ region }) => {
  const regionSummary = getSummaryFromFips(region.fipsCode);
  const showStateCode = !(region instanceof State);
  const iconColor = colorFromLocationSummary(regionSummary);

  const levelDescriptionCopy = regionSummary
    ? `${getLevelName(regionSummary.level)} community level`
    : '';

  return (
    <StyledLink
      to={region.relativeUrl}
      onClick={() => {
        trackEvent(
          EventCategory.GEOLOCATION_CARDS,
          EventAction.NAVIGATE,
          region.regionType,
        );
      }}
    >
      <Wrapper>
        <CopyContainer>
          <StyledRegionName
            region={region}
            showStateCode={showStateCode}
            truncateText
          />
          {regionSummary && (
            <LevelContainer>
              <IconContainer>
                <CircleIcon $iconColor={iconColor} />
              </IconContainer>
              <LevelDescription>{levelDescriptionCopy}</LevelDescription>
            </LevelContainer>
          )}
        </CopyContainer>
        <IconContainer>
          <ArrowIcon />
        </IconContainer>
      </Wrapper>
    </StyledLink>
  );
};

export default RegionItem;
