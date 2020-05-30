import React, { Fragment } from 'react';
import CheckIcon from '@material-ui/icons/Check';
import palette from 'assets/theme/palette';
import SummaryStats from 'components/SummaryStats/SummaryStats';
import {
  ColoredHeaderBanner,
  HeaderContainer,
  HeaderTitle,
  HeaderSection,
  HeaderSubCopy,
  HeaderSubtitle,
  ButtonsWrapper,
  HeaderButton,
  LocationCopyWrapper,
  HeaderSubCopyWrapper,
  LastUpdatedDate,
  RiskLevelThermometer,
  RiskLevelWrapper,
  RiskLevelTitle,
  RiskLevel,
  RiskLevelGraphicMobile,
  RiskLevelGraphicDesktop,
  Triangle,
} from 'components/LocationPage/NewLocationPageHeader.style';
import { useEmbed } from 'common/utils/hooks';
import { LOCATION_SUMMARY_LEVELS } from 'common/metrics/location_summary';
import { Level } from 'common/level';
import { COLOR_MAP } from 'common/colors';
import { useModelLastUpdatedDate } from 'common/utils/model';
import { STATES_WITH_DATA_OVERRIDES } from 'common/metrics/hospitalizations';
import { Projections } from 'common/models/Projections';

const RiskLevelGraphic = (props: {
  projections: Projections;
  level: number;
  levelName: string;
}) => {
  return (
    <RiskLevelWrapper>
      <RiskLevel>{props.levelName}</RiskLevel>
      <RiskLevelThermometer level={props.level} />
      <Triangle level={props.level} />
      <RiskLevelTitle>Covid Risk Level</RiskLevelTitle>
    </RiskLevelWrapper>
  );
};

const LocationPageHeading = (props: { projections: Projections }) => {
  const { isEmbed } = useEmbed();

  const displayName = props.projections.countyName ? (
    <>
      <strong>{props.projections.countyName}, </strong>
      <a
        href={`${
          isEmbed ? '/embed' : ''
        }/us/${props.projections.stateCode.toLowerCase()}`}
      >
        {props.projections.stateCode}
      </a>
    </>
  ) : (
    <strong>{props.projections.stateName}</strong>
  );

  return <span>{displayName}</span>;
};

const noop = () => {};

const NewLocationPageHeader = (props: {
  projections: Projections;
  condensed?: Boolean;
  stats: { [key: string]: number | null };
  onRtRangeClick?: () => void;
  onTestPositiveClick?: () => void;
  onIcuUtilizationClick?: () => void;
  onContactTracingClick?: () => void;
  onHeaderShareClick: () => void;
  onHeaderSignupClick: () => void;
  isMobile?: Boolean;
}) => {
  const alarmLevel = props.projections.getAlarmLevel();

  const levelInfo = LOCATION_SUMMARY_LEVELS[alarmLevel];

  const locationName =
    props.projections.countyName || props.projections.stateName;

  const verified = STATES_WITH_DATA_OVERRIDES.includes(
    props.projections.stateName,
  );
  const [fillColor, textColor] =
    alarmLevel !== Level.UNKNOWN
      ? [levelInfo.color, palette.black]
      : [COLOR_MAP.GRAY.LIGHT, palette.black];

  const { isEmbed } = useEmbed();

  const verifiedStateStyling = !props.projections.isCounty && verified;

  const lastUpdatedDate: Date | null = useModelLastUpdatedDate() || new Date();
  const lastUpdatedDateString =
    lastUpdatedDate !== null ? lastUpdatedDate.toLocaleDateString() : '';

  const RiskLevelGraphicProps = {
    level: levelInfo.level,
    levelName: levelInfo.name,
    projections: props.projections,
  };

  return (
    <Fragment>
      <ColoredHeaderBanner bgcolor={fillColor} />
      <HeaderContainer condensed={props.condensed}>
        <HeaderSection>
          <LocationCopyWrapper>
            <HeaderTitle isEmbed={isEmbed} textColor={textColor}>
              <LocationPageHeading projections={props.projections} />
            </HeaderTitle>
            <RiskLevelGraphicMobile>
              <RiskLevelGraphic {...RiskLevelGraphicProps} />
            </RiskLevelGraphicMobile>
            <HeaderSubtitle>{levelInfo.detail(locationName)}</HeaderSubtitle>
          </LocationCopyWrapper>
          <RiskLevelGraphicDesktop>
            <RiskLevelGraphic {...RiskLevelGraphicProps} />
          </RiskLevelGraphicDesktop>
        </HeaderSection>
        <SummaryStats
          stats={props.stats}
          onRtRangeClick={props.onRtRangeClick}
          onTestPositiveClick={props.onTestPositiveClick}
          onIcuUtilizationClick={props.onIcuUtilizationClick}
          onContactTracingClick={props.onContactTracingClick}
          isMobile={props.isMobile}
        />
        <HeaderSection>
          <HeaderSubCopyWrapper verifiedStateStyling={verifiedStateStyling}>
            {props.projections.isCounty && !isEmbed && (
              <HeaderSubCopy textColor={textColor}>
                <span>Updated {lastUpdatedDateString} · </span>
                <span>County data is currently in beta. </span>
                <span>
                  Because counties don’t report hospitalizations, our forecasts
                  may not be as accurate. See something wrong?{' '}
                </span>
                <a
                  href="https://forms.gle/NPsLcFnrvfS1kqkn9"
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  Please let us know
                </a>
                .
              </HeaderSubCopy>
            )}
            {!props.projections.isCounty && !isEmbed && (
              <HeaderSubCopy textColor={textColor}>
                {verified && (
                  <Fragment>
                    <CheckIcon htmlColor="#00D474" />
                    <span>Government verified data · </span>
                  </Fragment>
                )}
                <LastUpdatedDate>
                  Updated {lastUpdatedDateString}
                </LastUpdatedDate>
              </HeaderSubCopy>
            )}
          </HeaderSubCopyWrapper>
          <ButtonsWrapper>
            <HeaderButton onClick={props.onHeaderShareClick || noop}>
              Share
            </HeaderButton>
            <HeaderButton onClick={props.onHeaderSignupClick || noop}>
              Get alerts
            </HeaderButton>
          </ButtonsWrapper>
        </HeaderSection>
      </HeaderContainer>
    </Fragment>
  );
};

export default NewLocationPageHeader;
