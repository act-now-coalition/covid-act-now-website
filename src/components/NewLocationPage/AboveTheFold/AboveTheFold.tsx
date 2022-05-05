import React from 'react';
import {
  MainWrapper,
  HeaderContainer,
  GridContainer,
  GridItemHeader,
  GridItemAlerts,
  GridItemMap,
  GridItemOverview,
  GridItemSparkLines,
  MapOutsideGrid,
  ContentContainer,
  GridItemMasks,
  GridItemOriginalMetrics,
} from './AboveTheFold.style';
import SparkLineBlock from '../SparkLineBlock';
import LocationName from '../LocationName';
import LocationOverview from '../LocationOverview';
import GetAlertsBlock from '../GetAlertsBlock';
import { CountyMap } from '../CountyMap';
import HeaderButtons from '../HeaderButtons';
import { Region } from 'common/regions';
import { LocationSummary } from 'common/location_summaries';
import { DesktopOnly, MobileOnly } from '../Shared/Shared.style';
import VaccineButton from 'components/NewLocationPage/HeaderButtons/VaccineButton';
import { Metric } from 'common/metricEnum';
import { SparkLineMetric } from '../SparkLineBlock/utils';
import { Can82BannerLocationPage } from 'components/Banner';

import { MasksCard, OriginalMetricsCard } from '../ClickableCard';
import { Level } from 'common/level';

interface AboveTheFoldProps {
  region: Region;
  locationSummary: LocationSummary;
  onClickAlertSignup: () => void;
  onClickShare: () => void;
  onClickMetric?: (metric: Metric) => void;
  onClickSparkLine: (metric: SparkLineMetric) => void;
}

const AboveTheFold: React.FC<AboveTheFoldProps> = React.memo(
  ({
    region,
    locationSummary,
    onClickMetric,
    onClickAlertSignup,
    onClickShare,
    onClickSparkLine,
  }) => {
    return (
      <MainWrapper>
        <Can82BannerLocationPage />
        <ContentContainer>
          <GridContainer>
            <GridItemHeader>
              <HeaderContainer>
                <LocationName region={region} />
                <DesktopOnly>
                  <HeaderButtons region={region} onClickShare={onClickShare} />
                </DesktopOnly>
                <MobileOnly>
                  <VaccineButton />
                </MobileOnly>
              </HeaderContainer>
            </GridItemHeader>
            <GridItemOverview>
              <LocationOverview
                region={region}
                locationSummary={locationSummary}
                onClickMetric={onClickMetric}
                onClickShare={onClickShare}
              />
            </GridItemOverview>
            <GridItemSparkLines>
              <SparkLineBlock
                region={region}
                onClickSparkLine={onClickSparkLine}
              />
            </GridItemSparkLines>
            {locationSummary.level === Level.HIGH && (
              <GridItemMasks>
                <MasksCard />
              </GridItemMasks>
            )}
            <GridItemOriginalMetrics>
              <OriginalMetricsCard />
            </GridItemOriginalMetrics>
            <GridItemAlerts>
              <GetAlertsBlock
                region={region}
                onClickGetAlerts={onClickAlertSignup}
              />
            </GridItemAlerts>
            <GridItemMap>
              <CountyMap region={region} />
            </GridItemMap>
          </GridContainer>
          <MapOutsideGrid>
            <CountyMap region={region} />
          </MapOutsideGrid>
        </ContentContainer>
      </MainWrapper>
    );
  },
);

export default AboveTheFold;
