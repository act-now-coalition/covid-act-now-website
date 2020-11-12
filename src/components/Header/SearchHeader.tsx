import React from 'react';
// import { useHistory } from 'react-router-dom';
import useMediaQuery from '@material-ui/core/useMediaQuery';
// import { GlobalSelector } from 'components/MapSelectors/MapSelectors';
import MapIcon from 'assets/images/mapIcon';
// import { MAP_FILTERS } from 'screens/LocationPage/Enums/MapFilterEnums';
import {
  Wrapper,
  Content,
  SelectorWrapper,
  MapToggle,
  MenuBarWrapper,
  SearchHeaderWrapper,
} from './SearchHeader.style';
import SearchAutocomplete from 'components/Search';
import { ParentSize } from '@vx/responsive';
import { getSearchAutocompleteLocations } from 'common/locations';
import { State } from 'common/locations';

const SearchHeader = ({
  mobileMenuOpen,
  setMobileMenuOpen,
  setMapOption,
  state,
}: {
  mobileMenuOpen: boolean;
  setMobileMenuOpen: React.Dispatch<React.SetStateAction<boolean>>;
  setMapOption: React.Dispatch<React.SetStateAction<string>>;
  state: State | undefined;
}) => {
  // const history = useHistory();
  const isMobile = useMediaQuery('(max-width:1349px)');
  const isNarrowMobile = useMediaQuery('(max-width:500px)');

  console.log('state', state);

  // @ts-ignore TODO(aj): remove when converting MapSelectors
  // const handleSelectChange = option => {
  //   if (option.state_code === MAP_FILTERS.DC) {
  //     setMapOption(MAP_FILTERS.NATIONAL);
  //   }

  //   let route = `/us/${option.state_code.toLowerCase()}`;

  //   if (option.county_url_name) {
  //     route = `${route}/county/${option.county_url_name}`;
  //   }

  //   history.push(route);

  //   window.scrollTo(0, 0);

  //   setMobileMenuOpen(false);
  // };

  const toggleMobileMenu = () => {
    setMobileMenuOpen((mobileMenuOpen = !mobileMenuOpen));
  };

  // TODO (sgoldblatt): WHY are there so many wrappers?
  return (
    <SearchHeaderWrapper>
      <Wrapper>
        <Content>
          <MenuBarWrapper>
            <SelectorWrapper
              onClick={() => {
                setMobileMenuOpen(false);
              }}
              isNarrowMobile={isNarrowMobile}
            >
              {/* <GlobalSelector
                extendRight={true}
                handleChange={handleSelectChange}
              /> */}

              <ParentSize>
                {() => (
                  <SearchAutocomplete
                    state={state}
                    locations={getSearchAutocompleteLocations(state)}
                  />
                )}
              </ParentSize>
            </SelectorWrapper>
            {isMobile && (
              <MapToggle
                onClick={() => toggleMobileMenu()}
                isActive={mobileMenuOpen}
              >
                <>Counties&nbsp;&nbsp;</>
                <MapIcon />
              </MapToggle>
            )}
          </MenuBarWrapper>
        </Content>
      </Wrapper>
    </SearchHeaderWrapper>
  );
};

export default SearchHeader;
