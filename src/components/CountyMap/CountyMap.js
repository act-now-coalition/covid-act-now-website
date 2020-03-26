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

const CountyMap = () => {
  const [data, setData] = useState([]);
  const { id: location } = useParams();
  const state = STATE_CENTERS[location];
  const counties = require(`./data/${location}.json`);

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
  return (
    <div>
      {data && (
        <ComposableMap
          projection="geoAlbers"
          data-tip=""
          style={{ border: '1px solid black' }}
          projectionConfig={{
            rotate: state.rotate ? state.rotate : null,
            scale: state.scale ? state.scale : 2000,
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
                      fill={cur ? colorScale(cur.unemployment_rate) : '#EEE'}
                      onMouseEnter={() => {
                        const { NAME } = geo.properties;
                        setContent(
                          `${NAME} — ${cur ? cur.unemployment_rate : 'n/a'}`,
                        );
                      }}
                      onMouseLeave={() => {
                        setContent('');
                      }}
                      style={{
                        hover: {
                          fill: '#F53',
                          outline: 'none',
                        },
                        pressed: {
                          fill: '#E42',
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
