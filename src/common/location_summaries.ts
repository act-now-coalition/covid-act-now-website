import { useState, useEffect } from 'react';
import fetch from 'node-fetch';
import { Level } from 'common/level';
import { Metric } from 'common/metric';
import LocationSummariesJSON from 'assets/data/summaries.json';
import { findStateFipsCode } from 'common/locations';
import { currentSnapshot, getSnapshotOverride } from './utils/snapshots';

export interface MetricSummary {
  value: number | null;
  level: Level;
}

export interface LocationSummary {
  level: Level;
  metrics: {
    [metric in Metric]?: MetricSummary;
  };
}

export type SummariesMap = { [fips: string]: LocationSummary };

export const LocationSummariesByFIPS = LocationSummariesJSON as SummariesMap;

export function getSummaryFromStateCode(
  stateCode: string,
): LocationSummary | null {
  const fips = findStateFipsCode(stateCode);
  return LocationSummariesByFIPS[fips] || null;
}

// Despite name, used for both counties and MSAs in compare
export function getSummaryFromFips(fips: string): LocationSummary | null {
  return LocationSummariesByFIPS[fips] || null;
}

/**
 * A bit hacky, but this tries to fetch the summaries to match a given snapshot.
 */
export async function fetchSummaries(snapshotNumber: number) {
  if (snapshotNumber === currentSnapshot()) {
    // This is the current snapshot; we can use the compiled-in summaries file
    // (this is preferable to loading from develop since unshipped snapshots may
    // not be available.)
    return LocationSummariesByFIPS;
  } else {
    // Try to fetch from github.
    const url = `https://raw.githubusercontent.com/covid-projections/covid-projections/develop/scripts/alert_emails/summaries/${snapshotNumber}.json`;
    const response = await fetch(url);
    const json = await response.json();
    return json as SummariesMap;
  }
}

export function useSummaries(): SummariesMap | null {
  const [summaries, setSummaries] = useState<SummariesMap | null>(null);

  useEffect(() => {
    async function fetch() {
      const snapshot = getSnapshotOverride() || currentSnapshot();
      let summaries;
      try {
        summaries = await fetchSummaries(snapshot);
      } catch {
        console.error(
          `Failed to fetch summaries for snapshot ${snapshot}. Using compiled-in summaries.`,
        );
        summaries = LocationSummariesByFIPS;
      }
      setSummaries(summaries);
    }
    fetch();
  });

  return summaries;
}
