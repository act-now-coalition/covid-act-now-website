import { useState, useEffect } from 'react';
import { Projections } from '../models/Projections';
import { REVERSED_STATES, INTERVENTIONS } from '..';
import {
  RegionAggregateDescriptor,
  RegionDescriptor,
} from './RegionDescriptor';
import { Api } from 'api';
import { findCountyByFips } from 'common/locations';
import moment from 'moment';

const cachedProjections: { [key: string]: Promise<Projections> } = {};
export function fetchProjections(
  stateId: string,
  countyInfo: any = null,
  snapshotUrl: string | null = null,
) {
  let region: RegionDescriptor;
  if (countyInfo) {
    region = RegionDescriptor.forCounty(countyInfo.full_fips_code);
  } else {
    region = RegionDescriptor.forState(stateId);
  }

  async function fetch() {
    const summaryWithTimeseriesMap = await new Api(
      snapshotUrl,
    ).fetchSummaryWithTimeseriesMap(region);
    return new Projections(summaryWithTimeseriesMap, stateId, countyInfo);
  }

  const key = snapshotUrl + '-' + region.toString();
  cachedProjections[key] = cachedProjections[key] || fetch();
  return cachedProjections[key];
}

/** Returns an array of `Projections` instances for all states. */
const cachedStatesProjections: { [key: string]: Promise<Projections[]> } = {};
export function fetchAllStateProjections(snapshotUrl: string | null = null) {
  async function fetch() {
    const all = await new Api(
      snapshotUrl,
    ).fetchAggregatedSummaryWithTimeseriesMaps(
      RegionAggregateDescriptor.STATES,
    );
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
  const key = snapshotUrl || 'null';
  cachedStatesProjections[key] = cachedStatesProjections[key] || fetch();
  return cachedStatesProjections[key];
}

/** Returns an array of `Projections` instances for all counties. */
const cachedCountiesProjections: { [key: string]: Promise<Projections[]> } = {};
export function fetchAllCountyProjections(snapshotUrl: string | null = null) {
  async function fetch() {
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
  const key = snapshotUrl || 'null';
  cachedCountiesProjections[key] = cachedCountiesProjections[key] || fetch();
  return cachedCountiesProjections[key];
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
