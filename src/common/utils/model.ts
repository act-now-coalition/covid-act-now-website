import { useState, useEffect } from 'react';
import { Projections } from '../models/Projections';
import { REVERSED_STATES } from '..';
import {
  RegionAggregateDescriptor,
  RegionDescriptor,
} from './RegionDescriptor';
import { Api } from 'api';
import { findCountyByFips } from 'common/locations';
import moment from 'moment';
import { RegionSummaryWithTimeseries } from 'api/schema/RegionSummaryWithTimeseries';
import { assert } from '.';

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

/** Returns an array of `Projections` instances for all states. */
const cachedStatesProjections: { [key: string]: Promise<Projections[]> } = {};
export function fetchAllStateProjections(snapshotUrl: string | null = null) {
  async function fetch() {
    const all = await new Api(snapshotUrl).fetchAggregatedSummaryWithTimeseries(
      RegionAggregateDescriptor.STATES,
    );
    return all
      .filter(
        summaryWithTimeseries => stateCode(summaryWithTimeseries) !== undefined,
      )
      .map(summaryWithTimeseries => {
        return new Projections(
          summaryWithTimeseries,
          stateCode(summaryWithTimeseries)!,
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
    const all = await new Api(snapshotUrl).fetchAggregatedSummaryWithTimeseries(
      RegionAggregateDescriptor.COUNTIES,
    );
    return all
      .filter(
        summaryWithTimeseries => stateCode(summaryWithTimeseries) !== undefined,
      )
      .map(summaryWithTimeseries => {
        const fips = summaryWithTimeseries.fips;
        return new Projections(
          summaryWithTimeseries,
          stateCode(summaryWithTimeseries)!,
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

// Helper to get the state code from an API RegionSummaryWithTimeseries.
function stateCode(
  summaryWithTimeseries: RegionSummaryWithTimeseries,
): string | undefined {
  const stateName = summaryWithTimeseries.stateName;
  const stateCode = REVERSED_STATES[stateName];
  if (!stateCode) {
    console.warn('Unknown state:', stateName);
  }
  return stateCode;
}
