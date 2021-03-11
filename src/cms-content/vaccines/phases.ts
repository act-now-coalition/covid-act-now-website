import { assert } from 'common/utils';
import { keyBy, groupBy, map } from 'lodash';
import stateVaccinationInfo from './state-vaccine-phases.json';

export interface RegionPhaseGroup {
  startDate?: string;
  updatedAt: string;
  phase: string;
  tier?: string | null;
  currentlyEligible: boolean;
  description: string; // Markdown
  expandedDefinitionUrl?: string;
}

export interface RegionVaccinePhaseInfo {
  emailAlertVersion: number;
  eligibilityInfoUrl: string;
  vaccinationSignupUrl: string;
  locationName: string;
  fips: string;
  notes?: string | null;
  phaseGroups: RegionPhaseGroup[];
}

export const stateVaccinationPhases: RegionVaccinePhaseInfo[] = stateVaccinationInfo.regions.map(
  ({ emailAlertVersion, ...otherProps }) => ({
    emailAlertVersion: parseInt(emailAlertVersion, 10),
    ...otherProps,
  }),
);

const vaccinationPhasesMap = keyBy(
  stateVaccinationPhases,
  stateInfo => stateInfo.fips,
);

export function getVaccineInfoByFips(
  fipsCode: string,
): RegionVaccinePhaseInfo | null {
  return vaccinationPhasesMap[fipsCode] || null;
}

export function verifyOneItemPerState() {
  const groupedByFips = groupBy(
    stateVaccinationInfo.regions,
    info => info.fips,
  );
  map(groupedByFips, infoList => {
    assert(
      infoList.length === 1,
      `${infoList[0].fips} (${infoList[0].locationName}) is repeated in state-vaccine-phases.json`,
    );
  });
}
