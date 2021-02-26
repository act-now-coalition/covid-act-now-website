import React from 'react';
import SubscoresBlock from './SubscoresBlock/SubscoresBlock';
import { useCcviForFips } from 'common/hooks';

const VulnerabilitiesBlock = () => {
  const scores = useCcviForFips('06');

  if (!scores) {
    return null;
  }

  return (
    <>
      <SubscoresBlock scores={scores} />
    </>
  );
};

export default VulnerabilitiesBlock;
