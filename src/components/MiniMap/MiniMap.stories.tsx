import React from 'react';
import MiniMap from './MiniMap';
import regions from 'common/regions';
import { MAP_FILTERS } from 'screens/LocationPage/Enums/MapFilterEnums';

export default {
  title: 'Shared Components/MiniMap',
  component: MiniMap,
  argTypes: {
    setMobileMenuOpen: { actions: 'open menu' },
    setMapOption: { actions: 'set map option' },
  },
};

export const USA = (args: any) => {
  const state = regions.findByFipsCode('36');
  return (
    <MiniMap
      {...args}
      region={state}
      mobileMenuOpen={true}
      mapOption={MAP_FILTERS.NATIONAL}
    />
  );
};

export const State = (args: any) => {
  const state = regions.findByFipsCode('36');
  return (
    <MiniMap
      {...args}
      region={state}
      mobileMenuOpen={true}
      mapOption={MAP_FILTERS.STATE}
    />
  );
};

export const MetroArea = (args: any) => {
  const metroArea = regions.findByFipsCode('14460');
  return (
    <MiniMap
      {...args}
      region={metroArea}
      mobileMenuOpen={true}
      mapOption={MAP_FILTERS.MSA}
    />
  );
};

export const County = (args: any) => {
  const county = regions.findByFipsCode('13121');
  return (
    <MiniMap
      {...args}
      region={county}
      mobileMenuOpen={true}
      mapOption={MAP_FILTERS.STATE}
    />
  );
};
