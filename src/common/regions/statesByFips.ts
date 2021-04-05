import mapValues from 'lodash/mapValues';

import statesByFipsJson from 'common/data/regions/states_by_fips.json';
import stateCodesToFipsJson from 'common/data/regions/state_codes_to_fips.json';
import { assert } from 'common/utils';

import { FipsCode, State } from './types';

/**
 * This is a separate file, because the total data is so small it isn't much to add to the bundle
 * and being able to look up states by Fips codes is very handy in many places to avoid bringing
 * the full regions DB into the source code.
 */
export const statesByFips: { [index: string]: State } = mapValues(
  statesByFipsJson,
  (v: any) => {
    assert(v, `StateObject unexpectedly undefined or falsey: ${v}`);
    return State.fromObject(v);
  },
);

export const findStateByFips = (fips: FipsCode): State | null => {
  return statesByFips[fips] ?? null;
};

export const findStateByFipsStrict = (fips: FipsCode): State => {
  const state = findStateByFips(fips);
  assert(state, `State unexpectedly not found for ${fips}`);
  return state;
};

const stateCodesToFips = stateCodesToFipsJson as { [index: string]: FipsCode };

export const findStateByStateCode = (stateCode: string): State | null => {
  const fips = stateCodesToFips[stateCode];
  if (Boolean(fips)) {
    return findStateByFips(fips);
  } else {
    return null;
  }
};

export const findStateByStateCodeStrict = (stateCode: string): State => {
  const state = findStateByStateCode(stateCode);
  assert(state, `State unexpectedly not found for ${stateCode}`);
  return state;
};
export { stateCodesToFips };
