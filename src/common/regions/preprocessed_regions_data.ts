import keyBy from 'lodash/keyBy';
import values from 'lodash/values';
import mapValues from 'lodash/mapValues';

import statesByFipsJson from 'common/data/states_by_fips.json';
import countiesByFipsJson from 'common/data/counties_by_fips.json';
import metroAreasByFipsJson from 'common/data/metro_areas_by_fips.json';

import {
  State,
  StateObject,
  County,
  CountyObject,
  MetroArea,
  MetroAreaObject,
} from './types';

export const statesByFips: { [fips: string]: State } = mapValues(
  statesByFipsJson,
  State.fromObject,
);
/*(v: StateObject): State => {
    return State.fromObject(v);
  },
);
*/
export const countiesByFips: { [fips: string]: County } = mapValues(
  countiesByFipsJson,
  (v: CountyObject): County => {
    return County.fromObject(v, statesByFips);
  },
);

export const metroAreasByFips: { [fips: string]: MetroArea } = mapValues(
  metroAreasByFipsJson,
  (v: MetroAreaObject): MetroArea => {
    return MetroArea.fromObject(v, statesByFips, countiesByFips);
  },
);

export const statesByStateCode = keyBy(
  values(statesByFips),
  state => state.stateCode,
);

const customAreas = [
  new State('USA', '', '00001', 331486822, 'USA'),
  new State('Native American Majority Counties', '', '00002', 314704, 'NAMC'),
];

export const customAreasByFips = keyBy(customAreas, metro => metro.fipsCode);
