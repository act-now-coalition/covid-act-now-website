import React from 'react';
import SignalStatus from 'components/SignalStatus/SignalStatus';
import { COLOR_MAP } from 'enums/interventions';
import { ChartType, getLevelForChart, Level, SUMMARY_TEXT } from 'enums/zones';
import { useEmbed } from 'utils/hooks';
import palette from 'assets/theme/palette';

import {
  HeaderSubCopy,
  HeaderTitle,
  StyledStateCopyWrapper,
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

  const level = SUMMARY_TEXT[projections.getAlarmLevel()];
  const [fillColor, textColor] = projections.supportsInferred
    ? [level.color, palette.secondary.contrastText]
    : [COLOR_MAP.GRAY.LIGHT, palette.text.primary];

  return (
    <StyledLocationPageHeaderWrapper bgColor={fillColor} condensed={isEmbed}>
      <StyledLocationPageHeaderInner condensed={isEmbed}>
        <StyledStateCopyWrapper isEmbed={isEmbed}>
          <HeaderTitle isEmbed={isEmbed} textColor={textColor}>
            <LocationPageHeading projections={projections} />
          </HeaderTitle>
          {projections.supportsInferred && <SignalStatus levelInfo={level} />}
          {!isEmbed ? <LocationSummary projections={projections} /> : ''}
          {projections.isCounty && !isEmbed && (
            <HeaderSubCopy textColor={textColor}>
              <strong>County data is currently in beta. </strong>
              <span>
                Because counties don’t report hospitalizations, our forecasts
                may not be as accurate. See something wrong?{' '}
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
        </StyledStateCopyWrapper>
      </StyledLocationPageHeaderInner>
    </StyledLocationPageHeaderWrapper>
  );
};

export default LocationPageHeader;
