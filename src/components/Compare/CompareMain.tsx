import React, { useState, Fragment } from 'react';
import { Modal } from '@material-ui/core';
import CompareTable from 'components/Compare/CompareTable';
import ModalCompare from 'components/Compare/ModalCompare';
import { SummaryForCompare } from 'common/utils/compare';

const CompareMain = (props: {
  stateName?: string;
  county: any | null;
  isModal?: Boolean;
  locationsViewable: number;
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
        stateName={props.stateName}
        county={props.county}
        setShowModal={setShowModal}
        locationsViewable={props.locationsViewable}
        isHomepage={props.isHomepage}
        locations={props.locations}
        currentCounty={props.currentCounty}
      />
      <Modal open={showModal} onClose={handleCloseModal}>
        <ModalCompare
          stateName={props.stateName}
          county={props.county}
          setShowModal={setShowModal}
          isHomepage={props.isHomepage}
          locations={props.locations}
          currentCounty={props.currentCounty}
        />
      </Modal>
    </Fragment>
  );
};

export default CompareMain;
