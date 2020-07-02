import React, { Fragment } from 'react';
import CheckIcon from '@material-ui/icons/Check';
// import SummaryStats from 'components/SummaryStats/SummaryStats';
import {
  ColoredHeaderBanner,
  Wrapper,
  TopContainer,
  FooterContainer,
  HeaderTitle,
  HeaderSection,
  HeaderSubCopy,
  // HeaderSubtitle,
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

const NewIndicatorCopy = () => {
  return (
    <Copy isUpdateCopy>
      <strong>New key indicator added</strong>
      <br />
      We added NEW CASES PER DAY. That changed your threat level from yellow to
      orange. <a href="/">Learn more</a>
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
  isMobile?: Boolean;
}) => {
  const hasStats = !!Object.values(props.stats).filter(
    (val: number | null) => !isNull(val),
  ).length;

  const headerTopMargin = !hasStats ? -270 : -330;
  const headerBottomMargin = !hasStats ? 100 : 0;

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

  console.log('alarmLevel', alarmLevel);

  // const thermometerContent = [
  //   {
  //     level: Level.HIGH,
  //     // text: 'Active outbreak or major gaps',
  //     color: `${LEVEL_COLOR[Level.HIGH]}`,
  //     // bgfill: 'rgba(255, 0, 52, 0.05)',
  //   },
  //   {
  //     level: Level.MEDIUM_HIGH,
  //     // text: 'Risk of second spike',
  //     color: `${LEVEL_COLOR[Level.MEDIUM_HIGH]}`,
  //     // bgfill: 'rgba(255, 150, 0, 0.05)',
  //   },
  //   {
  //     level: Level.MEDIUM,
  //     // text: 'On track for herd immunity',
  //     color: `${LEVEL_COLOR[Level.MEDIUM]}`,
  //     // bgfill: 'rgba(255, 201, 0, 0.05)',
  //   },
  //   {
  //     level: Level.LOW,
  //     // text: 'On track for containment',
  //     color: `${LEVEL_COLOR[Level.LOW]}`,
  //     // bgfill: 'rgba(0, 212, 116, 0.05)',
  //   },
  // ];

  const thermometerContent = [
    {
      level: Level.CRITICAL,
      // text: 'Active outbreak or major gaps',
      color: `${LEVEL_COLOR[Level.CRITICAL]}`,
      // bgfill: 'rgba(255, 0, 52, 0.05)',
    },
    {
      level: Level.HIGH,
      // text: 'Risk of second spike',
      color: `${LEVEL_COLOR[Level.HIGH]}`,
      // bgfill: 'rgba(255, 150, 0, 0.05)',
    },
    {
      level: Level.MEDIUM,
      // text: 'On track for herd immunity',
      color: `${LEVEL_COLOR[Level.MEDIUM]}`,
      // bgfill: 'rgba(255, 201, 0, 0.05)',
    },
    {
      level: Level.LOW,
      // text: 'On track for containment',
      color: `${LEVEL_COLOR[Level.LOW]}`,
      // bgfill: 'rgba(0, 212, 116, 0.05)',
    },
  ];

  const riskLevelGraphicProps = {
    alarmLevel,
    levelName: levelInfo.name,
    projections: props.projections,
  };

  return (
    <Fragment>
      <ColoredHeaderBanner bgcolor={fillColor} hasStats={hasStats} />
      <Wrapper
        condensed={props.condensed}
        headerTopMargin={headerTopMargin}
        headerBottomMargin={headerBottomMargin}
      >
{/*     <HeaderSection>
          <LocationCopyWrapper>
            <HeaderTitle isEmbed={isEmbed}>
              <LocationPageHeading projections={props.projections} />
            </HeaderTitle>
            <RiskLevelGraphicMobile>
              <RiskLevelGraphic {...riskLevelGraphicProps} />
            </RiskLevelGraphicMobile>
            <HeaderSubtitle>{levelInfo.detail(locationName)}</HeaderSubtitle>
            <HeaderSubtitle>
              We have made improvements to how we calculate the infection rate.
              This change may affect the overall Risk Level.{' '}
              <a href="https://blog.covidactnow.org/calculating-better-infection-growth-rates-rt-for-more-communities/">
                Learn more
              </a>
              .{' '}
            </HeaderSubtitle>
          </LocationCopyWrapper>
          <RiskLevelGraphicDesktop>
            <RiskLevelGraphic {...riskLevelGraphicProps} />
          </RiskLevelGraphicDesktop>
        </HeaderSection>
        <SummaryStats
          stats={props.stats}
          onRtRangeClick={props.onRtRangeClick}
          onTestPositiveClick={props.onTestPositiveClick}
          onIcuUtilizationClick={props.onIcuUtilizationClick}
          onContactTracingClick={props.onContactTracingClick}
          isMobile={props.isMobile}
          isHeader={true}
        />
        <HeaderSection>
          <HeaderSubCopyWrapper isVerifiedState={isVerifiedState}>
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
                  Please let us know
                </a>
                .
              </HeaderSubCopy>
            )}
            {!props.projections.isCounty && !isEmbed && (
              <HeaderSubCopy>
                {verified && (
                  <Fragment>
                    <CheckIcon htmlColor="#00D474" />
                    <span>Government verified data · </span>
                  </Fragment>
                )}
                <LastUpdatedDate isVerifiedState={isVerifiedState}>
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
 */}
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
                      isCurrentLevel={isCurrentLevel}
                    />
                  );
                })}
              </ThermometerContainer>
              <SectionColumn>
                <ColumnTitle>Covid threat level</ColumnTitle>
                <LevelDescription>At risk of an outbreak</LevelDescription>
                <Copy>{levelInfo.detail(locationName)}</Copy>
              </SectionColumn>
            </SectionHalf>
            <SectionHalf>
              <InfoOutlinedIcon />
              <SectionColumn isUpdateCopy>
                <ColumnTitle isUpdateCopy>Updates</ColumnTitle>
                <NewIndicatorCopy />
              </SectionColumn>
            </SectionHalf>
          </HeaderSection>
          <LocationHeaderStats
            stats={props.stats}
            onRtRangeClick={props.onRtRangeClick}
            onTestPositiveClick={props.onTestPositiveClick}
            onIcuUtilizationClick={props.onIcuUtilizationClick}
            onContactTracingClick={props.onContactTracingClick}
            isMobile={props.isMobile}
            isHeader={true}
          />
        </TopContainer>
        <FooterContainer isVerifiedState={isVerifiedState}>
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
