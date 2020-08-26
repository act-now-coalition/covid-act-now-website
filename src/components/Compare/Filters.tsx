import React, { Fragment, useRef } from 'react';
import {
  Switch,
  Grid,
  Grow,
  MenuList,
  MenuItem,
  ClickAwayListener,
} from '@material-ui/core';
import ExpandLessIcon from '@material-ui/icons/ExpandLess';
import ExpandMoreIcon from '@material-ui/icons/ExpandMore';
import {
  MetroFilter,
  getFilterLabel,
  GeoScopeFilter,
} from 'common/utils/compare';
import {
  Container,
  SliderContainer,
  GeoSlider,
  DropdownContainer,
  MetroMenuButton,
  SwitchGrid,
  MetroMenuPopper,
  SwitchLabel,
} from 'components/Compare/Filters.style';

const Filters = (props: {
  isHomepage?: boolean;
  setCountyTypeToView: React.Dispatch<React.SetStateAction<MetroFilter>>;
  countyTypeToView: MetroFilter;
  viewAllCounties?: boolean;
  setViewAllCounties?: React.Dispatch<React.SetStateAction<boolean>>;
  stateId?: string;
  county?: any | null;
  geoScope?: GeoScopeFilter;
  setGeoScope?: React.Dispatch<React.SetStateAction<GeoScopeFilter>>;
  isModal: boolean;
  sliderValue: GeoScopeFilter;
  setSliderValue: React.Dispatch<React.SetStateAction<GeoScopeFilter>>;
}) => {
  const { sliderValue, setSliderValue } = props;

  const disableMetroMenu = props.isHomepage
    ? !props.viewAllCounties
    : sliderValue === 0;

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

  const switchHandleChange = () => {
    if (props.isHomepage && props.setViewAllCounties) {
      props.setViewAllCounties(!props.viewAllCounties);
    }
  };

  // TODO (chelsi) filter-related WIP:
  // fix the 'any'
  const valueMap: any = {
    0: GeoScopeFilter.NEARBY,
    50: GeoScopeFilter.STATE,
    99: GeoScopeFilter.COUNTRY,
  };

  const sliderHandleChange = (event: any, value: any) => {
    if (props.setGeoScope) {
      setSliderValue(value);
      props.setGeoScope(valueMap[value]);
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
    props.setCountyTypeToView(filterType);
    setOpen(false);
  };

  const isStatePage = !props.isHomepage && !props.county;

  const gridOnClick = (on: boolean) => {
    props.setViewAllCounties && props.setViewAllCounties(on);
  };

  return (
    <Fragment>
      <Container isModal={props.isModal} isHomepage={props.isHomepage}>
        {props.isHomepage && (
          <SwitchGrid
            container
            alignItems="center"
            spacing={1}
            viewAllCounties={props.viewAllCounties}
            isModal={props.isModal}
          >
            <SwitchLabel onClick={() => gridOnClick(false)} item>
              States
            </SwitchLabel>
            <Grid item>
              <Switch
                checked={props.viewAllCounties}
                onChange={switchHandleChange}
                // TODO (chelsi) filter-related WIP:
                value="checked" // need this?
                size="small"
                disableRipple
              />
            </Grid>
            <SwitchLabel onClick={() => gridOnClick(true)} item>
              Counties
            </SwitchLabel>
          </SwitchGrid>
        )}
        {props.county && (
          <SliderContainer>
            <GeoSlider
              onChange={sliderHandleChange}
              value={sliderValue}
              step={null}
              marks={marks}
              track={false}
              isModal={props.isModal}
              geoScope={props.geoScope}
            />
          </SliderContainer>
        )}
        <MetroMenuButton
          ref={anchorRef}
          onClick={handleMenuToggle}
          disabled={disableMetroMenu}
          disableRipple
          isOpen={open}
          isStatePage={isStatePage}
          isModal={props.isModal}
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
