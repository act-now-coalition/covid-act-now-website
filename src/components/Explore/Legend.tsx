import React from 'react';
import { Series } from './interfaces';
import * as Styles from './Explore.style';
import { LegendMarker } from './SeriesChart';

const Legend: React.FC<{ seriesList: Series[] }> = ({ seriesList }) => {
  return (
    <Styles.LegendContainer>
      {seriesList.map(({ type, label }, i) => (
        <Styles.LegendItem key={`legend-item-${i}`}>
          <Styles.LegendItemMarker>
            <LegendMarker type={type} />
          </Styles.LegendItemMarker>
          <Styles.LegendItemLabel>{label}</Styles.LegendItemLabel>
        </Styles.LegendItem>
      ))}
    </Styles.LegendContainer>
  );
};

export default Legend;
