import React, { useState } from 'react';
import { useParams, Link } from 'react-router-dom';
import {
  ComposableMap,
  Geographies,
  Geography,
  ZoomableGroup,
} from 'react-simple-maps';
import ReactTooltip from 'react-tooltip';
import STATE_CENTERS from '../../common/us_state_centers';
import { countyColor } from 'common/colors';
import { findCountyByFips } from 'common/locations';
import { CountyMapWrapper, CountyMapLayerWrapper } from './CountyMap.style';

const CountyMap = ({ selectedCounty, setSelectedCounty }) => {
  let { stateId } = useParams();
  stateId = stateId.toUpperCase();
  const state = STATE_CENTERS[stateId];
  const counties = require(`./countyTopoJson/${stateId}.json`);
  const [content, setContent] = useState('');

  const onMouseLeave = () => {
    setContent('');
  };

  return (
    <CountyMapWrapper>
      {/**
       * We have two layers. The first one just colors all the counties. The
       * second one implements mouse / hover events and outlines the selected
       * county. Doing it in one layer doesn't work because the stroke around
       * the selected county ends up partially "erased" as the surrounding
       * counties are drawn.
       */}
      <CountyMapLayer
        state={state}
        counties={counties}
        geographyFactory={geo => {
          return (
            <Geography
              key={geo.rsmKey}
              geography={geo}
              fill={countyColor(geo.properties.GEOID)}
              stroke={'white'}
            />
          );
        }}
      />

      <CountyMapLayer
        state={state}
        counties={counties}
        geographyFactory={geo => {
          const geoFullFips = geo.properties.GEOID;
          const isSelected =
            selectedCounty && selectedCounty.full_fips_code === geoFullFips;

          const county = findCountyByFips(geoFullFips);

          return (
            <Link
              key={geoFullFips}
              to={`/us/${stateId.toLowerCase()}/county/${
                county.county_url_name
              }`}
            >
              <Geography
                key={geo.rsmKey}
                geography={geo}
                // The fill is only used for hover
                fill={'white'}
                fillOpacity={0}
                // The stroke is only used for selection.
                strokeOpacity={isSelected ? 1 : 0}
                stroke={'black'}
                strokeWidth={3}
                onMouseEnter={() => {
                  const { NAME } = geo.properties;
                  setContent(NAME);
                }}
                onMouseLeave={onMouseLeave}
                onClick={() => setSelectedCounty(geoFullFips)}
                style={{
                  cursor: 'pointer',
                  hover: {
                    fillOpacity: '0.5',
                    outline: 'none',
                  },
                  pressed: {
                    outline: 'none',
                  },
                }}
              />
            </Link>
          );
        }}
      />
      <ReactTooltip>{content}</ReactTooltip>
    </CountyMapWrapper>
  );
};

const CountyMapLayer = ({ state, counties, geographyFactory }) => {
  return (
    <CountyMapLayerWrapper>
      <ComposableMap
        projection={state.StateCode === 'AK' ? 'geoAlbers' : 'geoMercator'}
        data-tip=""
        projectionConfig={{
          rotate: state.rotate ? state.rotate : null,
          scale: state.scale ? state.scale : 4000,
        }}
      >
        <ZoomableGroup
          center={[state.Longitude, state.Latitude]}
          disablePanning={true}
        >
          <Geographies geography={counties}>
            {({ geographies }) => geographies.map(geographyFactory)}
          </Geographies>
        </ZoomableGroup>
      </ComposableMap>
    </CountyMapLayerWrapper>
  );
};

export default CountyMap;
