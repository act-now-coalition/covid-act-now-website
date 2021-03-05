import React from 'react';
import {
  Wrapper,
  CopyContainer,
  ArrowIcon,
  LevelDescription,
  CircleIcon,
  StyledLink,
  IconContainer,
} from './RegionItem.style';
import { Region, State } from 'common/regions';
import { getLocationIconFillColor } from 'components/Search';
import { StyledRegionName } from 'components/SharedComponents';
import { LOCATION_SUMMARY_LEVELS } from 'common/metrics/location_summary';
import { getSummaryFromFips } from 'common/location_summaries';
import { EventAction, EventCategory, trackEvent } from 'components/Analytics';

const RegionItem: React.FC<{ region: Region }> = ({ region }) => {
  const iconColor = getLocationIconFillColor(region);

  const regionSummary = getSummaryFromFips(region.fipsCode);
  const levelDescriptionCopy = regionSummary?.l
    ? LOCATION_SUMMARY_LEVELS[regionSummary.l].summary
    : '';

  const showStateCode = !(region instanceof State);

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
        <IconContainer>
          <CircleIcon $iconColor={iconColor} />
        </IconContainer>
        <CopyContainer>
          <StyledRegionName
            region={region}
            showStateCode={showStateCode}
            truncateText
          />
          <LevelDescription>{levelDescriptionCopy}</LevelDescription>
        </CopyContainer>
        <IconContainer>
          <ArrowIcon />
        </IconContainer>
      </Wrapper>
    </StyledLink>
  );
};

export default RegionItem;
