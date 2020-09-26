import React from 'react';
import { remove } from 'lodash';
import { Table, TableBody } from '@material-ui/core';
import { Metric } from 'common/metric';
import { RankedLocationSummary, GeoScopeFilter } from 'common/utils/compare';
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

const LocationTableHead: React.FunctionComponent<{
  setSorter: React.Dispatch<React.SetStateAction<number>>;
  setSortDescending: React.Dispatch<React.SetStateAction<boolean>>;
  sortDescending: boolean;
  sorter: number;
  arrowColorSelected: string;
  arrowColorNotSelected: string;
  firstColumnHeader: string;
  metrics: Metric[];
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
  metrics,
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
              <CompareStyles.StateName>
                {modalLocationColumnHeader}
              </CompareStyles.StateName>
            )}
            {firstColumnHeader}
            <br />
            <span>population</span>
            <CompareStyles.ArrowContainer
              arrowColorNotSelected={arrowColorNotSelected}
              isModal={isModal}
            >
              <ExpandLessIcon onClick={() => setSortDescending(false)} />
              <ExpandMoreIcon onClick={() => setSortDescending(true)} />
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
  isHomepage?: boolean;
  showStateCode: boolean;
}> = ({
  sortedLocations,
  sorter,
  currentLocationRank,
  sortByPopulation,
  isHomepage,
  showStateCode,
}) => (
  <Table>
    <TableBody>
      {sortedLocations.map(location => (
        <CompareTableRow
          sorter={sorter}
          location={location}
          isCurrentCounty={location.rank === currentLocationRank}
          sortByPopulation={sortByPopulation}
          isHomepage={isHomepage}
          showStateCode={showStateCode}
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
  metrics: Metric[];
  isModal: boolean;
  pinnedLocation?: RankedLocationSummary;
  sortedLocations: RankedLocationSummary[];
  numLocations: number;
  stateName?: string;
  setSortByPopulation: React.Dispatch<React.SetStateAction<boolean>>;
  sortByPopulation: boolean;
  isHomepage?: boolean;
  viewAllCounties?: boolean;
  geoScope?: GeoScopeFilter;
}> = ({
  setSorter,
  setSortDescending,
  sortDescending,
  sorter,
  arrowColorSelected,
  arrowColorNotSelected,
  firstColumnHeader,
  metrics,
  isModal,
  pinnedLocation,
  sortedLocations,
  numLocations,
  stateName,
  setSortByPopulation,
  sortByPopulation,
  isHomepage,
  viewAllCounties,
  geoScope,
}) => {
  const Container = isModal ? Styles.ModalContainer : Styles.Container;

  // Seemingly random numbers are the heights of each modal header
  const homepageOffset = viewAllCounties ? 159 : 73;
  const locationPageOffset = geoScope === GeoScopeFilter.NEARBY ? 107 : 198;
  const modalHeaderOffset = isHomepage
    ? homepageOffset
    : pinnedLocation
    ? locationPageOffset
    : 110;
  const finalHeaderOffset = isModal ? modalHeaderOffset : 0;

  const showBottom = pinnedLocation && pinnedLocation.rank >= numLocations;
  const numLocationsMain = showBottom ? numLocations - 1 : numLocations;

  const allCountiesView =
    viewAllCounties || geoScope === GeoScopeFilter.COUNTRY;

  const currentLocationRank = pinnedLocation?.rank;

  const hideInlineLocation = isModal && currentLocationRank === 1;

  // In the modal, if the rank of the pinned-location-row is #1, we remove
  // the location's inline row, so as to not have the location listed twice consecutively:
  const removePinnedIfRankedFirst = (location: any) =>
    location.locationInfo.full_fips_code !==
    pinnedLocation?.locationInfo.full_fips_code;

  const modalLocations = hideInlineLocation
    ? remove(sortedLocations, removePinnedIfRankedFirst)
    : sortedLocations;

  const visibleLocations = !isModal
    ? sortedLocations.slice(0, numLocationsMain)
    : allCountiesView
    ? sortedLocations.slice(0, 100)
    : modalLocations;

  const showStateCode = allCountiesView || geoScope === GeoScopeFilter.NEARBY;

  return (
    <Styles.TableContainer isModal={isModal} className={SCREENSHOT_CLASS}>
      <Container finalHeaderOffset={finalHeaderOffset}>
        <Styles.Head isModal={isModal} pinnedLocation={pinnedLocation}>
          <LocationTableHead
            setSorter={setSorter}
            setSortDescending={setSortDescending}
            sortDescending={sortDescending}
            sorter={sorter}
            arrowColorSelected={arrowColorSelected}
            arrowColorNotSelected={arrowColorNotSelected}
            firstColumnHeader={firstColumnHeader}
            metrics={metrics}
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
          />
        </Styles.Body>
        {pinnedLocation && showBottom && !isModal && (
          <Styles.Body>
            <LocationTableBody
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
