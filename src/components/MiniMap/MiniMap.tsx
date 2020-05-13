import React, { FunctionComponent } from 'react';

import {
  MapMenuMobileWrapper,
  MapMenuItem,
  MapContentWrapper,
  MapContentInner,
  MapWrapper,
  CountyMapAltWrapper,
} from 'components/MiniMap/MiniMap.style';

import Map from 'components/Map/Map';
import CountyMap from 'components/CountyMap/CountyMap';
import _ from 'lodash';
import { MAP_FILTERS } from 'screens/LocationPage/Enums/MapFilterEnums';
import { useHistory } from 'react-router-dom';
import US_STATE_DATASET from '../MapSelectors/datasets/us_states_dataset_01_02_2020.json';
import { Projections } from 'common/models/Projections';

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

/**
 * TODO(sgoldblatt): Don't pass in the setState vars here and use a provider
 * to set the selected MobileMenu and map options as well
 */
const MiniMap: FunctionComponent<MiniMapProperties> = (
  props: MiniMapProperties,
) => {
  const history = useHistory();

  const goTo = (route: string) => {
    history.push(route);
  };

  return (
    <MapContentWrapper mobileMenuOpen={props.mobileMenuOpen}>
      <MapMenuMobileWrapper>
        <MapMenuItem
          onClick={() => props.setMapOption(MAP_FILTERS.NATIONAL)}
          selected={props.mapOption === MAP_FILTERS.NATIONAL}
        >
          United States
        </MapMenuItem>
        {props.stateId !== MAP_FILTERS.DC && (
          <MapMenuItem
            onClick={() => props.setMapOption(MAP_FILTERS.STATE)}
            selected={props.mapOption === MAP_FILTERS.STATE}
          >
            {props.projections.stateName}
          </MapMenuItem>
        )}
      </MapMenuMobileWrapper>
      <MapContentInner>
        <MapWrapper visible={props.mapOption === MAP_FILTERS.NATIONAL}>
          <Map
            hideLegend={true}
            setMapOption={props.setMapOption}
            setMobileMenuOpen={props.setMobileMenuOpen}
          />
        </MapWrapper>

        {props.stateId !== MAP_FILTERS.DC && (
          <CountyMapAltWrapper visible={props.mapOption === MAP_FILTERS.STATE}>
            <CountyMap
              selectedCounty={props.selectedCounty}
              setSelectedCounty={(fullFips: string) => {
                const county = _.find(
                  // @ts-ignore: US_STATE_DATASET is .js, but this is valid
                  US_STATE_DATASET.state_county_map_dataset[props.stateId]
                    .county_dataset,
                  ['full_fips_code', fullFips],
                );

                goTo(
                  `/us/${props.stateId.toLowerCase()}/county/${
                    county.county_url_name
                  }`,
                );
                props.setMobileMenuOpen(false);
                props.setSelectedCounty(county);
              }}
            />
          </CountyMapAltWrapper>
        )}
      </MapContentInner>
    </MapContentWrapper>
  );
};

export default MiniMap;
