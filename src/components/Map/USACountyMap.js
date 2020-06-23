import React from 'react';
import { ComposableMap, Geographies, Geography } from 'react-simple-maps';
import { countyColor, stateColor } from 'common/colors';
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
      return stateCode && stateColor(stateCode);
    } else {
      return countyColor(geo.id);
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
