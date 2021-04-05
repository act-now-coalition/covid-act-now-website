import { useParams } from 'react-router';
import { FipsCode, Region } from './types';
import usePromise from 'common/hooks/usePromise';
import { importLocationPageProps } from 'common/data';
import { deserializeRegion } from './deserializeRegion';

import {
  stateCodesToFips,
  stateUrlSegmentsToFips,
  countyUrlSegmentsToFips,
  metroAreaUrlSegmentsToFips,
} from './urlSegmentsToFips';

export function findStateByUrlParams(stateUrlSegment: string): FipsCode | null {
  const fips = stateUrlSegmentsToFips[stateUrlSegment] ?? null;

  if (Boolean(fips)) {
    return fips;
  } else {
    return stateCodesToFips[stateUrlSegment] ?? null;
  }
}

export function findCountyByUrlParams(
  stateUrlSegment: string,
  countyUrlSegment: string,
): FipsCode | null {
  // must match key in prepare-regions-data.ts, which generates this mapping
  const key = `${stateUrlSegment}-${countyUrlSegment}`;

  const fips = countyUrlSegmentsToFips[key];
  return fips ?? null;
}

export function findMetroAreaByUrlParams(
  metroAreaUrlSegment: string,
): FipsCode | null {
  const fips = metroAreaUrlSegmentsToFips[metroAreaUrlSegment];
  return fips ?? null;
}

export const useLocationPageProps = (fips: string | null): any => {
  return usePromise(importLocationPageProps(fips));
};

export const useRegionFromParams = (): Region | null => {
  const {
    stateId,
    countyId,
    countyFipsId,
    metroAreaUrlSegment,
    fipsCode,
  } = useParams<{
    stateId?: string;
    countyId?: string;
    countyFipsId: string;
    metroAreaUrlSegment?: string;
    fipsCode?: string;
  }>();

  let fips: string | null = null;
  if (fipsCode) {
    fips = fipsCode;
  } else if (countyFipsId) {
    fips = countyFipsId;
  } else if (metroAreaUrlSegment) {
    fips = findMetroAreaByUrlParams(metroAreaUrlSegment);
  } else if (!stateId) {
    fips = null;
  } else if (countyId) {
    fips = findCountyByUrlParams(stateId, countyId);
  } else {
    // This excludes the case where county is a value but we can't find the county,
    // should it still return state?
    fips = findStateByUrlParams(stateId);
  }

  const props = useLocationPageProps(fips); // import(`common/data/fips/${fips}.json`);
  if (props.region) {
    return deserializeRegion(props.region);
  }
  return null;
};
