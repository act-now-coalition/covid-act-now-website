import React, { useState, Fragment, useRef } from 'react';
import { Modal } from '@material-ui/core';
import CompareTable from 'components/Compare/CompareTable';
import ModalCompare from 'components/Compare/ModalCompare';
import { DivForRef } from 'components/Compare/Compare.style';
import { SummaryForCompare } from 'common/utils/compare';
import { MetroFilter, GeoScopeFilter } from 'common/utils/compare';

const CompareMain = (props: {
  stateName?: string;
  county: any | null;
  isModal?: Boolean;
  locationsViewable: number;
  isHomepage?: boolean;
  locations: SummaryForCompare[];
  currentCounty?: any;
  viewAllCounties?: boolean;
  setViewAllCounties?: React.Dispatch<React.SetStateAction<boolean>>;
  viewMoreCopy: string;
  setCountyTypeToView: React.Dispatch<React.SetStateAction<MetroFilter>>;
  countyTypeToView: MetroFilter;
  geoScope?: GeoScopeFilter;
  setGeoScope?: React.Dispatch<React.SetStateAction<GeoScopeFilter>>;
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

  // TODO (chelsi) filter-related WIP - setViewAllCounties to false?:

  // short delay is needed to make scrollTo work
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

  if (props.locations.length === 0) {
    return null;
  }

  const sharedProps = {
    stateName: props.stateName,
    county: props.county,
    setShowModal: setShowModal,
    isHomepage: props.isHomepage,
    locations: props.locations,
    currentCounty: props.currentCounty,
    viewAllCounties: props.viewAllCounties,
    countyTypeToView: props.countyTypeToView,
    setCountyTypeToView: props.setCountyTypeToView,
    setViewAllCounties: props.setViewAllCounties,
    geoScope: props.geoScope,
    setGeoScope: props.setGeoScope,
    stateId: props.stateId,
  };

  return (
    <Fragment>
      <DivForRef ref={tableRef}>
        <CompareTable
          {...sharedProps}
          locationsViewable={props.locationsViewable}
          isModal={false}
          viewMoreCopy={props.viewMoreCopy}
        />
      </DivForRef>
      <Modal open={showModal} onClose={handleCloseModal}>
        <ModalCompare {...sharedProps} handleCloseModal={handleCloseModal} />
      </Modal>
    </Fragment>
  );
};

export default CompareMain;
