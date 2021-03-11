import React from 'react';
import AvailabilityTable, {
  AVAILABILITY_SNAPSHOT,
} from 'screens/DataApi/AvailabilityTable';

export default {
  title: 'Data API/Data Availability Table',
  component: AvailabilityTable,
};

const FULL_AVAILABILITY = [
  {
    name: 'Cases',
    state: {
      totalRegions: 50,
      regionsAvailable: 50,
      totalStates: 50,
      statesAvailable: 50,
    },
    county: {
      totalRegions: 3200,
      regionsAvailable: 3200,
      totalStates: 50,
      statesAvailable: 50,
    },
    metro: {
      totalRegions: 720,
      regionsAvailable: 0,
      totalStates: 50,
      statesAvailable: 50,
    },
  },
];
export const Partial = () => {
  return <AvailabilityTable rows={AVAILABILITY_SNAPSHOT} />;
};
