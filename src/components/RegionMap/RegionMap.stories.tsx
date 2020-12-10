import React from 'react';
import RegionMap from './RegionMap';
import MetroAreaMap from './MetroAreaMap';
import regions, { MetroArea } from 'common/regions';

export default {
  title: 'Shared Components/Region Map',
  component: RegionMap,
};

const Container: React.FC = ({ children }) => (
  <div style={{ width: 300, height: 300, border: 'solid 1px #555' }}>
    {children}
  </div>
);

export const NYMetroArea = () => {
  const metroArea = regions.findByFipsCode('35620') as MetroArea;
  const countyFipsList = metroArea.counties.map(county => county.fipsCode);
  return (
    <Container>
      <RegionMap countyFipsList={countyFipsList} />
    </Container>
  );
};

export const FargoMetroArea = () => {
  const metroArea = regions.findByFipsCode('22020') as MetroArea;
  return (
    <Container>
      <MetroAreaMap metroArea={metroArea} width={300} height={300} />
    </Container>
  );
};
