import React, { FunctionComponent } from 'react';
import { useHistory } from 'react-router-dom';
import { find as _find } from 'lodash';
import Map from 'components/Map/Map';
import CountyMap from 'components/CountyMap/CountyMap';
import { MAP_FILTERS } from 'screens/LocationPage/Enums/MapFilterEnums';
import US_STATE_DATASET from '../MapSelectors/datasets/us_states_dataset_01_02_2020.json';
import { Projections } from 'common/models/Projections';
import * as Styles from './MiniMap.style';

interface MiniMapProperties {
  projections: Projections;
  stateId: string;
  selectedCounty: string;
  setSelectedCounty: (input: string) => {};
  mobileMenuOpen: boolean;
  setMobileMenuOpen: (input: boolean) => {};
  mapOption: string;
  setMapOption: (input: string) => {};
}

const getCounty = (stateId: string, fullFips: string) =>
  _find(
    // @ts-ignore: US_STATE_DATASET is .js, but this is valid
    US_STATE_DATASET.state_county_map_dataset[stateId].county_dataset,
    ['full_fips_code', fullFips],
  );

/**
 * TODO(sgoldblatt): Don't pass in the setState vars here and use a provider
 * to set the selected MobileMenu and map options as well
 */
const MiniMap: FunctionComponent<MiniMapProperties> = ({
  projections,
  stateId,
  selectedCounty,
  setSelectedCounty,
  mobileMenuOpen,
  setMobileMenuOpen,
  mapOption,
  setMapOption,
}) => {
  const history = useHistory();

  const goTo = (route: string) => {
    history.push(route);
  };

  const showState = stateId !== MAP_FILTERS.DC && stateId !== MAP_FILTERS.PR;

  const { stateName } = projections;

  const onSelectCounty = (fullFips: string) => {
    const county = getCounty(stateId, fullFips);
    setMobileMenuOpen(false);
    setSelectedCounty(county);
    goTo(`/us/${stateId.toLowerCase()}/county/${county.county_url_name}`);
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
            isMiniMap={true}
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
