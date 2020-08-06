import React, { Fragment } from 'react';
import CompareTable from 'components/Compare/CompareTable';
import { ModalHeader } from 'components/Compare/Compare.style';
import CloseIcon from '@material-ui/icons/Close';
import { SummaryForCompare } from 'common/utils/compare';

//TODO(chelsi) - remove ? from stateName and stateId
const ModalCompare = (props: {
  stateId: string;
  stateName?: string;
  county: any | null;
  setShowModal: any;
  isLocationPage?: Boolean;
  isHomepage?: Boolean;
  locations: SummaryForCompare[];
  currentCounty?: any;
}) => {
  return (
    <Fragment>
      <ModalHeader>
        {props.isHomepage ? 'States' : `${props.stateName} counties`}
        <CloseIcon onClick={() => props.setShowModal(false)} />
      </ModalHeader>
      <CompareTable
        stateId={props.stateId}
        stateName={props.stateName}
        county={props.county}
        setShowModal={props.setShowModal}
        isModal
        isLocationPage={props.isLocationPage}
        isHomepage={props.isHomepage}
        locations={props.locations}
        currentCounty={props.currentCounty}
      />
    </Fragment>
  );
};

export default ModalCompare;
