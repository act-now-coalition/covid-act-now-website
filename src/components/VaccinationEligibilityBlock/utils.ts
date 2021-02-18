import { last, partition } from 'lodash';
import { Region } from 'common/regions';
import {
  getVaccineInfoByFips,
  RegionPhaseGroup,
} from 'cms-content/vaccines/phases';
import { getVaccinationDataByRegion } from 'cms-content/vaccines';
import { assert } from 'common/utils';

export function getEligibilityInfo(region: Region) {
  const { fipsCode } = region;
  const vaccineInfo = getVaccineInfoByFips(region.fipsCode);
  const vaccineLinks = getVaccinationDataByRegion(region);

  assert(vaccineInfo !== null, `Missing vaccination data for ${fipsCode}`);
  assert(vaccineLinks, `Missing vaccination links for ${fipsCode}`);

  const [phasesEligibleNow, phasesEligibleLater] = partition(
    vaccineInfo.phaseGroups,
    phaseInfo => phaseInfo.currentlyEligible,
  );

  const mostRecentPhase = last(phasesEligibleNow);

  const mostRecentPhaseName = mostRecentPhase
    ? getPhaseName(mostRecentPhase)
    : 'unknown phase';

  return {
    phasesEligibleNow,
    phasesEligibleLater,
    mostRecentPhaseName,
  };
}

export function getPhaseName(phaseInfo: RegionPhaseGroup) {
  const { phase, tier } = phaseInfo;
  return tier ? `Phase ${phase}, Tier ${tier}` : `Phase ${phase}`;
}
