import { assert } from '@actnowcoalition/assert';
import DataUrlJson from 'assets/data/data_url.json';

export const SNAPSHOT_URL = DataUrlJson.data_url;

export function snapshotFromUrl(url: string): number {
  assert(url, 'Empty URL provided');
  const match = /(\d+)\/(v2)?\/?$/.exec(url);
  assert(match, `${url} did not match snapshot URL regex.`);
  return parseInt(match[1]);
}

export function snapshotUrl(snapshotNum: string | number) {
  return `https://covidactnow.org/data/snapshot/${snapshotNum}/v2`;
}

export function currentSnapshot(): number {
  return snapshotFromUrl(SNAPSHOT_URL);
}

/**
 * The ?snapshot=xyz override is retired: only the final snapshot is hosted
 * (at covidactnow.org/data), so there is nothing else to switch to.
 */
export function getSnapshotOverride(): number | null {
  return null;
}

/** Checks for ?snapshot=xyz in the querystring and returns the corresponding snapshot URL. */
export function getSnapshotUrlOverride(): string | null {
  const override = getSnapshotOverride();
  return override === null ? null : snapshotUrl(override);
}
