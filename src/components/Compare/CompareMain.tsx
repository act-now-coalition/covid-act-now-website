import React, {
  useCallback,
  useState,
  Fragment,
  useRef,
  useEffect,
} from 'react';
import { useLocation } from 'react-router-dom';
import { Modal } from '@material-ui/core';
import CompareTable from 'components/Compare/CompareTable';
import ModalCompare from 'components/Compare/ModalCompare';
import ModalFaq from 'components/Compare/ModalFaq';
import {
  DivForRef,
  CenteredContentModal,
} from 'components/Compare/Compare.style';
import {
  getAllStates,
  getAllCountiesSelection,
  getHomePageViewMoreCopy,
  getNeighboringCounties,
  getLocationPageCountiesSelection,
  getLocationPageViewMoreCopy,
  MetroFilter,
  GeoScopeFilter,
  HomepageLocationScope,
  getAllMetroAreas,
  getAllCountiesOfMetroArea,
  SummaryForCompare,
} from 'common/utils/compare';
import { Metric } from 'common/metricEnum';
import { getSummaryFromFips } from 'common/location_summaries';
import { findCountyByFips } from 'common/locations';
import { ScreenshotReady } from 'components/Screenshot';
import {
  SharedComponent,
  storeSharedComponentParams,
  useSharedComponentParams,
} from 'common/sharing';
import regions, {
  Region,
  MetroArea,
  getStateCode,
  County,
} from 'common/regions';
import { assert } from 'common/utils';

// For filters (0, 50, and 99 are numerical values required by MUI Slider component):
const scopeValueMap = {
  [GeoScopeFilter.NEARBY]: 0,
  [GeoScopeFilter.STATE]: 50,
  [GeoScopeFilter.COUNTRY]: 99,
};

const homepageScopeValueMap = {
  [HomepageLocationScope.COUNTY]: 0,
  [HomepageLocationScope.MSA]: 50,
  [HomepageLocationScope.STATE]: 99,
};

const CompareMain = (props: {
  stateName?: string;
  isModal?: boolean;
  locationsViewable: number;
  stateId?: string;
  region?: Region;
  vaccinesFirst?: boolean;
  vulnerabilityFirst?: boolean;
}) => {
  const tableRef = useRef<HTMLDivElement>(null);

  const [region, setRegion] = useState(props.region);

  const isHomepage = !region;

  const scrollToCompare = useCallback(() => {
    const scrollOffset = isHomepage ? 75 : 165;
    // Note (Chelsi): short delay is needed to make scrollTo work
    return setTimeout(() => {
      if (tableRef.current) {
        window.scrollTo({
          left: 0,
          top: tableRef.current.offsetTop - scrollOffset,
          behavior: 'smooth',
        });
      }
    }, 250);
  }, [isHomepage, tableRef]);

  const location = useLocation();
  useEffect(() => {
    if (location.pathname.includes('/compare')) {
      const timeoutId = scrollToCompare();
      return () => clearTimeout(timeoutId);
    }
  }, [location.pathname, scrollToCompare]);

  // Store these as state variables so we can replace them with stored params
  // when generating compare share images.
  const [stateId, setStateId] = useState(props.stateId);

  let currentCounty: SummaryForCompare | undefined;
  if (region && region instanceof County) {
    const summary = getSummaryFromFips(region.fipsCode);
    assert(summary, 'Missing location summary for region');
    currentCounty = {
      region: region,
      metricsInfo: summary,
    };
  }

  useEffect(() => {
    setStateId(props.stateId);
    setRegion(props.region);
  }, [props.stateId, props.region]);

  const [sorter, setSorter] = useState(Metric.CASE_DENSITY);
  const [sortDescending, setSortDescending] = useState(true);
  const [sortByPopulation, setSortByPopulation] = useState(true);
  const [countyTypeToView, setCountyTypeToView] = useState(MetroFilter.ALL);

  // For homepage:
  const [homepageScope, setHomepageScope] = useState(HomepageLocationScope.MSA);

  const homepageScopeToLocations = {
    [HomepageLocationScope.COUNTY]: getAllCountiesSelection(countyTypeToView),
    [HomepageLocationScope.MSA]: getAllMetroAreas(),
    [HomepageLocationScope.STATE]: getAllStates(),
  };

  function getHomepageLocations(scope: HomepageLocationScope) {
    return homepageScopeToLocations[scope];
  }

  const homepageLocationsForCompare = getHomepageLocations(homepageScope);

  const homepageViewMoreCopy = getHomePageViewMoreCopy(
    homepageScope,
    countyTypeToView,
  );

  // For location page:
  const [geoScope, setGeoScope] = useState(GeoScopeFilter.STATE);

  function getLocationPageLocations(region: Region) {
    const stateCode = getStateCode(region);
    if (region instanceof MetroArea) {
      return getAllCountiesOfMetroArea(region);
    } else if (geoScope === GeoScopeFilter.NEARBY) {
      return getNeighboringCounties(region.fipsCode);
    } else if (geoScope === GeoScopeFilter.STATE && stateCode) {
      return getLocationPageCountiesSelection(stateCode, countyTypeToView);
    } else {
      return getAllCountiesSelection(countyTypeToView);
    }
  }

  function getFinalLocations(region?: Region) {
    return region
      ? getLocationPageLocations(region)
      : homepageLocationsForCompare;
  }

  const locations = getFinalLocations(region);

  const viewMoreCopy = region
    ? getLocationPageViewMoreCopy(geoScope, countyTypeToView, region)
    : homepageViewMoreCopy;

  const [showModal, setShowModal] = useState(false);
  const [showFaqModal, setShowFaqModal] = useState(false);
  const handleCloseModal = () => {
    setShowFaqModal(false);
    setShowModal(false);
    scrollToCompare();
  };

  // Location page slider:
  const defaultSliderValue = scopeValueMap[geoScope];
  const [sliderValue, setSliderValue] = useState(defaultSliderValue);

  // Homepage slider:
  const defaultHomepageSliderValue = homepageScopeValueMap[homepageScope];
  const [homepageSliderValue, setHomepageSliderValue] = useState(
    defaultHomepageSliderValue,
  );

  // Since the route isn't changing when navigating between county pages within the same state, state variables weren't resetting. This forces a reset:
  useEffect(() => {
    setShowModal(false);
    setSorter(Metric.CASE_DENSITY);
    setSortDescending(true);
    setSortByPopulation(true);
    setCountyTypeToView(MetroFilter.ALL);
    setShowFaqModal(false);
    setGeoScope(GeoScopeFilter.STATE);
  }, [geoScope, location.pathname]);

  // So the slider value updates in accordance with geoScope, without needing to add geoScope to the above effect's dependecy array:
  useEffect(() => {
    setSliderValue(scopeValueMap[geoScope as GeoScopeFilter]);
  }, [geoScope]);

  // State needed to reconstruct the current sort / filters. Needs to be persisted
  // when we generate sharing URLs, etc.
  const uiState = {
    sorter,
    sortDescending,
    sortByPopulation,
    countyTypeToView,
    homepageScope,
    geoScope,
    stateId,
    countyId: currentCounty?.region.fipsCode,
    regionFips: region?.fipsCode,
  };

  const createCompareShareId = async () => {
    return storeSharedComponentParams(SharedComponent.Compare, uiState);
  };

  const [screenshotReady, setScreenshotReady] = useState(false);

  // Repopulate state from shared parameters if we're being rendered via a
  // sharing URL.
  const sharedParams = useSharedComponentParams(SharedComponent.Compare);
  useEffect(() => {
    if (sharedParams) {
      const { stateId, countyId, regionFips } = sharedParams;
      if (stateId) {
        setStateId(stateId);
      }
      if (regionFips) {
        const regionFromFips = regions.findByFipsCodeStrict(regionFips);
        setRegion(regionFromFips);
      } else if (countyId) {
        // Used by legacy share code to load region.
        const regionFromFips = regions.findByFipsCodeStrict(countyId);
        setRegion(regionFromFips);
      }

      setSorter(sharedParams.sorter);
      setSortDescending(sharedParams.sortDescending);
      setSortByPopulation(sharedParams.sortByPopulation);
      setCountyTypeToView(sharedParams.countyTypeToView);
      setHomepageScope(sharedParams.homepageScope);
      setHomepageSliderValue(
        homepageScopeValueMap[
          sharedParams.homepageScope as HomepageLocationScope
        ],
      );
      setGeoScope(sharedParams.geoScope);
      setSliderValue(scopeValueMap[sharedParams.geoScope as GeoScopeFilter]);

      // Now that the UI is populated, we can capture the screenshot.
      setScreenshotReady(true);
    }
  }, [sharedParams]);

  // If the user clicks on the banner or the announcement, we put vaccinations in the first column
  // select states and sort by vaccination (desc)
  useEffect(() => {
    if (props.vaccinesFirst) {
      setSorter(Metric.VACCINATIONS);
      setSortByPopulation(false);
      setSortDescending(true);
      setHomepageSliderValue(
        homepageScopeValueMap[HomepageLocationScope.STATE],
      );
      setHomepageScope(HomepageLocationScope.STATE);
    }
  }, [props.vaccinesFirst]);

  useEffect(() => {
    if (props.vulnerabilityFirst) {
      setSorter(100);
      setSortByPopulation(false);
      setSortDescending(true);
      setHomepageScope(HomepageLocationScope.COUNTY);
      setHomepageSliderValue(
        homepageScopeValueMap[HomepageLocationScope.COUNTY],
      );
    }
  }, [props.vulnerabilityFirst]);

  /* Mostly a check for MSAs with only 1 county. Won't render a compare table if there aren't at least 2 locations */
  if (!locations || locations.length < 2) {
    return null;
  }

  // TODO(chris): pusing down use of county as far as possible, but underlying compare
  // table code not yet ready to stop using county as an input, so querying the legacy Location
  // county API here.
  const locationCounty = findCountyByFips(currentCounty?.region.fipsCode || '');
  const sharedProps = {
    stateName: props.stateName,
    stateId,
    county: locationCounty,
    setShowModal,
    isHomepage,
    locations,
    currentCounty,
    ...uiState,
    setCountyTypeToView,
    setGeoScope,
    setSorter,
    setSortDescending,
    setSortByPopulation,
    sliderValue,
    setSliderValue,
    setShowFaqModal,
    createCompareShareId,
    homepageScope,
    setHomepageScope,
    homepageSliderValue,
    setHomepageSliderValue,
    region: region,
    vaccinesFirst: props.vaccinesFirst,
    vulnerabilityFirst: props.vulnerabilityFirst,
  };

  return (
    <Fragment>
      <div id="compare-vulnerabilities"></div>
      <DivForRef ref={tableRef} id="compare">
        <CompareTable
          {...sharedProps}
          locationsViewable={props.locationsViewable}
          isModal={false}
          viewMoreCopy={viewMoreCopy}
        />
      </DivForRef>
      <Modal open={showModal} onClose={handleCloseModal}>
        <ModalCompare {...sharedProps} handleCloseModal={handleCloseModal} />
      </Modal>
      <CenteredContentModal open={showFaqModal} onClose={handleCloseModal}>
        <ModalFaq handleCloseModal={handleCloseModal} />
      </CenteredContentModal>
      {screenshotReady && <ScreenshotReady />}
    </Fragment>
  );
};

export default CompareMain;
