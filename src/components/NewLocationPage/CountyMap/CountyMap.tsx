import React, { useState, useEffect } from 'react';
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

// The browser stores the last map type selected by the user in localStorage,
// we need to keep "Risk levels" for COMMUNITY_LEVEL to prevent breaking the
// state for users that had selected "Risk levels" in the past.
enum MapType {
  VACCINATIONS = '% Vaccinated',
  COMMUNITY_LEVEL = 'Risk levels',
}

interface MapTypeInfo {
  thermometer: React.ReactNode;
  colorMap: (locationSummary: LocationSummary) => string;
  mapButtonLabel: string;
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
    mapButtonLabel: '% Vaccinated',
  },
  [MapType.COMMUNITY_LEVEL]: {
    thermometer: <CommunityLevelThermometer />,
    colorMap: (locationSummary: LocationSummary) =>
      getAlertColor(locationSummary),
    mapButtonLabel: 'Community risk level',
  },
};

/**
 * This function ensures the map doesn't overlap the footer content
 * when the user scrolls to the bottom of the page.
 */
function useMapContainerOffset(): number | null {
  const [scrollY, setScrollY] = useState(0);
  const pageHeight = document.documentElement.scrollHeight;
  const footerHeight = document.getElementsByTagName('footer')[0]?.scrollHeight;
  /**
   * Once the user scrolls far enough that the footer is within 500px of the top of the screen,
   * we want to freeze the map tile so that it can't overlap with the footer and obscure footer content.
   * To do that we set its bottom to be 100px above the footer.
   */
  const offsetPoint = pageHeight - footerHeight - 500;
  const bottomPosition = scrollY > offsetPoint ? footerHeight + 100 : null;
  useEffect(() => {
    const onScroll = () => {
      setScrollY(window.scrollY);
    };
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);
  return bottomPosition;
}

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

  const mapTypeInfo = MAP_TYPE_INFO[mapType];

  const bottomPosition = useMapContainerOffset();

  return (
    <MapContainer bottomPosition={bottomPosition}>
      <FixedAspectRatio widthToHeight={800 / 600}>
        <RegionMap region={region} colorMap={mapTypeInfo.colorMap} />
      </FixedAspectRatio>
      <ThermometerContainer>
        <ToggleWrapper>
          <ButtonGroup value={mapType} exclusive onChange={onClickToggle}>
            <Button value={MapType.VACCINATIONS}>
              {MAP_TYPE_INFO[MapType.VACCINATIONS].mapButtonLabel}
            </Button>
            <Button value={MapType.COMMUNITY_LEVEL}>
              {MAP_TYPE_INFO[MapType.COMMUNITY_LEVEL].mapButtonLabel}
            </Button>
          </ButtonGroup>
        </ToggleWrapper>
        {mapTypeInfo.thermometer}
      </ThermometerContainer>
    </MapContainer>
  );
});

export default CountyMap;
