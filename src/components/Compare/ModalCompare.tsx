import React, { Fragment, useEffect } from 'react';
import CompareTable from 'components/Compare/CompareTable';
import { ModalHeader } from 'components/Compare/Compare.style';
import CloseIcon from '@material-ui/icons/Close';
import {
  SummaryForCompare,
  MetroFilter,
  GeoScopeFilter,
  HomepageLocationScope,
} from 'common/utils/compare';
import Filters from 'components/Compare/Filters';
import { LockBodyScroll } from 'components/Dialog';
import { Region, MetroArea } from 'common/regions';

const ModalCompare = (props: {
  stateName?: string;
  county: any | null;
  setShowModal: any;
  isHomepage?: boolean;
  locations: SummaryForCompare[];
  currentCounty?: any;
  handleCloseModal: () => void;
  setCountyTypeToView: React.Dispatch<React.SetStateAction<MetroFilter>>;
  countyTypeToView: MetroFilter;
  geoScope?: GeoScopeFilter;
  setGeoScope?: React.Dispatch<React.SetStateAction<GeoScopeFilter>>;
  stateId?: string;
  sorter: number;
  setSorter: React.Dispatch<React.SetStateAction<number>>;
  sortDescending: boolean;
  setSortDescending: React.Dispatch<React.SetStateAction<boolean>>;
  sortByPopulation: boolean;
  setSortByPopulation: React.Dispatch<React.SetStateAction<boolean>>;
  sliderValue: GeoScopeFilter;
  setSliderValue: React.Dispatch<React.SetStateAction<GeoScopeFilter>>;
  setShowFaqModal: React.Dispatch<React.SetStateAction<boolean>>;
  createCompareShareId: () => Promise<string>;
  homepageScope: HomepageLocationScope;
  setHomepageScope: React.Dispatch<React.SetStateAction<HomepageLocationScope>>;
  homepageSliderValue: HomepageLocationScope;
  setHomepageSliderValue: React.Dispatch<
    React.SetStateAction<HomepageLocationScope>
  >;
  region?: Region;
  vaccinesFirst?: boolean;
  vulnerabilityFirst?: boolean;
}) => {
  const { handleCloseModal, region } = props;

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

  const disableFilters =
    props.stateId === 'MP' || (region && region instanceof MetroArea);

  return (
    <Fragment>
      <LockBodyScroll />
      <ModalHeader isHomepage={props.isHomepage}>
        {!disableFilters && (
          <Filters
            isHomepage={props.isHomepage}
            countyTypeToView={props.countyTypeToView}
            setCountyTypeToView={props.setCountyTypeToView}
            stateId={props.stateId}
            county={props.county}
            geoScope={props.geoScope}
            setGeoScope={props.setGeoScope}
            isModal
            sliderValue={props.sliderValue}
            setSliderValue={props.setSliderValue}
            homepageScope={props.homepageScope}
            setHomepageScope={props.setHomepageScope}
            homepageSliderValue={props.homepageSliderValue}
            setHomepageSliderValue={props.setHomepageSliderValue}
          />
        )}
        {/* Need explicit div to ensure close icon is on the right of the pop up */}
        <div />
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
        countyTypeToView={props.countyTypeToView}
        setCountyTypeToView={props.setCountyTypeToView}
        geoScope={props.geoScope}
        setGeoScope={props.setGeoScope}
        stateId={props.stateId}
        sorter={props.sorter}
        setSorter={props.setSorter}
        sortDescending={props.sortDescending}
        setSortDescending={props.setSortDescending}
        sortByPopulation={props.sortByPopulation}
        setSortByPopulation={props.setSortByPopulation}
        sliderValue={props.sliderValue}
        setSliderValue={props.setSliderValue}
        setShowFaqModal={props.setShowFaqModal}
        createCompareShareId={props.createCompareShareId}
        homepageScope={props.homepageScope}
        setHomepageScope={props.setHomepageScope}
        homepageSliderValue={props.homepageSliderValue}
        setHomepageSliderValue={props.setHomepageSliderValue}
        region={props.region}
        vaccinesFirst={props.vaccinesFirst}
        vulnerabilityFirst={props.vulnerabilityFirst}
      />
    </Fragment>
  );
};

export default ModalCompare;
