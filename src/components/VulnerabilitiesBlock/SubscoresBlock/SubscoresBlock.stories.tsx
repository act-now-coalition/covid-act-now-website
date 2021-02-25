import React from 'react';
import SubscoresBlock from './SubscoresBlock';

export default {
  title: 'Shared Components/CcviSubscoreTable',
  component: SubscoresBlock,
};

export const Table = () => {
  return <SubscoresBlock score={10} />;
};
