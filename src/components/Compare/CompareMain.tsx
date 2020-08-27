import React, { useState, Fragment, useRef } from 'react';
import { Modal } from '@material-ui/core';
import CompareTable from 'components/Compare/CompareTable';
import ModalCompare from 'components/Compare/ModalCompare';
import { DivForRef } from 'components/Compare/Compare.style';
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
  const scrollOffset = props.isHomepage ? 75 : 165;
  const scrollTo = (div: null | HTMLDivElement) =>
    div &&
    window.scrollTo({
      left: 0,
      top: div.offsetTop - scrollOffset,
      behavior: 'smooth',
    });

  const [sorter, setSorter] = useState(5);
  const [sortDescending, setSortDescending] = useState(true);
  const [sortByPopulation, setSortByPopulation] = useState(false);
  const [countyTypeToView, setCountyTypeToView] = useState(MetroFilter.ALL);

  // For homepage:
  const [viewAllCounties, setViewAllCounties] = useState(false);

  const homepageLocationsForCompare = viewAllCounties
    ? getAllCountiesSelection(countyTypeToView)
    : getAllStates();

  const homepageViewMoreCopy = getHomePageViewMoreCopy(
    viewAllCounties,
    countyTypeToView,
  );

  // For location page:
  const [geoScope, setGeoScope] = useState(GeoScopeFilter.STATE);

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

  // Note (Chelsi): short delay is needed to make scrollTo work
  const [showModal, setShowModal] = useState(false);
  const handleCloseModal = () => {
    setShowModal(false);
    const timeoutId = setTimeout(() => {
      if (tableRef.current) {
        scrollTo(tableRef.current);
      }
    }, 250);
    return () => clearTimeout(timeoutId);
  };

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
    setShowModal: setShowModal,
    isHomepage: props.isHomepage,
    locations: locations,
    currentCounty: props.currentCounty,
    viewAllCounties: viewAllCounties,
    countyTypeToView: countyTypeToView,
    setCountyTypeToView: setCountyTypeToView,
    setViewAllCounties: setViewAllCounties,
    geoScope: geoScope,
    setGeoScope: setGeoScope,
    stateId: props.stateId,
    sorter: sorter,
    setSorter: setSorter,
    sortDescending: sortDescending,
    setSortDescending: setSortDescending,
    sortByPopulation: sortByPopulation,
    setSortByPopulation: setSortByPopulation,
    sliderValue: sliderValue,
    setSliderValue: setSliderValue,
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
    </Fragment>
  );
};

export default CompareMain;
