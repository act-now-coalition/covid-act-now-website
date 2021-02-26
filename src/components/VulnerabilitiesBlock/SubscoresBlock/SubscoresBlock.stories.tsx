import React from 'react';
import SubscoresBlock from './SubscoresBlock';
import { useCcviForFips } from 'common/hooks';

export default {
  title: 'Shared Components/Vulnerabilities/CcviSubscoreTable',
  component: SubscoresBlock,
};

export const Block = () => {
  const scores = useCcviForFips('06');

  if (!scores) {
    return null;
  }

  return <SubscoresBlock scores={scores} />;
};
