import React from 'react';
import { sortBy, findIndex, partition, reverse, isNumber } from 'lodash';
import { useTheme } from '@material-ui/core/styles';
import { useMediaQuery } from '@material-ui/core';
import {
  Wrapper,
  Footer,
  FooterLink,
  HeaderWrapper,
  Header,
} from 'components/Compare/Compare.style';
import LocationTable from './LocationTable';
import { ChartLocationName } from 'components/LocationPage/ChartsHolder.style';
import Filters from 'components/Compare/Filters';
import {
  SummaryForCompare,
  RankedLocationSummary,
  MetroFilter,
  orderedMetrics,
  GeoScopeFilter,
  getAbbreviatedCounty,
  metroPrefixCopy,
} from 'common/utils/compare';
import { COLOR_MAP } from 'common/colors';

const CompareTable = (props: {
  stateName?: string;
  county?: any | null;
  setShowModal: any;
  isModal: boolean;
  locationsViewable?: number;
  isHomepage?: boolean;
  locations: any;
  currentCounty?: any;
  viewAllCounties?: boolean;
  setViewAllCounties?: React.Dispatch<React.SetStateAction<boolean>>;
  viewMoreCopy?: string;
  setCountyTypeToView: React.Dispatch<React.SetStateAction<MetroFilter>>;
  countyTypeToView: MetroFilter;
  geoScope?: GeoScopeFilter;
  setGeoScope?: React.Dispatch<React.SetStateAction<GeoScopeFilter>>;
  stateId?: string;
  sorter: number;
  setSorter: React.Dispatch<React.SetStateAction<number>>;
  sortDescending: boolean;
  setSortDescending: React.Dispatch<React.SetStateAction<boolean>>;
  sortByPopulation: boolean;
  setSortByPopulation: React.Dispatch<React.SetStateAction<boolean>>;
  sliderValue: GeoScopeFilter;
  setSliderValue: React.Dispatch<React.SetStateAction<GeoScopeFilter>>;
  setShowFaqModal: React.Dispatch<React.SetStateAction<boolean>>;
}) => {
  const {
    sorter,
    setSorter,
    sortDescending,
    setSortDescending,
    sortByPopulation,
    setSortByPopulation,
    sliderValue,
    setSliderValue,
    stateId,
  } = props;
  const { setViewAllCounties } = props;

  const currentCounty = props.county && props.currentCounty;

  const currentCountyFips = currentCounty
    ? currentCounty.locationInfo.full_fips_code
    : 0;

  function sortLocationsBy(
    locations: SummaryForCompare[],
    getValue: (location: SummaryForCompare) => number | undefined,
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

  const getPopulation = (location: SummaryForCompare) =>
    location?.locationInfo?.population;
  const getMetricValue = (location: any) =>
    location.metricsInfo.metrics[sorter].value;

  let sortedLocationsArr = props.locations;

  if (sortByPopulation) {
    sortedLocationsArr = sortLocationsBy(props.locations, getPopulation);
  } else {
    sortedLocationsArr = sortLocationsBy(props.locations, getMetricValue);
  }

  const currentCountyRank = findIndex(
    sortedLocationsArr,
    (location: SummaryForCompare) =>
      location.locationInfo.full_fips_code === currentCountyFips,
  );

  const locationsViewable =
    props.locationsViewable || sortedLocationsArr.length;

  //TODO (chelsi): make this a theme-
  const arrowColorSelected = 'white';
  const arrowColorNotSelected = props.isModal
    ? '#828282'
    : `${COLOR_MAP.GRAY.BASE}`;

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

  const firstColumnHeaderHomepage = props.viewAllCounties
    ? `${metroPrefixCopy[props.countyTypeToView]} County`
    : 'State';
  const firstColumnHeader = props.isHomepage
    ? firstColumnHeaderHomepage
    : props.isModal
    ? `${metroPrefixCopy[props.countyTypeToView]} Counties (${
        sortedLocationsArr.length
      })`
    : `${metroPrefixCopy[props.countyTypeToView]} County`;

  const sortedLocations: RankedLocationSummary[] = sortedLocationsArr
    .filter((location: SummaryForCompare) => location.metricsInfo !== null)
    .map((summary: SummaryForCompare, i: any) => ({ rank: i + 1, ...summary }));

  const currentLocation = props.county
    ? { rank: currentCountyRank + 1, ...currentCounty }
    : null;

  const compareSubheader = props.county
    ? `${getAbbreviatedCounty(props.county.county)}, ${
        props.stateId
      } to other counties`
    : `Counties in ${props.stateName}`;

  const theme = useTheme();
  // hard-coded 700 because MUI mobile breakpoint of 600 was too small
  const isMobile = useMediaQuery(theme.breakpoints.down(700));
  const faqLinkCopy = isMobile ? 'FAQ' : 'Frequently Asked Questions';

  // Disabling filters for Northern Mariana Islands because they don't have
  // any data on metro vs non-metro islands.  There may be more elegant solutions
  // that better handle any region without metro/non-metro regions.
  const disableFilters = stateId === 'MP';

  // Only showing the view more text when all locations are not available.
  const showViewMore = amountDisplayed !== sortedLocationsArr.length;

  return (
    <Wrapper isModal={props.isModal} isHomepage={props.isHomepage}>
      {!props.isModal && (
        <div>
          <HeaderWrapper>
            <Header centered={props.isHomepage}>Compare</Header>
            {props.stateName && (
              <ChartLocationName>{compareSubheader}</ChartLocationName>
            )}
          </HeaderWrapper>
          {!disableFilters && (
            <Filters
              isHomepage={props.isHomepage}
              countyTypeToView={props.countyTypeToView}
              setCountyTypeToView={props.setCountyTypeToView}
              viewAllCounties={props.viewAllCounties}
              setViewAllCounties={setViewAllCounties}
              stateId={props.stateId}
              county={props.county}
              geoScope={props.geoScope}
              setGeoScope={props.setGeoScope}
              isModal={props.isModal}
              sliderValue={sliderValue}
              setSliderValue={setSliderValue}
            />
          )}
        </div>
      )}
      <LocationTable
        firstColumnHeader={firstColumnHeader}
        setSorter={setSorter}
        setSortDescending={setSortDescending}
        metrics={orderedMetrics}
        isModal={props.isModal}
        {...arrowContainerProps}
        pinnedLocation={currentLocation}
        sortedLocations={sortedLocations}
        numLocations={locationsViewable}
        stateName={props.stateName}
        setSortByPopulation={setSortByPopulation}
        sortByPopulation={sortByPopulation}
        isHomepage={props.isHomepage}
        viewAllCounties={props.viewAllCounties}
        geoScope={props.geoScope}
      />
      {!props.isModal && (
        <Footer isCounty={props.county}>
          <div>
            <span>
              Displaying <strong>{amountDisplayed}</strong> of{' '}
              <strong>{sortedLocationsArr.length}</strong>{' '}
            </span>
            {showViewMore && (
              <FooterLink onClick={() => props.setShowModal(true)}>
                {props.viewMoreCopy}
              </FooterLink>
            )}
          </div>
          <FooterLink onClick={() => props.setShowFaqModal(true)}>
            {faqLinkCopy}
          </FooterLink>
        </Footer>
      )}
    </Wrapper>
  );
};

export default CompareTable;
