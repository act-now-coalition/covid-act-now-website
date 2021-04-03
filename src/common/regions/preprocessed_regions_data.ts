import keyBy from 'lodash/keyBy';
import values from 'lodash/values';
import mapValues from 'lodash/mapValues';

import statesByFipsJson from 'common/data/regions/states_by_fips.json';
import countiesByFipsJson from 'common/data/regions/counties_by_fips.json';
import metroAreasByFipsJson from 'common/data/regions/metro_areas_by_fips.json';
import stateCodesToFips from 'common/data/regions/state_codes_to_fips.json';
import stateUrlSegmentsToFips from 'common/data/regions/state_url_segments_to_fips.json';
import countyUrlSegmentsToFips from 'common/data/regions/county_url_segments_to_fips.json';
import metroAreaUrlSegmentsToFips from 'common/data/regions/metro_area_url_segments_to_fips.json';

import { State, County, MetroArea } from './types';

export const statesByFips = mapValues(statesByFipsJson, (v: any) => {
  return State.fromObject(v);
});

export const countiesByFips = mapValues(countiesByFipsJson, (v: any) => {
  return County.fromObject(v, statesByFips);
});

export const metroAreasByFips = mapValues(metroAreasByFipsJson, (v: any) => {
  return MetroArea.fromObject(v, statesByFips, countiesByFips);
});

const customAreas = [
  new State('USA', '', '00001', 331486822, 'USA'),
  new State('Native American Majority Counties', '', '00002', 314704, 'NAMC'),
];

export const customAreasByFips = keyBy(customAreas, metro => metro.fipsCode);

export {
  stateCodesToFips,
  stateUrlSegmentsToFips,
  countyUrlSegmentsToFips,
  metroAreaUrlSegmentsToFips,
};
