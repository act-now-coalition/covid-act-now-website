import React from 'react';
import CompareLocationTabs from './CompareLocationTabs';
import {
  HomepageLocationScope,
  homepageLabelMap,
  GeoScopeFilter,
} from 'common/utils/compare';

export default {
  title: 'Location page redesign/Compare Location Tabs',
  component: CompareLocationTabs,
};

const homepageOptions = [
  HomepageLocationScope.COUNTY,
  HomepageLocationScope.MSA,
  HomepageLocationScope.STATE,
];

const countyOptions = [
  GeoScopeFilter.NEARBY,
  GeoScopeFilter.STATE,
  GeoScopeFilter.COUNTRY,
];

export const CompareOnHomePage = () => {
  return (
    <CompareLocationTabs
      options={homepageOptions}
      value={homepageLabelMap[HomepageLocationScope.MSA].plural}
      isCounty={false}
    />
  );
};

export const CompareOnCounty = () => {
  return (
    <CompareLocationTabs
      options={countyOptions}
      value={'VT'}
      isCounty={true}
      stateId={'VT'}
    />
  );
};
