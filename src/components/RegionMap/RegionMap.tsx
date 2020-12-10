import React from 'react';
import {
  ComposableMap,
  Geographies,
  Geography,
  ProjectionFunction,
} from 'react-simple-maps';
import COUNTIES_JSON from 'components/Map/data/counties-small.json';
import { geoBounds, geoCentroid, geoDistance, geoConicEqualArea } from 'd3-geo';
import * as topojson from 'topojson-client';

/**
 * The COUNTIES_JSON file contains geographies for counties, states and the
 * nation. The following variables simplify the object to contain either
 * state or county, not both (this might make parsing of the geographies faster
 * and reduce our bundle size a bit).
 */
const geoCounties = {
  ...COUNTIES_JSON,
  objects: { counties: COUNTIES_JSON.objects.counties },
};

const RegionMap: React.FC<{
  height?: number;
  countyFipsList: string[];
}> = ({ height = 600, countyFipsList, stateFipsList }) => {
  const countyGeometries = buildGeometry(countyFipsList);
  const geoJson = topojson.feature(
    countyGeometries,
    countyGeometries.objects.counties,
  );
  const width = (800 / 600) * height;
  const bounds = geoBounds(geoJson);
  const centroid = geoCentroid(geoJson);
  const distance = geoDistance(bounds[0], bounds[1]);

  const scale = (0.8 * Math.sqrt(height * height + width * width)) / distance;

  const mapProjection: ProjectionFunction = geoConicEqualArea()
    .scale(scale)
    .center(centroid);

  return (
    <ComposableMap projection={mapProjection} height={height}>
      <Geographies geography={countyGeometries}>
        {({ geographies }) =>
          geographies.map(geo => {
            return (
              <Geography
                key={geo.rsmKey}
                geography={geo}
                fill={'black'}
                strokeWidth={1}
                stroke="white"
                role="img"
              />
            );
          })
        }
      </Geographies>
    </ComposableMap>
  );
};

function buildGeometry(countyFipsList: string[]) {
  const countyGeometries = geoCounties.objects.counties.geometries.filter(
    geoCounty => countyFipsList.includes(geoCounty.id),
  );
  return {
    ...geoCounties,
    objects: {
      counties: {
        ...geoCounties.objects.counties,
        geometries: countyGeometries,
      },
    },
  };
}

export default RegionMap;
