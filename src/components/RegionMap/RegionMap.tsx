import React, { useState, useMemo } from 'react';
import { Link } from 'react-router-dom';
import { ComposableMap, Geographies } from 'react-simple-maps';
import ReactTooltip from 'react-tooltip';
import * as topojson from 'topojson-client';
import { geoBounds, geoCentroid, geoDistance } from 'd3-geo';
import regions, { County, MetroArea, State, Region } from 'common/regions';
import { LocationSummariesByFIPS } from 'common/location_summaries';
import { useCountyGeographies, useStateGeographies } from 'common/hooks';
import * as Styles from './RegionMap.style';
import { CountiesTopology } from 'common/data';
import { trackEvent, EventCategory, EventAction } from 'components/Analytics';
import { LocationSummary } from 'common/location_summaries';

const RegionMap: React.FC<{
  height?: number;
  width?: number;
  region: Region;
  colorMap: (locationSummary: LocationSummary) => string;
}> = ({ height = 600, width = 800, region, colorMap }) => {
  const [tooltipContent, setTooltipContent] = useState('');

  const countyFipsList = useMemo(() => getCountyFipsList(region), [region]);

  const { result: allCountiesTopoJson } = useCountyGeographies();
  const { result: statesTopoJson } = useStateGeographies();

  const countiesTopoJson = useMemo(
    () =>
      allCountiesTopoJson
        ? buildCountyGeometries(allCountiesTopoJson, countyFipsList)
        : null,
    [countyFipsList, allCountiesTopoJson],
  );

  // Calculating the projection config involves doing some complex map on the
  // geographies of the counties, we memoize it to avoid recalculating that on
  // each render.
  const projectionConfig = useMemo(() => {
    return countiesTopoJson
      ? getProjectionConfig(countiesTopoJson, width, height)
      : null;
  }, [countiesTopoJson, width, height]);

  if (!statesTopoJson || !countiesTopoJson || !projectionConfig) {
    return null;
  }

  const onMouseEnter = (content: string) => setTooltipContent(content);
  const onMouseLeave = () => setTooltipContent('');

  const trackLocationClick = (eventLabel: string) => {
    trackEvent(EventCategory.MINI_MAP, EventAction.NAVIGATE, eventLabel);
  };

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
            geographies
              .filter(geo => regions.findByFipsCode(geo.id))
              .map(geo => {
                const region = regions.findByFipsCode(geo.id);
                return (
                  <Link
                    key={geo.id}
                    to={region ? region.relativeUrl : '/'}
                    aria-label={region?.fullName || ''}
                    onMouseEnter={() => onMouseEnter(region?.fullName || '')}
                    onMouseLeave={onMouseLeave}
                    onClick={() =>
                      trackLocationClick(`State: ${region?.fullName}`)
                    }
                  >
                    <Styles.StateShape
                      key={geo.id}
                      geography={geo}
                      aria-label={region?.fullName}
                    />
                  </Link>
                );
              })
          }
        </Geographies>
        <Geographies key="counties" geography={countiesTopoJson}>
          {({ geographies }) =>
            geographies
              .filter(geo => regions.findByFipsCode(geo.id))
              .map(geo => {
                const region = regions.findByFipsCode(geo.id);
                return (
                  <Link
                    key={geo.id}
                    to={getCountyShapeLink(region)}
                    aria-label={region?.shortName || ''}
                    onMouseEnter={() => onMouseEnter(region?.shortName || '')}
                    onMouseLeave={onMouseLeave}
                    onClick={() =>
                      trackLocationClick(`County: ${region?.fullName}`)
                    }
                  >
                    <Styles.CountyWithLevel
                      geography={geo}
                      $fillColor={colorMap(LocationSummariesByFIPS[geo.id])}
                      aria-label={region?.shortName}
                    />
                  </Link>
                );
              })
          }
        </Geographies>
        <Geographies key="state-borders" geography={statesTopoJson}>
          {({ geographies }) =>
            geographies
              .filter(geo => regions.findByFipsCode(geo.id))
              .map(geo => (
                <Styles.StateBorder
                  key={geo.id}
                  geography={geo}
                  aria-hidden="true"
                />
              ))
          }
        </Geographies>
        {/* Highlight the current county if needed */}
        {region instanceof County && (
          <Geographies key="county-border" geography={countiesTopoJson}>
            {({ geographies }) =>
              geographies
                .filter(geo => geo.id === region.fipsCode)
                .map(geo => (
                  <Styles.CountyBorder
                    key={geo.id}
                    geography={geo}
                    aria-hidden="true"
                  />
                ))
            }
          </Geographies>
        )}
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
    0.6 * Math.min(width / distanceLongitude, height / distanceLatitude);
  return { scale, center };
}

function buildCountyGeometries(
  countiesTopoJson: CountiesTopology,
  countyFipsList: string[],
) {
  const objects = countiesTopoJson.objects;
  const geometries = objects.counties.geometries.filter(
    ({ id }: { id: string }) => countyFipsList.includes(id),
  );
  return {
    ...countiesTopoJson,
    objects: {
      counties: { ...objects.counties, geometries },
    },
  };
}

function getCountyFipsList(region: Region): string[] {
  if (region instanceof MetroArea) {
    return region.countiesFips;
  } else if (region instanceof State) {
    return regions.counties
      .filter(c => c.state.fipsCode === region.fipsCode)
      .map(c => c.fipsCode);
  } else if (region instanceof County) {
    return regions.counties
      .filter(c => c.state.fipsCode === region.state.fipsCode)
      .map(c => c.fipsCode);
  } else {
    return [];
  }
}

function getCountyShapeLink(region: Region | null): string {
  if (!region) {
    return '/';
  } else {
    // DC has a state- and county-level page, we only want to use the state page.
    if (region.fipsCode === '11001') {
      const dcStateRegion = regions.findByFipsCodeStrict('11');
      return dcStateRegion.relativeUrl;
    }
    return region.relativeUrl;
  }
}

export default RegionMap;
