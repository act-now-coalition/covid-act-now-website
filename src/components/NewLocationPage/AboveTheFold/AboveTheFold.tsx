import React from 'react';
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
} from './AboveTheFold.style';
import SparkLineBlock from '../SparkLineBlock';
import LocationName from '../LocationName';
import LocationOverview from '../LocationOverview';
import VulnerabilityNote from '../NotesBlock/VulnerabilityNote';
import GetAlertsBlock from '../GetAlertsBlock';
import { CountyMap } from '../CountyMap';
import HeaderButtons from '../HeaderButtons';
import { Projection } from 'common/models/Projection';
import { Region } from 'common/regions';
import { LocationSummary } from 'common/location_summaries';
import { DesktopOnly, MobileOnly } from '../Shared/Shared.style';
import VaccineButton from 'components/NewLocationPage/HeaderButtons/VaccineButton';

interface AboveTheFoldProps {
  projection: Projection;
  region: Region;
  locationSummary: LocationSummary;
}

const AboveTheFold: React.FC<AboveTheFoldProps> = ({
  projection,
  region,
  locationSummary,
}) => {
  console.log('locationSummary', locationSummary);
  return (
    <MainWrapper>
      <GridContainer>
        <GridItemHeader>
          <HeaderContainer>
            <LocationName region={region} />
            <DesktopOnly>
              <HeaderButtons />
            </DesktopOnly>
            <MobileOnly>
              <VaccineButton />
            </MobileOnly>
          </HeaderContainer>
        </GridItemHeader>
        <GridItemOverview>
          <LocationOverview region={region} locationSummary={locationSummary} />
        </GridItemOverview>
        <GridItemSparkLines>
          <SparkLineBlock projection={projection} />
        </GridItemSparkLines>
        <GridItemAlerts>
          <GetAlertsBlock region={region} onClickGetAlerts={() => {}} />
        </GridItemAlerts>
        <GridItemMap>
          <CountyMap region={region} />
        </GridItemMap>
        <GridItemNote>
          <VulnerabilityNote ccviScore={locationSummary.ccvi} />
        </GridItemNote>
      </GridContainer>
    </MainWrapper>
  );
};

export default AboveTheFold;
