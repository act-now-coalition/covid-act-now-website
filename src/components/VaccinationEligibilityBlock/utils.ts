import { last, partition } from 'lodash';
import { Region, getStateName } from 'common/regions';
import { assert } from 'common/utils';
import {
  getVaccineInfoByFips,
  RegionPhaseGroup,
} from 'cms-content/vaccines/phases';
import { getVaccinationDataByRegion } from 'cms-content/vaccines';

function formatPhase(phaseInfo: RegionPhaseGroup) {
  return {
    title: `Phase ${phaseInfo.phase}, Tier ${phaseInfo.tier}`,
  };
}

export function getEligibilityInfo(region: Region) {
  const { fipsCode } = region;
  const vaccineInfo = getVaccineInfoByFips(region.fipsCode);
  const vaccineLinks = getVaccinationDataByRegion(region);

  assert(vaccineInfo !== null, `Missing vaccination data for ${fipsCode}`);
  assert(vaccineLinks, `Missing vaccination links for ${fipsCode}`);

  const [eligibleNow] = partition(
    vaccineInfo.phaseGroups,
    phaseInfo => phaseInfo.currentlyEligible,
  );

  const phasesEligibleNow = eligibleNow.map(formatPhase);
  const mostRecentPhase = last(phasesEligibleNow);
  const stateName = getStateName(region);

  return {
    phasesEligibleNow,
    mostRecentPhase,
    sourceUrl: vaccineLinks.eligibilityInfoUrl,
    sourceName: `${stateName} Department of Health`,
  };
}
