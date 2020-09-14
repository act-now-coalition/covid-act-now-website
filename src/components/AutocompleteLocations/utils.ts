import { Location } from 'common/locations';

export const isCounty = (location: Location) => location.county !== undefined;

export const isState = (location: Location) => !isCounty(location);

export const belongsToState = (location: Location, stateFips: string) =>
  location.state_fips_code === stateFips;
