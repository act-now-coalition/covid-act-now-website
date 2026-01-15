import { useState, useEffect } from 'react';
import { Level } from 'common/level';
import { Metric } from 'common/metricEnum';
import LocationSummariesJSON from 'assets/data/summaries.json';
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
  /** vaccinationsCompleted */
  vc: number | null;
}

export type SummariesMap = { [fips: string]: LocationSummary };

export const LocationSummariesByFIPS = LocationSummariesJSON as SummariesMap;

export function getSummaryFromFips(fips: string): LocationSummary | null {
  return LocationSummariesByFIPS[fips] || null;
}

function getSummariesSyncIfPossible(
  snapshotNumber: number,
): SummariesMap | null {
  if (snapshotNumber === currentSnapshot()) {
    // This is the current snapshot; we can use the compiled-in summaries file
    // (this is preferable to loading from develop since unshipped snapshots may
    // not be available.)
    return LocationSummariesByFIPS;
  } else {
    return null;
  }
}

/**
 * A bit hacky, but this tries to fetch the summaries to match a given snapshot.
 */
export async function fetchSummaries(snapshotNumber: number) {
  const syncSummaries = getSummariesSyncIfPossible(snapshotNumber);
  if (syncSummaries) {
    return syncSummaries;
  }
  throw new Error('Historical summaries are no longer available.');
}

export function useSummaries(): SummariesMap | null {
  const snapshot = getSnapshotOverride() || currentSnapshot();
  const [summaries, setSummaries] = useState<SummariesMap | null>(
    getSummariesSyncIfPossible(snapshot),
  );

  useEffect(() => {
    async function fetch() {
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
  }, [snapshot]);

  return summaries;
}
