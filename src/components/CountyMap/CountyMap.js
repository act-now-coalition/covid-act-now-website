import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import {
  ComposableMap,
  Geographies,
  Geography,
  ZoomableGroup,
} from 'react-simple-maps';
import { scaleQuantile } from 'd3-scale';
import { csv } from 'd3-fetch';
import ReactTooltip from 'react-tooltip';
import STATE_CENTERS from '../../enums/us_state_centers';

const CountyMap = ({
  selectedCounty,
  setSelectedCounty,
  fill,
  stateSummary = {},
}) => {
  const [data, setData] = useState([]);
  const { id: location } = useParams();
  const _location = location.toUpperCase();
  const state = STATE_CENTERS[_location];
  const counties = require(`./countyTopoJson/${_location.toUpperCase()}.json`);
  const countiesWithData =
    stateSummary && stateSummary.counties_with_data
      ? stateSummary.counties_with_data
      : [];

  useEffect(() => {
    csv('/countyConfigData/sampleData.csv').then(counties => {
      setData(counties);
    });
  }, []);

  const colorScale = scaleQuantile()
    .domain(data.map(d => d.unemployment_rate))
    .range([
      '#ffedea',
      '#ffcec5',
      '#ffad9f',
      '#ff8a75',
      '#ff5533',
      '#e2492d',
      '#be3d26',
      '#9a311f',
      '#782618',
    ]);

  const [content, setContent] = useState('');
  // Once we add fill back, add this to geography
  // fill={cur ? colorScale(cur.unemployment_rate) : '#EEE'}
  return (
    <div>
      {data && (
        <ComposableMap
          projection="geoAlbers"
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
              {({ geographies }) =>
                geographies.map(geo => {
                  const cur = data.find(s => s.id === geo.properties.GEOID);
                  return (
                    <Geography
                      key={geo.rsmKey}
                      geography={geo}
                      fillOpacity={
                        selectedCounty &&
                        selectedCounty.full_fips_code === geo.properties.GEOID
                          ? 0.5
                          : 1
                      }
                      fill={
                        countiesWithData.includes(geo.properties.GEOID)
                          ? fill
                          : '#ccc'
                      }
                      stroke={'white'}
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
                          // fill: '#A0AEC0',
                          opacity: '0.5',
                          outline: 'none',
                        },
                        pressed: {
                          // fill: '#A0AEC0',
                          outline: 'none',
                        },
                      }}
                    />
                  );
                })
              }
            </Geographies>
          </ZoomableGroup>
        </ComposableMap>
      )}
      <ReactTooltip>{content}</ReactTooltip>
    </div>
  );
};

export default CountyMap;
