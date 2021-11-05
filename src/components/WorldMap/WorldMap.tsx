import React from 'react';
import { Container, NationShape } from './WorldMap.style';
import { useNationsGeographies } from 'common/hooks';
import { ComposableMap, Geographies } from 'react-simple-maps';

const WorldMap: React.FC<{
  width: number;
  height: number;
  getColor: (nationId: string) => string;
}> = ({ width, height, getColor }) => {
  const { result: nationsTopoJson } = useNationsGeographies();
  return (
    <Container>
      <svg width={width} height={height}>
        <ComposableMap
          projection={'geoEqualEarth'}
          height={height}
          width={width}
        >
          <Geographies geography={nationsTopoJson}>
            {({ geographies }) => (
              <>
                {geographies.map(geography => {
                  const nationId = geography.id;
                  return (
                    <NationShape
                      key={`nation-${nationId}`}
                      geography={geography}
                      $fillColor={getColor(nationId)}
                    />
                  );
                })}
              </>
            )}
          </Geographies>
        </ComposableMap>
      </svg>
    </Container>
  );
};

export default WorldMap;
