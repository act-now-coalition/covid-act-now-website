import React from 'react';
import { Geographies, Geography } from 'react-simple-maps';
import { useCountyGeographies } from 'common/hooks';

const MapCounties: React.FC<{
  getFillColor: (fipsCode: string) => string;
}> = ({ getFillColor }) => {
  const { pending, result: geoCounties } = useCountyGeographies();

  if (pending || !geoCounties) {
    return <g />;
  }

  return (
    <Geographies geography={geoCounties}>
      {({ geographies }) =>
        geographies.map(geo => (
          <Geography
            key={geo.id}
            geography={geo}
            fill={getFillColor(geo.id)}
            strokeWidth={0}
            role="img"
          />
        ))
      }
    </Geographies>
  );
};

export default MapCounties;
