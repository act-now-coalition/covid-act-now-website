import { useState, useEffect } from 'react';
import { getStateCode, Region, RegionType, State } from 'common/regions';

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

export const useRegionVaccineData = (
  regionType: RegionType,
  regions: Region[],
) => {
  const [data, setData] = useState<RegionVaccinationInfo[]>();
  const regionTypeData = useRegionTypeVaccineData(regionType);
  useEffect(() => {
    const matching =
      regionTypeData?.filter(item =>
        regions.map(region => region.fipsCode).includes(item.fips),
      ) || [];
    setData(matching);
  }, [regionTypeData, regions]);

  return data;
};
