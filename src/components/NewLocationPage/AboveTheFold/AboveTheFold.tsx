import React from 'react';
import isNull from 'lodash/isNull';
import {
  MainWrapper,
  HeaderContainer,
  GridContainer,
  GridItemHeader,
  GridItemAlerts,
  GridItemMap,
  GridItemNote,
  GridItemOverview,
  GridItemSparkLines,
  MapOutsideGrid,
} from './AboveTheFold.style';
import SparkLineBlock from '../SparkLineBlock';
import LocationName from '../LocationName';
import LocationOverview from '../LocationOverview';
import VulnerabilityNote from '../NotesBlock/VulnerabilityNote';
import GetAlertsBlock from '../GetAlertsBlock';
import { CountyMap } from '../CountyMap';
import HeaderButtons from '../HeaderButtons';
import { Region } from 'common/regions';
import { LocationSummary } from 'common/location_summaries';
import { DesktopOnly, MobileOnly } from '../Shared/Shared.style';
import VaccineButton from 'components/NewLocationPage/HeaderButtons/VaccineButton';
import { Metric } from 'common/metricEnum';
import { SparkLineMetric } from '../SparkLineBlock/utils';
import { hasVeryHighVulnerability } from '../NotesBlock/utils';

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
    const showVulnerabilityNote =
      !isNull(locationSummary.ccvi) &&
      hasVeryHighVulnerability(locationSummary.ccvi);

    return (
      <MainWrapper>
        <GridContainer showNote={showVulnerabilityNote}>
          <GridItemHeader>
            <HeaderContainer>
              <LocationName region={region} />
              <DesktopOnly>
                <HeaderButtons onClickShare={onClickShare} />
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
          <GridItemAlerts>
            <GetAlertsBlock
              region={region}
              onClickGetAlerts={onClickAlertSignup}
            />
          </GridItemAlerts>
          <GridItemMap>
            <CountyMap region={region} />
          </GridItemMap>
          {showVulnerabilityNote && (
            <GridItemNote>
              <VulnerabilityNote
                ccviScore={locationSummary.ccvi}
                region={region}
              />
            </GridItemNote>
          )}
        </GridContainer>
        <MapOutsideGrid>
          <CountyMap region={region} />
        </MapOutsideGrid>
      </MainWrapper>
    );
  },
);

export default AboveTheFold;
