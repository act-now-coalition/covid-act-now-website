import { states, counties, metros } from '@actnowcoalition/regions';
import find from 'lodash/find';

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
    const state = find(states.all, { abbreviation: region });
    if (!state) {
      console.warn(`State ${region} not found in regions package.`);
      return { name: region };
    }
    return { name: state.fullName, population: state.population };
  }

  const county = counties.findByRegionId(region);
  const metro = metros.findByRegionId(region);
  if (county) {
    return { name: county.shortName, population: county.population };
  } else if (metro) {
    return { name: metro.shortName, population: metro.population };
  }
  console.warn(`Location ${region} not found in regions package.`);
  return { name: region };
}
