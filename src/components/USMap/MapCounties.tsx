import React from 'react';
import { Geographies } from 'react-simple-maps';
import { useCountyGeographies } from 'common/hooks';
import { CountyGeography } from './MapCounties.style';

const MapCounties: React.FC<{
  getFillColor: (fipsCode: string) => string;
}> = ({ getFillColor }) => {
  const { result: allCountiesTopoJson } = useCountyGeographies();

  if (!allCountiesTopoJson) {
    return <g />;
  }

  return (
    <Geographies geography={allCountiesTopoJson}>
      {({ geographies }) =>
        geographies.map(geo => (
          <CountyGeography
            key={geo.id}
            geography={geo}
            fill={getFillColor(geo.id)}
            strokeWidth={0}
            role="img"
            aria-label={geo.properties.name}
          />
        ))
      }
    </Geographies>
  );
};

export default MapCounties;
