import React from 'react';
import { Region } from 'common/regions';
import MetroAreaMap from './MetroAreaMap';

const RegionMap: React.FC<{
  height?: number;
  width?: number;
  region: Region;
}> = ({ height = 600, width = 800, region }) => (
  <MetroAreaMap region={region} width={width} height={height} />
);

export default RegionMap;
