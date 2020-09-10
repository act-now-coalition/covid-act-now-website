import React from 'react';
import { Link } from 'react-router-dom';
import { ComposableMap, Geographies, Geography } from 'react-simple-maps';
import { colorFromLocationSummary } from 'common/colors';
import { geoAlbersUsaTerritories } from 'geo-albers-usa-territories';
import STATES_JSON from './data/states-10m.json';
import { USMapWrapper, USStateMapWrapper } from './Map.style';
import { useSummaries } from 'common/location_summaries';
import { ScreenshotReady } from 'components/Screenshot';
import { getStateCode } from 'common/locations';

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
