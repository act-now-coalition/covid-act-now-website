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
} from './VaccinationsTable.style';
import ExpandableContainer from 'components/ExpandableContainer';
import { EventCategory } from 'components/Analytics';
import { getHighestRankingStates, getLowestRankingStates } from './utils';
import { formatPercent } from 'common/utils';

const Column: React.FC<{ listHeader: string; locations: any[] }> = ({
  listHeader,
  locations,
}) => {
  return (
    <List>
      <ColumnHeader>{listHeader}</ColumnHeader>
      {locations.map((state: any, i: number) => (
        <ListItem>
          <ListItemHalf>
            <MonospaceItem>{state.rank}.</MonospaceItem>
            <LocationName>{state.stateInfo.stateName}</LocationName>
          </ListItemHalf>
          <ListItemHalf>
            <MonospaceItem>
              {formatPercent(state.stateInfo.vaccinationsInitiated)}
            </MonospaceItem>
            <ProgressBarWrapper>
              <VaccineProgressBar
                locationName={state.stateInfo.locationName}
                vaccinationsInitiated={state.stateInfo.vaccinationsInitiated}
                vaccinationsCompleted={state.stateInfo.vaccinationsCompleted}
              />
            </ProgressBarWrapper>
          </ListItemHalf>
        </ListItem>
      ))}
    </List>
  );
};

const VaccinationsTable: React.FC<{}> = () => {
  const highestRanking = getHighestRankingStates(5);
  const lowestRanking = getLowestRankingStates(5);

  const containerProps = {
    collapsedHeightMobile: 'fit-content',
    collapsedHeightDesktop: 'fit-content',
    tabTextCollapsed: <>See all states</>,
    tabTextExpanded: <>See all states</>,
    trackingLabel: 'Vaccinations table: open modal',
    trackingCategory: EventCategory.VACCINATION,
    disableArrowChange: true,
    secondaryOnClick: () => {}, // plug into opening compare modal
  };

  return (
    <ExpandableContainer {...containerProps}>
      <Wrapper>
        <Column listHeader="Highest Percent" locations={highestRanking} />
        <Column listHeader="Lowest percent" locations={lowestRanking} />
      </Wrapper>
    </ExpandableContainer>
  );
};

export default VaccinationsTable;
