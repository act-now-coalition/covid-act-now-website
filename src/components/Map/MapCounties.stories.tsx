import React from 'react';
import { ComposableMap } from 'react-simple-maps';
import MapCounties from './MapCounties';

export default {
  title: 'SharedComponents/MapCounties',
  components: MapCounties,
};

export const Example = () => (
  <ComposableMap>
    <MapCounties getFillColor={fipsCode => '#ddd'} />
  </ComposableMap>
);
