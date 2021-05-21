import React from 'react';
import RegionMap from 'components/RegionMap';
import FixedAspectRatio from 'components/FixedAspectRatio/FixedAspectRatio';
import { MapContainer } from './CountyMap.style';
import { Region } from 'common/regions';

/* The default aspect-ratio for the state and US maps is 800x600 */

const CountyMap: React.FC<{ region: Region }> = React.memo(({ region }) => {
  return (
    <MapContainer>
      <FixedAspectRatio widthToHeight={800 / 600}>
        <RegionMap region={region} />
      </FixedAspectRatio>
    </MapContainer>
  );
});

export default CountyMap;
