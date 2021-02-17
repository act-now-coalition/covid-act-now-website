import { last, partition } from 'lodash';
import { Region } from 'common/regions';
import {
  getVaccineInfoByFips,
  RegionPhaseGroup,
} from 'cms-content/vaccines/phases';
import { getVaccinationDataByRegion } from 'cms-content/vaccines';
import { assert } from 'common/utils';

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

  return {
    phasesEligibleNow,
    mostRecentPhase,
  };
}
