import React, { Fragment } from 'react';
import NotificationsNoneIcon from '@material-ui/icons/NotificationsNone';
import ShareOutlinedIcon from '@material-ui/icons/ShareOutlined';

import { useIsEmbed } from 'common/utils/hooks';
import { LOCATION_SUMMARY_LEVELS } from 'common/metrics/location_summary';
import { Level } from 'common/level';
import { COLOR_MAP } from 'common/colors';
import { Metric } from 'common/metricEnum';
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
import { Region, MetroArea } from 'common/regions';
import { InfoTooltip, renderTooltipContent } from 'components/InfoTooltip';
import { locationPageHeaderTooltipContent } from 'cms-content/tooltips';
import { trackOpenTooltip } from 'components/InfoTooltip';
import LocationHeaderStats from 'components/SummaryStats/LocationHeaderStats';
import type { MetricValues } from 'common/models/Projections';

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

const noop = () => {};

const LocationPageHeader = (props: {
  alarmLevel: Level;
  condensed?: boolean;
  stats: MetricValues;
  onMetricClick: (metric: Metric) => void;
  onHeaderShareClick: () => void;
  onHeaderSignupClick: () => void;
  isMobile?: boolean;
  region: Region;
  lastUpdatedDateString: string;
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
            {/*<ButtonsWrapper>
              <HeaderButton onClick={props.onHeaderShareClick || noop}>
                <ShareOutlinedIcon />
                Share
              </HeaderButton>
              <HeaderButton onClick={props.onHeaderSignupClick || noop}>
                <NotificationsNoneIcon />
                Receive alerts
              </HeaderButton>
            </ButtonsWrapper>
            */}
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
              <LastUpdatedDate>
                Updated {props.lastUpdatedDateString}
              </LastUpdatedDate>
            </HeaderSubCopy>
          )}
        </FooterContainer>
      </Wrapper>
    </Fragment>
  );
};

export default LocationPageHeader;
