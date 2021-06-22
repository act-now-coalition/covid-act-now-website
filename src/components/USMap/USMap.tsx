import React, { Fragment, ReactElement, useMemo, useState } from 'react';
import { Link } from 'react-router-dom';
import { ComposableMap, Geographies } from 'react-simple-maps';
import { geoAlbersUsaTerritories } from 'geo-albers-usa-territories';
import {
  findStateByFipsCodeStrict,
  statesByFips,
  State as StateType,
  State,
} from 'common/regions';
import stateGeographies from 'common/data/states-10m.json';
import {
  GeoPath,
  StateBorder,
  USMapWrapper,
  USStateMapWrapper,
} from './USMap.style';
import { trackEvent, EventAction, EventCategory } from 'components/Analytics';
import MapCounties from './MapCounties';
import { TooltipMode, USMapTooltip } from './USMapTooltip';
import { ActiveRegionStyle } from './utils';

function trackMapClick(label: string) {
  trackEvent(EventCategory.MAP, EventAction.NAVIGATE, label);
}

const stateFipsCodes = Object.keys(statesByFips);

/**
 * SVG element to represent the Northern Mariana Islands on the USA Country Map as a
 * box (with risk level color) + text.
 *
 * This is special cased from the normal map display. The mariana islands are
 * small enough that simply showing the islands is not a UX that works.
 */
const MarianaIslands = (props: React.SVGProps<SVGRectElement>) => (
  <g transform="translate(40, 395) scale(0.8)" tabIndex={-1}>
    <rect width="20" height="20" {...props} />
    <text transform="translate(25, 15)">CNMI</text>
  </g>
);

interface USMapProps {
  showCounties: boolean;
  getFillColor: (fipsCode: string) => string;
  renderTooltip: (
    stateFipsCode: string,
    tooltipMode: TooltipMode,
  ) => ReactElement | string;
  tooltipMode: TooltipMode;
  activeRegionStyle: ActiveRegionStyle;
}

const projection = geoAlbersUsaTerritories().scale(1070).translate([400, 300]);

const USMap = React.memo(
  ({
    showCounties,
    getFillColor,
    renderTooltip,
    tooltipMode,
    activeRegionStyle,
  }: USMapProps) => {
    const [activeState, setActiveState] = useState<State | null>(null);
    const regionGeographies = useMemo(() => {
      return (
        <Fragment>
          {showCounties && <MapCounties getFillColor={getFillColor} />}
          <Geographies geography={stateGeographies}>
            {({ geographies }) =>
              geographies
                .filter(geo => stateFipsCodes.includes(geo.id))
                .map(geo => {
                  const fipsCode = geo.id;
                  // we can coerce this to a state safely because we're only
                  // dealing with FIPS codes that are from states, because of that filter.
                  const state = findStateByFipsCodeStrict(
                    fipsCode,
                  ) as StateType;

                  const { stateCode, fullName } = state;
                  const fillColor = getFillColor(fipsCode);

                  // This flag is used to increase an invisible border around Hawaii and Puerto Rico
                  // to increase their effective target size
                  const expandTapArea = ['HI', 'PR'].includes(stateCode);

                  const geography =
                    stateCode === 'MP' ? (
                      <MarianaIslands key={fipsCode} fill={fillColor} />
                    ) : (
                      <GeoPath
                        key={fipsCode}
                        geography={geo}
                        fill={fillColor}
                        fillOpacity={showCounties ? 0 : 1}
                        stroke="white"
                        strokeWidth={expandTapArea ? 35 : 1}
                        strokeOpacity={expandTapArea ? 0 : 1}
                        role="img"
                        tabIndex={-1}
                        aria-label={fullName}
                      />
                    );

                  return (
                    <USMapTooltip
                      key={stateCode}
                      tooltipMode={tooltipMode}
                      title={renderTooltip(fipsCode, tooltipMode)}
                      placement="top"
                      onOpen={() => {
                        setActiveState(state);
                      }}
                      onClose={() => {
                        setActiveState(activeState =>
                          activeState === state ? null : activeState,
                        );
                      }}
                      arrow
                    >
                      <g>
                        {tooltipMode === TooltipMode.ACTIVATE_ON_CLICK ? (
                          geography
                        ) : (
                          <Link
                            to={state.relativeUrl}
                            aria-label={fullName}
                            onClick={() => {
                              trackMapClick(fullName);
                            }}
                            tabIndex={-1}
                          >
                            {geography}
                          </Link>
                        )}
                      </g>
                    </USMapTooltip>
                  );
                })
            }
          </Geographies>
        </Fragment>
      );
    }, [showCounties, getFillColor, tooltipMode, renderTooltip]);

    return (
      <USMapWrapper>
        <USStateMapWrapper
          $showCounties={showCounties}
          $highlightOnHover={activeRegionStyle === ActiveRegionStyle.HIGHLIGHT}
        >
          <ComposableMap projection={projection} height={500}>
            <g transform="translate(0, -50)">
              {regionGeographies}

              {/* Draw outline around active region if necessary. */}
              {activeRegionStyle === ActiveRegionStyle.OUTLINE && activeState && (
                <Geographies geography={stateGeographies}>
                  {({ geographies }) =>
                    geographies
                      .filter(geo => geo.id === activeState.fipsCode)
                      .map(geo => {
                        const { stateCode } = activeState;
                        return stateCode === 'MP' ? (
                          <MarianaIslands
                            key={stateCode}
                            fill="none"
                            stroke="black"
                            strokeWidth={2}
                          />
                        ) : (
                          <StateBorder
                            key={stateCode}
                            geography={geo}
                            aria-hidden="true"
                          />
                        );
                      })
                  }
                </Geographies>
              )}
            </g>
          </ComposableMap>
        </USStateMapWrapper>
      </USMapWrapper>
    );
  },
);

export default USMap;
