import React, { Fragment } from 'react';
import { createGlobalStyle } from 'styled-components';
import CompareTable from 'components/Compare/CompareTable';
import { ModalHeader } from 'components/Compare/Compare.style';
import CloseIcon from '@material-ui/icons/Close';
import { SummaryForCompare } from 'common/utils/compare';

const BodyScrollLock = createGlobalStyle`
  body {
    height: 100vh;
    overflow: hidden;
  }
`;

const ModalCompare = (props: {
  stateName?: string;
  county: any | null;
  setShowModal: any;
  isHomepage?: Boolean;
  locations: SummaryForCompare[];
  currentCounty?: any;
  handleCloseModal: () => void;
}) => {
  window.addEventListener(
    'keydown',
    function (e) {
      if (e.key === ('Escape' || 'Esc')) {
        props.handleCloseModal();
      }
      e.preventDefault();
    },
    true,
  );

  return (
    <Fragment>
      <BodyScrollLock />
      <ModalHeader isHomepage={props.isHomepage}>
        {props.isHomepage ? 'States' : `${props.stateName} counties`}
        <CloseIcon onClick={() => props.handleCloseModal()} />
      </ModalHeader>
      <CompareTable
        stateName={props.stateName}
        county={props.county}
        setShowModal={props.setShowModal}
        isModal
        isHomepage={props.isHomepage}
        locations={props.locations}
        currentCounty={props.currentCounty}
      />
    </Fragment>
  );
};

export default ModalCompare;
