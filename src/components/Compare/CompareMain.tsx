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
  currentCounty?: any;
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
      return getNeighboringCounties(props.county.full_fips_code);
    } else if (geoScope === GeoScopeFilter.STATE && props.stateId) {
      return getLocationPageCountiesSelection(countyTypeToView, props.stateId);
    } else {
      return getAllCountiesSelection(countyTypeToView);
    }
  }

  const locationPageViewMoreCopy =
    props.stateName &&
    getLocationPageViewMoreCopy(geoScope, countyTypeToView, props.stateName);
  const locationPageLocationsForCompare = getLocationPageLocations();

  const locations = props.isHomepage
    ? homepageLocationsForCompare
    : locationPageLocationsForCompare;
  const viewMoreCopy = props.isHomepage
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

  // createSharingId() stores the current share params to Firestore under a
  // newly-assigned numeric ID and returns it. We cache the result so multiple
  // calls don't generate extra IDs.
  let createSharingIdPromise: Promise<string> | null = null;
  const createSharingId = async () => {
    if (!createSharingIdPromise) {
      createSharingIdPromise = firestore.runTransaction(async txn => {
        const nextIdDoc = await txn.get(nextIdDocRef);
        const id = nextIdDoc.data()?.id || 0;

        nextIdDocRef.set({ id: id + 1 });
        paramsCollection.doc(`${id}`).set(uiState);

        return `${id}`;
      });
    }

    return createSharingIdPromise;
  };

  // Check for a /compare/{sharingId} in the URL and use it to repopulate the
  // compare table if it's there.
  const { sharingId } = useParams();
  useEffect(() => {
    async function fetchParamsFromFirestore(id: string) {
      const doc = await paramsCollection.doc(id).get();
      if (doc.exists) {
        const params = doc.data() as any;
        setSorter(params['sorter']);
        setSortDescending(params['sortDescending']);
        setSortByPopulation(params['sortByPopulation']);
        setCountyTypeToView(params['countyTypeToView']);
        setViewAllCounties(params['viewAllCounties']);
        setGeoScope(params['geoScope']);
        setSliderValue(scopeValueMap[params['geoScope'] as GeoScopeFilter]);
      } else {
        console.error('Invalid Sharing ID:', sharingId);
      }
    }
    if (sharingId) {
      fetchParamsFromFirestore(sharingId);
    }
  }, [sharingId]);

  if (locations.length === 0) {
    return null;
  }

  const sharedProps = {
    stateName: props.stateName,
    stateId: props.stateId,
    county: props.county,
    setShowModal,
    isHomepage: props.isHomepage,
    locations,
    currentCounty: props.currentCounty,
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
    createSharingId,
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
    </Fragment>
  );
};

export default CompareMain;
