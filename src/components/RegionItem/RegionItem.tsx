import React from 'react';
import {
  Wrapper,
  CopyContainer,
  ArrowIcon,
  LevelDescription,
  CircleIcon,
  StyledLink,
} from './RegionItem.style';
import { Region, State } from 'common/regions';
import { getLocationIconFillColor } from 'components/Search';
import { StyledRegionName } from 'components/SharedComponents';
import { LOCATION_SUMMARY_LEVELS } from 'common/metrics/location_summary';
import { getSummaryFromFips } from 'common/location_summaries';

const RegionItem: React.FC<{ region: Region }> = ({ region }) => {
  const iconColor = getLocationIconFillColor(region);

  const regionSummary = getSummaryFromFips(region.fipsCode);
  const levelDescriptionCopy = regionSummary?.level
    ? LOCATION_SUMMARY_LEVELS[regionSummary.level].summary
    : '';

  const showStateCode = !(region instanceof State);

  return (
    <StyledLink to={region.relativeUrl}>
      <Wrapper>
        <CircleIcon $iconColor={iconColor} />
        <CopyContainer>
          <StyledRegionName region={region} showStateCode={showStateCode} />
          <LevelDescription>{levelDescriptionCopy}</LevelDescription>
        </CopyContainer>
        <ArrowIcon />
      </Wrapper>
    </StyledLink>
  );
};

export default RegionItem;
