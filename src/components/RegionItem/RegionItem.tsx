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
import { vaccineColorFromLocationSummary } from 'common/colors';
import { summaryToStats } from 'components/NewLocationPage/SummaryStat/utils';
import { Metric } from 'common/metricEnum';
import { formatPercent } from 'common/utils';

const RegionItem: React.FC<{ region: Region }> = ({ region }) => {
  const regionSummary = getSummaryFromFips(region.fipsCode);
  const showStateCode = !(region instanceof State);
  const iconColor = vaccineColorFromLocationSummary(regionSummary);

  const vaccinatedStat = regionSummary
    ? summaryToStats(regionSummary)[Metric.VACCINATIONS]
    : null;
  const levelDescriptionCopy = vaccinatedStat
    ? `${formatPercent(vaccinatedStat, 0)} with 1+ dose`
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
          <LevelContainer>
            <IconContainer>
              <CircleIcon $iconColor={iconColor} />
            </IconContainer>
            <LevelDescription>{levelDescriptionCopy}</LevelDescription>
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
