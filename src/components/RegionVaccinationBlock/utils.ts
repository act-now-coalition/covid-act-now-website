import regions, { Region, State, County, MetroArea } from 'common/regions';
import { fail } from 'common/utils';
import { EventCategory, EventAction, trackEvent } from 'components/Analytics';

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
      return [region, metro, region.state];
    } else {
      return [region, region.state];
    }
  }

  if (region instanceof MetroArea) {
    const metro = region as MetroArea;
    return [metro, ...metro.states];
  }

  fail('Unsupported type');
};

// TODO: Get real data for the corresponding location
export function getElegibilityLinksByRegion(region: Region): VaccinationLink[] {
  // const region = regions.findByFipsCode(fipsCode);
  return [
    {
      label: 'Cook County',
      url: 'https://covidactnow.org',
    },
    {
      label: 'Chicago',
      url: 'https://covidactnow.org',
    },
  ];
}

// TODO: Get real data for the corresponding location
export function getVaccinationOptionsLinksByFipsCode(
  fipsCode: string,
): VaccinationLink[] {
  // const region = regions.findByFipsCode(fipsCode);
  return [
    {
      label: 'Cook County',
      url: 'https://covidactnow.org',
    },
    {
      label: 'Chicago',
      url: 'https://covidactnow.org',
    },
  ];
}

export function trackVaccinationLink(label: string) {
  trackEvent(EventCategory.VACCINATION, EventAction.CLICK_LINK, label);
}
