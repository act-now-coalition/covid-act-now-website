import {
  gridStringOrNumberComparator,
  GridSortItem,
  GridSortCellParams,
} from '@mui/x-data-grid';

import rawCounties from '../../../common/data/counties_by_fips.json';
import rawStates from '../../../common/data/states_by_fips.json';

const counties = rawCounties as any;
const states = rawStates as any;

interface RegionOverrideJson {
  include: string;
  metric: string;
  blocked: boolean;
  region: string;
  context: string;
  start_date: string;
  end_date: string;
}

export interface RegionOverride {
  scope: string;
  metric: string;
  blocked: boolean;
  region: string;
  context: string;
  startDate: Date | null;
  endDate: Date | null;
  population: number;
}

/**
 * Parses overrides from JSON format to the format used by the overrides table.
 *
 * @param jsonArray Array of overrides in JSON format
 * @returns Parsed overrides
 */
export function parseOverrides(
  jsonArray: RegionOverrideJson[],
): RegionOverride[] {
  // TODO: should condense these into a single map
  const overrides = jsonArray.map(override => ({
    scope: override.include,
    metric: override.metric,
    blocked: override.blocked,
    region: override.region.split(','),
    context: override.context,
    startDate: override.start_date ? new Date(override.start_date) : null,
    endDate: override.end_date ? new Date(override.end_date) : null,
  }));

  const splitOverrides = overrides
    .map(override => explode(override, /**key=*/ 'region'))
    .flat();

  return splitOverrides.map(override => {
    const regionData = regionLookup(override.region);
    return {
      ...override,
      region: regionData.name,
      population: regionData.population,
    };
  });
}

/**
 * For an object with a key that is an array,
 * explode the object into an array of objects with the key set to each value in the array.
 *
 * If the key is a string, return the object as is.
 *
 * Example:
 * `explode({ a: 1, b: [2, 3] }, 'b') => [{ a: 1, b: 2 }, { a: 1, b: 3 }]`
 *
 * @param obj object to explode
 * @param key key to explode on
 * @returns
 */
function explode<T extends Record<string, any>>(obj: T, key: string) {
  if (obj[key] === undefined) {
    throw Error(`Key ${key} not found in object.`);
  }
  if (typeof obj[key] === 'string') {
    return obj;
  }
  return obj[key].map((val: string) => ({ ...obj, [key]: val }));
}

/**
 * Simple lookup function for region names. States are returned as-is, while county FIPS
 * codes are converted to county names.
 *
 * @param region Region to lookup
 */
function regionLookup(region: string): { name: string; population: number } {
  if (region.length === 2) {
    const state = states[region];
    if (!state) {
      console.warn(`State ${region} not found.`);
      return { name: region, population: -1 };
    }
    return { name: state.s, population: state.p };
  }
  console.log(region, counties[region]);
  const county = counties[region];
  if (!county) {
    console.warn(`County ${region} not found.`);
    return { name: region, population: -1 };
  }
  const state = states[county.s];
  return { name: `${county.n}, ${state.s}`, population: county.p };
}

// Comparator to send null/empty values to the bottom of the list when sorting.
// From https://stackoverflow.com/a/74360441/14034347.
export function nullHandlingSortComparator<T = any>(
  v1: T,
  v2: T,
  cellParams1: GridSortCellParams<T>,
  cellParams2: GridSortCellParams<T>,
): number {
  if (v1 === null || v2 === null) {
    if (v1 === v2) return 0;
    else {
      const sortModel = cellParams1.api.getSortModel();
      const sortColumn = sortModel.find(
        (sm: GridSortItem) => sm.field === cellParams1.field,
      );
      if (sortColumn && sortColumn.sort === 'desc') {
        if (v1 === null) return -1;
        else return 1;
      } else {
        if (v1 === null) return 1;
        else return -1;
      }
    }
  } else {
    return gridStringOrNumberComparator(v1, v2, cellParams1, cellParams2);
  }
}
