import { useState, useEffect } from 'react';
import { Projections } from '../models/Projections';
import { Api } from 'api';
import { getStateName } from 'common/locations';
import moment from 'moment';
import { assert } from '.';
import { getSnapshotUrlOverride } from './snapshots';
import regions, { Region } from 'common/regions';

export enum APIRegionSubPath {
  COUNTIES = 'counties',
  STATES = 'states',
  CBSAS = 'cbsas',
}

const cachedProjections: { [key: string]: Promise<Projections> } = {};

export function fetchProjectionsRegion(
  region: Region,
  snapshotUrl: string | null = null,
) {
  snapshotUrl = snapshotUrl || getSnapshotUrlOverride();
  async function fetch() {
    const summaryWithTimeseries = await new Api(
      snapshotUrl,
    ).fetchSummaryWithTimeseries(region);
    assert(
      summaryWithTimeseries != null,
      'Failed to fetch projections for ' + region,
    );

    return new Projections(summaryWithTimeseries, region);
  }

  const key = snapshotUrl + '-' + region.fipsCode;
  cachedProjections[key] = cachedProjections[key] || fetch();
  return cachedProjections[key];
}

/** Returns an array of `Projections` instances for all states. */
const cachedStatesProjections: { [key: string]: Promise<Projections[]> } = {};
export function fetchAllStateProjections(snapshotUrl: string | null = null) {
  snapshotUrl = snapshotUrl || getSnapshotUrlOverride();
  async function fetch() {
    const all = await new Api(snapshotUrl).fetchAggregatedSummaryWithTimeseries(
      APIRegionSubPath.STATES,
    );
    return all
      .filter(
        summaryWithTimeseries =>
          getStateName(summaryWithTimeseries.state) !== undefined,
      )
      .map(summaryWithTimeseries => {
        const region = regions.findByFipsCode(summaryWithTimeseries.fips);
        assert(region, 'Failed to find region ' + summaryWithTimeseries.fips);
        return new Projections(summaryWithTimeseries, region);
      });
  }
  const key = snapshotUrl || 'null';
  cachedStatesProjections[key] = cachedStatesProjections[key] || fetch();
  return cachedStatesProjections[key];
}

/** Returns an array of `Projections` instances for all counties. */
const cachedCountiesProjections: { [key: string]: Promise<Projections[]> } = {};
export function fetchAllCountyProjections(snapshotUrl: string | null = null) {
  snapshotUrl = snapshotUrl || getSnapshotUrlOverride();
  async function fetch() {
    const all = await new Api(snapshotUrl).fetchAggregatedSummaryWithTimeseries(
      APIRegionSubPath.COUNTIES,
    );
    return all
      .filter(
        summaryWithTimeseries =>
          getStateName(summaryWithTimeseries.state) !== undefined,
      )
      .map(summaryWithTimeseries => {
        const region = regions.findByFipsCode(summaryWithTimeseries.fips);
        assert(region, 'Failed to find region ' + summaryWithTimeseries.fips);
        return new Projections(summaryWithTimeseries, region);
      });
  }
  const key = snapshotUrl || 'null';
  cachedCountiesProjections[key] = cachedCountiesProjections[key] || fetch();
  return cachedCountiesProjections[key];
}

/** Returns an array of `Projections` instances for all counties. */
const cachedMetroProjections: { [key: string]: Promise<Projections[]> } = {};
export function fetchAllMetroProjections(snapshotUrl: string | null = null) {
  snapshotUrl = snapshotUrl || getSnapshotUrlOverride();
  async function fetch() {
    const all = await new Api(snapshotUrl).fetchAggregatedSummaryWithTimeseries(
      APIRegionSubPath.CBSAS,
    );
    return all
      .filter(
        summaryWithTimeseries =>
          // The cbsas endpoint will return all CBSAs, both metro and micro. We want to
          // Only include summaries for metros (those that are included in `regions`).
          regions.findByFipsCode(summaryWithTimeseries.fips) !== null,
      )
      .map(summaryWithTimeseries => {
        const region = regions.findByFipsCode(summaryWithTimeseries.fips);
        assert(region, 'Failed to find region ' + summaryWithTimeseries.fips);
        return new Projections(summaryWithTimeseries, region);
      });
  }
  const key = snapshotUrl || 'null';
  cachedMetroProjections[key] = cachedMetroProjections[key] || fetch();
  return cachedMetroProjections[key];
}

export function useProjectionsFromRegion(region: Region | null) {
  const [projections, setProjections] = useState<Projections>();

  useEffect(() => {
    async function fetchData() {
      if (region) {
        const projections = await fetchProjectionsRegion(region);
        setProjections(projections);
      }
    }

    fetchData();
  }, [region]);

  return projections;
}

export function useModelLastUpdatedDate() {
  const [lastUpdated, setLastUpdated] = useState<Date | null>(null);
  useEffect(() => {
    new Api().fetchVersionInfo().then(version => {
      // NOTE: "new Date(version.timestamp)" on safari fails due to pickiness about the
      // date formatting, so just use moment to parse.
      setLastUpdated(moment.utc(version.timestamp).toDate());
    });
  }, []);

  return lastUpdated;
}
