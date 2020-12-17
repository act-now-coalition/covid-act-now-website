import React, { Fragment, useRef, useEffect } from 'react';
import {
  Grow,
  MenuList,
  MenuItem,
  ClickAwayListener,
  useMediaQuery,
} from '@material-ui/core';
import { useTheme } from '@material-ui/core/styles';
import ExpandLessIcon from '@material-ui/icons/ExpandLess';
import ExpandMoreIcon from '@material-ui/icons/ExpandMore';
import {
  MetroFilter,
  getFilterLabel,
  GeoScopeFilter,
  trackCompareEvent,
  HomepageLocationScope,
} from 'common/utils/compare';
import {
  Container,
  SliderContainer,
  GeoSlider,
  DropdownContainer,
  MetroMenuButton,
  MetroMenuPopper,
} from 'components/Compare/Filters.style';
import { EventAction } from 'components/Analytics';
import HomepageSlider from './HomepageSlider';

// For location page: maps each numerical slider value to its corresponding GeoScopeFilter
export const sliderNumberToFilterMap: { [val: number]: GeoScopeFilter } = {
  0: GeoScopeFilter.NEARBY,
  50: GeoScopeFilter.STATE,
  99: GeoScopeFilter.COUNTRY,
};

// For homepage: maps each numerical slider value to its corresponding HomepageLocationScope
export const homepageSliderNumberToFilterMap: {
  [val: number]: HomepageLocationScope;
} = {
  0: HomepageLocationScope.COUNTY,
  50: HomepageLocationScope.MSA,
  99: HomepageLocationScope.STATE,
};

const Filters = (props: {
  isHomepage?: boolean;
  setCountyTypeToView: React.Dispatch<React.SetStateAction<MetroFilter>>;
  countyTypeToView: MetroFilter;
  stateId?: string;
  county?: any | null;
  geoScope?: GeoScopeFilter;
  setGeoScope?: React.Dispatch<React.SetStateAction<GeoScopeFilter>>;
  isModal: boolean;
  sliderValue: GeoScopeFilter;
  setSliderValue: React.Dispatch<React.SetStateAction<GeoScopeFilter>>;

  homepageScope: HomepageLocationScope;
  setHomepageScope: React.Dispatch<React.SetStateAction<HomepageLocationScope>>;
  homepageSliderValue: HomepageLocationScope;
  setHomepageSliderValue: React.Dispatch<
    React.SetStateAction<HomepageLocationScope>
  >;
}) => {
  const {
    sliderValue,
    setSliderValue,
    setCountyTypeToView,
    homepageScope,
    setHomepageScope,
    homepageSliderValue,
    setHomepageSliderValue,
  } = props;

  const disableMetroMenu = props.isHomepage
    ? homepageScope !== HomepageLocationScope.COUNTY
    : sliderValue === 0;

  useEffect(() => {
    if (disableMetroMenu) {
      setCountyTypeToView(MetroFilter.ALL);
    }
  }, [disableMetroMenu, setCountyTypeToView]);

  const typeFiltersForMap = [
    {
      label: getFilterLabel(MetroFilter.METRO),
      type: MetroFilter.METRO,
    },
    {
      label: getFilterLabel(MetroFilter.NON_METRO),
      type: MetroFilter.NON_METRO,
    },
    {
      label: getFilterLabel(MetroFilter.ALL),
      type: MetroFilter.ALL,
    },
  ];

  const GeoFilterLabels = {
    [GeoScopeFilter.NEARBY]: 'Nearby',
    [GeoScopeFilter.STATE]: `${props.stateId}`,
    [GeoScopeFilter.COUNTRY]: 'USA',
  };

  // Last value is set to 99 for styling
  // so that the final mark falls on the slider and not to the right of it
  const marks = [
    {
      value: 0,
      label: GeoFilterLabels[GeoScopeFilter.NEARBY],
    },
    {
      value: 50,
      label: GeoFilterLabels[GeoScopeFilter.STATE],
    },
    {
      value: 99,
      label: GeoFilterLabels[GeoScopeFilter.COUNTRY],
    },
  ];

  const sliderHandleChange = (event: any, value: any) => {
    if (props.setGeoScope) {
      setSliderValue(value);
      props.setGeoScope(sliderNumberToFilterMap[value]);
      trackCompareEvent(
        EventAction.SELECT,
        `GeoScope: ${GeoScopeFilter[sliderNumberToFilterMap[value]]}`,
      );
    }
  };

  const homepageSliderHandleChange = (
    event: React.ChangeEvent<{}>,
    value: any,
  ) => {
    if (setHomepageScope) {
      setHomepageSliderValue(value);
      setHomepageScope(homepageSliderNumberToFilterMap[value]);
      trackCompareEvent(
        EventAction.SELECT,
        `GeoScope: ${
          HomepageLocationScope[homepageSliderNumberToFilterMap[value]]
        }`,
      );
    }
  };

  const anchorRef = useRef<HTMLButtonElement>(null);
  const [open, setOpen] = React.useState(false);

  const handleMenuToggle = () => {
    setOpen(!open);
  };

  const handleClickAway = () => {
    setOpen(false);
  };

  const metroMenuItemOnClick = (filterType: MetroFilter, event: any) => {
    setCountyTypeToView(filterType);
    trackCompareEvent(
      EventAction.SELECT,
      `Metro Filter: ${getFilterLabel(filterType)}`,
    );
    setOpen(false);
  };

  const isStatePage = !props.isHomepage && !props.county;
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down('xs'));

  return (
    <Fragment>
      <Container $isModal={props.isModal} $isHomepage={props.isHomepage}>
        {props.isHomepage && (
          <HomepageSlider
            homepageScope={homepageScope}
            onChange={homepageSliderHandleChange}
            homepageSliderValue={homepageSliderValue}
            $isModal={props.isModal}
          />
        )}
        {props.county && (
          <SliderContainer>
            <GeoSlider
              onChange={sliderHandleChange}
              value={sliderValue}
              step={null}
              marks={marks}
              track={false}
              $isModal={props.isModal}
              geoScope={props.geoScope}
            />
          </SliderContainer>
        )}
        <MetroMenuButton
          ref={anchorRef}
          onClick={handleMenuToggle}
          disabled={disableMetroMenu}
          $isMobile={isMobile}
          disableRipple
          $isOpen={open}
          $isStatePage={isStatePage}
          $isModal={props.isModal}
        >
          <div>
            <span>Counties</span>
            <span>{getFilterLabel(props.countyTypeToView)}</span>
          </div>
          {open ? <ExpandLessIcon /> : <ExpandMoreIcon />}
        </MetroMenuButton>
        <MetroMenuPopper
          open={open}
          anchorEl={anchorRef.current}
          role={undefined}
          transition
          disablePortal
        >
          {({ TransitionProps, placement }) => (
            <Grow
              {...TransitionProps}
              style={{
                transformOrigin:
                  placement === 'bottom' ? 'center top' : 'center bottom',
              }}
            >
              <DropdownContainer>
                <ClickAwayListener onClickAway={handleClickAway}>
                  <MenuList autoFocusItem={open}>
                    {typeFiltersForMap.map(filter => {
                      return (
                        <MenuItem
                          key={filter.type}
                          disableRipple
                          onClick={event =>
                            metroMenuItemOnClick(filter.type, event)
                          }
                        >
                          {filter.label}
                        </MenuItem>
                      );
                    })}
                  </MenuList>
                </ClickAwayListener>
              </DropdownContainer>
            </Grow>
          )}
        </MetroMenuPopper>
      </Container>
    </Fragment>
  );
};

export default Filters;
