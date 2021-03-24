import React from 'react';
import * as Styles from './LocationPageHeading.style';
import { Region } from 'common/regions/types';

const LocationHeader: React.FC<{ region: Region }> = ({ region }) => {
  return (
    <Styles.Container>
      <Styles.HeaderTitle $isEmbed={false}>
        <strong>{region.name}</strong>
      </Styles.HeaderTitle>
    </Styles.Container>
  );
};

export default LocationHeader;
