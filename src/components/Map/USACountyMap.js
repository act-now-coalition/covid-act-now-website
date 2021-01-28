import React from 'react';
import { Link } from 'react-router-dom';
import { ComposableMap, Geographies, Geography } from 'react-simple-maps';
import { geoAlbersUsaTerritories } from 'geo-albers-usa-territories';
import { colorFromLocationSummary } from 'common/colors';
import { useSummaries } from 'common/location_summaries';
import { ScreenshotReady } from 'components/Screenshot';
import regions from 'common/regions';
import { USMapWrapper, USStateMapWrapper } from './Map.style';
import COUNTIES_JSON from 'assets/data/counties-geo.json';

const stateFipsCodes = regions.states.map(state => state.fipsCode);

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

const geoStates = {
  ...COUNTIES_JSON,
  objects: { states: COUNTIES_JSON.objects.states },
};

/**
 * SVG element to represent the Northern Mariana Islands on the USA Country Map as a
 * box (with risk level color) + text.
 *
 * This is special cased from the normal map display. The mariana islands are
 * small enough that simply showing the islands is not a UX that works.
 */
const MarianaIslands = ({ fill, onMouseEnter, onMouseLeave }) => {
  return (
    <g
      transform="translate(40, 395) scale(0.8)"
      onMouseEnter={onMouseEnter}
      onMouseLeave={onMouseLeave}
    >
      <rect width="20" height="20" fill={fill} />
      <text transform="translate(25, 15)">CNMI</text>
    </g>
  );
};

const USACountyMap = React.memo(
  ({ stateClickHandler, setTooltipContent, showCounties }) => {
    const locationSummaries = useSummaries();

    const getFillColor = geo => {
      const summary = (locationSummaries && locationSummaries[geo.id]) || null;
      return colorFromLocationSummary(summary);
    };

    const projection = geoAlbersUsaTerritories()
      .scale(1070)
      .translate([400, 300]);

    const onMouseLeave = () => setTooltipContent('');

    return (
      <USMapWrapper>
        {/** Map with shaded background colors for states. */}
        <USStateMapWrapper showCounties={showCounties}>
          <ComposableMap data-tip="" projection={projection} height={500}>
            <g transform="translate(0, -50)">
              {showCounties && (
                <Geographies geography={geoCounties}>
                  {({ geographies }) =>
                    geographies.map(geo => {
                      return (
                        <Geography
                          key={geo.rsmKey}
                          geography={geo}
                          fill={getFillColor(geo)}
                          strokeWidth={0}
                          role="img"
                        />
                      );
                    })
                  }
                </Geographies>
              )}
              <Geographies geography={geoStates}>
                {({ geographies }) =>
                  geographies
                    .filter(geo => stateFipsCodes.includes(geo.id))
                    .map(geo => {
                      const fipsCode = geo.id;
                      const state = regions.findByFipsCode(fipsCode);
                      // Using a custom SVG to place the northern mariana islands to increase
                      // accessibility due to the small size.
                      if (state.stateCode === 'MP') {
                        return (
                          <Link
                            key={state.stateCode}
                            to={state.relativeUrl}
                            aria-label={state.fullName}
                          >
                            <MarianaIslands
                              key={geo.rsmKey}
                              onMouseEnter={() =>
                                setTooltipContent(state.fullName)
                              }
                              onMouseLeave={onMouseLeave}
                              onClick={() => stateClickHandler(state.fullName)}
                              fill={getFillColor(geo)}
                            />
                          </Link>
                        );
                      }
                      return state ? (
                        <Link
                          key={state.stateCode}
                          to={state.relativeUrl}
                          aria-label={state.fullName}
                        >
                          <Geography
                            key={geo.rsmKey}
                            geography={geo}
                            onMouseEnter={() =>
                              setTooltipContent(state.fullName)
                            }
                            onMouseLeave={onMouseLeave}
                            onClick={() => stateClickHandler(state.fullName)}
                            fill={getFillColor(geo)}
                            fillOpacity={showCounties ? 0 : 1}
                            stroke="white"
                            role="img"
                          />
                        </Link>
                      ) : null;
                    })
                }
              </Geographies>
            </g>
          </ComposableMap>
        </USStateMapWrapper>
        {locationSummaries && <ScreenshotReady />}
      </USMapWrapper>
    );
  },
);

export default USACountyMap;
