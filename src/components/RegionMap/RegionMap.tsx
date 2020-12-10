import React from 'react';
import MetroAreaMap from './MetroAreaMap';
import { Region, MetroArea } from 'common/regions';

const RegionMap: React.FC<{
  height?: number;
  width?: number;
  region: Region;
}> = ({ height = 600, width = 800, region }) => {
  if (region instanceof MetroArea) {
    return <MetroAreaMap metroArea={region} width={width} height={height} />;
  }

  return null;
};

export default RegionMap;
