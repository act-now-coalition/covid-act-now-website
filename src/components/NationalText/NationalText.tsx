import React from 'react';
import { Paragraph } from 'components/Markdown';
import { Wrapper } from './NationalText.style';
import { getNationalText } from './utils';

const NationalText: React.FC = () => {
  return (
    <Wrapper>
      <Paragraph>{getNationalText()}</Paragraph>
    </Wrapper>
  );
};

export default NationalText;
