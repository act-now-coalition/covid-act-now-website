import React from 'react';

import {
  ColorBox,
  LegendContainer,
  LegendItemHeader,
  LegendItemContainer,
  LegendWrapper,
} from './Legend.style';

interface LegendProps {
  children: React.ReactElement[];
  condensed?: boolean;
}

interface LegendItemProps {
  title: string;
  color: string;
  condensed?: boolean;
}

export function Legend({ children, condensed = false }: LegendProps) {
  return (
    <LegendWrapper $condensed={condensed}>
      <LegendContainer $condensed={condensed}>
        {React.Children.map(children, child =>
          React.cloneElement(child, { condensed: condensed }),
        )}
      </LegendContainer>
    </LegendWrapper>
  );
}

export function LegendItem({
  title,
  color,
  condensed = false,
}: LegendItemProps) {
  return (
    <LegendItemContainer $condensed={condensed}>
      <LegendItemHeader>
        <ColorBox color={color} />
        {title}
      </LegendItemHeader>
    </LegendItemContainer>
  );
}
