/**
 * Parses the content of the Covid Explained articles, transforms them to match
 * the CAN CMS structure and saves them under `src/cms-content/articles/`
 *
 * yarn covid-explained-migrate
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

async function main() {
  const updatedGeoJSON = {
    ...countyGeoJSON,
    objects: _.merge(
      _.map(countyGeoJSON.objects, (object: GeoObject, key: string) => {
        return {
          [key]: {
            ...object,
            geometries: object.geometries.map(removeProperties),
          },
        };
      }),
    ),
  };

  fs.writeFileSync('./counties-slim.json', JSON.stringify(updatedGeoJSON));
}

if (require.main === module) {
  main();
}
