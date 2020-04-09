import US_STATE_DATASET from './datasets/us_states_dataset_01_02_2020.json';

export type StateCode = keyof typeof US_STATE_DATASET.state_county_map_dataset;

export type County = {
  county: string;
  county_url_name: string;
  county_fips_code: string;
  state_fips_code: string;
  state_code: StateCode;
  full_fips_code: string;
  cities: string[];
  population: number;
  hasData?: boolean;
};

export type State = {
  state_code: StateCode;
  state: string;
  state_fips_code: string;
  population: number;
};
