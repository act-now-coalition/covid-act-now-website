import html from 'remark-html';
import remark from 'remark';
import regions from 'common/regions';
import { assert } from 'common/utils';
import { getVaccinationDataByRegion } from './index';
import { getVaccineInfoByFips, RegionPhaseGroup } from './phases';

interface EmailPhaseInfo {
  title: string;
  subtitle: string;
  description: string;
  isMostRecentPhase: boolean;
}

export interface VaccinationEmailAlertData {
  emailSubjectLine: string;
  title: string;
  subtitle: string;
  locationName: string;
  sourceUrl: string;
  sourceName: string;
  eligibilityUrl: string;
  unsubscribeUrl: string;
  vaccinationSignupUrl?: string;
  currentPhases: EmailPhaseInfo[];
}

function markdownToHtml(markdownContent: string): string {
  return remark().use(html).processSync(markdownContent).toString();
}

function formatVaccinationPhaseInfo(
  phaseInfo: RegionPhaseGroup,
  isMostRecentPhase: boolean,
): EmailPhaseInfo {
  const title = phaseInfo.tier
    ? `${phaseInfo.phase}, ${phaseInfo.tier}`
    : phaseInfo.phase;

  return {
    title,
    subtitle: isMostRecentPhase ? 'most recently eligible' : 'eligible',
    description: markdownToHtml(phaseInfo.description),
    isMostRecentPhase,
  };
}

/**
 * Gathers vaccination information from the CMS and formats it to match what we need
 * to pass to the email template in
 * `scripts/vaccination_alerts/vaccination-alert-template.html`
 */
export function getEmailAlertData(
  emailAddress: string,
  fipsCode: string,
): VaccinationEmailAlertData {
  const region = regions.findByFipsCodeStrict(fipsCode);

  const vacinationInfo = getVaccineInfoByFips(fipsCode);
  const vaccinationLinks = getVaccinationDataByRegion(region);

  assert(
    vacinationInfo,
    `Vaccination info for FIPS ${fipsCode} not found in the CMS`,
  );
  assert(
    vaccinationLinks?.eligibilityInfoUrl,
    `Vaccination eligibility info for ${fipsCode} not found in the CMS`,
  );

  const currentPhases = vacinationInfo.phaseGroups
    .filter(phaseInfo => phaseInfo.currentlyEligible)
    .map((phaseInfo, index, allCurrentPhases) => {
      const isLastCurrentPhase = index === allCurrentPhases.length - 1;
      return formatVaccinationPhaseInfo(phaseInfo, isLastCurrentPhase);
    });

  assert(
    currentPhases.length > 0,
    `There are no phases currently eligible for vaccination for ${region.fullName} (${region.fipsCode})`,
  );

  const mostRecentPhase = currentPhases.find(
    phaseInfo => phaseInfo.isMostRecentPhase,
  );

  const title = mostRecentPhase?.title
    ? `${region.fullName} is now in ${mostRecentPhase.title} of vaccination`
    : `${region.fullName} has updated vaccination information`;

  const { eligibilityInfoUrl, vaccinationSignupUrl } = vaccinationLinks;

  // TODO: Add source name to the CMS
  return {
    emailSubjectLine: `Who is currently eligible for vaccination in ${region.fullName}`,
    title,
    subtitle: 'People who are eligible to be vaccinated now include:',
    locationName: region.fullName,
    sourceName: `${region.fullName} Health Department`,
    sourceUrl: eligibilityInfoUrl,
    eligibilityUrl: eligibilityInfoUrl,
    unsubscribeUrl: `https://covidactnow.org/alert_unsubscribe?email=${encodeURI(
      emailAddress,
    )}`,
    vaccinationSignupUrl,
    currentPhases,
  };
}
