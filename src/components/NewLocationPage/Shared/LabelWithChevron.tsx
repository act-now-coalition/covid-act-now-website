import React from 'react';
import { Chevron } from './Shared.style';
import TextAndIconWithSpecialWrapping from 'components/TextAndIconWithSpecialWrapping/TextAndIconWithSpecialWrapping';

const LabelWithChevron: React.FC<{ text: string }> = ({ text }) => {
  return (
    <div style={{ lineHeight: 1.2 }}>
      <TextAndIconWithSpecialWrapping text={text} icon={<Chevron />} />
    </div>
  );
};

export default LabelWithChevron;
