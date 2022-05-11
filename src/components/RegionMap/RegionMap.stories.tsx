import React from 'react';
import RegionMap from './RegionMap';
import regions, { MetroArea, County, Region } from 'common/regions';
import { getAlertColor } from 'components/RegionMap/RegionMap.style';
import { LocationSummary } from 'common/location_summaries';

export default {
  title: 'Components/Region Map',
  component: RegionMap,
};

const Container: React.FC = ({ children }) => (
  <div style={{ width: 300, height: 300, border: 'solid 1px #555' }}>
    {children}
  </div>
);

const colorMap = (locationSummary: LocationSummary) =>
  getAlertColor(locationSummary);

export const NYMetroArea = () => {
  const metroArea = regions.findByFipsCode('35620') as Region;
  return (
    <Container>
      <RegionMap
        region={metroArea}
        width={300}
        height={300}
        colorMap={colorMap}
      />
    </Container>
  );
};

export const BostonMetroArea = () => {
  const metroArea = regions.findByFipsCode('14460') as MetroArea;
  return (
    <Container>
      <RegionMap
        region={metroArea}
        width={300}
        height={300}
        colorMap={colorMap}
      />
    </Container>
  );
};

export const KingCountyWA = () => {
  const county = regions.findByFipsCode('53033') as County;
  return (
    <Container>
      <RegionMap region={county} width={300} height={300} colorMap={colorMap} />
    </Container>
  );
};

export const CascadeCountyMA = () => {
  const county = regions.findByFipsCode('30013') as County;
  return (
    <Container>
      <RegionMap region={county} width={300} height={300} colorMap={colorMap} />
    </Container>
  );
};
