import { useState, useEffect } from 'react';
import { Projections } from '../models/Projections';
import {
  RegionAggregateDescriptor,
  RegionDescriptor,
} from './RegionDescriptor';
import { Api } from 'api';
import {
  County as CountyLocation,
  findCountyByFips,
  getStateName,
} from 'common/locations';
import moment from 'moment';
import { assert } from '.';
import { getSnapshotUrlOverride } from './snapshots';
import { County, Region, State } from 'common/regions';
import { fail } from 'assert';

const cachedProjections: { [key: string]: Promise<Projections> } = {};

export function fetchProjections(
  stateId: string,
  countyInfo: any = null,
  snapshotUrl: string | null = null,
) {
  snapshotUrl = snapshotUrl || getSnapshotUrlOverride();
  let region: RegionDescriptor;
  if (countyInfo) {
    region = RegionDescriptor.forCounty(countyInfo.full_fips_code);
  } else {
    region = RegionDescriptor.forState(stateId);
  }

  async function fetch() {
    const summaryWithTimeseries = await new Api(
      snapshotUrl,
    ).fetchSummaryWithTimeseries(region);
    assert(
      summaryWithTimeseries != null,
      'Failed to fetch projections for ' + region,
    );
    return new Projections(summaryWithTimeseries, stateId, countyInfo);
  }

  const key = snapshotUrl + '-' + region.toString();
  cachedProjections[key] = cachedProjections[key] || fetch();
  return cachedProjections[key];
}

export function fetchProjectionsRegion(
  region: Region,
  snapshotUrl: string | null = null,
) {
  snapshotUrl = snapshotUrl || getSnapshotUrlOverride();
  let regionDescriptor: RegionDescriptor;
  let stateId: string;
  let county: CountyLocation | undefined;
  if (region instanceof County) {
    regionDescriptor = RegionDescriptor.forCounty(region.fipsCode);
    county = findCountyByFips(region.fipsCode);
    stateId = (region as County).state.stateCode;
  } else if (region instanceof State) {
    regionDescriptor = RegionDescriptor.forState(region.stateCode);
    stateId = (region as State).stateCode;
  } else {
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

    return new Projections(summaryWithTimeseries, stateId, county);
  }

  const key = snapshotUrl + '-' + region.fullName();
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
        return new Projections(
          summaryWithTimeseries,
          summaryWithTimeseries.state,
        );
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
        const fips = summaryWithTimeseries.fips;
        return new Projections(
          summaryWithTimeseries,
          summaryWithTimeseries.state,
          findCountyByFips(fips),
        );
      });
  }
  const key = snapshotUrl || 'null';
  cachedCountiesProjections[key] = cachedCountiesProjections[key] || fetch();
  return cachedCountiesProjections[key];
}

export function useProjections(location: string, county?: CountyLocation) {
  const [projections, setProjections] = useState<Projections>();

  useEffect(() => {
    async function fetchData() {
      const projections = await fetchProjections(location, county);
      setProjections(projections);
    }
    fetchData();
  }, [location, county]);

  return projections;
}

export function useProjectionsFromRegion(region: Region) {
  const [projections, setProjections] = useState<Projections>();

  useEffect(() => {
    async function fetchData() {
      const projections = await fetchProjectionsRegion(region);
      setProjections(projections);
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
