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
          geographies.map(geo => {
            return (
              <Geography
                key={geo.rsmKey}
                geography={geo}
                fill={'#ccc'}
                strokeWidth={1}
                stroke="white"
                role="img"
              />
            );
          })
        }
      </Geographies>
      <Geographies key="counties" geography={countiesTopoJson}>
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

function buildCountyGeometries(countyFipsList: string[]) {
  const countyGeometries = COUNTIES_JSON.objects.counties.geometries.filter(
    geoCounty => countyFipsList.includes(geoCounty.id),
  );
  return {
    ...COUNTIES_JSON,
    objects: {
      counties: {
        ...COUNTIES_JSON.objects.counties,
        geometries: countyGeometries,
      },
    },
  };
}

function buildStateGeometries(stateFipsList: string[]) {
  const stateGeometries = COUNTIES_JSON.objects.states.geometries.filter(
    geoState => stateFipsList.includes(geoState.id),
  );
  return {
    ...COUNTIES_JSON,
    objects: {
      states: { ...COUNTIES_JSON.objects.states, geometries: stateGeometries },
    },
  };
}

function getStateFipsList(countyFipsList: string[]) {
  return uniq(countyFipsList.map(countyFips => countyFips.substr(0, 2)));
}

export default RegionMap;
