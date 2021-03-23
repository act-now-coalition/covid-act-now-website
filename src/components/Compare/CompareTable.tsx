import React from 'react';
import { sortBy, findIndex, partition, reverse, isNumber } from 'lodash';
import {
  Wrapper,
  Footer,
  FooterLink,
  HeaderWrapper,
  Header,
} from 'components/Compare/Compare.style';
import LocationTable from './LocationTable';
import Filters from 'components/Compare/Filters';
import {
  SummaryForCompare,
  RankedLocationSummary,
  MetroFilter,
  GeoScopeFilter,
  getShareQuote,
  getMetroPrefixCopy,
  trackCompareEvent,
  HomepageLocationScope,
  homepageLabelMap,
  getCompareSubheader,
  sliderNumberToFilterMap,
} from 'common/utils/compare';
import { COLOR_MAP } from 'common/colors';
import ShareImageButtons from 'components/ShareButtons/ShareButtonGroup';
// import { sliderNumberToFilterMap } from 'components/Compare/Filters';
import { getComparePageUrl, getCompareShareImageUrl } from 'common/urls';
import { EventAction } from 'components/Analytics';
import { MoreInfoButton } from 'components/SharedComponents';
import { Subtitle1 } from 'components/Typography';
import { Region, MetroArea } from 'common/regions';
import { LocationPageSectionHeader } from 'components/LocationPage/ChartsHolder.style';
import {
  orderedColumns,
  orderedColumnsVaccineFirst,
  orderedColumnsVulnerabilityFirst,
} from './columns';

function trackShare(label: string) {
  trackCompareEvent(EventAction.SHARE, label);
}

const CompareTable = (props: {
  stateName?: string;
  county?: any | null;
  setShowModal: React.Dispatch<React.SetStateAction<boolean>>;
  isModal: boolean;
  locationsViewable?: number;
  isHomepage?: boolean;
  locations: SummaryForCompare[];
  currentCounty: any | null;
  viewMoreCopy?: string;
  setCountyTypeToView: React.Dispatch<React.SetStateAction<MetroFilter>>;
  countyTypeToView: MetroFilter;
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
  // setSliderValue: React.Dispatch<React.SetStateAction<GeoScopeFilter>>;
  setShowFaqModal: React.Dispatch<React.SetStateAction<boolean>>;
  createCompareShareId: () => Promise<string>;
  homepageScope: HomepageLocationScope;
  setHomepageScope: React.Dispatch<React.SetStateAction<HomepageLocationScope>>;
  homepageSliderValue: HomepageLocationScope;
  // setHomepageSliderValue: React.Dispatch<
  //   React.SetStateAction<HomepageLocationScope>
  // >;
  region?: Region;
  vaccinesFirst?: boolean;
  vulnerabilityFirst?: boolean;
}) => {
  const {
    sorter,
    setSorter,
    sortDescending,
    setSortDescending,
    sortByPopulation,
    setSortByPopulation,
    sliderValue,
    // setSliderValue,
    stateId,
    homepageScope,
    setHomepageScope,
    homepageSliderValue,
    // setHomepageSliderValue,
    region,
    vaccinesFirst,
    vulnerabilityFirst,
  } = props;

  const currentCounty = props.county && props.currentCounty;

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
  columns = vulnerabilityFirst ? orderedColumnsVulnerabilityFirst : columns;

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
      ? `${getMetroPrefixCopy(props.countyTypeToView)} ${
          homepageLabelMap[HomepageLocationScope.COUNTY].singular
        }`
      : `${homepageLabelMap[homepageScope].singular}`;

  const firstColumnHeader = props.isHomepage
    ? firstColumnHeaderHomepage
    : props.isModal
    ? `${getMetroPrefixCopy(props.countyTypeToView)} Counties (${
        sortedLocationsArr.length
      })`
    : `${getMetroPrefixCopy(props.countyTypeToView)} County`;

  const sortedLocations: RankedLocationSummary[] = sortedLocationsArr
    .filter((location: SummaryForCompare) => location.metricsInfo !== null)
    .map((summary: SummaryForCompare, i: number) => ({
      rank: i + 1,
      ...summary,
    }));

  const currentLocation = props.county
    ? { rank: currentCountyRank + 1, ...currentCounty }
    : null;

  const shareQuote = getShareQuote(
    sorter,
    props.countyTypeToView,
    sliderNumberToFilterMap[sliderValue],
    sortedLocationsArr.length,
    sortDescending,
    props.homepageScope,
    currentLocation,
    sortByPopulation,
    props.stateName,
    region,
  );

  // Disabling filters for Northern Mariana Islands because they don't have
  // any data on metro vs non-metro islands.  There may be more elegant solutions
  // that better handle any region without metro/non-metro regions.
  // TODO(chris): https://trello.com/c/KdfFwRvf/430-handle-filters-in-compare-table-with-no-results-more-cleanly
  const disableFilters =
    stateId === 'MP' || (region && region instanceof MetroArea);

  // Only showing the view more text when all locations are not available.
  const showViewMore = amountDisplayed !== sortedLocationsArr.length;

  const getShareUrl = () =>
    props.createCompareShareId().then(id => `${getComparePageUrl(id, region)}`);
  const getDownloadImageUrl = () =>
    props.createCompareShareId().then(id => `${getCompareShareImageUrl(id)}`);

  // TODO: What is the best way to label here?
  const trackLabel = 'Compare';

  const onClickShowAll = () => {
    props.setShowModal(true);
    trackCompareEvent(EventAction.OPEN_MODAL, 'Show All Locations');
  };

  const onClickFAQ = () => {
    props.setShowFaqModal(true);
    trackCompareEvent(EventAction.OPEN_MODAL, 'FAQ');
  };

  return (
    <Wrapper $isModal={props.isModal} $isHomepage={props.isHomepage}>
      {!props.isModal && (
        <div>
          <HeaderWrapper>
            <Header isHomepage={props.isHomepage}>
              <LocationPageSectionHeader>Compare</LocationPageSectionHeader>
              <ShareImageButtons
                imageUrl={getDownloadImageUrl}
                imageFilename="CovidActNow-compare.png"
                url={getShareUrl}
                quote={shareQuote}
                onCopyLink={() =>
                  trackCompareEvent(EventAction.COPY_LINK, trackLabel)
                }
                onSaveImage={() =>
                  trackCompareEvent(EventAction.SAVE_IMAGE, trackLabel)
                }
                onShareOnFacebook={() => trackShare(`Facebook: ${trackLabel}`)}
                onShareOnTwitter={() => trackShare(`Twitter: ${trackLabel}`)}
                onShareOnLinkedin={() => trackShare(`Linkedin: ${trackLabel}`)}
              />
            </Header>
            {region && <Subtitle1>{getCompareSubheader(region)}</Subtitle1>}
          </HeaderWrapper>
          {!disableFilters && (
            <Filters
              isHomepage={props.isHomepage}
              countyTypeToView={props.countyTypeToView}
              setCountyTypeToView={props.setCountyTypeToView}
              stateId={props.stateId}
              county={props.county}
              geoScope={props.geoScope}
              setGeoScope={props.setGeoScope}
              isModal={props.isModal}
              sliderValue={sliderValue}
              // setSliderValue={setSliderValue}
              homepageScope={homepageScope}
              setHomepageScope={setHomepageScope}
              homepageSliderValue={homepageSliderValue}
              // setHomepageSliderValue={setHomepageSliderValue}
            />
          )}
        </div>
      )}
      <LocationTable
        firstColumnHeader={firstColumnHeader}
        setSorter={setSorter}
        setSortDescending={setSortDescending}
        columns={columns}
        isModal={props.isModal}
        {...arrowContainerProps}
        pinnedLocation={currentLocation}
        sortedLocations={sortedLocations}
        numLocations={locationsViewable}
        stateName={props.stateName}
        setSortByPopulation={setSortByPopulation}
        sortByPopulation={sortByPopulation}
        isHomepage={props.isHomepage}
        geoScope={props.geoScope}
        homepageScope={homepageScope}
        region={region}
      />
      {!props.isModal && (
        <Footer isCounty={props.county}>
          <div>
            <span>
              Displaying <strong>{amountDisplayed}</strong> of{' '}
              <strong>{sortedLocationsArr.length}</strong>{' '}
            </span>
            {showViewMore && (
              <FooterLink onClick={onClickShowAll}>
                {props.viewMoreCopy}
              </FooterLink>
            )}
          </div>
          <MoreInfoButton onClick={onClickFAQ} />
        </Footer>
      )}
    </Wrapper>
  );
};

export default CompareTable;
