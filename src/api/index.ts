/**
 * Helpers for fetching API endpoints and returning them using the typed API
 * schema definitions.
 */

import DataUrlJson from '../assets/data/data_url.json';
import { CovidActNowStateTimeseries } from './schema/CovidActNowStatesTimeseries';
import { CovidActNowCountyTimeseries } from './schema/CovidActNowCountiesTimeseries';
import { assertStateId, assertCountyId as assertCountyFipsId } from 'utils';
import { INTERVENTIONS } from 'enums';

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

/** A mapping of interventions to the corresponding state timeseries data. */
export type StateTimeseriesMap = {
  [intervention: string]: CovidActNowStateTimeseries | null;
};

/**
 * A mapping of interventions to the corresponding county timeseries data.
 */
export type CountyTimeseriesMap = {
  [intervention: string]: CovidActNowCountyTimeseries | null;
};

/**
 * Fetches the state timeseries for each available intervention and returns it
 * as a map.
 */
export async function fetchStateTimeseriesMap(
  stateId: string,
): Promise<StateTimeseriesMap> {
  const result = {} as StateTimeseriesMap;
  await Promise.all(
    Object.keys(ApiInterventions).map(async intervention => {
      result[intervention] = await fetchStateTimeseries(
        stateId,
        intervention as InterventionKey,
      );
    }),
  );
  return result;
}

/** Fetches the state timeseries for a single intervention. */
export async function fetchStateTimeseries(
  stateId: string,
  intervention: InterventionKey,
): Promise<CovidActNowStateTimeseries | null> {
  stateId = stateId.toUpperCase();
  assertStateId(stateId);
  const apiIntervention = ApiInterventions[intervention];
  return await fetchApiJson<CovidActNowStateTimeseries>(
    `us/states/${stateId}.${apiIntervention}.timeseries.json`,
  );
}

/**
 * Fetches the county timeseries for each available intervention and returns it
 * as a map.
 *
 * NOTE: Counties don't always support the projected/observed intervention, so
 * it can be null.
 */
export async function fetchCountyTimeseriesMap(
  countyFipsId: string,
): Promise<CountyTimeseriesMap | null> {
  const result = {} as CountyTimeseriesMap;
  await Promise.all(
    Object.keys(ApiInterventions).map(async intervention => {
      result[intervention] = await fetchCountyTimeseries(
        countyFipsId,
        intervention as InterventionKey,
      );
    }),
  );
  return result;
}

/** Fetches the county timeseries for a single intervention. */
export async function fetchCountyTimeseries(
  countyFipsId: string,
  intervention: InterventionKey,
): Promise<CovidActNowCountyTimeseries | null> {
  assertCountyFipsId(countyFipsId);
  const apiIntervention = ApiInterventions[intervention];
  return await fetchApiJson<CovidActNowCountyTimeseries>(
    `us/counties/${countyFipsId}.${apiIntervention}.timeseries.json`,
  );
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
    return null;
  }
}
