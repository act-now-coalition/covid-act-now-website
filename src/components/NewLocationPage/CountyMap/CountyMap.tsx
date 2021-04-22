import React from 'react';
import { ParentSize } from '@vx/responsive';
import RegionMap from 'components/RegionMap';
import { MapContainerInner, MapContainer } from './CountyMap.style';
import { Region } from 'common/regions';

const CountyMap: React.FC<{ region: Region; mapWidth: number }> = ({
  region,
  mapWidth,
}) => {
  return (
    <>
      <MapContainerInner mapWidth={mapWidth}>
        <RegionMap region={region} />
      </MapContainerInner>
    </>
  );
};

const CountyMapAutosize: React.FC<{ region: Region }> = ({ region }) => {
  return (
    <MapContainer>
      <ParentSize>
        {({ width }) => <CountyMap region={region} mapWidth={width} />}
      </ParentSize>
    </MapContainer>
  );
};

export default CountyMapAutosize;
