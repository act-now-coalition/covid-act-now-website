import React from 'react';
import * as Styles from './LocationPageHeading.style';
import { ChartContentWrapper } from './ChartsHolder.style';
import { Region } from 'common/regions/types';
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
import { LocationSummary } from 'common/location_summaries';
import { LOCATION_SUMMARY_LEVELS } from 'common/metrics/location_summary';
import { Level } from 'common/level';
import { COLOR_MAP } from 'common/colors';
import NotificationsNoneIcon from '@material-ui/icons/NotificationsNone';
import ShareOutlinedIcon from '@material-ui/icons/ShareOutlined';
import LocationPageHeading from './LocationPageHeading';
import { ThermometerImage } from 'components/Thermometer';
import LocationHeaderStats from 'components/SummaryStats/LocationHeaderStats';
import { ALL_METRICS } from 'common/metric';
import type { MetricValues } from 'common/models/Projections';

const noop = () => {};

const summaryToStats = (summary: LocationSummary): MetricValues => {
  const stats = {} as MetricValues;
  for (const metric of ALL_METRICS) {
    stats[metric] = summary.metrics[metric]?.value ?? null;
  }
  return stats;
};

const LocationHeader: React.FC<{
  region: Region;
  locationSummary: LocationSummary;
}> = ({ region, locationSummary }) => {
  const alarmLevel = locationSummary.level;
  const levelInfo = LOCATION_SUMMARY_LEVELS[alarmLevel];
  const fillColor =
    alarmLevel !== Level.UNKNOWN ? levelInfo.color : COLOR_MAP.GRAY.LIGHT;
  const stats = summaryToStats(locationSummary);

  return (
    <div>
      <>
        <ChartContentWrapper>
          <ColoredHeaderBanner bgcolor={fillColor} />
          <Wrapper
            $condensed={false}
            $headerTopMargin={-218}
            $headerBottomMargin={0}
          >
            <TopContainer>
              <HeaderSection>
                <LocationPageHeading region={region} isEmbed={false} />
                <ButtonsWrapper>
                  <HeaderButton onClick={noop}>
                    <ShareOutlinedIcon />
                    Share
                  </HeaderButton>
                  <HeaderButton onClick={noop}>
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
                  </SectionColumn>
                </SectionHalf>
                <SectionHalf></SectionHalf>
              </HeaderSection>
              <LocationHeaderStats
                stats={stats}
                onMetricClick={noop}
                isMobile={false}
                isHeader={true}
              />
            </TopContainer>
          </Wrapper>
        </ChartContentWrapper>
      </>
    </div>
  );
};

export default LocationHeader;
