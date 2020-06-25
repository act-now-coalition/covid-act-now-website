import { getLocationNames } from '../../src/common/locations';
import path from 'path';
import fs from 'fs-extra';

const outputFolder = path.join(__dirname, 'fips_to_location_output');

/*

Run via: yarn fips-to-location

Generates a file 'fips-to-location.json' containing
a map of { fips: {locationInformation} }

*/

async function testWriteToFile() {
  const flipsToLocation: { [fips: string]: {} } = {};
  await fs.ensureDir(outputFolder);
  const file = path.join(outputFolder, 'fips-to-location.json');

  const locations = getLocationNames();
  locations.forEach((location: any) => {
    const fips = location.full_fips_code;
    flipsToLocation[fips] = location;
  });

  await fs.writeFile(file, JSON.stringify(flipsToLocation));
  console.log(`Done. Generated ${file}`);
}

testWriteToFile().catch(e => {
  console.error(e);
  process.exit(-1);
});

//`${location.state}`
//`${location.county}, ${location.state}`
