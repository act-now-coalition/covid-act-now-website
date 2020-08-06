import React, { useState, Fragment } from 'react';
import { Modal } from '@material-ui/core';
import CompareTable from 'components/Compare/CompareTable';
import ModalCompare from 'components/Compare/ModalCompare';
import { SummaryForCompare } from 'common/utils/compare';

const CompareMain = (props: {
  stateId: string;
  stateName?: string;
  county: any | null;
  isModal?: Boolean;
  locationsViewable: number;
  isLocationPage?: Boolean;
  isHomepage?: Boolean;
  locations: SummaryForCompare[];
  currentCounty?: any;
}) => {
  const [showModal, setShowModal] = useState(false);
  const handleCloseModal = () => {
    setShowModal(false);
  };

  return (
    <Fragment>
      <CompareTable
        stateId={props.stateId}
        stateName={props.stateName}
        county={props.county}
        setShowModal={setShowModal}
        locationsViewable={props.locationsViewable}
        isLocationPage={props.isLocationPage}
        isHomepage={props.isHomepage}
        locations={props.locations}
        currentCounty={props.currentCounty}
      />
      <Modal open={showModal} onClose={handleCloseModal}>
        <ModalCompare
          stateId={props.stateId}
          stateName={props.stateName}
          county={props.county}
          setShowModal={setShowModal}
          isLocationPage={props.isLocationPage}
          isHomepage={props.isHomepage}
          locations={props.locations}
          currentCounty={props.currentCounty}
        />
      </Modal>
    </Fragment>
  );
};

export default CompareMain;
