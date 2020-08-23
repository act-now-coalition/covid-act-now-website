import React, { Fragment, useEffect } from 'react';
import { createGlobalStyle } from 'styled-components';
import CompareTable from 'components/Compare/CompareTable';
import { ModalHeader } from 'components/Compare/Compare.style';
import CloseIcon from '@material-ui/icons/Close';
import {
  SummaryForCompare,
  MetroFilter,
  GeoScopeFilter,
} from 'common/utils/compare';
import Filters from 'components/Compare/Filters';

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
  isHomepage?: boolean;
  locations: SummaryForCompare[];
  currentCounty?: any;
  handleCloseModal: () => void;
  viewAllCounties?: boolean;
  setCountyTypeToView: React.Dispatch<React.SetStateAction<MetroFilter>>;
  countyTypeToView: MetroFilter;
  setViewAllCounties?: React.Dispatch<React.SetStateAction<boolean>>;
  geoScope?: GeoScopeFilter;
  setGeoScope?: React.Dispatch<React.SetStateAction<GeoScopeFilter>>;
  stateId?: string;
}) => {
  const { handleCloseModal } = props;

  useEffect(() => {
    const handleEsc = (e: any) => {
      if (e.keyCode === 27) {
        handleCloseModal();
      }
    };

    window.addEventListener('keydown', handleEsc);

    return () => {
      window.removeEventListener('keydown', handleEsc);
    };
  }, [handleCloseModal]);

  return (
    <Fragment>
      <BodyScrollLock />
      <ModalHeader isHomepage={props.isHomepage}>
        <Filters
          isHomepage={props.isHomepage}
          countyTypeToView={props.countyTypeToView}
          setCountyTypeToView={props.setCountyTypeToView}
          viewAllCounties={props.viewAllCounties}
          setViewAllCounties={props.setViewAllCounties}
          stateId={props.stateId}
          county={props.county}
          geoScope={props.geoScope}
          setGeoScope={props.setGeoScope}
          isModal
        />
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
        viewAllCounties={props.viewAllCounties}
        countyTypeToView={props.countyTypeToView}
        setCountyTypeToView={props.setCountyTypeToView}
        setViewAllCounties={props.setViewAllCounties}
        geoScope={props.geoScope}
        setGeoScope={props.setGeoScope}
        stateId={props.stateId}
      />
    </Fragment>
  );
};

export default ModalCompare;
