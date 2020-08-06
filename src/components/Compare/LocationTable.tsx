import React from 'react';
import { isNumber } from 'lodash';
import { Table, TableBody } from '@material-ui/core';
import * as Styles from './LocationTable.style';
import HeaderCell from './HeaderCell';
import * as CompareStyles from './Compare.style';
import CompareTableRow from 'components/Compare/CompareTableRow';
import { ParentSize } from '@vx/responsive';

const LocationTableHead: React.FunctionComponent<{
  setSorter: any;
  setSortDescending: any;
  sortDescending: any;
  sorter: any;
  arrowColorSelected: string;
  arrowColorNotSelected: string;
  firstHeaderName: string;
  metrics: any[];
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
          />
        ))}
      </CompareStyles.Row>
    </Styles.TableHeadContainer>
  </Table>
);

const PinnedRow: React.FunctionComponent<{
  location: any;
  sorter: any;
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
  sortedLocations: any[];
  sorter: any;
}> = ({ sortedLocations, sorter }) => (
  <Table>
    <TableBody>
      {sortedLocations.map((location, rank) => (
        <CompareTableRow sorter={sorter} location={location} index={rank} />
      ))}
    </TableBody>
  </Table>
);

const LocationTableBodyScroll: React.FunctionComponent<{
  sortedLocations: any[];
  sorter: any;
}> = ({ sortedLocations, sorter }) => (
  <ParentSize>
    {({ height }) => (
      <Styles.ScrollContainer style={{ height }}>
        <LocationTableBody sortedLocations={sortedLocations} sorter={sorter} />
      </Styles.ScrollContainer>
    )}
  </ParentSize>
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
  setSorter: any;
  setSortDescending: any;
  sortDescending: any;
  sorter: any;
  arrowColorSelected: string;
  arrowColorNotSelected: string;
  firstHeaderName: string;
  metrics: any[];
  isModal: boolean;
  pinnedLocation?: any;
  pinnedLocationRank?: number;
  sortedLocations: any[];
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
}) => {
  const Container = isModal ? Styles.ModalContainer : Styles.Container;
  const Body = isModal ? Styles.ModalBody : Styles.Body;
  const BodyTable = isModal ? LocationTableBodyScroll : LocationTableBody;

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
          {pinnedLocation && isNumber(pinnedLocationRank) && (
            <PinnedRow
              location={pinnedLocation}
              locationRank={pinnedLocationRank}
              sorter={sorter}
            />
          )}
        </Styles.Head>
        <Body>
          <BodyTable sorter={sorter} sortedLocations={sortedLocations} />
        </Body>
      </Container>
    </Styles.TableContainer>
  );
};

export default LocationTable;
