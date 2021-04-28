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
// import NotesBlock from '../NotesBlock'
import {
  Example as NotesBlockExample,
  OverviewStandIn,
} from '../NotesBlock/NotesBlock.stories';
import GetAlertsBlock from '../GetAlertsBlock';
import { CountyMap } from '../CountyMap';
import HeaderButtons from '../HeaderButtons';
import { Projection } from 'common/models/Projection';
import { Region } from 'common/regions';

interface AboveTheFoldProps {
  projection: Projection;
  region: Region;
}

const AboveTheFold: React.FC<AboveTheFoldProps> = ({ projection, region }) => {
  return (
    <MainWrapper>
      <GridContainer>
        <GridItemHeader>
          <HeaderContainer>
            <LocationName region={region} />
            <HeaderButtons />
          </HeaderContainer>
        </GridItemHeader>
        <GridItemOverview>
          <OverviewStandIn />
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
          <NotesBlockExample />
        </GridItemNote>
      </GridContainer>
    </MainWrapper>
  );
};

export default AboveTheFold;
