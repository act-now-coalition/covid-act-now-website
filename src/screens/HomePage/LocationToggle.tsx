import React from 'react';
import { ToggleWrapper } from './HomePage.style';
import {
  ButtonGroup,
  Button,
} from 'components/SharedComponents/SharedComponents.style';
import { MapView } from './HomePage';

const LocationToggle: React.FC<{
  locationScope: MapView;
  onChange: (
    event: React.MouseEvent<HTMLElement>,
    newSelection: MapView,
  ) => void;
}> = ({ locationScope, onChange }) => {
  return (
    <ToggleWrapper>
      <ButtonGroup value={locationScope} exclusive onChange={onChange}>
        <Button value={MapView.STATES}>States</Button>
        <Button value={MapView.COUNTIES}>Counties</Button>
      </ButtonGroup>
    </ToggleWrapper>
  );
};

export default LocationToggle;
