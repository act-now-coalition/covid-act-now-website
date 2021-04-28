import React from 'react';
import { MainWrapper, HeaderContainer } from './AboveTheFold.style';
import SparkLineBlock from '../SparkLineBlock';
import LocationName from '../LocationName';
// import NotesBlock from '../NotesBlock'
import { Example as NotesBlockExample } from '../NotesBlock/NotesBlock.stories';
import GetAlertsBlock from '../GetAlertsBlock';
import { CountyMap } from '../CountyMap';
import HeaderButtons from '../HeaderButtons';
import { Projection } from 'common/models/Projection';
import { Region } from 'common/regions';

interface AboveTheFoldProps {
  projection: Projection; //spark line block
  region: Region; // county map
}

const AboveTheFold: React.FC<AboveTheFoldProps> = ({ projection, region }) => {
  return (
    <MainWrapper>
      <HeaderContainer>
        <LocationName region={region} />
        <HeaderButtons />
      </HeaderContainer>
      <SparkLineBlock projection={projection} />
      <NotesBlockExample />
    </MainWrapper>
  );
};

export default AboveTheFold;
