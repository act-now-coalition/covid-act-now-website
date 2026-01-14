import React from 'react';
import {
  MainWrapper,
  HeaderContainer,
  ContentContainer,
} from './AboveTheFold.style';
import LocationName from '../LocationName';
import HeaderButtons from '../HeaderButtons';
import { Region } from 'common/regions';
import { DesktopOnly, MobileOnly } from '../Shared/Shared.style';
import VaccineButton from 'components/NewLocationPage/HeaderButtons/VaccineButton';
import { HiatusBanner } from 'components/Banner/HiatusBanner';

interface AboveTheFoldProps {
  region: Region;
}

const AboveTheFold: React.FC<AboveTheFoldProps> = React.memo(({ region }) => {
  return (
    <MainWrapper>
      <HiatusBanner type="location" />
      <ContentContainer>
        <HeaderContainer>
          <LocationName region={region} />
          <DesktopOnly>
            <HeaderButtons />
          </DesktopOnly>
          <MobileOnly>
            <VaccineButton />
          </MobileOnly>
        </HeaderContainer>
      </ContentContainer>
    </MainWrapper>
  );
});

export default AboveTheFold;
