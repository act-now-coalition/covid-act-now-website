import React from 'react';
import RegionMap from './RegionMap';
import regions from 'common/regions/region_db';
import { MetroArea, County, Region } from 'common/regions';

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
  const metroArea = regions.findByFipsCode('35620') as Region;
  return (
    <Container>
      <RegionMap region={metroArea} width={300} height={300} />
    </Container>
  );
};

export const BostonMetroArea = () => {
  const metroArea = regions.findByFipsCode('14460') as MetroArea;
  return (
    <Container>
      <RegionMap region={metroArea} width={300} height={300} />
    </Container>
  );
};

export const KingCountyWA = () => {
  const county = regions.findByFipsCode('53033') as County;
  return (
    <Container>
      <RegionMap region={county} width={300} height={300} />
    </Container>
  );
};

export const CascadeCountyMA = () => {
  const county = regions.findByFipsCode('30013') as County;
  return (
    <Container>
      <RegionMap region={county} width={300} height={300} />
    </Container>
  );
};
