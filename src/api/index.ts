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

export const SNAPSHOT_URL = DataUrlJson.data_url;

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

export interface SnapshotVersion {
  timestamp: string;
  'covid-data-public': string;
  'covid-data-model': string;
}

export class Api {
  readonly snapshotUrl: string;
  constructor(dataUrl?: string | null) {
    this.snapshotUrl = dataUrl || SNAPSHOT_URL;
    // trim any trailing /
    this.snapshotUrl = this.snapshotUrl.replace(/\/$/, '');
  }

  /**
   * Fetches the summary+timeseries for every intervention for every region in
   * the specified region aggregate (e.g. all counties or all states).
   */
  async fetchAggregatedSummaryWithTimeseriesMaps(
    regionAggregate: RegionAggregateDescriptor,
  ): Promise<RegionSummaryWithTimeseriesMap[]> {
    // We have to fetch each intervention separately and then merge them per region ID.
    const merged = {} as { [id: string]: RegionSummaryWithTimeseriesMap };

    await Promise.all(
      Object.keys(ApiInterventions).map(async intervention => {
        const apiIntervention = ApiInterventions[intervention];
        let all = await this.fetchApiJson<AggregateSummaryWithTimeseries>(
          `us/${regionAggregate}.${apiIntervention}.timeseries.json`,
        );
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
  async fetchSummaryWithTimeseriesMap(
    region: RegionDescriptor,
  ): Promise<RegionSummaryWithTimeseriesMap> {
    const result = {} as RegionSummaryWithTimeseriesMap;
    await Promise.all(
      Object.keys(ApiInterventions).map(async intervention => {
        result[intervention] = await this.fetchSummaryWithTimeseries(
          region,
          intervention as InterventionKey,
        );
      }),
    );
    return result;
  }

  /** Fetches the summary+timeseries for a region and a single intervention. */
  async fetchSummaryWithTimeseries(
    region: RegionDescriptor,
    intervention: InterventionKey,
  ): Promise<RegionSummaryWithTimeseries | null> {
    console.log(intervention);
    const apiIntervention = ApiInterventions[intervention];
    if (region.isState()) {
      return await this.fetchApiJson<CovidActNowStateTimeseries>(
        `us/states/${region.stateId}.${apiIntervention}.timeseries.json`,
      );
    } else if (region.isCounty()) {
      return await this.fetchApiJson<CovidActNowStateTimeseries>(
        `us/counties/${region.countyFipsId}.${apiIntervention}.timeseries.json`,
      );
    } else {
      fail('Unknown region type: ' + region);
    }
  }

  /** Fetches the ISO Date String at which the API was last updated. */
  async fetchVersionTimestamp(): Promise<string> {
    return await this.fetchApiJson<{ timestamp: string }>('version.json').then(
      data => data!.timestamp,
    );
  }

  /** Fetches the version info for the snapshot. */
  async fetchVersionInfo(): Promise<SnapshotVersion> {
    return await this.fetchApiJson<SnapshotVersion>('version.json').then(
      data => {
        assert(data !== null, 'Failed to fetch version.json');
        return data;
      },
    );
  }

  /**
   * Fetches a URL endpoint and returns the parsed JSON cast to the specified
   * type T, or null if the request fails in any way.
   *
   * TODO: Implement better error-handling.
   */
  private async fetchApiJson<T extends object>(
    endpoint: string,
  ): Promise<T | null> {
    const response = await fetch(`${this.snapshotUrl}/${endpoint}`);
    // TODO(michael): This should really check for 404 only, but S3 currently returns 403s.
    if ((!response.ok && response.status === 404) || response.status === 403) {
      return null;
    }
    return (await response.json()) as T;
  }
}
