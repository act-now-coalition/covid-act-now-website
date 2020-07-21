import React, { Fragment, FunctionComponent } from 'react';
import CheckIcon from '@material-ui/icons/Check';
import {
  ColoredHeaderBanner,
  Wrapper,
  TopContainer,
  FooterContainer,
  HeaderTitle,
  HeaderSection,
  HeaderSubCopy,
  ButtonsWrapper,
  HeaderButton,
  LocationCopyWrapper,
  LastUpdatedDate,
  SectionHalf,
  Copy,
  ColumnTitle,
  SectionColumn,
  LevelDescription,
  ThermometerContainer,
  ThermometerRow,
} from 'components/LocationPage/LocationPageHeader.style';
import { useEmbed } from 'common/utils/hooks';
import { LOCATION_SUMMARY_LEVELS } from 'common/metrics/location_summary';
import { Level } from 'common/level';
import { COLOR_MAP } from 'common/colors';
import { useModelLastUpdatedDate } from 'common/utils/model';
import { STATES_WITH_DATA_OVERRIDES } from 'common/metrics/hospitalizations';
import { Projections } from 'common/models/Projections';
import { formatUtcDate } from 'common/utils';
import { isNull } from 'util';
import NotificationsNoneIcon from '@material-ui/icons/NotificationsNone';
import ShareOutlinedIcon from '@material-ui/icons/ShareOutlined';
import LocationHeaderStats from 'components/SummaryStats/LocationHeaderStats';
import InfoOutlinedIcon from '@material-ui/icons/InfoOutlined';
import { LEVEL_COLOR } from 'common/colors';
import { METRIC_NAME as CASE_DENSITY_METRIC_NAME } from 'common/metrics/case_density';

const UpdateCaseDensity: FunctionComponent<{ projections: Projections }> = ({
  projections,
}) => {
  const levelName = (level: Level) => LOCATION_SUMMARY_LEVELS[level].name;
  const previousLevel = projections.getAlarmLevelWithoutCaseDensity();
  const currentLevel = projections.getAlarmLevel();

  const changedLevelCopy =
    previousLevel === currentLevel
      ? ''
      : `That changed your threat level from ${levelName(
          previousLevel,
        )} to ${levelName(currentLevel)}. `;
  return (
    <Copy isUpdateCopy>
      <strong>New key indicator added</strong>
      <br />
      {`We added ${CASE_DENSITY_METRIC_NAME.toLowerCase()}. ${changedLevelCopy}`}
      <a href="/">Learn more</a>
    </Copy>
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

const LocationPageHeader = (props: {
  projections: Projections;
  condensed?: Boolean;
  stats: { [key: string]: number | null };
  onRtRangeClick?: () => void;
  onTestPositiveClick?: () => void;
  onIcuUtilizationClick?: () => void;
  onContactTracingClick?: () => void;
  onHeaderShareClick: () => void;
  onHeaderSignupClick: () => void;
  onCaseDensityClick: () => void;
  isMobile?: Boolean;
}) => {
  const hasStats = !!Object.values(props.stats).filter(
    (val: number | null) => !isNull(val),
  ).length;

  //TODO (chelsi): get rid of this use of 'magic' numbers
  const headerTopMargin = !hasStats ? -202 : -218;
  const headerBottomMargin = !hasStats ? 0 : 0;

  const locationName =
    props.projections.countyName || props.projections.stateName;

  const alarmLevel = props.projections.getAlarmLevel();

  const levelInfo = LOCATION_SUMMARY_LEVELS[alarmLevel];

  const fillColor =
    alarmLevel !== Level.UNKNOWN ? levelInfo.color : COLOR_MAP.GRAY.LIGHT;

  const { isEmbed } = useEmbed();

  const verified = STATES_WITH_DATA_OVERRIDES.includes(
    props.projections.stateName,
  );

  const isVerifiedState = !props.projections.isCounty && verified;

  const lastUpdatedDate: Date | null = useModelLastUpdatedDate() || new Date();
  const lastUpdatedDateString =
    lastUpdatedDate !== null ? formatUtcDate(lastUpdatedDate) : '';

  const thresholdUnknown = alarmLevel === Level.UNKNOWN;

  const thermometerContent = [
    {
      level: Level.CRITICAL,
      color: `${LEVEL_COLOR[Level.CRITICAL]}`,
    },
    {
      level: Level.HIGH,
      color: `${LEVEL_COLOR[Level.HIGH]}`,
    },
    {
      level: Level.MEDIUM,
      color: `${LEVEL_COLOR[Level.MEDIUM]}`,
    },
    {
      level: Level.LOW,
      color: `${LEVEL_COLOR[Level.LOW]}`,
    },
  ];

  return (
    <Fragment>
      <ColoredHeaderBanner bgcolor={fillColor} />
      <Wrapper
        condensed={props.condensed}
        headerTopMargin={headerTopMargin}
        headerBottomMargin={headerBottomMargin}
      >
        <TopContainer>
          <HeaderSection>
            <LocationCopyWrapper>
              <HeaderTitle isEmbed={isEmbed}>
                <LocationPageHeading projections={props.projections} />
              </HeaderTitle>
            </LocationCopyWrapper>
            <ButtonsWrapper>
              <HeaderButton onClick={props.onHeaderShareClick || noop}>
                <ShareOutlinedIcon />
                Share
              </HeaderButton>
              <HeaderButton onClick={props.onHeaderSignupClick || noop}>
                <NotificationsNoneIcon />
                Receive alerts
              </HeaderButton>
            </ButtonsWrapper>
          </HeaderSection>
          <HeaderSection>
            <SectionHalf>
              <ThermometerContainer>
                {thermometerContent.map((row, i) => {
                  const isCurrentLevel = row.level === alarmLevel;
                  return (
                    <ThermometerRow
                      color={row.color}
                      thresholdUnknown={thresholdUnknown}
                      isCurrentLevel={isCurrentLevel}
                    />
                  );
                })}
              </ThermometerContainer>
              <SectionColumn>
                <ColumnTitle>Covid threat level</ColumnTitle>
                <LevelDescription>{levelInfo.summary}</LevelDescription>
                <Copy>{levelInfo.detail(locationName)}</Copy>
              </SectionColumn>
            </SectionHalf>
            <SectionHalf>
              <InfoOutlinedIcon />
              <SectionColumn isUpdateCopy>
                <ColumnTitle isUpdateCopy>Updates</ColumnTitle>
                <UpdateCaseDensity projections={props.projections} />
              </SectionColumn>
            </SectionHalf>
          </HeaderSection>
          <LocationHeaderStats
            stats={props.stats}
            onCaseDensityClick={props.onCaseDensityClick}
            onRtRangeClick={props.onRtRangeClick}
            onTestPositiveClick={props.onTestPositiveClick}
            onIcuUtilizationClick={props.onIcuUtilizationClick}
            onContactTracingClick={props.onContactTracingClick}
            isMobile={props.isMobile}
            isHeader={true}
          />
        </TopContainer>
        <FooterContainer>
          {props.projections.isCounty && !isEmbed && (
            <HeaderSubCopy>
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
                Let us know
              </a>
              .
            </HeaderSubCopy>
          )}
          {!props.projections.isCounty && !isEmbed && (
            <HeaderSubCopy>
              {verified && (
                <Fragment>
                  <CheckIcon htmlColor="#00D474" />
                  <span>Government verified data</span>
                  {!props.isMobile && <span> · </span>}
                </Fragment>
              )}
              <LastUpdatedDate isVerifiedState={isVerifiedState}>
                Updated {lastUpdatedDateString}
              </LastUpdatedDate>
            </HeaderSubCopy>
          )}
        </FooterContainer>
      </Wrapper>
    </Fragment>
  );
};

export default LocationPageHeader;
