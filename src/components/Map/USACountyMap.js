import React from 'react';
import { ComposableMap, Geographies, Geography } from 'react-simple-maps';
import {
  COLOR_MAP,
  FIPS_CODE_TO_CALCULATED_INTERVENTION_COLOR,
} from 'enums/interventions';
import COUNTIES_JSON from './data/counties-10m.json';
import STATES_JSON from './data/states-10m.json';
import {
  USMapWrapper,
  USCountyMapWrapper,
  USStateMapWrapper,
} from './Map.style';

const USACountyMap = ({ stateClickHandler, setTooltipContent }) => {
  const getFillColor = geoId => {
    return FIPS_CODE_TO_CALCULATED_INTERVENTION_COLOR[geoId] || COLOR_MAP.GREY;
  };

  return (
    <USMapWrapper>
      <USCountyMapWrapper>
        <ComposableMap projection="geoAlbersUsa">
          <Geographies geography={COUNTIES_JSON}>
            {({ geographies }) =>
              geographies.map(geo => {
                return (
                  <Geography
                    key={geo.rsmKey}
                    geography={geo}
                    stroke={'hsla(0, 0%, 85%, 0.2)'}
                    fill={getFillColor(geo.id)}
                  />
                );
              })
            }
          </Geographies>
        </ComposableMap>
      </USCountyMapWrapper>
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
                    fill={'transparent'}
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
