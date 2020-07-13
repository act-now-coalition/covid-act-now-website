import fetch from 'node-fetch';
import { useState, useEffect } from 'react';
import { Projections } from '../models/Projections';
import { REVERSED_STATES, INTERVENTIONS } from '..';
import {
  RegionAggregateDescriptor,
  RegionDescriptor,
} from './RegionDescriptor';
import { Api, SNAPSHOT_URL } from 'api';
import { assert } from 'common/utils';
import { findCountyByFips } from 'common/locations';
import moment from 'moment';

export async function fetchProjections(
  stateId: string,
  countyInfo: any = null,
  snapshotUrl: string | null = null,
) {
  let region;
  if (countyInfo) {
    region = RegionDescriptor.forCounty(countyInfo.full_fips_code);
  } else {
    region = RegionDescriptor.forState(stateId);
  }
  const summaryWithTimeseriesMap = await new Api(
    snapshotUrl,
  ).fetchSummaryWithTimeseriesMap(region);
  return new Projections(summaryWithTimeseriesMap, stateId, countyInfo);
}

/** Returns an array of `Projections` instances for all states. */
export async function fetchAllStateProjections(
  snapshotUrl: string | null = null,
) {
  const all = await new Api(
    snapshotUrl,
  ).fetchAggregatedSummaryWithTimeseriesMaps(RegionAggregateDescriptor.STATES);
  return all.map(summaryWithTimeseriesMap => {
    // We grab the state from the projected intervention's summary data.
    const stateName = summaryWithTimeseriesMap[INTERVENTIONS.PROJECTED]!
      .stateName;

    return new Projections(
      summaryWithTimeseriesMap,
      REVERSED_STATES[stateName],
    );
  });
}

/** Returns an array of `Projections` instances for all counties. */
export async function fetchAllCountyProjections(
  snapshotUrl: string | null = null,
) {
  const all = await new Api(
    snapshotUrl,
  ).fetchAggregatedSummaryWithTimeseriesMaps(
    RegionAggregateDescriptor.COUNTIES,
  );
  return all.map(summaryWithTimeseriesMap => {
    // We grab the state / fips from the projected intervention's summary data.
    const stateName = summaryWithTimeseriesMap[INTERVENTIONS.PROJECTED]!
      .stateName;
    const fips = summaryWithTimeseriesMap[INTERVENTIONS.PROJECTED]!.fips;
    return new Projections(
      summaryWithTimeseriesMap,
      REVERSED_STATES[stateName],
      findCountyByFips(fips),
    );
  });
}

export function useProjections(location: string, county = null) {
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

export async function fetchMasterSnapshotNumber(): Promise<number> {
  const response = await fetch(
    'https://raw.githubusercontent.com/covid-projections/covid-projections/master/src/assets/data/data_url.json',
  );
  const json = await response.json();
  return snapshotFromUrl(json['data_url']);
}

export function snapshotFromUrl(url: string): number {
  assert(url, 'Empty URL provided');
  const match = /(\d+)\/?$/.exec(url);
  assert(match, `${url} did not match snapshot URL regex.`);
  return parseInt(match[1]);
}

export function snapshotUrl(snapshotNum: string | number) {
  return `https://data.covidactnow.org/snapshot/${snapshotNum}`;
}

export function currentSnapshot(): number {
  return snapshotFromUrl(SNAPSHOT_URL);
}
