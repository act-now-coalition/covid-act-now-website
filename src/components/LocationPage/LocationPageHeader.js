import React from 'react';
import { COLOR_MAP } from 'enums/interventions';
import {
  LEGEND_TEXT,
  POSITIVE_TESTS,
  CASE_GROWTH_RATE,
  HOSPITAL_USAGE,
  Level,
} from 'enums/zones';
import { useEmbed } from 'utils/hooks';
import palette from 'assets/theme/palette';
import CheckIcon from 'assets/images/checkIcon';
import ExclamationIcon from 'assets/images/exclamationIcon';
import QuestionIcon from 'assets/images/questionIcon';

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

function LocationSummary({ projections, textColor }) {
  const locationLevel = projections.getAlarmLevel();
  const locationLevelInfo = LEGEND_TEXT[locationLevel];

  const {
    rt_level,
    hospitalizations_level,
    test_rate_level,
  } = projections.getLevels();

  const levelList = [
    { level: rt_level, levelInfo: CASE_GROWTH_RATE[rt_level] },
    { level: test_rate_level, levelInfo: POSITIVE_TESTS[test_rate_level] },
    {
      level: hospitalizations_level,
      levelInfo: HOSPITAL_USAGE[hospitalizations_level],
    },
  ];

  return (
    <>
      <HeaderSubCopy textColor={textColor}>
        {locationLevelInfo.detail}
        <ul>
          {locationLevel !== Level.UNKNOWN &&
            levelList.map(item => {
              return (
                <li>
                  {item.level === Level.LOW && (
                    <CheckIcon textColor={textColor} />
                  )}
                  {(item.level === Level.MEDIUM ||
                    item.level === Level.HIGH) && (
                    <ExclamationIcon textColor={textColor} />
                  )}
                  {item.level === Level.UNKNOWN && (
                    <QuestionIcon textColor={textColor} />
                  )}
                  <p>{item.levelInfo.detail}</p>
                </li>
              );
            })}
        </ul>
      </HeaderSubCopy>
    </>
  );
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
            <LocationSummary textColor={textColor} projections={projections} />
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
