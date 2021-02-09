import React from 'react';
import regions from 'common/regions';
import EmailAlertsForm from './EmailAlertsForm';

export default {
  title: 'Shared Components/EmailAlertsForm',
  component: EmailAlertsForm,
};

const { states } = regions;

export const Example = () => (
  <div style={{ maxWidth: 400 }}>
    <EmailAlertsForm
      autocompleteRegions={states}
      defaultRegions={[states[0], regions.counties[3]]}
    />
  </div>
);
