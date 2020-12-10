import React from 'react';
import { uniq } from 'lodash';
import { ComposableMap, Geographies, Geography } from 'react-simple-maps';
import COUNTIES_JSON from 'components/Map/data/counties-small.json';
import { geoBounds, geoCentroid, geoDistance } from 'd3-geo';
import * as topojson from 'topojson-client';

const RegionMap: React.FC<{
  height?: number;
  countyFipsList: string[];
}> = ({ height = 600, countyFipsList }) => {
  const countiesTopoJson = buildCountyGeometries(countyFipsList);
  const width = (800 / 600) * height;
  const projectionConfig = getProjectionConfig(countiesTopoJson, width, height);

  const stateFipsList = getStateFipsList(countyFipsList);
  const statesTopoJson = buildStateGeometries(stateFipsList);

  return (
    <ComposableMap
      projection={'geoConicEqualArea'}
      height={height}
      projectionConfig={projectionConfig}
    >
      <Geographies key="states" geography={statesTopoJson}>
        {({ geographies }) =>
          geographies.map(geo => (
            <Geography
              key={geo.rsmKey}
              geography={geo}
              fill={'#ccc'}
              strokeWidth={1}
              stroke="white"
              role="img"
            />
          ))
        }
      </Geographies>
      <Geographies key="counties" geography={countiesTopoJson}>
        {({ geographies }) =>
          geographies.map(geo => (
            <Geography
              key={geo.rsmKey}
              geography={geo}
              fill={'black'}
              strokeWidth={1}
              stroke="white"
              role="img"
            />
          ))
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
  // Calculates the GeoJSON equivalent of countiesTopoJson
  const countiesGeoJson = topojson.feature(
    countiesTopoJson as any,
    countiesTopoJson.objects.counties as any,
  );

  /*
   * We need to calculate the center and scale factor for the geographic
   * projection so the counties are centered and scaled correctly.
   *
   * We calculate the corners of the bounding box in geographic coordinates,
   * and then the distance (in spherical coordinates) between the bottom left
   * and top right corners of the bounding box.
   *
   * We calculate the scale by dividing the distance in pixels betwen the
   * bottom left and top right corners of the SVG.
   */
  const [bottomLeft, topRight] = geoBounds(countiesGeoJson);
  const center = geoCentroid(countiesGeoJson);
  const distanceGeo = geoDistance(bottomLeft, topRight);
  const distancePx = Math.sqrt(height * height + width * width);
  return { scale: 0.8 * (distancePx / distanceGeo), center };
}

function buildCountyGeometries(countyFipsList: string[]) {
  const objects = COUNTIES_JSON.objects;
  const geometries = objects.counties.geometries.filter(geoCounty =>
    countyFipsList.includes(geoCounty.id),
  );
  return {
    ...COUNTIES_JSON,
    objects: {
      counties: { ...objects.counties, geometries },
    },
  };
}

function buildStateGeometries(stateFipsList: string[]) {
  const objects = COUNTIES_JSON.objects;
  const geometries = objects.states.geometries.filter(geoState =>
    stateFipsList.includes(geoState.id),
  );
  return {
    ...COUNTIES_JSON,
    objects: {
      states: { ...objects.states, geometries },
    },
  };
}

function getStateFipsList(countyFipsList: string[]) {
  return uniq(countyFipsList.map(countyFips => countyFips.substr(0, 2)));
}

export default RegionMap;
