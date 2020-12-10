import { useState, useEffect } from 'react';
import { Projections } from '../models/Projections';
import {
  RegionAggregateDescriptor,
  RegionDescriptor,
} from './RegionDescriptor';
import { Api } from 'api';
import { getStateName } from 'common/locations';
import moment from 'moment';
import { assert } from '.';
import { getSnapshotUrlOverride } from './snapshots';
import regions, { Region, County, State, getStateCode } from 'common/regions';
import { fail } from 'common/utils';

const cachedProjections: { [key: string]: Promise<Projections> } = {};
export function fetchProjections(
  stateId: string,
  countyInfo: any = null,
  snapshotUrl: string | null = null,
) {
  snapshotUrl = snapshotUrl || getSnapshotUrlOverride();
  let regionDescriptor: RegionDescriptor;
  if (countyInfo) {
    regionDescriptor = RegionDescriptor.forCounty(countyInfo.full_fips_code);
  } else {
    regionDescriptor = RegionDescriptor.forState(stateId);
  }

  async function fetch() {
    const summaryWithTimeseries = await new Api(
      snapshotUrl,
    ).fetchSummaryWithTimeseries(regionDescriptor);
    assert(
      summaryWithTimeseries != null,
      'Failed to fetch projections for ' + regionDescriptor,
    );
    const region = regions.findByFipsCode(summaryWithTimeseries.fips);
    assert(region, 'Failed to find region ' + region);
    return new Projections(summaryWithTimeseries, region);
  }

  const key = snapshotUrl + '-' + regionDescriptor.toString();
  cachedProjections[key] = cachedProjections[key] || fetch();
  return cachedProjections[key];
}

export function fetchProjectionsRegion(
  region: Region,
  snapshotUrl: string | null = null,
) {
  snapshotUrl = snapshotUrl || getSnapshotUrlOverride();
  let regionDescriptor: RegionDescriptor;
  if (region instanceof County) {
    regionDescriptor = RegionDescriptor.forCounty(region.fipsCode);
  } else if (region instanceof State) {
    regionDescriptor = RegionDescriptor.forState(region.stateCode);
  } else {
    // CBSAs are not yet supported in the API Fetch. once they are implemented
    // will not need to fail.
    fail('Unknown region type');
  }

  async function fetch() {
    const summaryWithTimeseries = await new Api(
      snapshotUrl,
    ).fetchSummaryWithTimeseries(regionDescriptor);
    assert(
      summaryWithTimeseries != null,
      'Failed to fetch projections for ' + region,
    );

    const stateCode = getStateCode(region);
    if (!stateCode) {
      fail('State code required');
    }

    return new Projections(summaryWithTimeseries, region);
  }

  const key = snapshotUrl + '-' + regionDescriptor.toString();
  cachedProjections[key] = cachedProjections[key] || fetch();
  return cachedProjections[key];
}

/** Returns an array of `Projections` instances for all states. */
const cachedStatesProjections: { [key: string]: Promise<Projections[]> } = {};
export function fetchAllStateProjections(snapshotUrl: string | null = null) {
  snapshotUrl = snapshotUrl || getSnapshotUrlOverride();
  async function fetch() {
    const all = await new Api(snapshotUrl).fetchAggregatedSummaryWithTimeseries(
      RegionAggregateDescriptor.STATES,
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
      RegionAggregateDescriptor.COUNTIES,
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
