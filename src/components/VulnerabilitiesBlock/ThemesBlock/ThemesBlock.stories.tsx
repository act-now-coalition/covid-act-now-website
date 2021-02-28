import React from 'react';
import ThemesBlock from './ThemesBlock';
import { useCcviForFips } from 'common/hooks';

export default {
  title: 'Shared Components/Vulnerabilities/ThemesBlock',
  component: ThemesBlock,
};

export const Block = () => {
  const scores = useCcviForFips('06');

  if (!scores) {
    return null;
  }

  return <ThemesBlock scores={scores} />;
};
