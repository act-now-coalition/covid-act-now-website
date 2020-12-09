import { useContext } from 'react';
import { useParams } from 'react-router';
import regions, { Region, RegionContext } from 'common/regions';
import { assert } from 'common/utils';

export const useLocationPageRegion = () => {
  const region = useContext(RegionContext);
  assert(
    region,
    '`useLocationPageRegion` can only be called from components inside LocationPage',
  );
  return region;
};

export const useRegionFromLegacyIds = (
  stateId: string,
  countyId?: string,
  countyFipsId?: string,
) => {
  if (countyFipsId) {
    return regions.findByFipsCode(countyFipsId);
  }
  const state = regions.findStateByUrlParams(stateId);
  const county = countyId
    ? regions.findCountyByUrlParams(stateId, countyId)
    : null;
  return county || state;
};

export const useRegionFromParams = (): Region | null => {
  const { stateId, countyId, countyFipsId } = useParams<{
    stateId?: string;
    countyId?: string;
    countyFipsId: string;
  }>();

  if (countyFipsId) {
    return regions.findByFipsCode(countyFipsId);
  }
  if (!stateId) {
    return null;
  }

  if (countyId) {
    return regions.findCountyByUrlParams(stateId, countyId);
  }
  // This excludes the case where county is a value but we can't find the county,
  // should it still return state?
  return regions.findStateByUrlParams(stateId);
};
