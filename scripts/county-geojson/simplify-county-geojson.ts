/**
 * This script removes the "properties" attribute from the counties GeoJSON file to reduce
 * its size. The properties are not currently used in the code, this reduces the file size
 * by about 100K (13%).
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
    objects: _.merge(
      _.map(countyGeoJSON.objects, (object: GeoObject, key: string) => {
        return {
          [key]: { ...object, geometries: simplifiedGeometries },
        };
      }),
    ),
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
