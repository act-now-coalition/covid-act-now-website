import { useFipsFromParams } from './useFipsFromParams';
import regions from './region_db';
import { Region } from './types';

// We are careful to never call `useRegion()` in components that are not
// nested inside `<RegionContext.Provider>` so we cheat and pretend that the
// value is non-nullable

export const useRegionFromParams = (): Region | null => {
  const fips = useFipsFromParams();
  if (fips === null) {
    return null;
  }
  return regions.findByFipsCode(fips);
};
