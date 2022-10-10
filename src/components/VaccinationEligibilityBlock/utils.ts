import { Region, County, State, MetroArea, getStateName } from 'common/regions';
import { assert } from '@actnowcoalition/assert';
import { getVaccineInfoByFips } from 'cms-content/vaccines/phases';
import { getVaccinationDataByRegion } from 'cms-content/vaccines';

export function getEligibilityInfo(region: Region) {
  const { fipsCode } = region;
  const vaccineInfo = getVaccineInfoByFips(region.fipsCode);
  const vaccineLinks = getVaccinationDataByRegion(region);

  assert(vaccineInfo !== null, `Missing vaccination data for ${fipsCode}`);
  assert(vaccineLinks, `Missing vaccination links for ${fipsCode}`);

  const stateName = getStateName(region);

  return {
    sourceUrl: vaccineLinks.eligibilityInfoUrl,
    sourceName: `${stateName} Department of Health`,
    stateVaccinationUrl: vaccineInfo.stateSignupUrl,
  };
}

export function getRegionState(region: Region) {
  if (region instanceof County) {
    return region.state;
  } else if (region instanceof State) {
    return region;
  } else if (region instanceof MetroArea) {
    return region.isSingleStateMetro ? region.states[0] : null;
  } else {
    return null;
  }
}
