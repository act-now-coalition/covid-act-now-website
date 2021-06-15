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
import { getLocationIconFillColor } from 'components/Search';
import { StyledRegionName } from 'components/SharedComponents';
import { LOCATION_SUMMARY_LEVELS } from 'common/metrics/location_summary';
import { getSummaryFromFips } from 'common/location_summaries';
import { EventAction, EventCategory, trackEvent } from 'components/Analytics';
import { summaryToStats } from 'components/NewLocationPage/SummaryStat/utils';

const RegionItem: React.FC<{ region: Region }> = ({ region }) => {
  const iconColor = getLocationIconFillColor(region);

  const regionSummary = getSummaryFromFips(region.fipsCode);
  const levelDescriptionCopy = regionSummary?.level
    ? LOCATION_SUMMARY_LEVELS[regionSummary.level].summary
    : '';
  const stats = regionSummary ? summaryToStats(regionSummary) : null;

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
        <CopyContainer>
          <StyledRegionName
            region={region}
            showStateCode={showStateCode}
            truncateText
          />
          <LevelContainer>
            <IconContainer>
              <CircleIcon $iconColor={iconColor} />
            </IconContainer>
            <LevelDescription>{levelDescriptionCopy} hi hi</LevelDescription>
          </LevelContainer>
        </CopyContainer>
        <IconContainer>
          <ArrowIcon />
        </IconContainer>
      </Wrapper>
    </StyledLink>
  );
};

export default RegionItem;
