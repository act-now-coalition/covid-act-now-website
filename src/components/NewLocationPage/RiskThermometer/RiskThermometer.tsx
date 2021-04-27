import React from 'react';
import { MobileOnly, DesktopOnly } from '../Shared/Shared.style';
import MobileThermometer from './MobileThermometer';
import DesktopThermometer from './DesktopThermometer';
import { Level } from 'common/level';

const RiskThermometer: React.FC<{
  currentLevel: Level;
  locationName: string;
}> = ({ currentLevel, locationName }) => {
  const props = {
    currentLevel,
    locationName,
  };

  return (
    <>
      <MobileOnly>
        <MobileThermometer {...props} />
      </MobileOnly>
      <DesktopOnly>
        <DesktopThermometer {...props} />
      </DesktopOnly>
    </>
  );
};

export default RiskThermometer;
