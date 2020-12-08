import React, { Fragment } from 'react';
import CheckIcon from '@material-ui/icons/Check';
import { Link } from 'react-router-dom';
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
} from 'components/LocationPage/LocationPageHeader.style';
import { useEmbed } from 'common/utils/hooks';
import { LOCATION_SUMMARY_LEVELS } from 'common/metrics/location_summary';
import { Level } from 'common/level';
import { COLOR_MAP } from 'common/colors';
import { useModelLastUpdatedDate } from 'common/utils/model';
import { STATES_WITH_DATA_OVERRIDES } from 'common/metrics/hospitalizations';
import { Projections } from 'common/models/Projections';
import { formatUtcDate } from 'common/utils';
import NotificationsNoneIcon from '@material-ui/icons/NotificationsNone';
import ShareOutlinedIcon from '@material-ui/icons/ShareOutlined';
import LocationHeaderStats from 'components/SummaryStats/LocationHeaderStats';
import WarningIcon from '@material-ui/icons/Warning';
import { Metric } from 'common/metric';
import { BANNER_COPY } from 'components/Banner/ThirdWaveBanner';
import HospitalizationsAlert, {
  isHospitalizationsPeak,
} from './HospitalizationsAlert';
import { ThermometerImage } from 'components/Thermometer';
import { useRegion } from 'common/regions';
import LocationPageHeading from './LocationPageHeading';

const NewFeatureCopy = (props: {
  locationName: string;
  onNewUpdateClick: () => void;
}) => {
  return (
    <Copy isUpdateCopy>
      {BANNER_COPY} <Link to={'/deep-dives/us-third-wave'}>Learn more</Link>.
    </Copy>
  );
};

// const LocationPageHeading = (props: { projections: Projections }) => {
//   const { isEmbed } = useEmbed();

//   const displayName = props.projections.countyName ? (
//     <>
//       <strong>{props.projections.countyName}, </strong>
//       <a
//         href={`${
//           isEmbed ? '/embed' : ''
//         }/us/${props.projections.stateCode.toLowerCase()}`}
//       >
//         {props.projections.stateCode}
//       </a>
//     </>
//   ) : (
//     <strong>{props.projections.stateName}</strong>
//   );

//   return <span>{displayName}</span>;
// };

const noop = () => {};

const LocationPageHeader = (props: {
  projections: Projections;
  condensed?: boolean;
  stats: { [key: string]: number | null };
  onMetricClick: (metric: Metric) => void;
  onHeaderShareClick: () => void;
  onHeaderSignupClick: () => void;
  isMobile?: boolean;
  onNewUpdateClick: () => void;
}) => {
  const hasStats = !!Object.values(props.stats).filter(
    (val: number | null) => val !== null,
  ).length;
  const { projections } = props;
  const region = useRegion();

  //TODO (chelsi): get rid of this use of 'magic' numbers
  const headerTopMargin = !hasStats ? -202 : -218;
  const headerBottomMargin = !hasStats ? 0 : 0;

  const locationName = region.name;

  const alarmLevel = projections.getAlarmLevel();

  const levelInfo = LOCATION_SUMMARY_LEVELS[alarmLevel];

  const fillColor =
    alarmLevel !== Level.UNKNOWN ? levelInfo.color : COLOR_MAP.GRAY.LIGHT;

  const { isEmbed } = useEmbed();

  const verified = STATES_WITH_DATA_OVERRIDES.includes(projections.stateName);

  const isVerifiedState = !projections.isCounty && verified;

  const lastUpdatedDate: Date | null = useModelLastUpdatedDate() || new Date();
  const lastUpdatedDateString =
    lastUpdatedDate !== null ? formatUtcDate(lastUpdatedDate) : '';

  const inHospitalizationsPeak = isHospitalizationsPeak(projections.primary);

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
                <LocationPageHeading region={region} />
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
              <ThermometerImage currentLevel={alarmLevel} />
              <SectionColumn>
                <ColumnTitle>Covid risk level</ColumnTitle>
                <LevelDescription>{levelInfo.summary}</LevelDescription>
                <Copy>{levelInfo.detail(locationName)}</Copy>
              </SectionColumn>
            </SectionHalf>
            <SectionHalf>
              <WarningIcon />
              <SectionColumn isUpdateCopy>
                <ColumnTitle isUpdateCopy>alert</ColumnTitle>
                {inHospitalizationsPeak ? (
                  <HospitalizationsAlert projection={projections.primary} />
                ) : (
                  <NewFeatureCopy
                    locationName={locationName}
                    onNewUpdateClick={props.onNewUpdateClick}
                  />
                )}
              </SectionColumn>
            </SectionHalf>
          </HeaderSection>
          <LocationHeaderStats
            stats={props.stats}
            onMetricClick={props.onMetricClick}
            isMobile={props.isMobile}
            isHeader={true}
          />
        </TopContainer>
        <FooterContainer>
          {projections.isCounty && !isEmbed && (
            <HeaderSubCopy>
              <span>Updated {lastUpdatedDateString} · </span>
              <span>County data is currently in beta. </span>
              <span>
                Because counties don’t report hospitalizations, our forecasts
                may not be as accurate. See something wrong?{' '}
              </span>
              <a
                href="mailto:info@covidactnow.org?subject=[Website%20Feedback]"
                target="_blank"
                rel="noopener noreferrer"
              >
                Email us
              </a>
              .
            </HeaderSubCopy>
          )}
          {!projections.isCounty && !isEmbed && (
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
