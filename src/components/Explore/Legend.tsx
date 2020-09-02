import React from 'react';
import { Series } from './interfaces';
import * as Styles from './Explore.style';
import { LegendMarker } from './SeriesChart';

const Legend: React.FC<{ series: Series[] }> = ({ series }) => {
  return (
    <Styles.LegendContainer>
      {series.map(({ type, label, params }, i) => (
        <Styles.LegendItem key={`legend-item-${i}`}>
          <Styles.LegendItemMarker>
            <LegendMarker type={type} params={params} />
          </Styles.LegendItemMarker>
          <Styles.LegendItemLabel>{label}</Styles.LegendItemLabel>
        </Styles.LegendItem>
      ))}
    </Styles.LegendContainer>
  );
};

export default Legend;
