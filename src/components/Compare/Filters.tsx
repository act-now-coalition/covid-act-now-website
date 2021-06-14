import React, { Fragment } from 'react';
import {
  GeoScopeFilter,
  trackCompareEvent,
  HomepageLocationScope,
  labelToFilterMap,
  homepageLabelToFilterMap,
  homepageLabelMap,
  homepageScopeToValueMap,
  scopeToValueMap,
} from 'common/utils/compare';
import { Container } from 'components/Compare/Filters.style';
import { EventAction } from 'components/Analytics';
import CompareLocationTabs from 'components/NewLocationPage/CompareLocationTabs/CompareLocationTabs';

const Filters = (props: {
  isHomepage?: boolean;
  stateId?: string;
  isCounty: boolean;
  geoScope: GeoScopeFilter;
  setGeoScope: React.Dispatch<React.SetStateAction<GeoScopeFilter>>;
  isModal: boolean;
  sliderValue: GeoScopeFilter;
  homepageScope: HomepageLocationScope;
  setHomepageScope: React.Dispatch<React.SetStateAction<HomepageLocationScope>>;
  homepageSliderValue: HomepageLocationScope;
}) => {
  const { setHomepageScope } = props;

  const homepageFilterLabels = [
    homepageLabelMap[HomepageLocationScope.COUNTY].plural,
    homepageLabelMap[HomepageLocationScope.MSA].plural,
    homepageLabelMap[HomepageLocationScope.STATE].plural,
  ];

  const locationPageFilterLabels = ['Nearby', `${props.stateId}`, 'USA'];

  const handleLocationPageSelectedOption = (
    event: React.MouseEvent<HTMLElement>,
    value: string,
  ) => {
    if (props.setGeoScope && value != null) {
      props.setGeoScope(labelToFilterMap(value));
      trackCompareEvent(
        EventAction.SELECT,
        `GeoScope: ${GeoScopeFilter[labelToFilterMap(value)]}`,
      );
    }
  };

  const handleHomePageSelectedOption = (
    event: React.MouseEvent<HTMLElement>,
    value: string,
  ) => {
    if (setHomepageScope && value != null) {
      setHomepageScope(homepageLabelToFilterMap[value]);
      trackCompareEvent(
        EventAction.SELECT,
        `GeoScope: ${HomepageLocationScope[homepageLabelToFilterMap[value]]}`,
      );
    }
  };

  return (
    <Fragment>
      <Container $isModal={props.isModal} $isHomepage={props.isHomepage}>
        {props.isHomepage && (
          <CompareLocationTabs
            locationLevels={homepageFilterLabels}
            onChange={handleHomePageSelectedOption}
            selectedOption={homepageScopeToValueMap[props.homepageScope]}
          />
        )}
        {props.isCounty && (
          <CompareLocationTabs
            locationLevels={locationPageFilterLabels}
            onChange={handleLocationPageSelectedOption}
            selectedOption={scopeToValueMap(props.geoScope, props.stateId)}
          />
        )}
      </Container>
    </Fragment>
  );
};

export default Filters;
