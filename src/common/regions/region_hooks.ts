import { useParams } from 'common/utils/router';
import regions from './region_db';
import { Region } from './types';

// We are careful to never call `useRegion()` in components that are not
// nested inside `<RegionContext.Provider>` so we cheat and pretend that the
// value is non-nullable

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

  if (fipsCode) {
    return regions.findByFipsCode(fipsCode);
  }
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
