import last from 'lodash/last';
import partition from 'lodash/partition';
import { Region, County, State, MetroArea, getStateName } from 'common/regions';
import { assert } from 'common/utils';
import {
  getVaccineInfoByFips,
  RegionPhaseGroup,
} from 'cms-content/vaccines/phases';
import { getVaccinationDataByRegion } from 'cms-content/vaccines';

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
  const stateName = getStateName(region);

  const mostRecentPhaseName = mostRecentPhase
    ? getPhaseName(mostRecentPhase)
    : 'unknown phase';

  return {
    mostRecentPhaseName,
    sourceUrl: vaccineLinks.eligibilityInfoUrl,
    sourceName: `${stateName} Department of Health`,
    phasesEligibleNow,
    phasesEligibleLater,
  };
}

export function getPhaseName(phaseInfo: RegionPhaseGroup) {
  const { phase, tier } = phaseInfo;
  return tier ? `Phase ${phase}, Tier ${tier}` : `Phase ${phase}`;
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
