import React from 'react';
import { Paragraph } from 'components/Markdown';
import { Wrapper } from './NationalText.style';

const NationalText: React.FC<{
  nationalSummaryText: React.ReactElement;
}> = ({ nationalSummaryText }) => {
  return (
    <Wrapper>
      <Paragraph>{nationalSummaryText}</Paragraph>
    </Wrapper>
  );
};

export default NationalText;
