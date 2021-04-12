import { useState, useEffect } from 'react';
import { useFipsFromParams } from './useFipsFromParams';
import { getRegionsDB, RegionDB } from './region_db';
import { Region } from './types';

export const useRegionsDB = () => {
  const [regions, setRegions] = useState<RegionDB | null>(null);
  useEffect(() => {
    const load = async () => {
      setRegions(await getRegionsDB());
    };
    load();
  }, []);
  return regions;
};

export const useRegionFromParams = (): Region | null => {
  const fips = useFipsFromParams();
  const regions = useRegionsDB();
  if (fips === null || regions === null) {
    return null;
  }
  return regions.findByFipsCode(fips);
};
