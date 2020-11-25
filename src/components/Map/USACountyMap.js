import React from 'react';
import { Link } from 'react-router-dom';
import { ComposableMap, Geographies, Geography } from 'react-simple-maps';
import { colorFromLocationSummary } from 'common/colors';
import { geoAlbersUsaTerritories } from 'geo-albers-usa-territories';
import COUNTIES_JSON from './data/counties-10m.json';
import STATES_JSON from './data/states-10m.json';
import { USMapWrapper, USStateMapWrapper } from './Map.style';
import { useSummaries } from 'common/location_summaries';
import { ScreenshotReady } from 'components/Screenshot';
import {
  getCanonicalUrl,
  getLocationNameForFips,
  getStateCode,
  isStateFips,
} from 'common/locations';
import { Level } from 'common/level';

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
  ({ stateClickHandler, setTooltipContent, condensed, showCounties }) => {
    const locationSummaries = useSummaries();

    const getFillColor = geo => {
      const summary = (locationSummaries && locationSummaries[geo.id]) || null;
      return colorFromLocationSummary(summary);
    };

    // TODO: Remove once Josh defined a color for the 5th level
    const getClassName = geo => {
      const summary = (locationSummaries && locationSummaries[geo.id]) || null;
      return summary ? `level-${Level[summary.level]}` : 'level-unknown';
    };

    const projection = geoAlbersUsaTerritories()
      .scale(1070)
      .translate([400, 300]);

    const onMouseLeave = () => setTooltipContent('');

    return (
      <USMapWrapper condensed={condensed}>
        {/** Map with shaded background colors for states. */}
        <USStateMapWrapper showCounties={showCounties}>
          <ComposableMap data-tip="" projection={projection} height={500}>
            <g transform="translate(0, -50)">
              {showCounties && (
                <Geographies geography={COUNTIES_JSON}>
                  {({ geographies }) =>
                    geographies.map(geo => {
                      return (
                        <Geography
                          key={geo.rsmKey}
                          geography={geo}
                          fill={getFillColor(geo)}
                          strokeWidth={0}
                          className={getClassName(geo)}
                        />
                      );
                    })
                  }
                </Geographies>
              )}
              <Geographies geography={STATES_JSON}>
                {({ geographies }) =>
                  geographies
                    .filter(geo => isStateFips(geo.id))
                    .map(geo => {
                      const { name } = geo.properties;
                      const fipsCode = geo.id;
                      const stateCode = getStateCode(name);
                      const stateUrl = `/${getCanonicalUrl(fipsCode)}`;
                      const locationName = getLocationNameForFips(fipsCode);

                      // Using a custom SVG to place the northern mariana islands to increase
                      // accessibility due to the small size.
                      if (stateCode === 'MP') {
                        return (
                          <Link
                            key={stateCode}
                            to={stateUrl}
                            aria-label={locationName}
                          >
                            <MarianaIslands
                              key={geo.rsmKey}
                              onMouseEnter={() => setTooltipContent(name)}
                              onMouseLeave={onMouseLeave}
                              onClick={() => stateClickHandler(name)}
                              fill={getFillColor(geo)}
                            />
                          </Link>
                        );
                      }
                      return stateCode ? (
                        <Link
                          key={stateCode}
                          to={stateUrl}
                          aria-label={locationName}
                        >
                          <Geography
                            key={geo.rsmKey}
                            geography={geo}
                            onMouseEnter={() => setTooltipContent(name)}
                            onMouseLeave={onMouseLeave}
                            onClick={() => stateClickHandler(name)}
                            fill={getFillColor(geo)}
                            fillOpacity={showCounties ? 0 : 1}
                            stroke="white"
                            role="img"
                            className={getClassName(geo)}
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
