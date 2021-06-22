import React from 'react';
import { VaccineProgressBar } from 'components/VaccineProgressBar/VaccineProgressBar';
import { getHighestRankingStates, getLowestRankingStates } from './utils';
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
            <LocationName>{state.stateInfo.locationName}</LocationName>
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
  return (
    <Wrapper>
      <Column listHeader="Highest Percent" locations={highestRanking} />
      <Column listHeader="Lowest percent" locations={lowestRanking} />
    </Wrapper>
  );
};

export default VaccinationsTable;
