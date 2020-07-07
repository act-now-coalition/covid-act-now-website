import React from 'react';

import {
  ColorBox,
  LegendTitle,
  LegendContainer,
  LegendItemHeader,
  LegendItemContainer,
  LegendWrapper,
} from './Legend.style';

export function Legend(props) {
  return (
    <LegendWrapper condensed={props.condensed}>
      {!props.condensed && !props.hideLegendTitle && (
        <LegendTitle>COVID Risk:</LegendTitle>
      )}
      <LegendContainer {...props}>
        {React.Children.map(props.children, child =>
          React.cloneElement(child, { condensed: props.condensed }),
        )}
      </LegendContainer>
    </LegendWrapper>
  );
}

export function LegendItem(props) {
  const { title, color, condensed } = props;
  return (
    <LegendItemContainer condensed={condensed}>
      <LegendItemHeader>
        <ColorBox color={color} />
        {title}
      </LegendItemHeader>
    </LegendItemContainer>
  );
}
