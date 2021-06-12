import { useState, useEffect } from 'react';
import { Projections } from '../models/Projections';
import { Api } from 'api';
import { assert, fail } from '.';
import { getSnapshotUrlOverride } from './snapshots';
import regions, { Region, County, RegionType, State } from 'common/regions';
import { RegionSummary } from 'api/schema/RegionSummary';
import { parseDateString } from 'common/utils/time-utils';

export enum APIRegionSubPath {
  COUNTIES = 'counties',
  STATES = 'states',
  CBSAS = 'cbsas',
}

function getSubpathFromRegionType(regionType: RegionType): APIRegionSubPath {
  switch (regionType) {
    case RegionType.COUNTY:
      return APIRegionSubPath.COUNTIES;
    case RegionType.MSA:
      return APIRegionSubPath.CBSAS;
    case RegionType.STATE:
      return APIRegionSubPath.STATES;
    default:
      fail('Unsuported type');
  }
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
const cachedSummariesByRegionType: {
  [key: string]: Promise<RegionSummary[]>;
} = {};
export function fetchSummariesForRegionType(
  regionType: RegionType,
  snapshotUrl: string | null = null,
) {
  snapshotUrl = snapshotUrl || getSnapshotUrlOverride();
  async function fetch() {
    const all = (
      await new Api(snapshotUrl).fetchAggregateRegionSummaries(
        getSubpathFromRegionType(regionType),
      )
    ).filter(summary => regions.findByFipsCode(summary.fips) !== null);
    return all;
  }
  const key = `${snapshotUrl}-${regionType}` || 'null';
  cachedSummariesByRegionType[key] =
    cachedSummariesByRegionType[key] || fetch();
  return cachedSummariesByRegionType[key];
}

/** Returns an array of `Projections` instances for all states. */
const cachedStatesProjections: { [key: string]: Promise<Projections[]> } = {};
export function fetchAllStateProjections(
  snapshotUrl: string | null = null,
  cache: boolean = true,
) {
  snapshotUrl = snapshotUrl || getSnapshotUrlOverride();
  async function fetch() {
    const all = await new Api(snapshotUrl).fetchAggregatedSummaryWithTimeseries(
      APIRegionSubPath.STATES,
    );
    return all
      .filter(summaryWithTimeseries =>
        summaryWithTimeseries?.state
          ? Boolean(regions.findByStateCode(summaryWithTimeseries.state))
          : false,
      )
      .map(summaryWithTimeseries => {
        const region = regions.findByFipsCode(summaryWithTimeseries.fips);
        assert(region, 'Failed to find region ' + summaryWithTimeseries.fips);
        return new Projections(summaryWithTimeseries, region);
      });
  }
  const key = snapshotUrl || 'null';
  const result = cachedStatesProjections[key] || fetch();
  if (cache) {
    cachedStatesProjections[key] = result;
  }
  return result;
}

/** Returns an array of `Projections` instances for all counties. */
const cachedCountiesProjections: { [key: string]: Promise<Projections[]> } = {};
export function fetchAllCountyProjections(
  snapshotUrl: string | null = null,
  queryByState: boolean = true,
  cache: boolean = true,
) {
  if (queryByState) {
    return fetchAllCountyProjectionsByState(cache);
  }

  snapshotUrl = snapshotUrl || getSnapshotUrlOverride();
  async function fetch() {
    const all = await new Api(snapshotUrl).fetchAggregatedSummaryWithTimeseries(
      APIRegionSubPath.COUNTIES,
    );
    return all
      .filter(summaryWithTimeseries => {
        // We don't want to return county projections for counties that we
        // don't have in the regions instance
        const region = regions.findByFipsCode(summaryWithTimeseries.fips);
        return region instanceof County && Boolean(region.state);
      })
      .map(summaryWithTimeseries => {
        const region = regions.findByFipsCodeStrict(summaryWithTimeseries.fips);
        return new Projections(summaryWithTimeseries, region);
      });
  }
  const key = snapshotUrl || 'null';
  const result = cachedCountiesProjections[key] || fetch();
  if (cache) {
    cachedCountiesProjections[key] = result;
  }
  return result;
}

export async function fetchAllCountyProjectionsByState(cache: boolean = true) {
  // Query counties for states individually as the entire counties.timeseries.json is too large
  // to be parsed by node.
  const allProjections = await Promise.all(
    regions.states.map(
      async (state: State) =>
        await fetchCountyProjectionsForState(state, null, cache),
    ),
  );
  return allProjections.flatMap(obj => obj);
}

/** Returns an array of `Projections` instances for all counties in a state. */
const cachedCountiesProjectionsForState: {
  [key: string]: Promise<Projections[]>;
} = {};
export function fetchCountyProjectionsForState(
  state: State,
  snapshotUrl: string | null = null,
  cache: boolean = true,
) {
  snapshotUrl = snapshotUrl || getSnapshotUrlOverride();
  async function fetch() {
    const all = await new Api(
      snapshotUrl,
    ).fetchCountySummariesWithTimeseriesForState(state);
    return all
      .filter(summaryWithTimeseries => {
        // We don't want to return county projections for counties that we
        // don't have in the regions instance
        const region = regions.findByFipsCode(summaryWithTimeseries.fips);
        return region instanceof County && Boolean(region.state);
      })
      .map(summaryWithTimeseries => {
        const region = regions.findByFipsCodeStrict(summaryWithTimeseries.fips);
        return new Projections(summaryWithTimeseries, region);
      });
  }
  const key = `${state.stateCode}-${snapshotUrl}` || 'null';
  const result = cachedCountiesProjectionsForState[key] || fetch();
  if (cache) {
    cachedCountiesProjectionsForState[key] = result;
  }
  return result;
}

/** Returns an array of `Projections` instances for all counties. */
const cachedMetroProjections: { [key: string]: Promise<Projections[]> } = {};
export function fetchAllMetroProjections(
  snapshotUrl: string | null = null,
  cache: boolean = true,
) {
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
  const result = cachedMetroProjections[key] || fetch();
  if (cache) {
    cachedMetroProjections[key] = result;
  }
  return result;
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
      // date formatting, so just use time utils to parse.
      setLastUpdated(parseDateString(version.timestamp));
    });
  }, []);

  return lastUpdated;
}
