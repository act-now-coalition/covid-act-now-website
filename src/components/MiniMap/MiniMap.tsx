import React, { FunctionComponent } from 'react';
import Map from 'components/Map/Map';
import CountyMap from 'components/CountyMap/CountyMap';
import { MAP_FILTERS } from 'screens/LocationPage/Enums/MapFilterEnums';
import { Projections } from 'common/models/Projections';
import * as Styles from './MiniMap.style';
import { County } from 'common/locations';

interface MiniMapProperties {
  projections: Projections;
  stateId: string;
  selectedCounty: County | undefined;
  mobileMenuOpen: boolean;
  setMobileMenuOpen: (input: boolean) => void;
  mapOption: string;
  setMapOption: (input: string) => void;
}

/**
 * TODO(sgoldblatt): Don't pass in the setState vars here and use a provider
 * to set the selected MobileMenu and map options as well
 */
const MiniMap: FunctionComponent<MiniMapProperties> = ({
  projections,
  stateId,
  selectedCounty,
  mobileMenuOpen,
  setMobileMenuOpen,
  mapOption,
  setMapOption,
}) => {
  const showState = stateId !== MAP_FILTERS.DC;
  const { stateName } = projections;

  const onSelectCounty = (fullFips: string) => {
    setMobileMenuOpen(false);
  };

  return (
    <Styles.Container mobileMenuOpen={mobileMenuOpen}>
      <Styles.Tabs>
        {showState && (
          <Styles.TabItem
            selected={mapOption === MAP_FILTERS.STATE}
            onClick={() => setMapOption(MAP_FILTERS.STATE)}
          >
            {stateName}
          </Styles.TabItem>
        )}
        <Styles.TabItem
          selected={mapOption === MAP_FILTERS.NATIONAL}
          onClick={() => setMapOption(MAP_FILTERS.NATIONAL)}
        >
          USA
        </Styles.TabItem>
      </Styles.Tabs>
      <Styles.MapContainer>
        {/* US Map */}
        {mapOption === MAP_FILTERS.NATIONAL && (
          <Map
            hideLegend={true}
            setMapOption={setMapOption}
            setMobileMenuOpen={setMobileMenuOpen}
            isMiniMap
          />
        )}
        {/* State Map */}
        {mapOption === MAP_FILTERS.STATE && (
          <Styles.StateMapContainer>
            <CountyMap
              selectedCounty={selectedCounty}
              setSelectedCounty={onSelectCounty}
            />
          </Styles.StateMapContainer>
        )}
      </Styles.MapContainer>
    </Styles.Container>
  );
};

export default MiniMap;
