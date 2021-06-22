import React from 'react';
import { MapView } from 'screens/HomePage/HomePage';
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
} from './VaccinationsTable.style';
import ExpandableContainer from 'components/ExpandableContainer';
import { EventCategory } from 'components/Analytics';
import { getHighestRankingRegions, getLowestRankingRegions } from './utils';
import { formatPercent } from 'common/utils';

const Column: React.FC<{ listHeader: string; regions: any[] }> = ({
  listHeader,
  regions,
}) => {
  return (
    <List>
      <ColumnHeader>{listHeader}</ColumnHeader>
      {regions.map((region: any, i: number) => (
        <ListItem>
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
        </ListItem>
      ))}
    </List>
  );
};

const VaccinationsTable: React.FC<{ mapView: MapView }> = ({ mapView }) => {
  const highestRanking = getHighestRankingRegions(5, mapView);
  const lowestRanking = getLowestRankingRegions(5, mapView);

  const buttonLabel = <>See all {mapView.toLowerCase()}</>;

  const containerProps = {
    collapsedHeightMobile: 'fit-content',
    collapsedHeightDesktop: 'fit-content',
    tabTextCollapsed: buttonLabel,
    tabTextExpanded: buttonLabel,
    trackingLabel: 'Vaccinations table: open modal',
    trackingCategory: EventCategory.VACCINATION,
    disableArrowChange: true,
    secondaryOnClick: () => {}, // TODO(Chelsi): plug into opening compare modal
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
