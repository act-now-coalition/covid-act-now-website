import React from 'react';
import { Geographies, Geography } from 'react-simple-maps';
import { useCountyGeographies } from 'common/hooks';

const MapCounties: React.FC<{
  getFillColor: (geo: any) => string;
}> = ({ getFillColor }) => {
  const { pending, result: geoCounties } = useCountyGeographies();

  if (pending || !geoCounties) {
    return <g />;
  }

  return (
    <Geographies geography={geoCounties}>
      {({ geographies }) =>
        geographies.map(geo => {
          return (
            <Geography
              key={geo.id}
              geography={geo}
              fill={getFillColor(geo)}
              strokeWidth={0}
              role="img"
            />
          );
        })
      }
    </Geographies>
  );
};

export default MapCounties;
