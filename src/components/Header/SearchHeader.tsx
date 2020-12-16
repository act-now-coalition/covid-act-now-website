import React from 'react';
import useMediaQuery from '@material-ui/core/useMediaQuery';
import MapIcon from 'assets/images/mapIcon';
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
import { Region } from 'common/regions';
import {
  getSearchAutocompleteLocations,
  getFilterLimit,
} from 'components/Search';

const SearchHeader = ({
  mobileMenuOpen,
  setMobileMenuOpen,
  setMapOption,
  region,
}: {
  mobileMenuOpen: boolean;
  setMobileMenuOpen: React.Dispatch<React.SetStateAction<boolean>>;
  setMapOption: React.Dispatch<React.SetStateAction<string>>;
  region: Region;
}) => {
  const isMobile = useMediaQuery('(max-width:1349px)');
  const isNarrowMobile = useMediaQuery('(max-width:500px)');

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
              <ParentSize>
                {() => (
                  <SearchAutocomplete
                    locations={getSearchAutocompleteLocations(region)}
                    filterLimit={getFilterLimit(region)}
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
