/**
 * For daily new cases + percent vaccinated.
 * "Per 100k" // "1+ dose"
 */

import React from 'react';
import { SubLabel, SubLabelWrapper } from './SummaryStat.style';

const MetricSubLabel: React.FC<{ text: string[]; isMobile?: boolean }> = ({
  text,
  isMobile,
}) => {
  return (
    <SubLabelWrapper>
      <SubLabel>{text[0]}</SubLabel> {!isMobile && <br />}
      <SubLabel>{text[1]}</SubLabel>
    </SubLabelWrapper>
  );
};

export default MetricSubLabel;
