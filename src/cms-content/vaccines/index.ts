import { useState, useEffect } from 'react';
import { Region, RegionType } from 'common/regions';

export interface RegionVaccinationInfo {
  hidden: boolean;
  fips: string;
  locationName: string;
  stateCode: string;
  eligibilityInfoUrl: string;
  vaccinationSignupUrl?: string;
}

export interface RegionTypeVaccinationInfo {
  regions: RegionVaccinationInfo[];
}

const fetchRegionTypeVaccineData = (regionType: RegionType) => {
  if (regionType !== RegionType.STATE) {
    return;
  }
  return fetch(`/cms-content/vaccines/${regionType}.json`).then(
    res => res.json() as Promise<RegionTypeVaccinationInfo>,
  );
};

export const useRegionTypeVaccineData = (regionType: RegionType) => {
  const [data, setData] = useState<RegionVaccinationInfo[]>();
  useEffect(() => {
    fetchRegionTypeVaccineData(regionType)?.then(
      (value: RegionTypeVaccinationInfo) => {
        setData(value.regions);
      },
    );
  }, [regionType]);
  return data;
};

export const useRegionsVaccineData = (
  regionType: RegionType,
  regions: Region[],
) => {
  const [data, setData] = useState<RegionVaccinationInfo[]>();
  const regionTypeData = useRegionTypeVaccineData(regionType);

  // Regions list breaks useEffect compare, stringifying list fixes useEffect comparison.
  // TODO(chris): This is pretty hacky, find a better way that doesn't require
  // making this a string.
  const stringRegions = JSON.stringify(regions);
  useEffect(() => {
    const matching =
      regionTypeData?.filter(item =>
        regions.map(region => region.fipsCode).includes(item.fips),
      ) || [];
    setData(matching);

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [regionTypeData, stringRegions]);

  return data;
};

export const useRegionVaccineData = (region: Region) => {
  const [data, setData] = useState<RegionVaccinationInfo>();
  const regionTypeData = useRegionTypeVaccineData(region.regionType);
  useEffect(() => {
    const matching = regionTypeData?.find(
      item => item.fips === region.fipsCode,
    );
    setData(matching);
  }, [regionTypeData, region]);

  return data;
};
