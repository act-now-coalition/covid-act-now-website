import _ from 'lodash';
import US_STATE_DATASET from './us_states_dataset_01_02_2020.json';

export default _.chain(US_STATE_DATASET.state_county_map_dataset)
  .flatMap('county_dataset')
  .reject(county => county.county.includes('/'))
  .map(({ full_fips_code, county, state_code, county_url_name }) => [
    full_fips_code,
    {
      county,
      state_code,
      county_url_name,
    },
  ])
  .fromPairs()
  .value();
