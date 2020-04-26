import React from 'react';
import Box from '@material-ui/core/Box';
import Typography from '@material-ui/core/Typography';
import StateCircleSvg from 'components/StateSvg/StateCircleSvg';
import { COLORS } from 'enums';
import { COLOR_MAP } from 'enums/interventions';
import { useEmbed } from 'utils/hooks';

import {
  HeaderHighlight,
  HeaderSubCopy,
  HeaderTitle,
  StyledStatusBadge,
  StyledWidgetWrapper,
  StyledWidgetTitle,
  StyledWidgetValue,
  StyledStateCopyWrapper,
  StyledDashboardWrapper,
  StyledLocationPageHeaderWrapper,
  StyledLocationPageHeaderInner,
} from './LocationPageHeader.style';

function LocationPageHeading({ projections }) {
  const { isEmbed } = useEmbed();

  const displayName = projections.countyName ? (
    <>
      {projections.countyName},{' '}
      <a
        href={`${
          isEmbed ? '/embed' : ''
        }/us/${projections.stateCode.toLowerCase()}`}
      >
        {projections.stateName}
      </a>
    </>
  ) : (
    <span>{projections.stateName}</span>
  );

  return <span>{displayName}</span>;
}

function LocationSummary({ projections }) {
  const predictionText = {
    [COLOR_MAP.GREEN.BASE]: (
      <>
        Assuming current interventions remain in place, we expect the total
        cases in your area to decrease. 14 days of decreasing cases is the first
        step to reopening. Check back — projections update every 3 days with the
        most recent data.
      </>
    ),
    [COLOR_MAP.ORANGE.BASE]: (
      <>
        Assuming current interventions remain in place, cases in your area are
        stable, and may even begin to decrease soon. Check back — projections
        update every 3 days with the most recent data.
      </>
    ),
    [COLOR_MAP.RED.BASE]: (
      <>
        Our projections show that cases in your area are increasing
        exponentially. Stay home to help prevent an outbreak. Check back —
        projections update every 3 days with the most recent data.
      </>
    ),
    [COLOR_MAP.BLACK]: (
      <>
        Unfortunately, we don’t have enough data for your area to make a
        prediction, or your area has not reported cases yet. Check back —
        projections update every 3 days with the most recent data.
      </>
    ),
  }[projections.getAlarmLevelColor()];

  return <HeaderSubCopy>{predictionText}</HeaderSubCopy>;
}

const LocationPageHeader = ({ projections }) => {
  const { isEmbed } = useEmbed();
  const fillColor = projections.getAlarmLevelColor();
  // darken for legibility
  const fill =
    fillColor === COLOR_MAP.GRAY.BASE ? COLOR_MAP.GRAY.DARK : fillColor;
  return (
    <>
      <StyledLocationPageHeaderWrapper bgColor={fill} condensed={isEmbed}>
        <StyledLocationPageHeaderInner condensed={isEmbed}>
          <StyledStateCopyWrapper>
            <div>
              <HeaderTitle>
                <HeaderHighlight>
                  <LocationPageHeading projections={projections} />
                </HeaderHighlight>
              </HeaderTitle>
              <StyledStatusBadge color={fill}>
                Status goes here
              </StyledStatusBadge>
              {!isEmbed ? <LocationSummary projections={projections} /> : ''}
              {projections.isCounty && !isEmbed && (
                <HeaderSubCopy>
                  <strong>County data is currently in beta. </strong>
                  <span>
                    Because counties don’t report hospitalizations, our
                    forecasts may not be as accurate. See something wrong?{' '}
                  </span>
                  <a
                    href="https://forms.gle/NPsLcFnrvfS1kqkn9"
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    Please let us know.
                  </a>
                </HeaderSubCopy>
              )}
            </div>
          </StyledStateCopyWrapper>
        </StyledLocationPageHeaderInner>
      </StyledLocationPageHeaderWrapper>
      <StyledDashboardWrapper>
        <StatusWidget
          title="Cases"
          value="2%"
          badgeText="Sufficient"
          badgeColor={fill}
        />
        <StatusWidget
          title="Positive Test Rate"
          value="2%"
          badgeText="Sufficient"
          badgeColor={fill}
        />
        <StatusWidget
          title="Hospital Occupancy"
          value="2%"
          badgeText="Sufficient"
          badgeColor={fill}
        />
      </StyledDashboardWrapper>
    </>
  );
};

const StatusWidget = ({ title, value, badgeText, badgeColor }) => (
  <StyledWidgetWrapper>
    <StyledWidgetTitle>{title}</StyledWidgetTitle>
    <StyledWidgetValue>{value}</StyledWidgetValue>
    <StyledStatusBadge color={badgeColor}>{badgeText}</StyledStatusBadge>
  </StyledWidgetWrapper>
);

export default LocationPageHeader;
