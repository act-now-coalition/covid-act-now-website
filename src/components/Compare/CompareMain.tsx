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
} from 'common/utils/compare';
import { Metric } from 'common/metric';
import { countySummary } from 'common/location_summaries';
import { findCountyByFips } from 'common/locations';
import { ScreenshotReady } from 'components/Screenshot';
import {
  SharedComponent,
  storeSharedComponentParams,
  useSharedComponentParams,
} from 'common/sharing';
import regions from 'common/regions';

// For filters (0, 50, and 99 are numerical values required by MUI Slider component):
const scopeValueMap = {
  [GeoScopeFilter.NEARBY]: 0,
  [GeoScopeFilter.STATE]: 50,
  [GeoScopeFilter.COUNTRY]: 99,
};

const CompareMain = (props: {
  stateName?: string;
  county: any | null;
  isModal?: boolean;
  locationsViewable: number;
  isHomepage?: boolean;
  stateId?: string;
}) => {
  const tableRef = useRef<HTMLDivElement>(null);

  const scrollToCompare = useCallback(() => {
    const scrollOffset = props.isHomepage ? 75 : 165;
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
  }, [props.isHomepage, tableRef]);

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
  const currentCounty = county && {
    region: regions.findByFipsCode(county.full_fips_code)!,
    metricsInfo: countySummary(county.full_fips_code),
  };

  useEffect(() => {
    setStateId(props.stateId);
    setCounty(props.county);
  }, [props.stateId, props.county]);

  const [sorter, setSorter] = useState(Metric.CASE_DENSITY);
  const [sortDescending, setSortDescending] = useState(true);
  const [sortByPopulation, setSortByPopulation] = useState(false);
  const [countyTypeToView, setCountyTypeToView] = useState(MetroFilter.ALL);
  // For homepage:
  const [viewAllCounties, setViewAllCounties] = useState(false);
  // For location page:
  const [geoScope, setGeoScope] = useState(GeoScopeFilter.STATE);

  const homepageLocationsForCompare = viewAllCounties
    ? getAllCountiesSelection(countyTypeToView)
    : getAllStates();

  const homepageViewMoreCopy = getHomePageViewMoreCopy(
    viewAllCounties,
    countyTypeToView,
  );

  function getLocationPageLocations() {
    if (geoScope === GeoScopeFilter.NEARBY) {
      return getNeighboringCounties(county.full_fips_code);
    } else if (geoScope === GeoScopeFilter.STATE && stateId) {
      return getLocationPageCountiesSelection(countyTypeToView, stateId);
    } else {
      return getAllCountiesSelection(countyTypeToView);
    }
  }

  const locationPageViewMoreCopy =
    props.stateName &&
    getLocationPageViewMoreCopy(geoScope, countyTypeToView, props.stateName);
  const locationPageLocationsForCompare = getLocationPageLocations();

  const locations = !stateId
    ? homepageLocationsForCompare
    : locationPageLocationsForCompare;
  const viewMoreCopy = !stateId
    ? homepageViewMoreCopy
    : locationPageViewMoreCopy;

  const [showModal, setShowModal] = useState(false);
  const [showFaqModal, setShowFaqModal] = useState(false);
  const handleCloseModal = () => {
    setShowFaqModal(false);
    setShowModal(false);
    scrollToCompare();
  };

  const defaultSliderValue = scopeValueMap[geoScope];
  const [sliderValue, setSliderValue] = useState(defaultSliderValue);

  // State needed to reconstruct the current sort / filters. Needs to be persisted
  // when we generate sharing URLs, etc.
  const uiState = {
    sorter,
    sortDescending,
    sortByPopulation,
    countyTypeToView,
    viewAllCounties,
    geoScope,
    stateId,
    countyId: county?.full_fips_code,
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
      const { stateId, countyId } = sharedParams;
      if (stateId) {
        setStateId(stateId);
      }
      if (countyId) {
        setCounty(findCountyByFips(countyId));
      }

      setSorter(sharedParams.sorter);
      setSortDescending(sharedParams.sortDescending);
      setSortByPopulation(sharedParams.sortByPopulation);
      setCountyTypeToView(sharedParams.countyTypeToView);
      setViewAllCounties(sharedParams.viewAllCounties);
      setGeoScope(sharedParams.geoScope);
      setSliderValue(scopeValueMap[sharedParams.geoScope as GeoScopeFilter]);

      // Now that the UI is populated, we can capture the screenshot.
      setScreenshotReady(true);
    }
  }, [sharedParams]);

  if (locations.length === 0) {
    return null;
  }

  const sharedProps = {
    stateName: props.stateName,
    stateId,
    county,
    setShowModal,
    isHomepage: props.isHomepage,
    locations,
    currentCounty,
    ...uiState,
    setCountyTypeToView,
    setViewAllCounties,
    setGeoScope,
    setSorter,
    setSortDescending,
    setSortByPopulation,
    sliderValue,
    setSliderValue,
    setShowFaqModal,
    createCompareShareId,
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
