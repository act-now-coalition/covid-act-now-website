import React from 'react';
import ShareButton from './ShareButton';
import VaccineButton from './VaccineButton';

const HeaderButtons: React.FC<{ onClickShare: () => void }> = ({
  onClickShare,
}) => {
  return (
    <div style={{ display: 'flex' }}>
      <ShareButton onClickShare={onClickShare} />
      <VaccineButton />
    </div>
  );
};

export default HeaderButtons;
