import React from 'react';
import { Content, Wrapper, ArrowUp, ArrowDown } from './InfoPopup.style';

export enum ArrowVariation {
  UP,
  DOWN,
}

const InfoPopup: React.FC<{ content: string; variation: ArrowVariation }> = ({
  content,
  variation,
}) => {
  return (
    <>
      <Wrapper>
        {variation === ArrowVariation.DOWN && <ArrowUp />}
        <Content>{content}</Content>
        {variation === ArrowVariation.UP && <ArrowDown />}
      </Wrapper>
    </>
  );
};

export default InfoPopup;
