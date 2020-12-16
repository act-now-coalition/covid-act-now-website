import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import {
  ComposableMap,
  Geographies,
  Geography,
  ZoomableGroup,
} from 'react-simple-maps';
import ReactTooltip from 'react-tooltip';
import STATE_CENTERS from '../../common/us_state_centers';
import { countyColor } from 'common/colors';
import { CountyMapWrapper, CountyMapLayerWrapper } from './CountyMap.style';
import regions, { getStateCode } from 'common/regions';
import { assert } from 'common/utils';

const CountyMap = ({ region, setSelectedCounty }) => {
  const stateCode = getStateCode(region);
  assert(stateCode, 'Only regions with states currently supported');

  const stateCenter = STATE_CENTERS[stateCode];
  const counties = require(`./countyTopoJson/${stateCode}.json`);
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
        stateCenter={stateCenter}
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
        stateCenter={stateCenter}
        counties={counties}
        geographyFactory={geo => {
          const geoFullFips = geo.properties.GEOID;
          const isSelected = region && region.fipsCode === geoFullFips;
          const geoRegion = regions.findByFipsCode(geoFullFips);

          return (
            <Link
              key={geoFullFips}
              to={`/${geoRegion.relativeUrl}`}
              aria-label={geoRegion.fullName}
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
                onClick={() => setSelectedCounty()}
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

const CountyMapLayer = ({ stateCenter, counties, geographyFactory }) => {
  return (
    <CountyMapLayerWrapper>
      <ComposableMap
        projection={
          stateCenter.StateCode === 'AK' ? 'geoAlbers' : 'geoMercator'
        }
        data-tip=""
        projectionConfig={{
          rotate: stateCenter.rotate ? stateCenter.rotate : null,
          scale: stateCenter.scale ? stateCenter.scale : 4000,
        }}
      >
        <ZoomableGroup
          center={[stateCenter.Longitude, stateCenter.Latitude]}
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
