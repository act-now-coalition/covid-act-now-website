import React from 'react';
import ThemesBlock from './ThemesBlock/ThemesBlock';
import { useCcviForFips } from 'common/hooks';

const VulnerabilitiesBlock = () => {
  const scores = useCcviForFips('06');

  if (!scores) {
    return null;
  }

  return (
    <>
      <ThemesBlock scores={scores} />
    </>
  );
};

export default VulnerabilitiesBlock;
