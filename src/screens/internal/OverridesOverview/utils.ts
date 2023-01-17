import find from 'lodash/find';
import {
  gridStringOrNumberComparator,
  GridSortItem,
  GridSortCellParams,
} from '@mui/x-data-grid';

import rawCounties from '../../../common/data/counties_by_fips.json';
import rawStates from '../../../common/data/states_by_fips.json';
import rawMetros from '../../../common/data/metro_areas_by_fips.json';

const counties = rawCounties as {
  [fips: string]: { n: string; p: number; s: string };
};
const states = rawStates as { [fips: string]: { s: string; p: number } };
const metros = rawMetros as { [fips: string]: { n: string; p: number } };

interface RegionOverrideJson {
  include: string;
  metric: string;
  blocked: boolean;
  region: string;
  context: string;
  start_date: string;
  end_date: string;
  disclaimer?: string;
}

export interface RegionOverride {
  scope: string;
  metric: string;
  blocked: string;
  region: string;
  context: string;
  startDate: Date | null;
  endDate: Date | null;
  population?: number;
  disclaimer?: string;
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
  const overrides = jsonArray
    .map(override => explode(override, /**key=*/ 'region'))
    .flat();

  return overrides.map(override => {
    const regionData = regionLookup(override.region);
    return {
      scope: override.include,
      metric: override.metric,
      blocked: String(override.blocked),
      context: override.context,
      startDate: override.start_date ? new Date(override.start_date) : null,
      endDate: override.end_date ? new Date(override.end_date) : null,
      region: regionData.name,
      population: regionData.population,
      disclaimer: override.disclaimer,
    };
  });
}

/**
 * For an object with a key that is an array or a comma-separated string,
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
function explode(obj: Record<string, any>, key: string): Record<string, any> {
  if (typeof obj[key] === 'string' && obj[key].split(',').length === 1) {
    return obj;
  } else if (typeof obj[key] === 'string') {
    obj[key] = obj[key].split(',').map((r: string) => r.trim());
  } else if (!Array.isArray(obj[key])) {
    throw Error(`Key ${key} is not a string or array.`);
  }
  return obj[key].map((value: string) => ({ ...obj, [key]: value }));
}

/**
 * Simple lookup function for region names. States are returned as-is, while county/metro
 *  FIPS codes are converted to their names.
 *
 * @param region Region to lookup
 * @returns Region name and population
 */
function regionLookup(region: string): { name: string; population?: number } {
  if (region.length === 2) {
    const state = find(states, { s: region });
    if (!state) {
      console.warn(`State ${region} not found in database.`);
      return { name: region, population: undefined };
    }
    return { name: state.s, population: state.p };
  }

  const county = counties[region];
  const metro = metros[region];
  if (county) {
    const state = states[county.s];
    return { name: `${county.n}, ${state.s}`, population: county.p };
  } else if (metro) {
    return { name: `${metro.n} metro`, population: metro.p };
  }

  console.warn(`Region ${region} not found in database.`);
  return { name: region, population: undefined };
}

// Comparator to send null/empty values to the bottom of the list when sorting.
// From https://stackoverflow.com/a/74360441/14034347.
export function nullHandlingSortComparator<T>(
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
