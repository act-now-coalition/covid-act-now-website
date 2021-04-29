import React from 'react';
import ShareButton from './ShareButton';
import VaccineButton from './VaccineButton';

const HeaderButtons: React.FC = () => {
  return (
    <div style={{ display: 'flex' }}>
      <ShareButton />
      <VaccineButton />
    </div>
  );
};

export default HeaderButtons;
