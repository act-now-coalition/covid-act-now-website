import type { RegionDB } from 'common/regions/region_db';

//type RegionDB = typeof import('common/regions/region_db');
let cachedRegionDB: RegionDB = null;
export async function getRegionDB(): Promise<RegionDB> {
  if (cachedRegionDB === null) {
    const module = await import('common/regions/region_db'); // as unknown as Promise<RegionDB>;
    cachedRegionDB = module.default;
  }
  return Promise.resolve(cachedRegionDB);
}
