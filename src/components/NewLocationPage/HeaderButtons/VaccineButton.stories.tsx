import React from 'react';
import VaccineButton from './VaccineButton';
import { useDynamicVaccineButton } from 'common/hooks';

export default {
  title: 'Location Page/Header Buttons',
  component: VaccineButton,
};

export const FindAVaccine = () => {
  const showButton = useDynamicVaccineButton();
  return (
    <div style={{ width: '100%', height: '1500px', border: '1px solid red' }}>
      {showButton && <VaccineButton />}
    </div>
  );
};
