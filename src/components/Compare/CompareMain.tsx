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
import { Metric } from 'common/metric';
import { getSummaryFromFips } from 'common/location_summaries';
import { findCountyByFips } from 'common/locations';
import { ScreenshotReady } from 'components/Screenshot';
import {
  SharedComponent,
  storeSharedComponentParams,
  useSharedComponentParams,
} from 'common/sharing';
import regions, { Region, MetroArea } from 'common/regions';
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
  county?: any | null;
  isModal?: boolean;
  locationsViewable: number;
  stateId?: string;
  region?: Region;
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
  const [county, setCounty] = useState(props.county);

  let currentCounty;
  if (county) {
    const region = regions.findByFipsCode(county.full_fips_code);
    assert(region, 'Missing region for county');
    currentCounty = {
      region: region,
      metricsInfo: getSummaryFromFips(county.full_fips_code),
    };
  }

  useEffect(() => {
    setStateId(props.stateId);
    setCounty(props.county);
  }, [props.stateId, props.county]);

  const defaultSortByPopulation = isHomepage ? true : false;

  const [sorter, setSorter] = useState(Metric.CASE_DENSITY);
  const [sortDescending, setSortDescending] = useState(true);
  const [sortByPopulation, setSortByPopulation] = useState(
    defaultSortByPopulation,
  );
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

  function getLocationPageLocations(region?: Region): SummaryForCompare[] {
    if (region && region instanceof MetroArea) {
      return getAllCountiesOfMetroArea(region);
    } else if (geoScope === GeoScopeFilter.NEARBY) {
      return getNeighboringCounties(county.full_fips_code);
    } else if (geoScope === GeoScopeFilter.STATE && stateId) {
      return getLocationPageCountiesSelection(countyTypeToView, stateId);
    } else {
      return getAllCountiesSelection(countyTypeToView);
    }
  }

  const locationPageLocationsForCompare = getLocationPageLocations();

  function getFinalLocations(region?: Region): SummaryForCompare[] {
    if (!region) {
      return homepageLocationsForCompare;
    } else {
      if (region instanceof MetroArea) {
        return getAllCountiesOfMetroArea(region);
      } else return locationPageLocationsForCompare;
    }
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
    countyId: county?.full_fips_code,
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
      if (countyId) {
        setCounty(findCountyByFips(countyId));
      }
      if (regionFips) {
        const regionFromFips = regions.findByFipsCodeStrict(regionFips);
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

  /* Mostly a check for MSAs with only 1 county. Won't render a compare table if there aren't at least 2 locations */
  if (!locations || locations.length < 2) {
    return null;
  }

  const sharedProps = {
    stateName: props.stateName,
    stateId,
    county,
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
  };

  return (
    <Fragment>
      <DivForRef ref={tableRef}>
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
