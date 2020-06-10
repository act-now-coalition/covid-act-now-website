import { useState, useEffect } from 'react';
import { Projections } from '../models/Projections';
import { REVERSED_STATES, INTERVENTIONS } from '..';
import {
  RegionAggregateDescriptor,
  RegionDescriptor,
} from './RegionDescriptor';
import { Api } from 'api';
import { findCountyByFips } from 'common/locations';

export async function fetchProjections(
  stateId,
  countyInfo = null,
  snapshotUrl = null,
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
export async function fetchAllStateProjections(snapshotUrl = null) {
  const all = await new Api(
    snapshotUrl,
  ).fetchAggregatedSummaryWithTimeseriesMaps(RegionAggregateDescriptor.STATES);
  return all.map(summaryWithTimeseriesMap => {
    // We grab the state from an arbitrary intervention's summary data.
    const stateName =
      summaryWithTimeseriesMap[INTERVENTIONS.LIMITED_ACTION].stateName;
    return new Projections(
      summaryWithTimeseriesMap,
      REVERSED_STATES[stateName],
    );
  });
}

/** Returns an array of `Projections` instances for all counties. */
export async function fetchAllCountyProjections(snapshotUrl = null) {
  const all = await new Api(
    snapshotUrl,
  ).fetchAggregatedSummaryWithTimeseriesMaps(
    RegionAggregateDescriptor.COUNTIES,
  );
  return all.map(summaryWithTimeseriesMap => {
    // We grab the state / fips from an arbitrary intervention's summary data.
    const stateName =
      summaryWithTimeseriesMap[INTERVENTIONS.LIMITED_ACTION].stateName;
    const fips = summaryWithTimeseriesMap[INTERVENTIONS.LIMITED_ACTION].fips;
    return new Projections(
      summaryWithTimeseriesMap,
      REVERSED_STATES[stateName],
      findCountyByFips(fips),
    );
  });
}

export function useProjections(location, county = null) {
  const [projections, setProjections] = useState();

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
  const [lastUpdated, setLastUpdated] = useState(null);
  useEffect(() => {
    new Api().fetchVersionTimestamp().then(timestamp => {
      setLastUpdated(new Date(timestamp));
    });
  }, []);

  return lastUpdated;
}
