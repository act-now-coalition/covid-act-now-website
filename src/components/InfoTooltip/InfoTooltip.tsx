import React from 'react';
import { Content, Wrapper, ArrowUp, ArrowDown } from './InfoTooltip.style';

export enum ArrowVariation {
  UP,
  DOWN,
}

const InfoTooltip: React.FC<{ content: string; variation: ArrowVariation }> = ({
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

export default InfoTooltip;
