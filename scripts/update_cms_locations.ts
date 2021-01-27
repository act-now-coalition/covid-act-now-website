import fs from 'fs-extra';
import path from 'path';
import regions, { Region } from '../src/common/regions';
import { CMSLocation } from '../src/cms-content/locations';

const writeRegions = async (regionsSubset: Region[]) => {
  const data: CMSLocation[] = regionsSubset.map(region => ({
    locationName: region.fullName,
    locationType: region.regionType,
    fips: region.fipsCode,
    stateCode: '',
  }));

  const outputPath = path.join(
    __dirname,
    '..',
    'src',
    'cms-content',
    'locations',
    `state.json`,
  );

  await fs.writeJSON(outputPath, { regions: data });
};

async function main() {
  await writeRegions(regions.states);
}

main().catch(e => {
  console.error(e);
  process.exit(-1);
});
