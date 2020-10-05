import React from 'react';
import { Wrapper, Header } from './Recommend.style';
import AccordionFooter from './AccordionFooter';

const Recommend: React.FC = () => {
  return (
    <Wrapper>
      <Header>Recommendations</Header>
      <AccordionFooter />
    </Wrapper>
  );
};

export default Recommend;
