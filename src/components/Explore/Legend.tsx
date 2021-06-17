import React from 'react';
import some from 'lodash/some';
import { Series } from './interfaces';
import * as Styles from './Explore.style';
import { LegendMarker } from './SeriesChart';

const Legend: React.FC<{ seriesList: Series[] }> = ({ seriesList }) => {
  const hasData = some(seriesList, ({ data }) => data.length > 0);

  if (!hasData) {
    return null;
  }

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
