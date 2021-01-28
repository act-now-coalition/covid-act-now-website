/**
 * This script removes some information from the counties-10m.json that we don't need:
 *
 *   - removes the "properties" attribute from each geometry
 *   - removes the "nation" object in the file
 *
 * This reduces the file size by from 824K to 716K (~14%). We are keeping a copy of the
 * original file here in case we need to restore some of this information.
 */
import fs from 'fs';
import path from 'path';
import countyGeoJSON from './counties-10m.json';
import _ from 'lodash';

interface Geometry {
  properties: any;
}

interface GeoObject {
  geometries: any[];
}

function removeProperties(geometry: Geometry) {
  const { properties, ...otherProps } = geometry;
  return otherProps;
}

function simplifyGeometries(object: GeoObject) {
  const simplifiedGeometries = object.geometries.map(removeProperties);
  return { ...object, geometries: simplifiedGeometries };
}

async function main() {
  const updatedGeoJSON = {
    ...countyGeoJSON,
    objects: {
      counties: simplifyGeometries(countyGeoJSON.objects.counties),
      states: simplifyGeometries(countyGeoJSON.objects.states),
    },
  };

  const outputPath = path.join(
    __dirname,
    '../../src/assets/data/counties-geo.json',
  );
  fs.writeFileSync(outputPath, JSON.stringify(updatedGeoJSON));
}

if (require.main === module) {
  main();
}
