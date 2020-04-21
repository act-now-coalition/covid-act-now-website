import React from 'react';
import { ComposableMap, Geographies, Geography } from 'react-simple-maps';
import {
  FIPS_CODE_TO_CALCULATED_INTERVENTION_COLOR,
  STATE_TO_CALCULATED_INTERVENTION_COLOR,
} from 'enums/interventions';
import COUNTIES_JSON from './data/counties-10m.json';
import STATES_JSON from './data/states-10m.json';
import {
  USMapWrapper,
  USCountyMapWrapper,
  USStateMapWrapper,
} from './Map.style';
import { invert } from 'lodash';
import { STATES } from 'enums';

const reversedStateMap = invert(STATES);

const USACountyMap = ({ stateClickHandler, setTooltipContent }) => {
  const getFillColor = geo => {
    const stateCode = reversedStateMap[geo.properties.name];
    console.log(stateCode);
    return STATE_TO_CALCULATED_INTERVENTION_COLOR[stateCode] || '#e3e3e3';
  };

  return (
    <USMapWrapper>
      <USStateMapWrapper>
        <ComposableMap
          data-tip=""
          projection="geoAlbersUsa"
          stroke={'rgba(0,0,0,0.15)'}
        >
          <Geographies geography={STATES_JSON}>
            {({ geographies }) =>
              geographies.map(geo => {
                return (
                  <Geography
                    opacity={0.95}
                    key={geo.rsmKey}
                    geography={geo}
                    fill={getFillColor(geo)}
                    onClick={() => stateClickHandler(geo.properties.name)}
                    onMouseEnter={() => {
                      const { name } = geo.properties;

                      setTooltipContent(name);
                    }}
                    onMouseLeave={() => {
                      setTooltipContent('');
                    }}
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

      //                    fill={getFillColor(geo.id)}
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