/** Helpers for dealing with the State / Counties dataset. */
import US_STATE_DATASET from 'components/MapSelectors/datasets/us_states_dataset_01_02_2020.json';
import { each, sortBy, takeRight } from 'lodash';

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
      ...value.county_dataset
        .filter(county => !county.county.includes('/'))
        .map(county => {
          return { ...county, state: county.state_code };
        }),
    );
  });

  return locations;
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

export function topCountiesByPopulation(limit: number) {
  const allCounties = [];
  const statesData = US_STATE_DATASET.state_county_map_dataset as any;
  for (const state in statesData) {
    const countiesData = statesData[state].county_dataset;
    for (const county of countiesData) {
      if (!county.county.includes('/')) {
        allCounties.push(county);
      }
    }
  }

  return takeRight(
    sortBy(allCounties, c => c.population),
    limit,
  );
}
