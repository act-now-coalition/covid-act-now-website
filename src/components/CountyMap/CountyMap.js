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

// const geoUrl = 'https://cdn.jsdelivr.net/npm/us-atlas@3/counties-10m.json';
// const geoUrl =
// 'https://github.com/deldersveld/topojson/blob/master/countries/us-states/CA-06-california-counties.json';

const CountyMap = () => {
  const [data, setData] = useState([]);
  const { id: location } = useParams();
  const state = STATE_CENTERS[location];
  const counties = require(`./data/${location}.json`);

  useEffect(() => {
    // https://www.bls.gov/lau/
    const path = `./sampleData.csv`;
    csv('/countyConfigData/sampleData.csv').then(counties => {
      setData(counties);
    });

    csv('/countyConfigData/sampleData.csv').then(counties => {
      setData(counties);
    });
  }, []);

  const rounded = num => {
    if (num > 1000000000) {
      return Math.round(num / 100000000) / 10 + 'Bn';
    } else if (num > 1000000) {
      return Math.round(num / 100000) / 10 + 'M';
    } else {
      return Math.round(num / 100) / 10 + 'K';
    }
  };

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

  const [content, setContent] = useState('asdf');
  return (
    <div>
      {data && (
        <ComposableMap
          projection="geoAlbers"
          data-tip=""
          projectionConfig={{
            rotate: [108, 0],
            scale: 2000,
          }}
        >
          <ZoomableGroup
            center={[state.Longitude, state.Latitude]}
            disablePanning={false}
          >
            <Geographies geography={counties}>
              {({ geographies }) =>
                geographies.map(geo => {
                  // console.log(geo);
                  // const cur = data.find(s => s.id === geo.id);
                  const cur = data.find(s => s.id === geo.properties.GEOID);
                  return (
                    <Geography
                      key={geo.rsmKey}
                      geography={geo}
                      fill={cur ? colorScale(cur.unemployment_rate) : '#EEE'}
                      onMouseEnter={() => {
                        const { NAME } = geo.properties;
                        console.log(geo);
                        setContent(`${NAME} — ${cur.unemployment_rate}`);
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
