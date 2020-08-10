import React from 'react';
import { isNumber } from 'lodash';
import { Table, TableBody } from '@material-ui/core';
import { Metric } from 'common/metric';
import { SummaryForCompare } from 'common/utils/compare';
import CompareTableRow from './CompareTableRow';
import HeaderCell from './HeaderCell';
import * as Styles from './LocationTable.style';
import * as CompareStyles from './Compare.style';

interface RankedLocation {
  rank: number;
  location: SummaryForCompare;
}

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
}) => (
  <Table key="table-header">
    <Styles.TableHeadContainer isModal={isModal}>
      <CompareStyles.Row>
        <CompareStyles.Cell locationHeaderCell>
          {firstHeaderName}
        </CompareStyles.Cell>
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
          />
        ))}
      </CompareStyles.Row>
    </Styles.TableHeadContainer>
  </Table>
);

const PinnedRow: React.FunctionComponent<{
  location: SummaryForCompare;
  sorter: number;
  locationRank: number;
}> = ({ location, sorter, locationRank }) => (
  <Table key="table-pinned-location">
    <TableBody>
      <CompareTableRow
        isCurrentCounty
        location={location}
        sorter={sorter}
        index={locationRank}
      />
    </TableBody>
  </Table>
);

const LocationTableBody: React.FunctionComponent<{
  sortedLocations: RankedLocation[];
  sorter: number;
  currentLocationRank?: number;
}> = ({ sortedLocations, sorter, currentLocationRank }) => (
  <Table>
    <TableBody>
      {sortedLocations.map(rankedLocation => (
        <CompareTableRow
          sorter={sorter}
          location={rankedLocation.location}
          index={rankedLocation.rank}
          isCurrentCounty={rankedLocation.rank === currentLocationRank}
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
  pinnedLocation?: SummaryForCompare;
  pinnedLocationRank?: number;
  sortedLocations: SummaryForCompare[];
  numLocations: number;
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
  pinnedLocationRank,
  sortedLocations,
  numLocations,
}) => {
  const Container = isModal ? Styles.ModalContainer : Styles.Container;

  // TODO (pablo): Pass the rank from the component above
  const rankedLocations: RankedLocation[] = sortedLocations.map(
    (location, rank) => ({ rank, location }),
  );

  const showBottom =
    pinnedLocation && pinnedLocationRank && pinnedLocationRank >= numLocations;

  const numLocationsMain = showBottom ? numLocations - 1 : numLocations;

  const visibleLocations: RankedLocation[] = isModal
    ? rankedLocations
    : rankedLocations.slice(0, numLocationsMain);

  const currentLocation =
    pinnedLocation && pinnedLocationRank
      ? { rank: pinnedLocationRank, location: pinnedLocation }
      : null;

  return (
    <Styles.TableContainer isModal={isModal}>
      <Container>
        <Styles.Head>
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
          />
          {isModal && pinnedLocation && isNumber(pinnedLocationRank) && (
            <PinnedRow
              location={pinnedLocation}
              locationRank={pinnedLocationRank}
              sorter={sorter}
            />
          )}
        </Styles.Head>
        <Styles.Body>
          <LocationTableBody
            sorter={sorter}
            sortedLocations={visibleLocations}
            currentLocationRank={pinnedLocationRank}
          />
        </Styles.Body>
        {currentLocation && showBottom && (
          <Styles.Body>
            <LocationTableBody
              sorter={sorter}
              sortedLocations={[currentLocation]}
              currentLocationRank={currentLocation.rank}
            />
          </Styles.Body>
        )}
      </Container>
    </Styles.TableContainer>
  );
};

export default LocationTable;
