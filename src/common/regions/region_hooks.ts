import { createContext, useContext } from 'react';
import { useParams } from 'react-router';
import { assert } from 'common/utils';
import regions from './region_db';
import { Region } from './types';

// We are careful to never call `useRegion()` in components that are not
// nested inside `<RegionContext.Provider>` so we cheat and pretend that the
// value is non-nullable
export const RegionContext = createContext<Region>(null as any);

export const useLocationPageRegion = () => {
  const region = useContext(RegionContext);
  assert(
    region,
    '`useLocationPageRegion` can only be called from components inside LocationPage',
  );
  return region;
};

export const useRegionFromParams = (): Region | null => {
  const { stateId, countyId, countyFipsId, metroAreaUrlSegment } = useParams<{
    stateId?: string;
    countyId?: string;
    countyFipsId: string;
    metroAreaUrlSegment?: string;
  }>();

  if (countyFipsId) {
    return regions.findByFipsCode(countyFipsId);
  }

  if (metroAreaUrlSegment) {
    return regions.findMetroAreaByUrlParams(metroAreaUrlSegment);
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
