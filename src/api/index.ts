/**
 * Helpers for fetching API endpoints and returning them using the typed API
 * schema definitions.
 */

import DataUrlJson from 'assets/data/data_url.json';
import {
  CovidActNowStateTimeseries,
  Timeseries as CountyTimeseries,
  Actualstimeseries as CountyActualTimeseries,
  CovidActNowStatesTimeseries,
} from './schema/CovidActNowStatesTimeseries';
import {
  CovidActNowCountyTimeseries,
  Timeseries as StateTimeseries,
  Actualstimeseries as StateActualTimeseries,
  CovidActNowCountiesTimeseries,
} from './schema/CovidActNowCountiesTimeseries';
import { INTERVENTIONS, REVERSED_STATES } from 'common';
import {
  RegionAggregateDescriptor,
  RegionDescriptor,
} from '../common/utils/RegionDescriptor';
import { fail, assert } from 'common/utils';
import fetch from 'node-fetch';

const API_URL = DataUrlJson.data_url.replace(/\/$/, '');

/**
 * Maps values from the INTERVENTIONS enum to the API endpoints.
 */
const ApiInterventions: { [intervention: string]: string } = {
  [INTERVENTIONS.LIMITED_ACTION]: 'NO_INTERVENTION',
  [INTERVENTIONS.PROJECTED]: 'OBSERVED_INTERVENTION',
};

// TODO: We could clean up some code in this file (including this) if
// INTERVENTIONS was a TypeScript enum or string union, and we should ideally
// consolidate these different intervention types.
type InterventionKey = keyof typeof INTERVENTIONS;

/** Represents timeseries for any kind of region. */
export type Timeseries = CountyTimeseries | StateTimeseries;

/** Represents the actuals timeseries for any kind of region */
export type ActualsTimeseries = CountyActualTimeseries | StateActualTimeseries;

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

/** Represents summary+timeseries data for all states or all counties. */
type AggregateSummaryWithTimeseries =
  | CovidActNowStatesTimeseries
  | CovidActNowCountiesTimeseries;

/**
 * Fetches the summary+timeseries for every intervention for every region in
 * the specified region aggregate (e.g. all counties or all states).
 */
export async function fetchAggregatedSummaryWithTimeseriesMaps(
  regionAggregate: RegionAggregateDescriptor,
): Promise<RegionSummaryWithTimeseriesMap[]> {
  // We have to fetch each intervention separately and then merge them per region ID.
  const merged = {} as { [id: string]: RegionSummaryWithTimeseriesMap };

  await Promise.all(
    Object.keys(ApiInterventions).map(async intervention => {
      const apiIntervention = ApiInterventions[intervention];
      let all = await fetchApiJson<AggregateSummaryWithTimeseries>(
        `us/${regionAggregate}.${apiIntervention}.timeseries.json`,
      );
      // TODO(michael): Remove this once we have a new snapshot with Chris's fix.
      if ((all as any)['__root__']) {
        all = (all as any)['__root__'];
      }
      assert(all != null, 'Failed to load timeseries');

      for (const summaryTimeseries of all) {
        let id;
        if (summaryTimeseries.countyName != null) {
          id = summaryTimeseries.fips;
        } else {
          id = REVERSED_STATES[summaryTimeseries.stateName];
        }
        merged[id] = merged[id] || {};
        merged[id][intervention] = summaryTimeseries;
      }
    }),
  );
  return Object.values(merged);
}

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
  const response = await fetch(`${API_URL}/${endpoint}`);
  // TODO(michael): This should really check for 404 only, but S3 currently returns 403s.
  if ((!response.ok && response.status === 404) || response.status === 403) {
    return null;
  }
  return (await response.json()) as T;
}
