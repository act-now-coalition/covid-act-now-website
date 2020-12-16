import React, { Fragment } from 'react';
import { Link } from 'react-router-dom';
import {
  ColoredHeaderBanner,
  Wrapper,
  TopContainer,
  FooterContainer,
  HeaderSection,
  HeaderSubCopy,
  ButtonsWrapper,
  HeaderButton,
  LastUpdatedDate,
  SectionHalf,
  Copy,
  ColumnTitle,
  SectionColumn,
  LevelDescription,
  WarningIcon,
} from 'components/LocationPage/LocationPageHeader.style';
import { useIsEmbed } from 'common/utils/hooks';
import { LOCATION_SUMMARY_LEVELS } from 'common/metrics/location_summary';
import { Level } from 'common/level';
import { COLOR_MAP } from 'common/colors';
import { useModelLastUpdatedDate } from 'common/utils/model';
import { Projections } from 'common/models/Projections';
import { formatUtcDate } from 'common/utils';
import NotificationsNoneIcon from '@material-ui/icons/NotificationsNone';
import ShareOutlinedIcon from '@material-ui/icons/ShareOutlined';
import InfoIcon from '@material-ui/icons/Info';
import LocationHeaderStats from 'components/SummaryStats/LocationHeaderStats';
import { Metric } from 'common/metric';
import { BANNER_COPY } from 'components/Banner/ThirdWaveBanner';
import HospitalizationsAlert, {
  isHospitalizationsPeak,
} from './HospitalizationsAlert';
import { ThermometerImage } from 'components/Thermometer';
import { useLocationPageRegion } from 'common/regions';
import LocationPageHeading from './LocationPageHeading';

const noop = () => {};

const LocationPageHeader = (props: {
  projections: Projections;
  condensed?: boolean;
  stats: { [key: string]: number | null };
  onMetricClick: (metric: Metric) => void;
  onHeaderShareClick: () => void;
  onHeaderSignupClick: () => void;
  isMobile?: boolean;
}) => {
  const hasStats = !!Object.values(props.stats).filter(
    (val: number | null) => val !== null,
  ).length;
  const { projections } = props;
  const region = useLocationPageRegion();

  //TODO (chelsi): get rid of this use of 'magic' numbers
  const headerTopMargin = !hasStats ? -202 : -218;
  const headerBottomMargin = !hasStats ? 0 : 0;

  const alarmLevel = projections.getAlarmLevel();

  const levelInfo = LOCATION_SUMMARY_LEVELS[alarmLevel];

  const fillColor =
    alarmLevel !== Level.UNKNOWN ? levelInfo.color : COLOR_MAP.GRAY.LIGHT;

  const isEmbed = useIsEmbed();

  const lastUpdatedDate: Date | null = useModelLastUpdatedDate() || new Date();
  const lastUpdatedDateString =
    lastUpdatedDate !== null ? formatUtcDate(lastUpdatedDate) : '';

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
            <LocationPageHeading region={region} isEmbed={isEmbed} />
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
                <Copy>{levelInfo.detail(region.name)}</Copy>
              </SectionColumn>
            </SectionHalf>
            <SectionHalf>
              <NotificationArea projections={projections} />
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
              <span>See something wrong? </span>
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
              <LastUpdatedDate>Updated {lastUpdatedDateString}</LastUpdatedDate>
            </HeaderSubCopy>
          )}
        </FooterContainer>
      </Wrapper>
    </Fragment>
  );
};

const NotificationArea: React.FC<{ projections: Projections }> = ({
  projections,
}) => {
  const region = projections.region;

  enum Notification {
    NYCCounty,
    HospitalizationsPeak,
    ThirdWave,
  }
  let notification: Notification;

  // TODO(2020/12/22): Remove NYC notice after it's been up for a week or so.
  if (['36047', '36061', '36005', '36081', '36085'].includes(region.fipsCode)) {
    notification = Notification.NYCCounty;
  } else if (isHospitalizationsPeak(projections.primary)) {
    notification = Notification.HospitalizationsPeak;
  } else {
    notification = Notification.ThirdWave;
  }

  let icon, title;
  if (notification === Notification.NYCCounty) {
    icon = <InfoIcon />;
    title = 'update';
  } else {
    icon = <WarningIcon />;
    title = 'alert';
  }

  return (
    <React.Fragment>
      {icon}
      <SectionColumn isUpdateCopy>
        <ColumnTitle isUpdateCopy>{title}</ColumnTitle>

        {notification === Notification.HospitalizationsPeak && (
          <HospitalizationsAlert
            locationName={region.fullName}
            projection={projections.primary}
          />
        )}

        {notification === Notification.NYCCounty && (
          <NYCAggregationChangeCopy locationName={region.name} />
        )}

        {notification === Notification.ThirdWave && <ThirdWaveCopy />}
      </SectionColumn>
    </React.Fragment>
  );
};

const NYCAggregationChangeCopy: React.FC<{ locationName: string }> = ({
  locationName,
}) => {
  return (
    <Copy>
      Prior to December 15th, {locationName} was aggregated together with the
      other New York City boroughs. It now has its own metrics and risk level.
    </Copy>
  );
};

const ThirdWaveCopy = () => {
  return (
    <Copy isUpdateCopy>
      {BANNER_COPY} <Link to={'/deep-dives/us-third-wave'}>Learn more</Link>.
    </Copy>
  );
};

export default LocationPageHeader;
