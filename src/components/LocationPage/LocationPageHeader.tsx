import React, { Fragment } from 'react';
import NotificationsNoneIcon from '@material-ui/icons/NotificationsNone';
import ShareOutlinedIcon from '@material-ui/icons/ShareOutlined';
import { useIsEmbed } from 'common/utils/hooks';
import { LOCATION_SUMMARY_LEVELS } from 'common/metrics/location_summary';
import { Level } from 'common/level';
import { COLOR_MAP } from 'common/colors';
import { Metric } from 'common/metricEnum';
import { useModelLastUpdatedDate } from 'common/utils/model';
import { formatUtcDate } from 'common/utils';
import { Region, MetroArea } from 'common/regions';
import LocationHeaderStats from 'components/SummaryStats/LocationHeaderStats';
import { ThermometerImage } from 'components/Thermometer';
import LocationPageHeading from './LocationPageHeading';
import NotificationArea from './Notifications';
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
} from 'components/LocationPage/LocationPageHeader.style';
import { InfoTooltip, renderTooltipContent } from 'components/InfoTooltip';
import { locationPageHeaderTooltipContent } from 'cms-content/tooltips';
import { trackOpenTooltip } from 'components/InfoTooltip';
import type { MetricValues } from 'common/models/Projections';
import GetAlertsButton from './Experiment/GetAlertsButton';
import {
  Experiment,
  ExperimentID,
  Variant,
  VariantID,
} from 'components/Experiment';

function renderInfoTooltip(): React.ReactElement {
  const { body } = locationPageHeaderTooltipContent;

  return (
    <InfoTooltip
      title={renderTooltipContent(body)}
      aria-label="Description of risk levels"
      trackOpenTooltip={() => trackOpenTooltip('Location page header')}
    />
  );
}

const LocationPageHeader = (props: {
  alarmLevel: Level;
  condensed?: boolean;
  stats: MetricValues;
  onMetricClick: (metric: Metric) => void;
  onHeaderShareClick: () => void;
  onHeaderSignupClick: () => void;
  isMobile?: boolean;
  region: Region;
}) => {
  const hasStats = !!Object.values(props.stats).filter(
    (val: number | null) => val !== null,
  ).length;
  const { alarmLevel, region } = props;

  //TODO (chelsi): get rid of this use of 'magic' numbers
  const headerTopMargin = !hasStats ? -202 : -218;
  const headerBottomMargin = !hasStats ? 0 : 0;

  const levelInfo = LOCATION_SUMMARY_LEVELS[alarmLevel];

  const fillColor =
    alarmLevel !== Level.UNKNOWN ? levelInfo.color : COLOR_MAP.GRAY.LIGHT;

  const isEmbed = useIsEmbed();

  const lastUpdatedDate: Date | null = useModelLastUpdatedDate() || new Date();
  const lastUpdatedDateString =
    lastUpdatedDate !== null ? formatUtcDate(lastUpdatedDate) : '';

  const tooltip = renderInfoTooltip();

  return (
    <Fragment>
      <ColoredHeaderBanner bgcolor={fillColor} />
      <Wrapper
        $condensed={props.condensed}
        $headerTopMargin={headerTopMargin}
        $headerBottomMargin={headerBottomMargin}
      >
        <TopContainer>
          <HeaderSection>
            <LocationPageHeading region={region} isEmbed={isEmbed} />
            <ButtonsWrapper>
              <HeaderButton onClick={props.onHeaderShareClick}>
                <ShareOutlinedIcon />
                Share
              </HeaderButton>
              {!props.isMobile && (
                <HeaderButton
                  onClick={() => {
                    props.onHeaderSignupClick();
                    document
                      .getElementById('fieldEmail')
                      ?.focus({ preventScroll: true });
                  }}
                >
                  <NotificationsNoneIcon />
                  Receive alerts
                </HeaderButton>
              )}
            </ButtonsWrapper>
          </HeaderSection>
          <HeaderSection>
            <SectionHalf>
              <ThermometerImage currentLevel={alarmLevel} />
              <SectionColumn>
                <ColumnTitle>Covid risk level {tooltip}</ColumnTitle>
                <LevelDescription>{levelInfo.summary}</LevelDescription>
                <Copy>
                  {levelInfo.detail(
                    region instanceof MetroArea
                      ? region.shortName
                      : region.name,
                  )}
                </Copy>
              </SectionColumn>
            </SectionHalf>
            <SectionHalf>
              <NotificationArea region={region} />
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
          {!isEmbed && (
            <HeaderSubCopy>
              <LastUpdatedDate>Updated {lastUpdatedDateString}</LastUpdatedDate>
            </HeaderSubCopy>
          )}
        </FooterContainer>
        {props.isMobile && (
          <Experiment id={ExperimentID.EMAIL_FIELD_AUTO_FOCUSED}>
            <Variant id={VariantID.A}>
              <GetAlertsButton
                onClick={() => {
                  props.onHeaderSignupClick();
                  document
                    .getElementById('fieldEmail')
                    ?.focus({ preventScroll: true });
                }}
              />
            </Variant>
            <Variant id={VariantID.B}>
              <GetAlertsButton onClick={() => props.onHeaderSignupClick()} />
            </Variant>
          </Experiment>
        )}
      </Wrapper>
    </Fragment>
  );
};

export default LocationPageHeader;
