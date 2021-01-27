import regions, { Region, State, County, MetroArea } from 'common/regions';
import { fail } from 'common/utils';
import { EventCategory, EventAction, trackEvent } from 'components/Analytics';
import { RegionVaccinationInfo } from 'cms-content/vaccines';

export interface VaccinationLink {
  label: string;
  url: string;
}

/**
 * Get regions to show
 * @param region
 */
export const getVaccinationRegions = (region: Region): Region[] => {
  if (region instanceof State) {
    return [region];
  }

  if (region instanceof County) {
    const county = region as County;
    const metro = regions.metroAreas.find(metro =>
      metro.counties.map(county => county.fipsCode).includes(county.fipsCode),
    );
    if (metro) {
      return [county, metro, region.state];
    } else {
      return [county, region.state];
    }
  }

  if (region instanceof MetroArea) {
    const metro = region as MetroArea;
    return [metro, ...metro.states];
  }

  fail('Unsupported type');
};

export function trackVaccinationLink(label: string) {
  trackEvent(EventCategory.VACCINATION, EventAction.CLICK_LINK, label);
}

export function getEligibilityLinks(
  vaccinationDataList: RegionVaccinationInfo[],
): VaccinationLink[] {
  return vaccinationDataList.map(data => ({
    label: data.locationName,
    url: data.eligibilityInfoUrl,
  }));
}

export function getVaccinationOptionLinks(
  vaccinationDataList: RegionVaccinationInfo[],
): VaccinationLink[] {
  return vaccinationDataList.map(data => ({
    label: data.locationName,
    url: data.vaccinationSignupUrl || '',
  }));
}
