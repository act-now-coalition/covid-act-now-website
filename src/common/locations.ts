/** Helpers for dealing with the State / Counties dataset. */
import US_STATE_DATASET from 'components/MapSelectors/datasets/us_states_dataset_01_02_2020.json';
import { each, uniqBy } from 'lodash';

// TODO(michael): Add types, move more common code here.

export function getLocationNames() {
  const locations = US_STATE_DATASET.state_dataset.map(state => {
    return {
      ...state,
      full_fips_code: state.state_fips_code,
    };
  });

  each(US_STATE_DATASET.state_county_map_dataset, (value, key) => {
    locations.push(
      ...value.county_dataset.map(county => {
        return { ...county, state: county.state_code };
      }),
    );
  });

  // Currently check for the unique fips so there aren't duplicates, but maybe
  // match the way that the homepage gets unique values
  return uniqBy(locations, 'full_fips_code');
}

export function findCountyByFips(fips: string) {
  // NYC HACK.
  if (['36047', '36061', '36005', '36081', '36085'].includes(fips)) {
    fips = '36061';
  }

  const statesData = US_STATE_DATASET.state_county_map_dataset as any;
  for (const state in statesData) {
    const countiesData = statesData[state].county_dataset;
    for (const county of countiesData) {
      if (String(county.full_fips_code) === String(fips)) {
        return county;
      }
    }
  }
  return undefined;
}
