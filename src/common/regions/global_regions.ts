import {
  statesByFips,
  countiesByFips,
  metroAreasByFips,
  customAreasByFips,
} from './preprocessed_regions_data';

import { RegionDB } from './region_db';

const regions = new RegionDB(
  statesByFips,
  countiesByFips,
  metroAreasByFips,
  customAreasByFips,
);

export default regions;
export { regions };
