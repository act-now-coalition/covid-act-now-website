import React from 'react';
import { COLOR_MAP } from 'enums/interventions';
import { LEGEND_TEXT, Level } from 'enums/zones';
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

const LocationPageHeader = ({ projections }) => {
  const { isEmbed } = useEmbed();
  const alarmLevel = projections.getAlarmLevel();
  const levelInfo = LEGEND_TEXT[alarmLevel];
  const [fillColor, textColor] =
    alarmLevel !== Level.UNKNOWN
      ? [levelInfo.color, palette.secondary.contrastText]
      : [COLOR_MAP.GRAY.LIGHT, palette.text.primary];
  return (
    <StyledLocationPageHeaderWrapper bgColor={fillColor} condensed={isEmbed}>
      <StyledLocationPageHeaderInner condensed={isEmbed}>
        <StyledStateCopyWrapper isEmbed={isEmbed}>
          <HeaderTitle isEmbed={isEmbed} textColor={textColor}>
            <LocationPageHeading projections={projections} />
          </HeaderTitle>
          {!isEmbed ? (
            <HeaderSubCopy textColor={textColor}>
              {levelInfo.detail}
            </HeaderSubCopy>
          ) : (
            ''
          )}
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
