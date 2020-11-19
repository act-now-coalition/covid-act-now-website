import * as QueryString from 'query-string';
import fetch from 'node-fetch';
import { assert } from 'common/utils';
import DataUrlJson from 'assets/data/data_url.json';

export const SNAPSHOT_URL = DataUrlJson.data_url;

export async function fetchMasterSnapshotNumber(): Promise<number> {
  const response = await fetch(
    'https://raw.githubusercontent.com/covid-projections/covid-projections/master/src/assets/data/data_url.json',
  );
  const json = await response.json();
  return snapshotFromUrl(json['data_url']);
}

export function snapshotFromUrl(url: string): number {
  assert(url, 'Empty URL provided');
  const match = /(\d+)\/(v2)?\/?$/.exec(url);
  assert(match, `${url} did not match snapshot URL regex.`);
  return parseInt(match[1]);
}

export function snapshotUrl(snapshotNum: string | number) {
  return `https://data.covidactnow.org/snapshot/${snapshotNum}/v2`;
}

export function currentSnapshot(): number {
  return 1317;
  // return snapshotFromUrl(SNAPSHOT_URL);
}

/** Checks for ?snapshot=xyz in the querystring and returns it as a number. */
export function getSnapshotOverride(): number | null {
  if (typeof window !== 'undefined') {
    const search = window?.location?.search;
    if (search !== undefined) {
      const params = QueryString.parse(search, { parseNumbers: true });
      const snapshot = params['snapshot'];
      if (typeof snapshot === 'number' && snapshot > 0) {
        return snapshot;
      }
    }
  }
  return null;
}

/** Checks for ?snapshot=xyz in the querystring and returns the corresponding snapshot URL. */
export function getSnapshotUrlOverride(): string | null {
  const override = getSnapshotOverride();
  return override === null ? null : snapshotUrl(override);
}
