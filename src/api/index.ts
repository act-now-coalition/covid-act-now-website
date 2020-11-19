/**
 * Helpers for fetching API endpoints and returning them using the typed API
 * schema definitions.
 */

import DataUrlJson from 'assets/data/data_url.json';
import {
  RegionSummaryWithTimeseries,
  Actualstimeseries,
} from './schema/RegionSummaryWithTimeseries';
import { AggregateRegionSummaryWithTimeseries } from './schema/AggregateRegionSummaryWithTimeseries';
import {
  RegionAggregateDescriptor,
  RegionDescriptor,
} from '../common/utils/RegionDescriptor';
import { fail, assert } from 'common/utils';
import fetch from 'node-fetch';

export const SNAPSHOT_URL = DataUrlJson.data_url;

/** Represents the actuals timeseries for any kind of region */
export type ActualsTimeseries = Actualstimeseries;

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
   * Fetches the summary+timeseries for every region in the specified region
   * aggregate (e.g. all counties or all states).
   */
  async fetchAggregatedSummaryWithTimeseries(
    regionAggregate: RegionAggregateDescriptor,
  ): Promise<RegionSummaryWithTimeseries[]> {
    const all = await this.fetchApiJson<AggregateRegionSummaryWithTimeseries>(
      `${regionAggregate}.timeseries.json`,
    );
    assert(all != null, 'Failed to load timeseries');
    return all;
  }

  /**
   * Fetches the summary+timeseries for a region. Returns null if not found.
   */
  async fetchSummaryWithTimeseries(
    region: RegionDescriptor,
  ): Promise<RegionSummaryWithTimeseries | null> {
    if (region.isState()) {
      return await this.fetchApiJson<RegionSummaryWithTimeseries>(
        `state/${region.stateId}.timeseries.json`,
      );
    } else if (region.isCounty()) {
      return await this.fetchApiJson<RegionSummaryWithTimeseries>(
        `county/${region.countyFipsId}.timeseries.json`,
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
    const apiKey = 'ee00e499609045e4bb41eb7f3271b6f9';
    const response = await fetch(
      `${this.snapshotUrl}/${endpoint}?apiKey=${apiKey}`,
    );
    // TODO(michael): This should really check for 404 only, but S3 currently returns 403s.
    if ((!response.ok && response.status === 404) || response.status === 403) {
      return null;
    }
    return (await response.json()) as T;
  }
}
