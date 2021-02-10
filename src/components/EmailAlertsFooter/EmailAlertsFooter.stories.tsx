import React from 'react';
import EmailAlertsFooter from './EmailAlertsFooter';
import regions from 'common/regions';

export default {
  title: 'Shared Components/EmailAlertsFooter',
  component: EmailAlertsFooter,
};

export const Example = () => (
  <EmailAlertsFooter defaultRegions={[regions.states[0], regions.states[10]]} />
);
