import React, { useState, Fragment } from 'react';
import CompareTable from 'components/Compare/CompareTable';
import { Modal } from '@material-ui/core';
import ModalCompare from 'components/Compare/ModalCompare';

const CompareMain = (props: {
  stateId?: string;
  stateName?: string;
  county: any | null;
  isModal?: Boolean;
  locationsViewable?: number;
  isLocationPage?: Boolean;
  isHomepage?: Boolean;
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
      />
      <Modal open={showModal} onClose={handleCloseModal}>
        <ModalCompare
          stateId={props.stateId}
          stateName={props.stateName}
          county={props.county}
          setShowModal={setShowModal}
          isLocationPage={props.isLocationPage}
          isHomepage={props.isHomepage}
        />
      </Modal>
    </Fragment>
  );
};

export default CompareMain;
