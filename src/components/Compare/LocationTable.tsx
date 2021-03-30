import React from 'react';
import remove from 'lodash/remove';
import { Table, TableBody } from '@material-ui/core';
import {
  RankedLocationSummary,
  GeoScopeFilter,
  SummaryForCompare,
  HomepageLocationScope,
} from 'common/utils/compare';
import CompareTableRow from './CompareTableRow';
import HeaderCell from './HeaderCell';
import * as Styles from './LocationTable.style';
import * as CompareStyles from './Compare.style';
import { COLOR_MAP } from 'common/colors';
import ExpandLessIcon from '@material-ui/icons/ExpandLess';
import ExpandMoreIcon from '@material-ui/icons/ExpandMore';
import { SCREENSHOT_CLASS } from 'components/Screenshot';
import { trackCompareEvent } from 'common/utils/compare';
import { EventAction } from 'components/Analytics';
import { Region, MetroArea } from 'common/regions';
import { ColumnDefinition } from './columns';

const LocationTableHead: React.FunctionComponent<{
  setSorter: React.Dispatch<React.SetStateAction<number>>;
  setSortDescending: React.Dispatch<React.SetStateAction<boolean>>;
  sortDescending: boolean;
  sorter: number;
  arrowColorSelected: string;
  arrowColorNotSelected: string;
  firstColumnHeader: string;
  columns: ColumnDefinition[];
  isModal: boolean;
  stateName?: string;
  setSortByPopulation: React.Dispatch<React.SetStateAction<boolean>>;
  sortByPopulation: boolean;
  allCountiesView: boolean;
  isHomepage?: boolean;
}> = ({
  setSorter,
  setSortDescending,
  sortDescending,
  sorter,
  arrowColorSelected,
  arrowColorNotSelected,
  firstColumnHeader,
  columns,
  isModal,
  stateName,
  setSortByPopulation,
  sortByPopulation,
  allCountiesView,
  isHomepage,
}) => {
  const onPopulationClick = () => {
    if (sortByPopulation) {
      const updatedSortDescending = !sortDescending;
      setSortDescending(updatedSortDescending);
      trackCompareEvent(
        EventAction.SELECT,
        `Sort by: Population (${updatedSortDescending ? 'Desc' : 'Asc'})`,
      );
    } else {
      setSortByPopulation(true);
      setSortDescending(true);
      trackCompareEvent(EventAction.SELECT, 'Sort by: Population (Desc)');
    }
  };

  const modalLocationColumnHeader =
    allCountiesView && !isHomepage ? 'USA' : stateName && `${stateName}`;

  return (
    <Table key="table-header">
      <CompareStyles.TableHeadContainer $isModal={isModal}>
        <CompareStyles.Row
          $headerRowBackground={
            isModal ? `${COLOR_MAP.GRAY_BODY_COPY}` : 'white'
          }
        >
          <CompareStyles.LocationHeaderCell
            $isModal={isModal}
            onClick={onPopulationClick}
            $sortByPopulation={sortByPopulation}
            $arrowColorSelected={arrowColorSelected}
            $arrowColorNotSelected={arrowColorNotSelected}
            $sortDescending={sortDescending}
          >
            {isModal && (
              <CompareStyles.StateName>
                {modalLocationColumnHeader}
              </CompareStyles.StateName>
            )}
            {firstColumnHeader}
            <br />
            <span>population</span>
            <CompareStyles.ArrowContainer
              $arrowColorNotSelected={arrowColorNotSelected}
              $isModal={isModal}
            >
              <ExpandLessIcon onClick={() => setSortDescending(false)} />
              <ExpandMoreIcon onClick={() => setSortDescending(true)} />
            </CompareStyles.ArrowContainer>
          </CompareStyles.LocationHeaderCell>
          {columns.map((column, i) => (
            <HeaderCell
              key={`header-cell-${i}`}
              column={column}
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
  isHomepage?: boolean;
  showStateCode: boolean;
  columns: ColumnDefinition[];
}> = ({
  sortedLocations,
  sorter,
  currentLocationRank,
  sortByPopulation,
  isHomepage,
  showStateCode,
  columns,
}) => (
  <Table>
    <TableBody>
      {sortedLocations.map((location, i) => (
        <CompareTableRow
          key={`compare-table-row-${i}`}
          sorter={sorter}
          location={location}
          isCurrentCounty={location.rank === currentLocationRank}
          sortByPopulation={sortByPopulation}
          isHomepage={isHomepage}
          showStateCode={showStateCode}
          columns={columns}
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
  firstColumnHeader: string;
  columns: ColumnDefinition[];
  isModal: boolean;
  pinnedLocation?: RankedLocationSummary;
  sortedLocations: RankedLocationSummary[];
  numLocations: number;
  stateName?: string;
  setSortByPopulation: React.Dispatch<React.SetStateAction<boolean>>;
  sortByPopulation: boolean;
  isHomepage?: boolean;
  geoScope: GeoScopeFilter;
  homepageScope: HomepageLocationScope;
  region?: Region;
}> = ({
  setSorter,
  setSortDescending,
  sortDescending,
  sorter,
  arrowColorSelected,
  arrowColorNotSelected,
  firstColumnHeader,
  columns,
  isModal,
  pinnedLocation,
  sortedLocations,
  numLocations,
  stateName,
  setSortByPopulation,
  sortByPopulation,
  isHomepage,
  geoScope,
  homepageScope,
  region,
}) => {
  const Container = isModal ? Styles.ModalContainer : Styles.Container;

  // Seemingly random numbers are the heights of each modal header
  const homepageOffset =
    homepageScope === HomepageLocationScope.COUNTY ? 198 : 115;
  const locationPageOffset = geoScope === GeoScopeFilter.NEARBY ? 107 : 198;

  // Changes to account for change in header height with different filters:
  function getModalHeaderOffset(): number {
    if (!region) {
      return homepageOffset;
    } else {
      if (region instanceof MetroArea) {
        return 60;
      } else if (pinnedLocation) {
        return locationPageOffset;
      } else {
        return 110;
      }
    }
  }

  const finalHeaderOffset = isModal ? getModalHeaderOffset() : 0;

  const showBottom = pinnedLocation && pinnedLocation.rank >= numLocations;
  const numLocationsMain = showBottom ? numLocations - 1 : numLocations;

  const allCountiesView = geoScope === GeoScopeFilter.COUNTRY;

  const currentLocationRank = pinnedLocation?.rank;

  const hideInlineLocation = isModal && currentLocationRank === 1;

  // In the modal, if the rank of the pinned-location-row is #1, we remove
  // the location's inline row, so as to not have the location listed twice consecutively:
  const removePinnedIfRankedFirst = (location: SummaryForCompare) =>
    location.region.fipsCode !== pinnedLocation?.region.fipsCode;

  const modalLocations = hideInlineLocation
    ? remove(sortedLocations, removePinnedIfRankedFirst)
    : sortedLocations;

  const getVisibleLocations = () => {
    if (!isModal) {
      return sortedLocations.slice(0, numLocationsMain);
    } else {
      if (region) {
        if (geoScope === GeoScopeFilter.COUNTRY)
          return sortedLocations.slice(0, 100);
        else return modalLocations;
      } else {
        if (homepageScope === HomepageLocationScope.STATE)
          return modalLocations;
        else return sortedLocations.slice(0, 100);
      }
    }
  };

  const visibleLocations = getVisibleLocations();

  const returnShowStateCode = (region?: Region): boolean => {
    if (region) {
      return region instanceof MetroArea || geoScope === GeoScopeFilter.NEARBY;
    } else {
      return homepageScope !== HomepageLocationScope.STATE;
    }
  };

  const showStateCode = returnShowStateCode(region);

  return (
    <Styles.TableContainer $isModal={isModal} className={SCREENSHOT_CLASS}>
      <Container finalHeaderOffset={finalHeaderOffset}>
        <Styles.Head $isModal={isModal} $pinnedLocation={pinnedLocation}>
          <LocationTableHead
            setSorter={setSorter}
            setSortDescending={setSortDescending}
            sortDescending={sortDescending}
            sorter={sorter}
            arrowColorSelected={arrowColorSelected}
            arrowColorNotSelected={arrowColorNotSelected}
            firstColumnHeader={firstColumnHeader}
            columns={columns}
            isModal={isModal}
            stateName={stateName}
            setSortByPopulation={setSortByPopulation}
            sortByPopulation={sortByPopulation}
            allCountiesView={allCountiesView}
            isHomepage={isHomepage}
          />
          {isModal && pinnedLocation && (
            <Table key="table-pinned-location">
              <TableBody>
                <CompareTableRow
                  columns={columns}
                  location={pinnedLocation}
                  sorter={sorter}
                  isCurrentCounty
                  isModal={isModal}
                  sortByPopulation={sortByPopulation}
                  showStateCode={showStateCode}
                />
              </TableBody>
            </Table>
          )}
        </Styles.Head>
        <Styles.Body>
          <LocationTableBody
            sorter={sorter}
            sortedLocations={visibleLocations}
            currentLocationRank={currentLocationRank}
            sortByPopulation={sortByPopulation}
            isHomepage={isHomepage}
            showStateCode={showStateCode}
            columns={columns}
          />
        </Styles.Body>
        {pinnedLocation && showBottom && !isModal && (
          <Styles.Body>
            <LocationTableBody
              columns={columns}
              sorter={sorter}
              sortedLocations={[pinnedLocation]}
              currentLocationRank={pinnedLocation?.rank}
              sortByPopulation={sortByPopulation}
              showStateCode={showStateCode}
            />
          </Styles.Body>
        )}
      </Container>
    </Styles.TableContainer>
  );
};

export default LocationTable;
