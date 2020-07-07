import { Level } from '../../src/common/level';

export interface Alert {
  fips: string;
  locationName: string;
  locationURL: string;
  lastUpdated: string;
  oldLevel: Level;
  newLevel: Level;
}
