import React from 'react';
import { Link } from 'react-router-dom';
import { ComposableMap, Geographies, Geography } from 'react-simple-maps';
import { colorFromLocationSummary } from 'common/colors';
import { geoAlbersUsaTerritories } from 'geo-albers-usa-territories';
import STATES_JSON from './data/states-10m.json';
import { USMapWrapper, USStateMapWrapper } from './Map.style';
import { REVERSED_STATES } from 'common';
import { useSummaries } from 'common/location_summaries';
import { ScreenshotReady } from 'components/Screenshot';

function getStateCode(stateName) {
  // hacky, name defined slightly differently in normal reversed states file.
  if (stateName === 'Commonwealth of the Northern Mariana Islands') {
    return 'MP';
  }
  return REVERSED_STATES[stateName];
}

const MarianaIslands = ({ x, y, fill, scale, onMouseEnter, onMouseLeave }) => {
  return (
    <g
      transform={`translate(${x}, ${y}) scale(${scale})`}
      onMouseEnter={onMouseEnter}
      onMouseLeave={onMouseLeave}
    >
      <rect width="20" height="20" fill={fill} />
      <text transform="translate(25, 15)">CNMI</text>
    </g>
  );
};

const USACountyMap = ({ stateClickHandler, setTooltipContent, condensed }) => {
  const locationSummaries = useSummaries();

  const getFillColor = geo => {
    const summary = (locationSummaries && locationSummaries[geo.id]) || null;
    return colorFromLocationSummary(summary);
  };

  const projection = geoAlbersUsaTerritories()
    .scale(1000)
    .translate([400, 300]);

  const onMouseLeave = () => {
    setTooltipContent('');
  };

  return (
    <USMapWrapper condensed={condensed}>
      {/** Map with shaded background colors for states. */}
      <USStateMapWrapper>
        <ComposableMap data-tip="" projection={projection}>
          <Geographies geography={STATES_JSON}>
            {({ geographies }) =>
              geographies.map(geo => {
                const { name } = geo.properties;
                const stateCode = getStateCode(name);

                if (stateCode === 'MP') {
                  return (
                    <Link key={stateCode} to={`/us/${stateCode.toLowerCase()}`}>
                      <MarianaIslands
                        x={40}
                        y={395}
                        scale={0.8}
                        key={geo.rsmKey}
                        onMouseEnter={() => {
                          setTooltipContent(name);
                        }}
                        onMouseLeave={onMouseLeave}
                        onClick={() => stateClickHandler(name)}
                        fill={getFillColor(geo)}
                      />
                    </Link>
                  );
                }
                return stateCode ? (
                  <Link key={stateCode} to={`/us/${stateCode.toLowerCase()}`}>
                    <Geography
                      key={geo.rsmKey}
                      geography={geo}
                      onMouseEnter={() => {
                        setTooltipContent(name);
                      }}
                      onMouseLeave={onMouseLeave}
                      onClick={() => stateClickHandler(name)}
                      fill={getFillColor(geo)}
                      stroke="white"
                    />
                  </Link>
                ) : null;
              })
            }
          </Geographies>
        </ComposableMap>
      </USStateMapWrapper>
      {locationSummaries && <ScreenshotReady />}
    </USMapWrapper>
  );
};

export default USACountyMap;
