import React from 'react';
import { VaccineProgressBar } from 'components/VaccineProgressBar/VaccineProgressBar';
import {
  List,
  ListItem,
  MonospaceItem,
  LocationName,
  ProgressBarWrapper,
  ListItemHalf,
  Wrapper,
  ColumnHeader,
  StyledLink,
} from './VaccinationsTable.style';
import ExpandableContainer from 'components/ExpandableContainer';
import { EventCategory } from 'components/Analytics';
import {
  getHighestRankingRegions,
  getLowestRankingRegions,
  RegionVaccinationInfo,
} from './utils';
import { formatPercent } from 'common/utils';
import { MapView } from 'screens/HomePage/utils';

const Column: React.FC<{
  listHeader: string;
  regions: RegionVaccinationInfo[];
}> = ({ listHeader, regions }) => {
  return (
    <List>
      <ColumnHeader>{listHeader}</ColumnHeader>
      {regions.map((region: RegionVaccinationInfo) => (
        <ListItem>
          <StyledLink to={region.url}>
            <ListItemHalf>
              <MonospaceItem>{region.rank}.</MonospaceItem>
              <LocationName>{region.regionName}</LocationName>
            </ListItemHalf>
            <ListItemHalf>
              <MonospaceItem>
                {formatPercent(region.vaccinationsInitiated)}
              </MonospaceItem>
              <ProgressBarWrapper>
                <VaccineProgressBar
                  locationName={region.regionName}
                  vaccinationsInitiated={region.vaccinationsInitiated}
                  vaccinationsCompleted={region.vaccinationsCompleted}
                  width={100}
                />
              </ProgressBarWrapper>
            </ListItemHalf>
          </StyledLink>
        </ListItem>
      ))}
    </List>
  );
};

const VaccinationsTable: React.FC<{
  mapView: MapView;
  seeAllOnClick: () => void;
}> = ({ mapView, seeAllOnClick }) => {
  const highestRanking = getHighestRankingRegions(5, mapView);
  const lowestRanking = getLowestRankingRegions(5, mapView);

  const buttonLabel = `See all ${mapView.toLowerCase()}`;

  const containerProps = {
    collapsedHeightMobile: 'fit-content',
    collapsedHeightDesktop: 'fit-content',
    tabTextCollapsed: buttonLabel,
    tabTextExpanded: buttonLabel,
    trackingLabel: 'Vaccinations table: open modal',
    trackingCategory: EventCategory.VACCINATION,
    disableArrowChange: true,
    secondaryOnClick: seeAllOnClick,
  };

  return (
    <ExpandableContainer {...containerProps}>
      <Wrapper>
        <Column listHeader="Highest Percent" regions={highestRanking} />
        <Column listHeader="Lowest percent" regions={lowestRanking} />
      </Wrapper>
    </ExpandableContainer>
  );
};

export default VaccinationsTable;
