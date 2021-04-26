import React from 'react';
import EmailForm from './EmailForm';
import regions from 'common/regions';

export default {
  title: 'Location page redesign/Email form',
  component: EmailForm,
};

export const NewYork = () => {
  const state = regions.findByFipsCodeStrict('22');
  return <EmailForm region={state} />;
};
