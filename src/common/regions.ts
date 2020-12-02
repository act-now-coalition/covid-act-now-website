import { chain } from 'lodash';
import US_STATE_DATASET from 'components/MapSelectors/datasets/us_states_dataset_01_02_2020.json';

const { state_dataset, state_county_map_dataset } = US_STATE_DATASET;

type FipsCode = string;
type UrlSegment = string;

interface Region {
  name: string;
  urlName: UrlSegment;
  fipsCode: FipsCode;
  population: number;
}

interface State extends Region {
  stateCode: string;
}

interface County extends Region {
  stateFipsCode: string;
  cities: string[];
}

interface MetropolitanArea {
  countyFipsCodes: [FipsCode];
}

const states: State[] = chain(state_dataset)
  .map(stateInfo => ({
    name: stateInfo.state,
    urlName: stateInfo.state_url_name,
    fipsCode: stateInfo.state_fips_code,
    population: stateInfo.population,
    stateCode: stateInfo.state_code,
  }))
  .value();

const stateCodes = states.map(state => state.stateCode);
const stateFips = states.map(state => state.fipsCode);

const counties: County[] = chain(state_county_map_dataset)
  .map(stateData => stateData.county_dataset)
  .flatten()
  .filter(county => stateCodes.includes(county.state_code))
  .filter(county => stateFips.includes(county.state_fips_code))
  .map(county => ({
    name: county.county,
    urlName: county.county_url_name,
    fipsCode: county.full_fips_code,
    population: county.population,
    stateFipsCode: county.state_fips_code,
    cities: county.cities || [],
  }))
  .value();
