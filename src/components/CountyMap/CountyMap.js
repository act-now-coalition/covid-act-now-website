import React, { useState, useEffect } from 'react';
import {
  ComposableMap,
  Geographies,
  Geography,
  ZoomableGroup,
} from 'react-simple-maps';
import { scaleQuantile } from 'd3-scale';
import { csv } from 'd3-fetch';
import ReactTooltip from 'react-tooltip';
import ca from './ca.json';

const geoUrl = 'https://cdn.jsdelivr.net/npm/us-atlas@3/counties-10m.json';
// const geoUrl =
// 'https://github.com/deldersveld/topojson/blob/master/countries/us-states/CA-06-california-counties.json';

const CountyMap = () => {
  const [data, setData] = useState([]);

  useEffect(() => {
    // https://www.bls.gov/lau/
    const path = `./sampleData.csv`;
    console.log(path);
    csv('/countyConfigData/sampleData.csv').then(counties => {
      setData(counties);
      console.log(counties);
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
  console.log(content);
  console.log('data', data);
  return (
    <div>
      {data && (
        <ComposableMap projection="geoAlbers">
          <ZoomableGroup zoom={2} center={[-122, 37.7]} disablePanning={false}>
            <Geographies geography={ca}>
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
