import React from 'react';
import { ComposableMap, Geographies, Geography } from 'react-simple-maps';
import { countyColor, stateColor } from 'common/colors';
import { geoAlbersUsaTerritories } from 'geo-albers-usa-territories';
import STATES_JSON from './data/states-10m.json';
import { USMapWrapper, USStateMapWrapper } from './Map.style';
import { REVERSED_STATES } from 'common';

const USACountyMap = ({ stateClickHandler, setTooltipContent, condensed }) => {
  const getFillColor = geo => {
    if (geo.id.length <= 2) {
      const stateCode = REVERSED_STATES[geo.properties.name];
      return stateCode && stateColor(stateCode);
    } else {
      return countyColor(geo.id);
    }
  };

  const projection = geoAlbersUsaTerritories()
    .scale(1000)
    .translate([400, 300]);

  return (
    <USMapWrapper condensed={condensed}>
      {/** Map with shaded background colors for states. */}
      <USStateMapWrapper>
        <ComposableMap data-tip="" projection={projection} stroke="white">
          <Geographies geography={STATES_JSON}>
            {({ geographies }) =>
              geographies.map(geo => {
                const { name } = geo.properties;
                return REVERSED_STATES[name] ? (
                  <Geography
                    key={geo.rsmKey}
                    geography={geo}
                    onClick={() => stateClickHandler(name)}
                    onMouseEnter={() => {
                      setTooltipContent(name);
                    }}
                    onMouseLeave={() => {
                      setTooltipContent('');
                    }}
                    fill={getFillColor(geo)}
                  />
                ) : null;
              })
            }
          </Geographies>
        </ComposableMap>
      </USStateMapWrapper>
    </USMapWrapper>
  );
};

export default USACountyMap;
