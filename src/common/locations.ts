/** Helpers for dealing with the State / Counties dataset. */
import US_STATE_DATASET from 'components/MapSelectors/datasets/us_states_dataset_01_02_2020.json';
import { has } from 'lodash';
import countyAdjacencyMsa from './data/county_adjacency_msa.json';

interface AdjacencyData {
  [fips: string]: {
    adjacent_counties: string[];
    msa_code?: string;
  };
}

const ADJACENT_COUNTIES: AdjacencyData = countyAdjacencyMsa.counties;

/** Aggregations supported by the Explore chart. */
export const AGGREGATED_LOCATIONS: Location[] = [
  {
    state_fips_code: '00',
    full_fips_code: '00001',
    state: 'USA',
    population: 331486822,
    state_code: 'USA',
  },
  {
    state_fips_code: '00',
    full_fips_code: '00002',
    state: 'Native American Majority Counties',
    population: 314704,
    state_code: 'NAMC',
  },
  {
    state_fips_code: '00',
    full_fips_code: '00003',
    state: 'New England Division',
    population: 14845063,
    state_code: 'NE-D',
  },
  {
    state_fips_code: '00',
    full_fips_code: '00004',
    state: 'Middle Atlantic Division',
    population: 41137740,
    state_code: 'MA-D',
  },
  {
    state_fips_code: '00',
    full_fips_code: '00005',
    state: 'East North Central Division',
    population: 46902431,
    state_code: 'ENC-D',
  },
  {
    state_fips_code: '00',
    full_fips_code: '00006',
    state: 'West North Central Division',
    population: 21426573,
    state_code: 'WNC-D',
  },
  {
    state_fips_code: '00',
    full_fips_code: '00007',
    state: 'South Atlantic Division',
    population: 65784817,
    state_code: 'SA-D',
  },
  {
    state_fips_code: '00',
    full_fips_code: '00008',
    state: 'East South Central Division',
    population: 19176181,
    state_code: 'ESC-D',
  },
  {
    state_fips_code: '00',
    full_fips_code: '00009',
    state: 'West South Central Division',
    population: 40619450,
    state_code: 'WSC-D',
  },
  {
    state_fips_code: '00',
    full_fips_code: '00010',
    state: 'Mountain Division',
    population: 24854998,
    state_code: 'M-D',
  },
  {
    state_fips_code: '00',
    full_fips_code: '00011',
    state: 'Pacific Division',
    population: 53492270,
    state_code: 'P-D',
  },
  {
    state_fips_code: '00',
    full_fips_code: '00012',
    state: 'Northeast Region',
    population: 55982803,
    state_code: 'N-R',
  },
  {
    state_fips_code: '00',
    full_fips_code: '00013',
    state: 'Midwest Region',
    population: 68329004,
    state_code: 'M-R',
  },
  {
    state_fips_code: '00',
    full_fips_code: '00014',
    state: 'South Region',
    population: 125580448,
    state_code: 'S-R',
  },
  {
    state_fips_code: '00',
    full_fips_code: '00015',
    state: 'West Region',
    population: 78347268,
    state_code: 'W-R',
  },
];

export interface Location {
  county?: string;
  county_url_name?: string;
  county_fips_code?: string;
  state_fips_code: string;
  full_fips_code?: string;
  population: number;
  state_code: string;
  state: string;
  state_url_name?: string;
}

// TODO(michael): Make this return County type and fix up references.
export function findCountyByFips(fips: string) {
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

export function getCountyMsaCode(fips: string): string | undefined {
  if (has(ADJACENT_COUNTIES, fips)) {
    return ADJACENT_COUNTIES[fips].msa_code;
  }
}
