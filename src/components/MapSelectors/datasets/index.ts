import COUNTY_ZIPCODE_MAP from 'components/MapSelectors/datasets/county-zipcode.json';

export interface CountyToZipMap {
  [fips: string]: string[];
}

const countyFipsToZips = COUNTY_ZIPCODE_MAP as CountyToZipMap;

export default countyFipsToZips;
