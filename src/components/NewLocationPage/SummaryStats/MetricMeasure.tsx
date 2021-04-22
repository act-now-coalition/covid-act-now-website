import React from 'react';
import { MeasureText, MeasureTextWrapper } from './SummaryStats.style';

const MetricMeasure: React.FC<{ text: string[]; isMobile: boolean }> = ({
  text,
  isMobile,
}) => {
  return (
    <MeasureTextWrapper>
      <MeasureText>{text[0]}</MeasureText> {!isMobile && <br />}
      <MeasureText>{text[1]}</MeasureText>
    </MeasureTextWrapper>
  );
};

export default MetricMeasure;
