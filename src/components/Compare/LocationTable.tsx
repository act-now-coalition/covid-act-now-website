import React from 'react';
import { Table, TableBody } from '@material-ui/core';
import { Metric } from 'common/metric';
import { RankedLocationSummary } from 'common/utils/compare';
import CompareTableRow from './CompareTableRow';
import HeaderCell from './HeaderCell';
import * as Styles from './LocationTable.style';
import * as CompareStyles from './Compare.style';
import { COLOR_MAP } from 'common/colors';
import ExpandLessIcon from '@material-ui/icons/ExpandLess';
import ExpandMoreIcon from '@material-ui/icons/ExpandMore';

const LocationTableHead: React.FunctionComponent<{
  setSorter: React.Dispatch<React.SetStateAction<number>>;
  setSortDescending: React.Dispatch<React.SetStateAction<boolean>>;
  sortDescending: boolean;
  sorter: number;
  arrowColorSelected: string;
  arrowColorNotSelected: string;
  firstHeaderName: string;
  metrics: Metric[];
  isModal: boolean;
  stateName?: string;
  setSortByPopulation: React.Dispatch<React.SetStateAction<boolean>>;
  sortByPopulation: boolean;
}> = ({
  setSorter,
  setSortDescending,
  sortDescending,
  sorter,
  arrowColorSelected,
  arrowColorNotSelected,
  firstHeaderName,
  metrics,
  isModal,
  stateName,
  setSortByPopulation,
  sortByPopulation,
}) => {
  const onPopulationClick = () => {
    if (sortByPopulation) {
      setSortDescending(!sortDescending);
    } else {
      setSortByPopulation(true);
      setSortDescending(true);
    }
  };

  return (
    <Table key="table-header">
      <CompareStyles.TableHeadContainer isModal={isModal}>
        <CompareStyles.Row
          headerRowBackground={
            isModal ? `${COLOR_MAP.GRAY_BODY_COPY}` : 'white'
          }
        >
          <CompareStyles.LocationHeaderCell
            isModal={isModal}
            onClick={onPopulationClick}
            sortByPopulation={sortByPopulation}
            arrowColorSelected={arrowColorSelected}
            arrowColorNotSelected={arrowColorNotSelected}
            sortDescending={sortDescending}
          >
            {isModal && (
              <CompareStyles.StateName>{stateName}</CompareStyles.StateName>
            )}
            {firstHeaderName}
            <br />
            <span>population</span>
            <CompareStyles.ArrowContainer
              arrowColorNotSelected={arrowColorNotSelected}
              isModal={isModal}
            >
              <ExpandMoreIcon onClick={() => setSortDescending(true)} />
              <ExpandLessIcon onClick={() => setSortDescending(false)} />
            </CompareStyles.ArrowContainer>
          </CompareStyles.LocationHeaderCell>
          {metrics.map(metric => (
            <HeaderCell
              metricInMap={metric}
              sorter={sorter}
              sortDescending={sortDescending}
              arrowColorSelected={arrowColorSelected}
              arrowColorNotSelected={arrowColorNotSelected}
              setSorter={setSorter}
              setSortDescending={setSortDescending}
              isModal={isModal}
              setSortByPopulation={setSortByPopulation}
              sortByPopulation={sortByPopulation}
            />
          ))}
        </CompareStyles.Row>
      </CompareStyles.TableHeadContainer>
    </Table>
  );
};

const LocationTableBody: React.FunctionComponent<{
  sortedLocations: RankedLocationSummary[];
  sorter: number;
  currentLocationRank?: number;
  sortByPopulation: boolean;
}> = ({ sortedLocations, sorter, currentLocationRank, sortByPopulation }) => (
  <Table>
    <TableBody>
      {sortedLocations.map(location => (
        <CompareTableRow
          sorter={sorter}
          location={location}
          isCurrentCounty={location.rank === currentLocationRank}
          sortByPopulation={sortByPopulation}
        />
      ))}
    </TableBody>
  </Table>
);

/**
 * NOTE (pablo): Material UI tables have some limitations regarding some
 * behaviours we need. In particular, we can't have more than one element
 * pinned to the top, which is what we need to pin the current location
 * in the top row.
 *
 * This implementation is a hack and uses 3 tables. This can create some
 * accessibility issues (screen readers might have trouble reading the
 * table as a single unit). We might want to explore some other solutions
 * (maybe other libraries) at some point.
 */
const LocationTable: React.FunctionComponent<{
  setSorter: React.Dispatch<React.SetStateAction<number>>;
  setSortDescending: React.Dispatch<React.SetStateAction<boolean>>;
  sortDescending: boolean;
  sorter: number;
  arrowColorSelected: string;
  arrowColorNotSelected: string;
  firstHeaderName: string;
  metrics: Metric[];
  isModal: boolean;
  pinnedLocation?: RankedLocationSummary;
  sortedLocations: RankedLocationSummary[];
  numLocations: number;
  stateName?: string;
  setSortByPopulation: React.Dispatch<React.SetStateAction<boolean>>;
  sortByPopulation: boolean;
}> = ({
  setSorter,
  setSortDescending,
  sortDescending,
  sorter,
  arrowColorSelected,
  arrowColorNotSelected,
  firstHeaderName,
  metrics,
  isModal,
  pinnedLocation,
  sortedLocations,
  numLocations,
  stateName,
  setSortByPopulation,
  sortByPopulation,
}) => {
  const Container = isModal ? Styles.ModalContainer : Styles.Container;

  const showBottom = pinnedLocation && pinnedLocation.rank >= numLocations;
  const numLocationsMain = showBottom ? numLocations - 1 : numLocations;
  const visibleLocations = isModal
    ? sortedLocations
    : sortedLocations.slice(0, numLocationsMain);

  return (
    <Styles.TableContainer isModal={isModal}>
      <Container>
        <Styles.Head isModal={isModal} pinnedLocation={pinnedLocation}>
          <LocationTableHead
            setSorter={setSorter}
            setSortDescending={setSortDescending}
            sortDescending={sortDescending}
            sorter={sorter}
            arrowColorSelected={arrowColorSelected}
            arrowColorNotSelected={arrowColorNotSelected}
            firstHeaderName={firstHeaderName}
            metrics={metrics}
            isModal={isModal}
            stateName={stateName}
            setSortByPopulation={setSortByPopulation}
            sortByPopulation={sortByPopulation}
          />
          {isModal && pinnedLocation && (
            <Table key="table-pinned-location">
              <TableBody>
                <CompareTableRow
                  location={pinnedLocation}
                  sorter={sorter}
                  isCurrentCounty
                  isModal={isModal}
                  sortByPopulation={sortByPopulation}
                />
              </TableBody>
            </Table>
          )}
        </Styles.Head>
        <Styles.Body>
          <LocationTableBody
            sorter={sorter}
            sortedLocations={visibleLocations}
            currentLocationRank={pinnedLocation?.rank}
            sortByPopulation={sortByPopulation}
          />
        </Styles.Body>
        {pinnedLocation && showBottom && (
          <Styles.Body>
            <LocationTableBody
              sorter={sorter}
              sortedLocations={[pinnedLocation]}
              currentLocationRank={pinnedLocation?.rank}
              sortByPopulation={sortByPopulation}
            />
          </Styles.Body>
        )}
      </Container>
    </Styles.TableContainer>
  );
};

export default LocationTable;
