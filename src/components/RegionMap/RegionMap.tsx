import React from 'react';
import { ComposableMap, Geographies, Geography } from 'react-simple-maps';
import COUNTIES_JSON from 'components/Map/data/counties-small.json';
import { geoBounds, geoCentroid, geoDistance } from 'd3-geo';
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
}> = ({ height = 600, countyFipsList }) => {
  const countiesTopoJson = buildGeometry(countyFipsList);
  const width = (800 / 600) * height;
  const projectionConfig = getProjectionConfig(countiesTopoJson, width, height);

  return (
    <ComposableMap
      projection={'geoConicEqualArea'}
      height={height}
      projectionConfig={projectionConfig}
    >
      <Geographies geography={countiesTopoJson}>
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

function getProjectionConfig(
  countiesTopoJson: any,
  width: number,
  height: number,
) {
  const countiesGeoJson = topojson.feature(
    countiesTopoJson as any,
    countiesTopoJson.objects.counties as any,
  );

  const bounds = geoBounds(countiesGeoJson);
  const center = geoCentroid(countiesGeoJson);
  const distance = geoDistance(bounds[0], bounds[1]);
  const scale = (0.8 * Math.sqrt(height * height + width * width)) / distance;

  return { scale, center };
}

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
