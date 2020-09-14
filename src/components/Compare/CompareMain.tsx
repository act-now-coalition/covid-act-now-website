import React, {
  useCallback,
  useState,
  Fragment,
  useRef,
  useEffect,
} from 'react';
import { useLocation, useParams } from 'react-router-dom';
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
import { getFirebase } from 'common/firebase';
import { countySummary } from 'common/location_summaries';
import { findCountyByFips } from 'common/locations';
import { ScreenshotReady } from 'components/Screenshot';

const firestore = getFirebase().firestore();
const paramsCollection = firestore.collection('compare-shared-params');
const nextIdDocRef = paramsCollection.doc('__nextId');

// For filters (0, 50, and 99 are numerical values required by MUI Slider component):
const scopeValueMap = {
  [GeoScopeFilter.NEARBY]: 0,
  [GeoScopeFilter.STATE]: 50,
  [GeoScopeFilter.COUNTRY]: 99,
};

const CompareMain = (props: {
  stateName?: string;
  county: any | null;
  isModal?: Boolean;
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

  // Store these as state variables so we can replace them with data read
  // from Firestore when generating compare share images.
  const [stateId, setStateId] = useState(props.stateId);
  const [county, setCounty] = useState(props.county);
  const currentCounty = county && {
    locationInfo: county,
    metricsInfo: countySummary(county.full_fips_code),
  };

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
  };

  // createCompareShareId() stores the current share params to Firestore under a
  // newly-assigned numeric ID and returns it. We cache the result so multiple
  // calls don't generate extra IDs.
  let createCompareShareIdPromise: Promise<string> | null = null;
  const createCompareShareId = async () => {
    if (!createCompareShareIdPromise) {
      createCompareShareIdPromise = firestore.runTransaction(async txn => {
        const nextIdDoc = await txn.get(nextIdDocRef);
        const id = nextIdDoc.data()?.id || 0;

        nextIdDocRef.set({ id: id + 1 });

        const params: firebase.firestore.DocumentData = { ...uiState };
        if (stateId) {
          params['stateId'] = stateId;
        }
        if (county) {
          params['countyId'] = county.full_fips_code;
        }
        paramsCollection.doc(`${id}`).set(params);

        return `${id}`;
      });
    }

    return createCompareShareIdPromise;
  };

  const [screenshotReady, setScreenshotReady] = useState(false);

  // Check for a /compare/{compareShareId} in the URL and use it to repopulate the
  // compare table if it's there.
  const { compareShareId } = useParams();
  useEffect(() => {
    async function fetchParamsFromFirestore(id: string) {
      const doc = await paramsCollection.doc(id).get();
      const params = doc.data();
      if (params) {
        const { stateId, countyId } = params;
        if (stateId) {
          setStateId(stateId);
        }
        if (countyId) {
          setCounty(findCountyByFips(countyId));
        }

        setSorter(params['sorter']);
        setSortDescending(params['sortDescending']);
        setSortByPopulation(params['sortByPopulation']);
        setCountyTypeToView(params['countyTypeToView']);
        setViewAllCounties(params['viewAllCounties']);
        setGeoScope(params['geoScope']);
        setSliderValue(scopeValueMap[params['geoScope'] as GeoScopeFilter]);

        // Now that the UI is populated, we can capture the screenshot.
        setScreenshotReady(true);
      } else {
        console.error('Invalid Sharing ID:', compareShareId);
      }
    }
    if (compareShareId) {
      fetchParamsFromFirestore(compareShareId);
    }
  }, [compareShareId]);

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
