import React from 'react';
import { Table, TableBody } from '@material-ui/core';
import { Metric } from 'common/metric';
import { RankedLocationSummary } from 'common/utils/compare';
import CompareTableRow from './CompareTableRow';
import HeaderCell from './HeaderCell';
import * as Styles from './LocationTable.style';
import * as CompareStyles from './Compare.style';

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
    <CompareStyles.TableHeadContainer isModal={isModal}>
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
    </CompareStyles.TableHeadContainer>
  </Table>
);

const LocationTableBody: React.FunctionComponent<{
  sortedLocations: RankedLocationSummary[];
  sorter: number;
  currentLocationRank?: number;
}> = ({ sortedLocations, sorter, currentLocationRank }) => (
  <Table>
    <TableBody>
      {sortedLocations.map(location => (
        <CompareTableRow
          sorter={sorter}
          location={location}
          isCurrentCounty={location.rank === currentLocationRank}
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
}) => {
  const Container = isModal ? Styles.ModalContainer : Styles.Container;

  const showBottom = pinnedLocation && pinnedLocation.rank >= numLocations;
  const numLocationsMain = showBottom ? numLocations - 1 : numLocations;
  const visibleLocations = isModal
    ? sortedLocations
    : sortedLocations.slice(0, numLocationsMain);

  return (
    <CompareStyles.StyledTable isModal={isModal}>
      <Container>
        <Styles.Head isModal={isModal}>
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
          {isModal && pinnedLocation && (
            <Table key="table-pinned-location">
              <TableBody>
                <CompareTableRow
                  location={pinnedLocation}
                  sorter={sorter}
                  isCurrentCounty
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
          />
        </Styles.Body>
        {pinnedLocation && showBottom && (
          <Styles.Body>
            <LocationTableBody
              sorter={sorter}
              sortedLocations={[pinnedLocation]}
              currentLocationRank={pinnedLocation?.rank}
            />
          </Styles.Body>
        )}
      </Container>
    </CompareStyles.StyledTable>
  );
};

export default LocationTable;
