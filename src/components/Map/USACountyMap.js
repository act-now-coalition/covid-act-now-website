import React from 'react';
import { ComposableMap, Geographies, Geography } from 'react-simple-maps';
import {
  FIPS_CODE_TO_CALCULATED_INTERVENTION_COLOR,
  STATE_TO_CALCULATED_INTERVENTION_COLOR,
  COLOR_MAP,
} from 'common/colors';
// import COUNTIES_JSON from './data/counties-10m.json';
import STATES_JSON from './data/states-10m.json';
import {
  USMapWrapper,
  // USCountyMapWrapper,
  USStateMapWrapper,
} from './Map.style';
import { REVERSED_STATES } from 'common';

const USACountyMap = ({ stateClickHandler, setTooltipContent, condensed }) => {
  const getFillColor = geo => {
    if (geo.id.length <= 2) {
      const stateCode = REVERSED_STATES[geo.properties.name];
      return STATE_TO_CALCULATED_INTERVENTION_COLOR[stateCode] || '#e3e3e3';
    } else {
      let countyColor = FIPS_CODE_TO_CALCULATED_INTERVENTION_COLOR[geo.id];
      if (countyColor === COLOR_MAP.GRAY.BASE || !countyColor) {
        countyColor = 'rgba(0,0,0,0)';
      }
      return countyColor;
    }
  };

  return (
    <USMapWrapper condensed={condensed}>
      {/** Map with shaded background colors for states. */}
      <USStateMapWrapper>
        <ComposableMap data-tip="" projection="geoAlbersUsa" stroke={'white'}>
          <Geographies geography={STATES_JSON}>
            {({ geographies }) =>
              geographies.map(geo => {
                return (
                  <Geography
                    key={geo.rsmKey}
                    geography={geo}
                    onClick={() => stateClickHandler(geo.properties.name)}
                    onMouseEnter={() => {
                      const { name } = geo.properties;
                      setTooltipContent(name);
                    }}
                    onMouseLeave={() => {
                      setTooltipContent('');
                    }}
                    fill={getFillColor(geo)}
                  />
                );
              })
            }
          </Geographies>
        </ComposableMap>
      </USStateMapWrapper>
    </USMapWrapper>
  );
};

export default USACountyMap;

// TODO(igor): clean up once we know what we want
//  fill={getFillColor(geo.id)}
/*<USCountyMapWrapper>
  <ComposableMap projection="geoAlbersUsa">
    <Geographies geography={COUNTIES_JSON}>
      {({ geographies }) =>
        geographies.map(geo => {
          return (
            <Geography
              key={geo.rsmKey}
              geography={geo}
              stroke={'rgba(255,255,255,0.05)'}
              fill={'transparent'}
            />
          );
        })
      }
    </Geographies>
  </ComposableMap>
</USCountyMapWrapper>;*/
