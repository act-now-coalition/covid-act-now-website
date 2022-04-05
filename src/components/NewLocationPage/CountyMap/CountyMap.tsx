import React from 'react';
import RegionMap from 'components/RegionMap';
import FixedAspectRatio from 'components/FixedAspectRatio/FixedAspectRatio';
import {
  MapContainer,
  ThermometerContainer,
  ToggleWrapper,
  Row,
  VaccinationsThermLabel,
} from './CountyMap.style';
import { Region } from 'common/regions';
import {
  ButtonGroup,
  Button,
} from 'components/SharedComponents/SharedComponents.style';
import { trackEvent, EventAction, EventCategory } from 'components/Analytics';
import {
  CommunityLevelThermometer,
  VaccinationsThermometer,
} from 'components/HorizontalThermometer';
import { getAlertColor } from 'components/RegionMap/RegionMap.style';
import { LocationSummary } from 'common/location_summaries';
import { vaccineColorFromLocationSummary } from 'common/colors';
import { StorageKeys, useLocalStorage } from 'common/utils/storage';

enum MapType {
  VACCINATIONS = '% Vaccinated',
  COMMUNITY_LEVEL = 'Community levels',
}

interface MapTypeInfo {
  thermometer: React.ReactNode;
  colorMap: (locationSummary: LocationSummary) => string;
}

const MAP_TYPE_INFO: { [key in MapType]: MapTypeInfo } = {
  [MapType.VACCINATIONS]: {
    thermometer: (
      <Row>
        <VaccinationsThermLabel>
          Pop. with
          <br />
          <strong>1+ dose</strong>
        </VaccinationsThermLabel>
        <VaccinationsThermometer />
      </Row>
    ),
    colorMap: (locationSummary: LocationSummary) =>
      vaccineColorFromLocationSummary(locationSummary),
  },
  [MapType.COMMUNITY_LEVEL]: {
    thermometer: <CommunityLevelThermometer />,
    colorMap: (locationSummary: LocationSummary) =>
      getAlertColor(locationSummary),
  },
};

/* The default aspect-ratio for the state and US maps is 800x600 */

const CountyMap: React.FC<{ region: Region }> = React.memo(({ region }) => {
  const [mapType, setMapType] = useLocalStorage<MapType>(
    StorageKeys.COUNTY_MAP_TYPE,
    MapType.COMMUNITY_LEVEL,
  );

  const onClickToggle = (
    event: React.MouseEvent<HTMLElement>,
    newView: MapType | null,
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
        <ToggleWrapper>
          <ButtonGroup value={mapType} exclusive onChange={onClickToggle}>
            <Button value={MapType.VACCINATIONS}>{MapType.VACCINATIONS}</Button>
            <Button value={MapType.COMMUNITY_LEVEL}>
              {MapType.COMMUNITY_LEVEL}
            </Button>
          </ButtonGroup>
        </ToggleWrapper>
        {MAP_TYPE_INFO[mapType].thermometer}
      </ThermometerContainer>
    </MapContainer>
  );
});

export default CountyMap;
