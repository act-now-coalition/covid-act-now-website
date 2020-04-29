import React, { useState } from 'react';
import { useParams } from 'react-router-dom';
import {
  ComposableMap,
  Geographies,
  Geography,
  ZoomableGroup,
} from 'react-simple-maps';
import ReactTooltip from 'react-tooltip';
import STATE_CENTERS from '../../enums/us_state_centers';
import { FIPS_CODE_TO_CALCULATED_INTERVENTION_COLOR } from 'enums/interventions';
import { COLOR_MAP } from 'enums/interventions';
import { CountyMapWrapper, CountyMapLayerWrapper } from './CountyMap.style';

const CountyMap = ({
  selectedCounty,
  setSelectedCounty,
  fill,
  stateSummary = {},
}) => {
  let { stateId } = useParams();
  stateId = stateId.toUpperCase();
  const state = STATE_CENTERS[stateId];
  const counties = require(`./countyTopoJson/${stateId}.json`);
  const countiesWithData =
    stateSummary && stateSummary.counties_with_data
      ? stateSummary.counties_with_data
      : [];
  const [content, setContent] = useState('');

  const getFillColor = geoId => {
    return FIPS_CODE_TO_CALCULATED_INTERVENTION_COLOR[geoId] || fill;
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
              fill={
                countiesWithData.includes(geo.properties.GEOID)
                  ? getFillColor(geo.properties.GEOID)
                  : COLOR_MAP.GRAY.LIGHT
              }
              stroke={'white'}
            />
          );
        }}
      />

      <CountyMapLayer
        state={state}
        counties={counties}
        geographyFactory={geo => {
          const isSelected =
            selectedCounty &&
            selectedCounty.full_fips_code === geo.properties.GEOID;
          return (
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
              onMouseLeave={() => {
                setContent('');
              }}
              onClick={() => setSelectedCounty(geo.properties.GEOID)}
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
