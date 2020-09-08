import * as QueryString from 'query-string';
import React, { useState, Fragment, useRef, useEffect } from 'react';
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
import * as urls from 'common/urls';

const CompareMain = (props: {
  stateName?: string;
  county: any | null;
  isModal?: Boolean;
  locationsViewable: number;
  isHomepage?: boolean;
  currentCounty?: any;
  stateId?: string;
  autoScroll?: boolean;
}) => {
  const tableRef = useRef<HTMLDivElement>(null);
  const scrollOffset = props.isHomepage ? 75 : 165;
  const scrollTo = (div: null | HTMLDivElement) =>
    div &&
    window.scrollTo({
      left: 0,
      top: div.offsetTop - scrollOffset,
      behavior: 'smooth',
    });

  const location = useLocation();
  const queryParams = QueryString.parse(location.search, {
    parseBooleans: true,
    parseNumbers: true,
  });

  // Looks up the named query param or returns the default value.
  const getQueryParam = <T extends number | boolean | string>(
    param: string,
    defaultVal: T,
  ): T => {
    const val = queryParams[param];
    // If the type doesn't match, it's either undefined or an unexpected value; so return the default.
    if (typeof val !== typeof defaultVal) {
      return defaultVal;
    }
    return val as T;
  };

  const [sorter, setSorter] = useState(
    getQueryParam<Metric>('sorter', Metric.CASE_DENSITY),
  );
  const [sortDescending, setSortDescending] = useState(
    getQueryParam<boolean>('sortDescending', true),
  );
  const [sortByPopulation, setSortByPopulation] = useState(
    getQueryParam<boolean>('sortByPopulation', false),
  );
  const [countyTypeToView, setCountyTypeToView] = useState(
    getQueryParam<MetroFilter>('countyTypeToView', MetroFilter.ALL),
  );
  // For homepage:
  const [viewAllCounties, setViewAllCounties] = useState(
    getQueryParam<boolean>('viewAllCounties', false),
  );
  // For location page:
  const [geoScope, setGeoScope] = useState(
    getQueryParam<GeoScopeFilter>('geoScope', GeoScopeFilter.STATE),
  );

  const shareParams = {
    sorter,
    sortDescending,
    sortByPopulation,
    countyTypeToView,
    viewAllCounties,
    geoScope,
  };

  const shareUrl = urls.getComparePageUrl(
    props.stateId,
    props.county,
    shareParams,
  );
  console.log('Share URL: ', shareUrl);

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

  const scrollToCompare = () => {
    // Note (Chelsi): short delay is needed to make scrollTo work
    return setTimeout(() => {
      if (tableRef.current) {
        scrollTo(tableRef.current);
      }
    }, 250);
  };

  const [showModal, setShowModal] = useState(false);
  const [showFaqModal, setShowFaqModal] = useState(false);
  const handleCloseModal = () => {
    setShowFaqModal(false);
    setShowModal(false);
    scrollToCompare();
  };

  useEffect(() => {
    if (props.autoScroll) {
      const timeoutId = scrollToCompare();
      return () => clearTimeout(timeoutId);
    }
  });

  // For filters:
  const scopeValueMap = {
    [GeoScopeFilter.NEARBY]: 0,
    [GeoScopeFilter.STATE]: 50,
    [GeoScopeFilter.COUNTRY]: 99,
  };
  const defaultSliderValue = scopeValueMap[geoScope];
  const [sliderValue, setSliderValue] = useState(defaultSliderValue);

  if (locations.length === 0) {
    return null;
  }

  const sharedProps = {
    stateName: props.stateName,
    county: props.county,
    setShowModal,
    isHomepage: props.isHomepage,
    locations,
    currentCounty: props.currentCounty,
    viewAllCounties,
    countyTypeToView,
    setCountyTypeToView,
    setViewAllCounties,
    geoScope,
    setGeoScope,
    stateId: props.stateId,
    sorter,
    setSorter,
    sortDescending,
    setSortDescending,
    sortByPopulation,
    setSortByPopulation,
    sliderValue,
    setSliderValue,
    setShowFaqModal,
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
