import React, { useState, Fragment, useRef } from 'react';
import { Modal } from '@material-ui/core';
import CompareTable from 'components/Compare/CompareTable';
import ModalCompare from 'components/Compare/ModalCompare';
import { DivForRef } from 'components/Compare/Compare.style';
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
  const tableRef = useRef<HTMLDivElement>(null);

  const scrollOffset = props.isHomepage ? 75 : 165;
  const scrollTo = (div: null | HTMLDivElement) =>
    div &&
    window.scrollTo({
      left: 0,
      top: div.offsetTop - scrollOffset,
      behavior: 'smooth',
    });

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

  return (
    <Fragment>
      <DivForRef ref={tableRef}>
        <CompareTable
          stateName={props.stateName}
          county={props.county}
          setShowModal={setShowModal}
          locationsViewable={props.locationsViewable}
          isHomepage={props.isHomepage}
          locations={props.locations}
          currentCounty={props.currentCounty}
          isModal={false}
        />
      </DivForRef>
      <Modal open={showModal} onClose={handleCloseModal}>
        <ModalCompare
          stateName={props.stateName}
          county={props.county}
          setShowModal={setShowModal}
          isHomepage={props.isHomepage}
          locations={props.locations}
          currentCounty={props.currentCounty}
          handleCloseModal={handleCloseModal}
        />
      </Modal>
    </Fragment>
  );
};

export default CompareMain;
