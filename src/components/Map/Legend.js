import React from 'react';

import {
  ColorBox,
  LegendTitle,
  LegendContainer,
  LegendItemHeader,
  LegendWrapper,
} from './Legend.style';

export function Legend(props) {
  return (
    <LegendWrapper condensed={props.condensed}>
      {!props.condensed && <LegendTitle>COVID Risk:</LegendTitle>}
      <LegendContainer {...props}>
        {React.Children.map(props.children, child =>
          React.cloneElement(child, { condensed: props.condensed }),
        )}
      </LegendContainer>
    </LegendWrapper>
  );
}

export const LegendItem = ({ title, color }) => (
  <LegendItemHeader>
    <ColorBox color={color} />
    {title}
  </LegendItemHeader>
);
