import React from 'react';
import { Series } from './interfaces';
import * as Styles from './Explore.style';
import { LegendMarker } from './SeriesChart';

const Legend: React.FC<{ series: Series[] }> = ({ series }) => {
  return (
    <Styles.LegendContainer>
      {series.map((serie, i) => (
        <Styles.LegendItem key={`legend-item-${i}`}>
          <Styles.LegendItemMarker>
            <LegendMarker type={serie.type} />
          </Styles.LegendItemMarker>
          <Styles.LegendItemLabel>{serie.label}</Styles.LegendItemLabel>
        </Styles.LegendItem>
      ))}
    </Styles.LegendContainer>
  );
};

export default Legend;
