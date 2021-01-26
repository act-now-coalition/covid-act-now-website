import regions from 'common/regions';

export interface VaccinationLink {
  label: string;
  url: string;
}

// TODO: Get real data for the corresponding location
export function getElegibilityLinksByFipsCode(fipsCode: string) {
  const region = regions.findByFipsCode(fipsCode);

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
export function getVaccinationOptionsLinksByFipsCode(fipsCode: string) {
  const region = regions.findByFipsCode(fipsCode);

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
