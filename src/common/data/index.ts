import CCVI_DATA_MAP from './ccvi-data.json';

/**
 * CCVI has 8 scores per fips (1 'overall' score, 7 nuanced scores)
 *
 * See the defintion of each nuanced score, themes 1-7, here (page 6):
 * https://surgoventures.org/resource-library/report-vulnerable-communities-and-covid-19
 */
export interface RegionCcviItem {
  overall: number;
  theme1: number;
  theme2: number;
  theme3: number;
  theme4: number;
  theme5: number;
  theme6: number;
  theme7: number;
}

export interface FipsToCcviMap {
  [fipsCode: string]: RegionCcviItem;
}

export const fipsToCcviData = CCVI_DATA_MAP as FipsToCcviMap;
