import keyBy from 'lodash/keyBy';
import mapValues from 'lodash/mapValues';

import countiesByFipsJson from 'common/data/regions/counties_by_fips.json';
import metroAreasByFipsJson from 'common/data/regions/metro_areas_by_fips.json';

import { State } from './types';
import { County } from './County';
import { MetroArea } from './MetroArea';

export const countiesByFips = mapValues(countiesByFipsJson, (v: any) => {
  return County.fromObject(v);
});

export const metroAreasByFips = mapValues(metroAreasByFipsJson, (v: any) => {
  return MetroArea.fromObject(v);
});

const customAreas = [
  new State('USA', '', '00001', 331486822, 'USA'),
  new State('Native American Majority Counties', '', '00002', 314704, 'NAMC'),
];

export const customAreasByFips = keyBy(customAreas, metro => metro.fipsCode);
