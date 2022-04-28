/**
 * For daily new cases + percent vaccinated.
 * "Per 100k" // "1+ dose"
 */

import React from 'react';
import { SubLabel, SubLabelWrapper } from './SummaryStat.style';

const MetricSubLabel: React.FC<{ text: string; splitText?: boolean }> = ({
  text,
  splitText,
}) => {
  return (
    <SubLabelWrapper>
      <SubLabel>{text}</SubLabel>
    </SubLabelWrapper>
  );
};

export default MetricSubLabel;
