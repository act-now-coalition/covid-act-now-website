import React from 'react';
import { ComposableMap, Geographies, Geography } from 'react-simple-maps';
import {
  FIPS_CODE_TO_CALCULATED_INTERVENTION_COLOR,
  STATE_TO_CALCULATED_INTERVENTION_COLOR,
  COLOR_MAP,
} from 'common/colors';
import COUNTIES_JSON from './data/counties-10m.json';
import STATES_JSON from './data/states-10m.json';
import {
  USMapWrapper,
  USStateMapWrapper,
  USCountyMapWrapper,
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
      <ComposableMap data-tip="" projection="geoAlbersUsa" stroke={'white'}>
        <USStateMapWrapper>
          <Geographies geography={STATES_JSON}>
            {({ geographies }) =>
              geographies.map(geo => (
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
              ))
            }
          </Geographies>
        </USStateMapWrapper>
        {/* County lines are overlaid over the state map and ignore pointer events */}
        <USCountyMapWrapper>
          <Geographies geography={COUNTIES_JSON}>
            {({ geographies }) =>
              geographies.map((geo, i) => (
                <Geography key={`county-${i}`} geography={geo} />
              ))
            }
          </Geographies>
        </USCountyMapWrapper>
      </ComposableMap>
    </USMapWrapper>
  );
};

export default USACountyMap;
