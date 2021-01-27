// import regions from 'common/regions';

export interface VaccinationLink {
  label: string;
  url: string;
}

// TODO: Get real data for the corresponding location
export function getElegibilityLinksByFipsCode(
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
