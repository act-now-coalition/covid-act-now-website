import React from 'react';
import { Region } from 'common/regions';
import {
  SectionContainer,
  MobileOnly,
  DesktopOnly,
} from 'components/NewLocationPage/Shared/Shared.style';
import EmailForm from './EmailForm';
import { AlertsCard } from '../ClickableCard';

const GetAlertsBlock: React.FC<{
  region: Region;
  onClickGetAlerts: () => void;
}> = ({ region, onClickGetAlerts }) => {
  return (
    <SectionContainer>
      <MobileOnly>
        <AlertsCard />
      </MobileOnly>
      <DesktopOnly>
        <EmailForm region={region} />
      </DesktopOnly>
    </SectionContainer>
  );
};

export default GetAlertsBlock;
