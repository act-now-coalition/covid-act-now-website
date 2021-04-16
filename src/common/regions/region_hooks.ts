import { useState, useEffect } from 'react';
import { useParams } from 'react-router';
import regions, { getRegionsDB, RegionDB } from './region_db';
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
