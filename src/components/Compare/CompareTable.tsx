import React from 'react';
import sortBy from 'lodash/sortBy';
import findIndex from 'lodash/findIndex';
import partition from 'lodash/partition';
import reverse from 'lodash/reverse';
import isNumber from 'lodash/isNumber';
import {
  Wrapper,
  HeaderContainer,
  CompareHeader,
  NumberOfLocationsText,
} from 'components/Compare/Compare.style';
import LocationTable from './LocationTable';
import Filters from 'components/Compare/Filters';
import {
  SummaryForCompare,
  RankedLocationSummary,
  GeoScopeFilter,
  trackCompareEvent,
  HomepageLocationScope,
  homepageLabelMap,
} from 'common/utils/compare';
import { COLOR_MAP } from 'common/colors';
import { EventAction } from 'components/Analytics';
import { Region, MetroArea, State } from 'common/regions';
import { orderedColumns, orderedColumnsVaccineFirst } from './columns';
import { EventCategory } from 'components/Analytics/utils';
import ExpandableContainer from 'components/ExpandableContainer';

const CompareTable = (props: {
  stateName?: string;
  setShowModal: React.Dispatch<React.SetStateAction<boolean>>;
  isModal: boolean;
  locationsViewable?: number;
  isHomepage?: boolean; // TODO (Chelsi) delete this prop, absence/presence of region does the same thing
  locations: SummaryForCompare[];
  currentCounty: any | null;
  viewMoreCopy?: string;
  geoScope: GeoScopeFilter;
  setGeoScope: React.Dispatch<React.SetStateAction<GeoScopeFilter>>;
  stateId?: string;
  sorter: number;
  setSorter: React.Dispatch<React.SetStateAction<number>>;
  sortDescending: boolean;
  setSortDescending: React.Dispatch<React.SetStateAction<boolean>>;
  sortByPopulation: boolean;
  setSortByPopulation: React.Dispatch<React.SetStateAction<boolean>>;
  sliderValue: GeoScopeFilter;
  homepageScope: HomepageLocationScope;
  setHomepageScope: React.Dispatch<React.SetStateAction<HomepageLocationScope>>;
  homepageSliderValue: HomepageLocationScope;
  region?: Region;
  vaccinesFirst?: boolean;
}) => {
  const {
    currentCounty,
    sorter,
    setSorter,
    sortDescending,
    setSortDescending,
    sortByPopulation,
    setSortByPopulation,
    sliderValue,
    stateId,
    homepageScope,
    setHomepageScope,
    homepageSliderValue,
    region,
    vaccinesFirst,
  } = props;

  const currentCountyFips = currentCounty ? currentCounty.region.fipsCode : 0;

  function sortLocationsBy(
    locations: SummaryForCompare[],
    getValue: (location: SummaryForCompare) => number | null,
  ) {
    const [locationsWithValue, locationsWithoutValue] = partition(
      locations,
      location => isNumber(getValue(location)),
    );
    const sortedLocationsAsc = sortBy(locationsWithValue, getValue);
    const sortedLocations = sortDescending
      ? reverse(sortedLocationsAsc)
      : sortedLocationsAsc;
    return [...sortedLocations, ...locationsWithoutValue];
  }

  let columns = vaccinesFirst ? orderedColumnsVaccineFirst : orderedColumns;

  const getPopulation = (location: SummaryForCompare) =>
    location.region.population;
  const getSortByValue = (location: SummaryForCompare) => {
    // TODO(https://trello.com/c/x0G7LZ91): Not sure if this check should be necessary,
    // but we seem to be missing projections for Northern Islands Municipality, MP right now.
    if (!location.metricsInfo) {
      return null;
    }
    let sortedColumn = columns.find(c => c.columnId === sorter) ?? columns[0];
    return sortedColumn.getValue(location);
  };

  let sortedLocationsArr = props.locations;

  if (sortByPopulation) {
    sortedLocationsArr = sortLocationsBy(props.locations, getPopulation);
  } else {
    sortedLocationsArr = sortLocationsBy(props.locations, getSortByValue);
  }

  const currentCountyRank = findIndex(
    sortedLocationsArr,
    (location: SummaryForCompare) =>
      location.region.fipsCode === currentCountyFips,
  );

  const locationsViewable =
    props.locationsViewable || sortedLocationsArr.length;

  //TODO (chelsi): make this a theme-
  const arrowColorSelected = 'white';
  const arrowColorNotSelected = COLOR_MAP.GREY_3;

  const arrowContainerProps = {
    sortDescending,
    sorter,
    arrowColorSelected,
    arrowColorNotSelected,
  };

  // checks if there are less counties than the default amount shown (10):
  const amountDisplayed =
    props.locationsViewable &&
    sortedLocationsArr.length < props.locationsViewable
      ? sortedLocationsArr.length
      : props.locationsViewable;

  const firstColumnHeaderHomepage =
    props.homepageScope === HomepageLocationScope.COUNTY
      ? `${homepageLabelMap[HomepageLocationScope.COUNTY].singular}`
      : `${homepageLabelMap[homepageScope].singular}`;

  const firstColumnHeader = props.isHomepage
    ? firstColumnHeaderHomepage
    : props.isModal
    ? `Counties (${sortedLocationsArr.length})`
    : `County`;

  const sortedLocations: RankedLocationSummary[] = sortedLocationsArr
    .filter((location: SummaryForCompare) => location.metricsInfo !== null)
    .map((summary: SummaryForCompare, i: number) => ({
      rank: i + 1,
      ...summary,
    }));

  const currentLocation = currentCounty
    ? { rank: currentCountyRank + 1, ...currentCounty }
    : null;

  // Disabling filters for Northern Mariana Islands because they don't have
  // any data on metro vs non-metro islands.  There may be more elegant solutions
  // that better handle any region without metro/non-metro regions.
  // TODO(chris): https://trello.com/c/KdfFwRvf/430-handle-filters-in-compare-table-with-no-results-more-cleanly
  const disableFilters =
    stateId === 'MP' ||
    (region && region instanceof MetroArea) ||
    (region && region instanceof State);

  // Only showing the view more text when all locations are not available.
  const showViewMore = amountDisplayed !== sortedLocationsArr.length;

  const onClickShowAll = () => {
    props.setShowModal(true);
    trackCompareEvent(EventAction.OPEN_MODAL, 'Show All Locations');
  };

  /**
   * Only show limited locations (100 max) in the following scenarios:
   * - "Counties" tab selected on homepage.
   * - "Metro areas" tab selected on homepage.
   * - "USA" tab selected on location page.
   */
  const showAllLocations =
    (props.isHomepage && props.homepageScope === HomepageLocationScope.STATE) ||
    (!props.isHomepage && props.geoScope !== GeoScopeFilter.COUNTRY);

  const seeAllText = (
    <>
      See {showAllLocations ? 'all' : 'more'} &nbsp;
      <NumberOfLocationsText>
        ({showAllLocations ? sortedLocationsArr.length : 100})
      </NumberOfLocationsText>
    </>
  );

  const containerProps = {
    collapsedHeightMobile: 'fit-content',
    collapsedHeightDesktop: 'fit-content',
    tabTextCollapsed: seeAllText,
    tabTextExpanded: seeAllText,
    trackingLabel: 'Open compare modal',
    trackingCategory: EventCategory.COMPARE,
    disableArrowChange: true,
    secondaryOnClick: onClickShowAll,
  };

  const locationTableProps = {
    firstColumnHeader: firstColumnHeader,
    setSorter: setSorter,
    setSortDescending: setSortDescending,
    columns: columns,
    isModal: props.isModal,
    ...arrowContainerProps,
    pinnedLocation: currentLocation,
    sortedLocations: sortedLocations,
    numLocations: locationsViewable,
    stateName: props.stateName,
    setSortByPopulation: setSortByPopulation,
    sortByPopulation: sortByPopulation,
    isHomepage: props.isHomepage,
    geoScope: props.geoScope,
    homepageScope: homepageScope,
    region: region,
  };

  return (
    <Wrapper $isModal={props.isModal} $isHomepage={props.isHomepage}>
      {!props.isModal && (
        <HeaderContainer $isHomepage={props.isHomepage}>
          <CompareHeader $isHomepage={props.isHomepage}>
            {props.region ? 'Counties' : 'Compare'}
          </CompareHeader>
          {!disableFilters && (
            <Filters
              isHomepage={props.isHomepage}
              stateId={props.stateId}
              isCounty={Boolean(currentCounty)}
              geoScope={props.geoScope}
              setGeoScope={props.setGeoScope}
              isModal={props.isModal}
              sliderValue={sliderValue}
              homepageScope={homepageScope}
              setHomepageScope={setHomepageScope}
              homepageSliderValue={homepageSliderValue}
            />
          )}
        </HeaderContainer>
      )}
      {!props.isModal && showViewMore ? (
        <ExpandableContainer {...containerProps}>
          <LocationTable {...locationTableProps} />
        </ExpandableContainer>
      ) : (
        <LocationTable {...locationTableProps} />
      )}
    </Wrapper>
  );
};

export default CompareTable;
