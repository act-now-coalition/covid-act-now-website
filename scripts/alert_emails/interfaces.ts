import { Level } from '../../src/common/level';
import { Metric } from '../../src/common/metric';

export interface Alert {
    fips: string;
    locationName: string;
    locationURL: string;
    lastUpdated: string;
    oldLevel: Level;
    newLevel: Level;
    changedMetrics: Array<{
      metric: Metric;
      oldLevel: Level;
      newLevel: Level;
    }>;
  }