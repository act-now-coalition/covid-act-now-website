import React from 'react';
import EmailAlertsFooter from './EmailAlertsFooter';
import regions from 'common/regions';

export default {
  title: 'Shared Components/EmailAlertsFooter',
  component: EmailAlertsFooter,
};

export const Example = () => (
  <EmailAlertsFooter
    defaultRegionsFips={[
      regions.states[0].fipsCode,
      regions.states[10].fipsCode,
    ]}
  />
);
