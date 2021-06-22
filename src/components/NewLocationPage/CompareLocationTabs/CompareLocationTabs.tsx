import React from 'react';
import {
  ButtonGroup,
  Button,
} from 'components/SharedComponents/SharedComponents.style';

const CompareLocationTabs: React.FC<{
  locationLevels: string[];
  onChange: (
    event: React.MouseEvent<HTMLElement>,
    newSelection: string,
  ) => void;
  selectedOption: string;
}> = ({ locationLevels, onChange, selectedOption }) => {
  return (
    <ButtonGroup value={selectedOption} exclusive onChange={onChange}>
      {locationLevels.map(locationLevel => (
        <Button key={`level-${locationLevel}`} value={locationLevel}>
          {locationLevel}
        </Button>
      ))}
    </ButtonGroup>
  );
};

export default CompareLocationTabs;
