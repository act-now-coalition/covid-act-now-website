import React from 'react';
import VaccineButton from './VaccineButton';

const HeaderButtons: React.FC = () => {
  return (
    <div style={{ display: 'flex' }}>
      <VaccineButton />
    </div>
  );
};

export default HeaderButtons;
