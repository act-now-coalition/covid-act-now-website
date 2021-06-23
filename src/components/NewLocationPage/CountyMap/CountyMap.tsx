import React, { useState } from 'react';
import RegionMap from 'components/RegionMap';
import FixedAspectRatio from 'components/FixedAspectRatio/FixedAspectRatio';
import { MapContainer, ThermometerContainer } from './CountyMap.style';
import { Region } from 'common/regions';
import {
  ButtonGroup,
  Button,
} from 'components/SharedComponents/SharedComponents.style';
import { trackEvent, EventAction, EventCategory } from 'components/Analytics';
import RiskLevelThermometer from 'components/HorizontalThermometer';
import VaccinationsThermometer from 'components/HorizontalThermometer/VaccinationsThermometer/VaccinationsThermometer';
import { LocationSummary } from 'common/location_summaries';
import { vaccineColorFromLocationSummary } from 'common/colors';
import { getAlertColor } from 'components/RegionMap/RegionMap.style';

enum MapType {
  VACCINATIONS = '% Vaccinated',
  RISK_LEVEL = 'Risk levels',
}

interface MapTypeInfo {
  thermometer: React.ReactNode;
  colorMap: (locationSummary: LocationSummary) => string;
}

const MAP_TYPE_INFO: { [key in MapType]: MapTypeInfo } = {
  [MapType.VACCINATIONS]: {
    thermometer: <VaccinationsThermometer />,
    colorMap: (locationSummary: LocationSummary) =>
      vaccineColorFromLocationSummary(locationSummary),
  },

  [MapType.RISK_LEVEL]: {
    thermometer: <RiskLevelThermometer />,
    colorMap: (locationSummary: LocationSummary) =>
      getAlertColor(locationSummary),
  },
};

/* The default aspect-ratio for the state and US maps is 800x600 */

const CountyMap: React.FC<{ region: Region }> = React.memo(({ region }) => {
  const [mapType, setMapType] = useState<MapType>(MapType.RISK_LEVEL);

  const onClickToggle = (
    event: React.MouseEvent<HTMLElement>,
    newView: MapType,
  ) => {
    if (newView) {
      setMapType(newView);
      trackEvent(
        EventCategory.MINI_MAP,
        EventAction.SELECT,
        `Select: ${mapType}`,
      );
    }
  };

  return (
    <MapContainer>
      <FixedAspectRatio widthToHeight={800 / 600}>
        <RegionMap region={region} colorMap={MAP_TYPE_INFO[mapType].colorMap} />
      </FixedAspectRatio>
      <ThermometerContainer>
        <ButtonGroup value={mapType} exclusive onChange={onClickToggle}>
          <Button value={MapType.VACCINATIONS}>{MapType.VACCINATIONS}</Button>
          <Button value={MapType.RISK_LEVEL}>{MapType.RISK_LEVEL}</Button>
        </ButtonGroup>
        {MAP_TYPE_INFO[mapType].thermometer}
      </ThermometerContainer>
    </MapContainer>
  );
});

export default CountyMap;
