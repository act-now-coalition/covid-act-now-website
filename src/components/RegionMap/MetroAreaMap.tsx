import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { uniq } from 'lodash';
import { ComposableMap, Geographies } from 'react-simple-maps';
import COUNTIES_JSON from 'components/Map/data/counties-10m.json';
import { geoBounds, geoCentroid, geoDistance } from 'd3-geo';
import * as topojson from 'topojson-client';
import { MetroArea } from 'common/regions';
import * as Styles from './MetroAreaMap.style';
import regions from 'common/regions';
import { LocationSummariesByFIPS } from 'common/location_summaries';
import ReactTooltip from 'react-tooltip';

const MetroAreaMap: React.FC<{
  height?: number;
  width?: number;
  metroArea: MetroArea;
}> = ({ height = 600, width = 800, metroArea }) => {
  const [tooltipContent, setTooltipContent] = useState('');

  const countyFipsList = metroArea.counties.map(county => county.fipsCode);
  const countiesTopoJson = buildCountyGeometries(countyFipsList);
  const projectionConfig = getProjectionConfig(countiesTopoJson, width, height);

  const stateFipsList = getStateFipsList(countyFipsList);
  const statesTopoJson = buildStateGeometries(stateFipsList);

  const onMouseEnter = (content: string) => setTooltipContent(content);
  const onMouseLeave = () => setTooltipContent('');

  return (
    <Styles.MapContainer>
      <ComposableMap
        projection={'geoMercator'}
        height={height}
        width={width}
        projectionConfig={projectionConfig}
        data-tip=""
      >
        <Geographies key="states" geography={statesTopoJson}>
          {({ geographies }) =>
            geographies.map(geo => {
              const region = regions.findByFipsCode(geo.id);
              return (
                <Link
                  key={geo.rsmKey}
                  to={region ? region.relativeUrl : '/'}
                  aria-label={region?.fullName || ''}
                >
                  <Styles.StateShape
                    key={geo.rsmKey}
                    geography={geo}
                    onMouseEnter={() => onMouseEnter(region?.fullName || '')}
                    onMouseLeave={onMouseLeave}
                  />
                </Link>
              );
            })
          }
        </Geographies>
        <Geographies key="counties" geography={countiesTopoJson}>
          {({ geographies }) =>
            geographies.map(geo => {
              const region = regions.findByFipsCode(geo.id);
              return (
                <Link
                  key={geo.id}
                  to={region ? region.relativeUrl : '/'}
                  aria-label={region?.shortName || ''}
                >
                  <Styles.MetroCounty
                    geography={geo}
                    $locationSummary={LocationSummariesByFIPS[geo.id] || null}
                    onMouseEnter={() => onMouseEnter(region?.shortName || '')}
                    onMouseLeave={onMouseLeave}
                  />
                </Link>
              );
            })
          }
        </Geographies>
        <Geographies key="state-borders" geography={statesTopoJson}>
          {({ geographies }) =>
            geographies.map(geo => (
              <Styles.StateBorder key={geo.rsmKey} geography={geo} />
            ))
          }
        </Geographies>
      </ComposableMap>
      <ReactTooltip>{tooltipContent}</ReactTooltip>
    </Styles.MapContainer>
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
   * and then the horizontal and vertical distances (in latitude and longitude
   * coordinates).
   *
   * We calculate the scale by dividing the distance in pixels by the
   * geographic distance, and taking the smallest of both, with some padding.
   */
  const [bottomLeft, topRight] = geoBounds(countiesGeoJson);
  const [ax, ay] = bottomLeft;
  const [bx, by] = topRight;
  const center = geoCentroid(countiesGeoJson);
  const distanceLongitude = geoDistance([ax, ay], [bx, ay]);
  const distanceLatitude = geoDistance([ax, ay], [ax, by]);
  const scale =
    0.4 * Math.min(width / distanceLongitude, height / distanceLatitude);
  return { scale, center };
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
  const { objects } = COUNTIES_JSON;
  return {
    ...COUNTIES_JSON,
    objects: { states: objects.states },
  };
}

function getStateFipsList(countyFipsList: string[]) {
  return uniq(countyFipsList.map(countyFips => countyFips.substr(0, 2)));
}

export default MetroAreaMap;
