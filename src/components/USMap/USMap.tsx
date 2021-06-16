import React, { ReactNode, useMemo, useState } from 'react';
import { Link } from 'react-router-dom';
import { ComposableMap, Geographies, Geography } from 'react-simple-maps';
import { geoAlbersUsaTerritories } from 'geo-albers-usa-territories';
import ReactTooltip from 'react-tooltip';
import {
  findStateByFipsCodeStrict,
  statesByFips,
  State as StateType,
} from 'common/regions';
import stateGeographies from 'common/data/states-10m.json';
import { USMapWrapper, USStateMapWrapper } from './USMap.style';
import { trackEvent, EventAction, EventCategory } from 'components/Analytics';
import MapCounties from './MapCounties';

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
const MarianaIslands = ({ fill }: { fill: string }) => (
  <g transform="translate(40, 395) scale(0.8)" tabIndex={-1}>
    <rect width="20" height="20" fill={fill} />
    <text transform="translate(25, 15)">CNMI</text>
  </g>
);

interface USMapProps {
  showCounties: boolean;
  getFillColor: (fipsCode: string) => string;
  renderTooltip: (stateFipsCode: string) => ReactNode;
}

const projection = geoAlbersUsaTerritories().scale(1070).translate([400, 300]);

const USMap = React.memo(
  ({ showCounties, getFillColor, renderTooltip }: USMapProps) => {
    const [tooltipContent, setTooltipContent] = useState<ReactNode>(null);

    const onMouseLeave = () => setTooltipContent('');

    const mapContent = useMemo(
      () => (
        <USStateMapWrapper $showCounties={showCounties}>
          <ComposableMap data-tip="" projection={projection} height={500}>
            <g transform="translate(0, -50)">
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

                      return (
                        <Link
                          key={stateCode}
                          to={state.relativeUrl}
                          aria-label={fullName}
                          onClick={() => {
                            trackMapClick(fullName);
                          }}
                          tabIndex={-1}
                          onMouseEnter={() =>
                            setTooltipContent(renderTooltip(fipsCode))
                          }
                          onMouseLeave={onMouseLeave}
                        >
                          {stateCode === 'MP' ? (
                            <MarianaIslands key={fipsCode} fill={fillColor} />
                          ) : (
                            <Geography
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
                          )}
                        </Link>
                      );
                    })
                }
              </Geographies>
            </g>
          </ComposableMap>
        </USStateMapWrapper>
      ),
      [showCounties, getFillColor, renderTooltip],
    );

    return (
      <USMapWrapper>
        {/** Map with shaded background colors for states. */}
        {mapContent}
        <ReactTooltip>{tooltipContent}</ReactTooltip>
      </USMapWrapper>
    );
  },
);

export default USMap;
