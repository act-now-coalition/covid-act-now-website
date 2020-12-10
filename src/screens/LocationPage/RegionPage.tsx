import React from 'react';
import { Region } from 'common/regions';

const RegionPage: React.FC<{ region: Region }> = ({ region }) => {
  return <div>{region.fullName}</div>;
};

export default RegionPage;
