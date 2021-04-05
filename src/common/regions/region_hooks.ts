import { Region } from './types';
import regions from './region_db';

import { useFipsFromParams } from './useFipsFromParams';

export const useRegionFromParams = (): Region | null => {
  const fips = useFipsFromParams();
  if (fips) {
    return regions.findByFipsCode(fips);
  }
  return null;
};
