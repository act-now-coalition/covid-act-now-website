/**
 * Helpers for fetching API endpoints and returning them using the typed API
 * schema definitions.
 */

import DataUrlJson from '../assets/data/data_url.json';
import {
  CovidActNowStateTimeseries,
  Timeseries as CountyTimeseries,
} from './schema/CovidActNowStatesTimeseries';
import {
  CovidActNowCountyTimeseries,
  Timeseries as StateTimeseries,
} from './schema/CovidActNowCountiesTimeseries';
import { INTERVENTIONS } from 'enums';
import { RegionDescriptor } from '../utils/RegionDescriptor';
import { fail } from 'utils';
import fetch from 'node-fetch';

const API_URL = DataUrlJson.data_url.replace(/\/$/, '');

/**
 * Maps values from the INTERVENTIONS enum to the API endpoints.
 */
const ApiInterventions: { [intervention: string]: string } = {
  [INTERVENTIONS.LIMITED_ACTION]: 'NO_INTERVENTION',
  [INTERVENTIONS.SOCIAL_DISTANCING]: 'WEAK_INTERVENTION',
  [INTERVENTIONS.SHELTER_IN_PLACE]: 'STRONG_INTERVENTION',
  [INTERVENTIONS.PROJECTED]: 'OBSERVED_INTERVENTION',
};

// TODO: We could clean up some code in this file (including this) if
// INTERVENTIONS was a TypeScript enum or string union, and we should ideally
// consolidate these different intervention types.
type InterventionKey = keyof typeof INTERVENTIONS;

/** Represents timeseries for any kind of region. */
export type Timeseries = CountyTimeseries | StateTimeseries;

/** Represents summary+timeseries for any kind of region. */
export type RegionSummaryWithTimeseries =
  | CovidActNowCountyTimeseries
  | CovidActNowStateTimeseries;

/** A mapping of interventions to the corresponding region summary+timeseries data. */
export type RegionSummaryWithTimeseriesMap = {
  /**
   * We use null to represent data we tried to fetch from the API but which was
   * missing (e.g. the region doesn't exist or doesn't have data for a
   * particular intervention. E.g. not all counties have inference data.)
   */
  [intervention: string]: RegionSummaryWithTimeseries | null;
};

/**
 * Fetches the summary+timeseries for a region for each available intervention
 * and returns them as a map.
 */
export async function fetchSummaryWithTimeseriesMap(
  region: RegionDescriptor,
): Promise<RegionSummaryWithTimeseriesMap> {
  const result = {} as RegionSummaryWithTimeseriesMap;
  await Promise.all(
    Object.keys(ApiInterventions).map(async intervention => {
      result[intervention] = await fetchSummaryWithTimeseries(
        region,
        intervention as InterventionKey,
      );
    }),
  );
  return result;
}

/** Fetches the summary+timeseries for a region and a single intervention. */
export async function fetchSummaryWithTimeseries(
  region: RegionDescriptor,
  intervention: InterventionKey,
): Promise<RegionSummaryWithTimeseries | null> {
  const apiIntervention = ApiInterventions[intervention];
  if (region.isState()) {
    return await fetchApiJson<CovidActNowStateTimeseries>(
      `us/states/${region.stateId}.${apiIntervention}.timeseries.json`,
    );
  } else if (region.isCounty()) {
    return await fetchApiJson<CovidActNowStateTimeseries>(
      `us/counties/${region.countyFipsId}.${apiIntervention}.timeseries.json`,
    );
  } else {
    fail('Unknown region type: ' + region);
  }
}

/**
 * Fetches a URL endpoint and returns the parsed JSON cast to the specified
 * type T, or null if the request fails in any way.
 *
 * TODO: Implement better error-handling.
 */
async function fetchApiJson<T extends object>(
  endpoint: string,
): Promise<T | null> {
  try {
    const response = await fetch(`${API_URL}/${endpoint}`);
    return (await response.json()) as T;
  } catch {
    // TODO: Implement better error handling (only treat 404 as null?)
    return null;
  }
}
